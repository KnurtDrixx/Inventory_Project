import * as React from "react";
import * as SquareWrapper from "react-square-web-payments-sdk";
import LocalStorageHandler from "../services/LocalStorageHandler";

import { TokenResult } from "@square/web-payments-sdk-types";
import { ApiResponse, CreatePaymentResponse } from "square";
import { v4 } from "uuid";
import sweetalert2 from "sweetalert2";
import { useNavigate } from "react-router-dom";

//! show items in cart as well as their names

const Checkout = () => {
  const TAX_RATE = 0.065;
  const PRICE = LocalStorageHandler.getPriceFromCart();
  const nav = useNavigate();
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
      sweetalert2.fire("Payment sucessful! Thank you for your purchase").then(() => nav("/admin/items"));
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
              <div className="container" key={v4()}>
                <div className="row justify-content-center ">
                  <div className="col-6">
                    {LocalStorageHandler.getCartFromStorage().map((item) => (
                      <div className="row">
                        <span className=" col-6">
                          {item.name}: {item.quantity}
                        </span>
                        <span className="text-end col-6">${item.quantity * item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="row col-6 text-end">
                    <h4 className=" col-6">Subtotal: $</h4>
                    <h4 className="col-6 text-end">{PRICE}</h4>
                    <h4 className="col-6">Tax: $</h4>
                    <h4 className="col-6 text-end">{(PRICE * TAX_RATE).toFixed(2)}</h4>
                    <h3 className="col-6">Total: $</h3>
                    <h3 className="col-6 text-end">{(PRICE * (TAX_RATE + 1)).toFixed(2)}</h3>
                  </div>
                </div>
              </div>
            </div>

            <SquareWrapper.CreditCard />
          </SquareWrapper.PaymentForm>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
