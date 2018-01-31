import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { UuidService } from '../shared/uuid.service';
import { SquareCheckoutService } from '../shared/square.checkout.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-raffles',
  templateUrl: './raffles.component.html',
  styleUrls: ['./raffles.component.scss']
})
export class RafflesComponent implements OnInit {
  ticketPackage: string;
  ticketAmount: number;
  postalCode: number;
  orderKey: string;
  refId: any;
  orderItems: any = [];

  // for disabling buttons to prevent multiple submits
  isProcessing = false;
  oops = false;
  // to pass into form submit
  payOnline = false;

  constructor(private uuidService: UuidService,
    private checkout: SquareCheckoutService, private router: Router) {
  }

  ngOnInit() {
    this.orderKey = this.uuidService.getId();
    this.refId = this.uuidService.getId();
  }

  determinePackage() {
    switch (this.ticketAmount) {
      case 500: {
        this.ticketPackage = 'Single Ticket Package';
        break;
      }
      case 1000: {
        this.ticketPackage = '3 Ticket Package';
        break;
      }
      case 2000: {
        this.ticketPackage = '8 Ticket Package';
        break;
      } case 2500: {
        this.ticketPackage = '10 Ticket Package';
        break;
      } case 5000: {
        this.ticketPackage = '25 Ticket Package';
        break;
      } case 10000: {
        this.ticketPackage = '60 Ticket Package';
        break;
      }
    }
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
        'name': this.ticketPackage,
        'quantity': '1',
        'base_price_money': {
          'amount': this.ticketAmount,
          'currency': 'USD'
        }
      }
    ];
    console.log(this.orderItems);


    this.checkout.postPayment(this.orderKey, this.refId, '', this.orderItems).subscribe(
      res => {
        // redirect user to square checkout
        window.location.href = res.checkout.checkout_page_url + '&type=donation';
      },
      error => {
        // Log errors if any so I can test if i get an email
        console.log(error);
        this.oops = true;
        this.isProcessing = false;
      });


  }
}
