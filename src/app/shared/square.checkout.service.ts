import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../environments/environment';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SquareCheckoutService {
  sqBody: any;

  constructor(private http: Http) {}

  private checkoutUrl = environment.postPassUrl;

  postPayment(key, refId, customerEmail, orderItems): Observable<any> {
    const sqHeaders = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });

    this.sqBody = {
      idempotency_key: key,
      ask_for_shipping_address: false,
      merchant_support_email: 'admin@twentz.com',
      order: {
        reference_id: refId,
        line_items: orderItems
      }
    };

    if (customerEmail !== '') {
      // this.sqBody.redirect_url = environment.squareRedirectUrl;
      this.sqBody.pre_populate_buyer_email = customerEmail;
    }

    return this.http
      .post(this.checkoutUrl, this.sqBody, { headers: sqHeaders })
      .map((res: Response) => res.json())
      .catch((error: any) =>
        Observable.throw(error.json().error || 'Server error')
      );
  }
}
