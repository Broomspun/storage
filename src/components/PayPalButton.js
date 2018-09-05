import React from "react";

class PayPalButton extends React.Component {
  render() {
    return (
      <form
        className="paypal"
        name="_xclick"
        action="https://www.paypal.com/us/cgi-bin/webscr"
        method="post"
        target="_blank"
      >
        <input type="hidden" name="cmd" value="_xclick" />
        <input type="hidden" name="business" value="david@icanstorage.com" />
        <input type="hidden" name="currency_code" value="USD" />
        <input type="hidden" name="item_name" value="Booking Deposit" />
        <input type="hidden" name="amount" value="25" />
        <input type="hidden" name="no_shipping" value="1" />
        <input
          type="hidden"
          name="return"
          value="https://www.icanstorage.com/thank-you/"
        />
        <button type="submit" name="submit" className="btn btn-success">
          Reserve container with $25 PayPal deposit
        </button>
      </form>
    );
  }
}

export default PayPalButton;
