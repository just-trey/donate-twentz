import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { LocalStorageService } from 'ng2-webstorage';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { UuidService } from '../shared/uuid.service';
import { SquareCheckoutService } from '../shared/square.checkout.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {
  postalCode: number;
  comments: string;
  golferFirstName: any = [];
  golferLastName: any = [];
  golferEmail: any = [];
  golferPaid: any = [];
  totalDue: number;
  orderKey: string;
  refId: any;
  orderItems: any = [];

  // How many golfers can register. This is an array becase ngFor expects an array
  golferBox = [1, 2, 3, 4];
  golferNumber = 1;
  // cost of registration
  golferFee = 75;

  // for disabling buttons to preven multiple submits
  isProcessing = false;
  oops = false;

  // to pass into form submit
  payOnline = false;

  constructor(private uuidService: UuidService, private storage: LocalStorageService,
    private checkout: SquareCheckoutService, private router: Router) {
  }

  ngOnInit() {
    this.calculateAmounts();
    this.orderKey = this.uuidService.getId();
    this.refId = this.uuidService.getId();
  }

  // submit the registration form
  submitForm() {
    this.isProcessing = true;
    this.storeRegistration();
    if (this.payOnline) {
      this.oops = false;
      this.postCheckout();
    } else {
      this.router.navigate(['../confirmation', this.totalDue, 'registration']);
    }
    return false;
  }

  numGolfers(val) {
    return (parseInt(val, 10));
  }

  calculateAmounts() {
    this.totalDue = this.golferNumber * this.golferFee;
  }

  storeRegistration() {
    // TODO: make this a service or something
    this.storage.store('registrationInfo',
      {
        'comments': this.comments || null,
        'paid': this.payOnline,
        'group':
        [
          {
            'firstName': this.golferFirstName[0],
            'lastName': this.golferLastName[0] || null,
            'email': this.golferEmail[0] || null
          },
          {
            'firstName': this.golferFirstName[1] || null,
            'lastName': this.golferLastName[1] || null,
            'email': this.golferEmail[1] || null
          },
          {
            'firstName': this.golferFirstName[2] || null,
            'lastName': this.golferLastName[2] || null,
            'email': this.golferEmail[2] || null
          },
          {
            'firstName': this.golferFirstName[3] || null,
            'lastName': this.golferLastName[3] || null,
            'email': this.golferEmail[3] || null
          }
        ]
      }
    );
  }

  postCheckout() {
    // build square item list
    this.orderItems = [
      {
        'name': 'Golf Tournament Registrations',
        'quantity': this.golferNumber.toString(),
        'base_price_money': {
          'amount': this.golferFee * 100,
          'currency': 'USD'
        }
      }
    ];

    this.checkout.postPayment(this.orderKey, this.refId, this.golferEmail[0], this.orderItems).subscribe(
      res => {
        // redirect user to square checkout
        window.location.href = res.checkout.checkout_page_url;
      },
      error => {
        // Log errors if any so I can test if i get an email
        console.log(error);
        this.oops = true;
        this.isProcessing = false;
      });

  }

}
