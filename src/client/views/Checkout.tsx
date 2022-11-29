import * as React from "react";
import * as SquareWrapper from "react-square-web-payments-sdk";
import LocalStorageHandler from "../services/LocalStorageHandler";

import { TokenResult } from "@square/web-payments-sdk-types";
import { ApiResponse, CreatePaymentResponse } from "square";
import { v4 } from "uuid";

//! show items in cart as well as their names

const Checkout = () => {
  const handleProcessPayment = async (token: TokenResult) => {
    if (token.errors?.length || !token.token) {
      console.error(token);
      alert("Incorrect token, cannot process transaction.");
      return;
    }
    try {
      console.log({ cart: LocalStorageHandler.getCartFromStorage(), sourceId: token });
      const res = await fetch("/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: LocalStorageHandler.getCartFromStorage(), sourceId: token }),
      });

      const data: ApiResponse<CreatePaymentResponse> = await res.json();
      if (!res.ok) {
        alert((data as unknown as { msg: string }).msg);
        return;
      }
      //at this point the payment has gone through successfully
      LocalStorageHandler.obliterateCart();
      //clears the cart after successful transaction
      console.log(data);
    } catch (error) {
      console.error(error);
      alert("Cannot process transaction.");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-9">
          <SquareWrapper.PaymentForm applicationId={"sandbox-sq0idb-l0Q9vqlZ-P9TToqoYvkxgw"} cardTokenizeResponseReceived={handleProcessPayment} locationId={"LQRC4E58P6XWA"}>
            <h1 className="text-primary">Checkout</h1>

            <div>
              {LocalStorageHandler.getCartFromStorage().map((item) => (
                <div className="container" key={v4()}>
                  <div>
                    <div className="row justify-content-center col-6">
                      <span className="mx-2">
                        {item.name}: {item.quantity}
                      </span>
                    </div>

                    <div className="row justify-content-left col-6">
                      <span className="mx-2">${item.quantity * item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <h3>Total: {LocalStorageHandler.getPriceFromCart()}</h3>
            <SquareWrapper.CreditCard />
          </SquareWrapper.PaymentForm>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
