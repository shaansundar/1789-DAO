import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { WalletService } from './shared/services/wallet.service';
import { HomeComponent } from './pages/home/home.component';
import { NewProposalComponent } from './pages/new-proposal/new-proposal.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { DonateComponent } from './pages/donate/donate.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NewProposalComponent,
    FooterComponent,
    NavbarComponent,
    DonateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [WalletService],
  bootstrap: [AppComponent]
})
export class AppModule { }
