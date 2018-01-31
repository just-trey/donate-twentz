import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';
import { Ng2Webstorage } from 'ng2-webstorage';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreFrontComponent } from './store-front/store-front.component';
import { RegistrationComponent } from './registration/registration.component';
import { UuidService } from './shared/uuid.service';
import { SquareCheckoutService } from './shared/square.checkout.service';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { DonationsComponent } from './donations/donations.component';
import { RafflesComponent } from './raffles/raffles.component';

@NgModule({
  declarations: [
    AppComponent,
    StoreFrontComponent,
    RegistrationComponent,
    ConfirmationComponent,
    DonationsComponent,
    RafflesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    CurrencyMaskModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    Ng2Webstorage
  ],
  providers: [UuidService, SquareCheckoutService],
  bootstrap: [AppComponent]
})
export class AppModule {}
