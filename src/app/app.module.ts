import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { LoginComponent } from './components/login/login.component';
import { VaultComponent } from './components/vault/vault.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';

@NgModule({
  declarations: [
    AppComponent,
    OnboardingComponent,
    LoginComponent,
    VaultComponent,
    TooltipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }