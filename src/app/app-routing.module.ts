import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonateComponent } from './pages/donate/donate.component';
import { HomeComponent } from './pages/home/home.component';
import { NewProposalComponent } from './pages/new-proposal/new-proposal.component';

const routes: Routes = [
  {path:'new', component: NewProposalComponent},
  {path:'donate', component: DonateComponent},
  {path:'', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
