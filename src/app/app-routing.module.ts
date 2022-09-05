import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { LoginComponent } from './components/login/login.component';
import { VaultComponent } from './components/vault/vault.component';

const routes: Routes = [
  {path:'',component:OnboardingComponent},
  {path:'login', component:LoginComponent},
  {path: 'vault/:id', component: VaultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
