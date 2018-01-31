export class SqBody {
  idempotency_key: string;
  ask_for_shipping_address: boolean;
  merchant_support_email: string;
  order: OrderObject;
  redirect_url: string;
  pre_populate_buyer_email: string;
}

class OrderObject {
  reference_id: string;
  line_items: OrderItems;
}

class OrderItems {
  name: string;
  quantity: string;
  base_price_money: Price;
}

class Price {
  amount: number;
  currency: string;
}
