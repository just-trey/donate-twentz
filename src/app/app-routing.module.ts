import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreFrontComponent } from './store-front/store-front.component';
import { RegistrationComponent } from './registration/registration.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { RafflesComponent } from './raffles/raffles.component';
import { DonationsComponent } from './donations/donations.component';

const routes: Routes = [
  {
    path: '',
    component: StoreFrontComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'donations',
    component: DonationsComponent
  },
  {
    path: 'raffles',
    component: RafflesComponent
  },
  {
    path: 'confirmation',
    component: ConfirmationComponent
  },
  {
    path: 'confirmation/:total/:type',
    component: ConfirmationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

