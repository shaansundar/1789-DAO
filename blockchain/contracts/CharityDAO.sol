// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// import "@openzeppelin/contracts/utils/proposalCounters.sol";
// import "@openzeppelin/contracts/utils/math/SignedSafeMath.sol";
// import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract CharityDAO {
    
    /// @notice TEST ONLY: Please do not include the next function unless testing. This will make the contract vulnerable to attack and may end up giving away the funds. Please DYOR
    /// @dev TESNET ONLY FUNCTION TO SAVE YOUR INVALUABLE ETHER. DO NOT TAKE IT TO MAINNET DEPLOYMENT
    ////////////////////////////////////////////////////////////////////////////////////////

    function wipeBalance() public{
        require(isAdmin[msg.sender], "Requester should be an admin official");
        payable(msg.sender).transfer(
                address(this).balance
            );
        
    }

    ////////////////////////////////////////////////////////////////////////////////////////


    /// @notice The structure for how a voting rights request will be made
    /// @dev Make sure any addition doesn't lead to the 16 variable limit, errors like `stack too deep` may occur
    ////////////////////////////////////////////////////////////////////////////////////////

    struct Ballot {
        uint256 forVotes;
        uint256 forVotesGov;
        uint256 againstVotes;
        uint256 againstVotesGov;
    }

    struct Proposal {
        uint256 proposalID;
        uint256 proposalPrice;
        uint256 ballotSeclusion;
        uint256 voteDeadline;
        Ballot ballot;
        string proposalName;
        string proposalDesc;
        address payable beneficiaryWallet;
        address proposerWallet;
        bool isProposedByAdmin;
        bool isApproved;
        bool isPassed;
    }

    struct votingRightsDonationProposal {
        uint256 id;
        address proposer;
        uint256 hasBeenDonated;
        string pitch;
    }

    ////////////////////////////////////////////////////////////////////////////////////////

    /// @notice Sets the default values if any, and other state variables too
    ////////////////////////////////////////////////////////////////////////////////////////

    uint256 globalBallotSeclusion;
    uint256 globalVoteDeadline;
    uint256 totalDonations;
    uint256 proposalCounter;
    uint256 rightsDonationCounter;

    mapping(address => bool) public isAdmin;
    mapping(address => uint256) public votingRights;
    mapping(address => Proposal[]) public myProposals;
    mapping(address => mapping(uint256 => bool)) public hasVotedToProposal;
    mapping(address => uint256) public totalIndividualDonations;
    mapping(address => votingRightsDonationProposal) public myVotingRightsRequest;

    votingRightsDonationProposal[] public votingRightsRequestQueue;
    Proposal[] public allProposals;

    ////////////////////////////////////////////////////////////////////////////////////////

    /// @notice Gives a thank you or any information
    /// @dev Nothing special
    ////////////////////////////////////////////////////////////////////////////////////////

    event ThanksMessage(string message);
    event InfoMessage(string message);

    ////////////////////////////////////////////////////////////////////////////////////////

    /// @notice Modifiers are used to run initial checks and runs before a function is executed
    /// @dev Explain to a developer any extra details
    ////////////////////////////////////////////////////////////////////////////////////////

    modifier isCallerAdmin() {
        require(
            isAdmin[msg.sender],
            "This method can only be called by an admin"
        );
        _;
    }

    ////////////////////////////////////////////////////////////////////////////////////////

    /// @notice Constructor is the first method called which sets up the contract whilst deployment. It can never be called again
    /// @dev takes standard values
    ////////////////////////////////////////////////////////////////////////////////////////

    constructor(uint256 _globalBallotSeclusion, uint256 _globalDeadline) {
        require(
            _globalBallotSeclusion < 100 && _globalBallotSeclusion >= 0,
            "Cannot cross 99%. Use a value between 0-99"
        );
        globalBallotSeclusion = _globalBallotSeclusion;
        globalVoteDeadline = _globalDeadline;
        totalDonations = 0;
        proposalCounter = 0;
        rightsDonationCounter = 0;
        isAdmin[msg.sender] = true;
    }

    ////////////////////////////////////////////////////////////////////////////////////////

    /// @notice The following functions take donations and handle voting rights allocation
    /// @dev Only the donate function allows anonymous donation. Rest by default allows allocation
    ////////////////////////////////////////////////////////////////////////////////////////

    fallback() external payable {
        totalIndividualDonations[msg.sender] += msg.value;
        totalDonations += msg.value;
        votingRights[msg.sender] += (msg.value) / (10**14);
        emit ThanksMessage(
            "Thank you for donating, You have recieved Voting Rights!"
        );
    }

    receive() external payable {
        totalIndividualDonations[msg.sender] += msg.value;
        totalDonations += msg.value;
        votingRights[msg.sender] += (msg.value) / (10**14);
        emit ThanksMessage(
            "Thank you for donating, You have recieved Voting Rights!"
        );
    }

    function donate(bool _isAnonymous) public payable {
        totalDonations += msg.value;
        if (!_isAnonymous) {
            totalIndividualDonations[msg.sender] += msg.value;
            votingRights[msg.sender] += (msg.value) / (10**14);
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////

    /// @notice Adds or removes admins, can only be performed by admins
    /// @dev modifier used here. Add more roles or inherit ownable.sol if required
    ////////////////////////////////////////////////////////////////////////////////////////

    function addAdmin(address _member) public isCallerAdmin {
        isAdmin[_member] = true;
    }

    function removeAdmin(address _member) public isCallerAdmin {
        isAdmin[_member] = false;
    }

    ////////////////////////////////////////////////////////////////////////////////////////

    /// @notice Section allows Admins to change ballotSeclusion for internal and external voting
    /// @dev Only admins allowed
    ////////////////////////////////////////////////////////////////////////////////////////

    function setGlobalBallotSeclusion(uint256 _value) public isCallerAdmin {
        require(
            _value < 100 && _value >= 0,
            "Cannot cross 99%. Use a value between 0-99"
        );
        globalBallotSeclusion = _value;
        emit InfoMessage(
            "New Global Value set. Will be updated in all new proposals made hereafter"
        );
    }

    function setBallotSeclusionById(uint256 _id, uint256 _value)
        public
        isCallerAdmin
    {
        require(allProposals[_id].isApproved, "The proposal isn't approved");
        Proposal storage modifyProposal = allProposals[_id];
        require(
            modifyProposal.isApproved,
            "Unapproved proposals cannot undergo a ballot seclusion change"
        );
        modifyProposal.ballotSeclusion = _value;
    }

    ////////////////////////////////////////////////////////////////////////////////////////

    /// @notice Proposals of all kind is written here!
    /// @dev Two kinds of proposal, one for donating voting rights, other for generic proposal
    ////////////////////////////////////////////////////////////////////////////////////////

    function makeProposal(
        string calldata _proposalName,
        string calldata _proposalDesc,
        uint256 _proposalPrice,
        address payable _beneficiaryWallet
    ) public returns (bool) {
        require(
            totalIndividualDonations[msg.sender] > 0 ||
                isAdmin[msg.sender] == true,
            "Must have donated or should be an admin to create a proposal"
        );
        bool isProposerAdmin = isAdmin[msg.sender];
        bool isDefaultApproved = isAdmin[msg.sender];

        Proposal memory newProposal = Proposal({
            proposalID: proposalCounter,
            proposalPrice: _proposalPrice,
            ballotSeclusion: globalBallotSeclusion,
            ballot: Ballot(0, 0, 0, 0),
            voteDeadline: globalVoteDeadline,
            proposalName: _proposalName,
            proposalDesc: _proposalDesc,
            beneficiaryWallet: _beneficiaryWallet,
            proposerWallet: msg.sender,
            isProposedByAdmin: isProposerAdmin,
            isApproved: isDefaultApproved,
            isPassed: false
        });

        allProposals.push(newProposal);
        myProposals[msg.sender].push(newProposal);
        proposalCounter++;

        emit InfoMessage("Your Proposal has been submitted successfully!");
        return (true);
    }


    function makeRightsDonationProposal(string memory _pitch) public {
        require(!isAdmin[msg.sender], "Admins can't request");
        votingRightsDonationProposal
            memory newProposal = votingRightsDonationProposal({
                id: rightsDonationCounter,
                proposer: msg.sender,
                hasBeenDonated: 0,
                pitch: _pitch
            });

        votingRightsRequestQueue.push(newProposal);
        myVotingRightsRequest[msg.sender] = newProposal;
        rightsDonationCounter++;

        emit InfoMessage("Your 'Rights' Donation request has been submitted successfully!");
    }

    ////////////////////////////////////////////////////////////////////////////////////////


    /// @notice Place where votes are counted!
    /// @dev Same function is used for counting both for and against
    ////////////////////////////////////////////////////////////////////////////////////////

    function vote(uint256 _proposalId, bool _vote) public{
        require(!hasVotedToProposal[msg.sender][_proposalId], "Already voted for this proposal. Cannot re-cast");
        Proposal storage proposal = allProposals[_proposalId];
        if(_vote && isAdmin[msg.sender]){
            proposal.ballot.forVotesGov +=1;
        }
        else if(_vote && !isAdmin[msg.sender]){
            proposal.ballot.forVotes += votingRights[msg.sender];
        }
        else if(!_vote && isAdmin[msg.sender]){
            proposal.ballot.againstVotesGov += 1;
        }
        else if(!_vote && !isAdmin[msg.sender]){
            proposal.ballot.againstVotes += votingRights[msg.sender];
        }
        hasVotedToProposal[msg.sender][_proposalId]=true;
        emit InfoMessage("Your vote has been casted successfully!");
    }

    ////////////////////////////////////////////////////////////////////////////////////////

}
