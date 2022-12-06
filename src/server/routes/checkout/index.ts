import * as express from "express";
import { square } from "../../config";
import { Client, Environment, CreatePaymentRequest } from "square";
import { TokenResult } from "@square/web-payments-sdk-types";
//import Stripe from "stripe";
import ItemQueries from "../../database/queries/ItemQueries";
import { Cart } from "../../types";
import { randomUUID } from "crypto";

const TAX_RATE = 0.065;

const checkoutRouter = express.Router();
//current path is /checkout

const squareClient = new Client({ accessToken: square.SQUARE_ACCESS_TOKEN, environment: Environment.Sandbox });

checkoutRouter.post("/", async (req, res) => {
  const cart: Cart = req.body.cart;
  const sourceId: TokenResult = req.body.sourceId;

  if (!cart || !cart.length) {
    return res.status(400).json({ msg: "You need to put the food in the cart" });
  }
  //at this point cart exists and has data in it
  let sum = 0;

  try {
    for await (const item of cart) {
      const [ItemPrice] = await ItemQueries.getTotal(item.id, item.quantity);
      if (ItemPrice) sum += ItemPrice.total;
    }

    //this calculates the price of the items in the cart with sales tax
    const cartPriceWithTax = sum * (1 + TAX_RATE);

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description
    // https://github.com/GoogleChromeLabs/jsbi/issues/30#issuecomment-953187833

    interface BigInt extends BigIntConstructor {
      toJSON: () => string;
    }

    // @ts-ignore
    (BigInt as BigInt).prototype["toJSON"] = function () {
      return this.toString();
    };

    const body: CreatePaymentRequest = { sourceId: sourceId.token!, idempotencyKey: randomUUID(), amountMoney: { amount: BigInt(Math.floor(cartPriceWithTax * 100)), currency: "USD" } };
    //this makes the payment request
    const { result } = await squareClient.paymentsApi.createPayment(body);

    res.json(result);
    //at this point we know how much money the items in the cart cost
  } catch (error) {
    res.status(500).json({ msg: "Error when adding price of cart items" });
    console.log(error);
  }
});

export default checkoutRouter;
