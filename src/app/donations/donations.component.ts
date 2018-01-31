import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { UuidService } from '../shared/uuid.service';
import { SquareCheckoutService } from '../shared/square.checkout.service';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss']
})
export class DonationsComponent implements OnInit {
  donationAmount: string;
  postalCode: number;
  orderKey: string;
  refId: any;
  orderItems: any = [];

  // for disabling buttons to prevent multiple submits
  isProcessing = false;
  oops = false;
  // to pass into form submit
  payOnline = false;

  constructor(
    private uuidService: UuidService,
    private checkout: SquareCheckoutService,
    private router: Router
  ) {}

  ngOnInit() {
    this.orderKey = this.uuidService.getId();
    this.refId = this.uuidService.getId();
  }

  // submit the registration form
  submitForm() {
    this.isProcessing = true;
    this.oops = false;
    this.postCheckout();
    return false;
  }

  postCheckout() {
    // build square item list
    this.orderItems = [
      {
        name: 'Generous Donation',
        quantity: '1',
        base_price_money: {
          // tslint:disable-next-line:radix
          amount: parseInt(this.donationAmount) * 100,
          currency: 'USD'
        }
      }
    ];

    this.checkout
      .postPayment(this.orderKey, this.refId, '', this.orderItems)
      .subscribe(
        res => {
          // redirect user to square checkout
          window.location.href =
            res.checkout.checkout_page_url + '&type=donation';
        },
        error => {
          // Log errors if any so I can test if i get an email
          console.log(error);
          this.oops = true;
          this.isProcessing = false;
        }
      );
  }
}
