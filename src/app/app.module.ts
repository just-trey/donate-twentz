import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { UuidService } from './shared/uuid.service';
import { SquareCheckoutService } from './shared/square.checkout.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, CurrencyMaskModule, HttpModule],
  providers: [UuidService, SquareCheckoutService],
  bootstrap: [AppComponent]
})
export class AppModule {}
