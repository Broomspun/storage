import React from "react";
import accounting from "accounting-js";

import Destinations from "./Destinations";
import Service from "./Service";
import StoragePerMonth from "./StoragePerMonth";
import DueOnDelivery from "./DueOnDelivery";
import FutureTransport from "./FutureTransport";


// import RoutesBing from "./RoutesBing";
// import TollsGuru from "./TollsGuru";

class YourInstantQuote extends React.Component {
  constructor(props) {
    super(props);

    this.quote = React.createRef();
    this.formatText = this.formatText.bind(this);
    this.formatContainerPrice = this.formatContainerPrice.bind(this);

    console.log('YourInstantQuote props',props)
  }

  formatText(text) {
    let formatted;

    switch (text) {
      case "both":
        formatted = "Moving and Storage";
        break;
      case "moving":
        formatted = "Moving";
        break;
      case "storage":
        formatted = "Storage";
        break;
      default:
        formatted = "";
        break;
    }
    return formatted;
  }

  formatContainerPrice() {
    const {
      c16Price,
      c20Price,
      selectedSize,
      selectedLocation,
      warehouseStorage
    } = this.props;
    let containerPriceTotal = {
      rental: 0,
      storage: 0,
      total: 0
    };

    if (selectedSize === "c16") {
      containerPriceTotal.rental += c16Price;
    } else {
      containerPriceTotal.rental += c20Price;
    }

    if (selectedLocation === "warehouse") {
      containerPriceTotal.storage += warehouseStorage;
    }

    containerPriceTotal.total =
      containerPriceTotal.rental + containerPriceTotal.storage;

    return containerPriceTotal;
  }

  componentDidMount() {
    const { getQuoteHTML, email, phone } = this.props;

    let scrollElHeight = document
      .getElementById("scroll")
      .getBoundingClientRect().height;

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    const quote = document.getElementById("quoteInfo").innerHTML;
    // console.log(quote);

    getQuoteHTML(quote);

    // const url = "https://www.icanstorage.com/thank-you/";
    const pre =
      '<!DOCTYPE html><html><head><style type="text/css">.ng-hide{display:none;}</style></head><body><div style="max-width:800px">';
    const post = "</div></body></html>";
    let title = "<h3>We are happy to serve you.  Your quote is below.</h3><br>";

    title += "<h5>Email: " + email + ", Phone: " + phone + "</h5><br>";

    const footer = "<br>";

    let template = pre + title + quote + footer + post;

    template = template.replace(/\/\"/g, '"');

    // const body = {
    //     email: email || '',
    //     phone: phone,
    //     subject: "Here\'s your quote from iCan Storage",
    //     //subject2: "I\'m ready to reserve - call client now to book",
    //     body: template
    //   };

    // console.log(template);

    // axios
    //   .post(url, {
    //     email: email,
    //     phone: phone,
    //     subject: "Here's your quote from iCan Storage",
    //     body: template,
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     },
    //     dev: true
    //   })
    //   .then(response => {
    //     console.log(response);
    //   });
  }
    makeDate = (date) => {
        return (date.getMonth() + 1) +
            "/" +  date.getDate() +
            "/" +  date.getFullYear();
    };

    getToday = ()=> {
      let today = new Date();

      return this.makeDate(today);

    };

  render() {
    const {
      afterLiveUnload,
      liveUnloadSavings,
      dueOnDelivery,
      deliverTo,
      deliveryPrice,
      futureTransportCost,
      movePrice,
      returnFrom,
      returnPrice,
      selectedService,
      selectedLocation,
      // selectedSize,
      suggestLiveUnload,
      isLongDistance,
      isMandatoryLiveUnload,
      quoteRequsted,
      handleDateChange,
      handleNewQuote,
      bing,
      tollguru,
      tollPrice,
      tollRouteNo,
      miles_choice,
    } = this.props;

    const destinationProps = {
      deliverTo,
      returnFrom,
      selectedService
    };

    const serviceProps = {
      selectedService,
      selectedLocation,
      deliverTo,
      returnFrom,
      deliveryPrice
    };

    const storagePerMonthProps = {
      rental: accounting.formatMoney(this.formatContainerPrice().rental),
      storage: accounting.formatMoney(this.formatContainerPrice().storage),
      total: accounting.formatMoney(this.formatContainerPrice().total),
      selectedLocation
    };

    const dueOnDeliveryProps = {
      deliveryPrice: accounting.formatMoney(deliveryPrice),
      rental: accounting.formatMoney(this.formatContainerPrice().rental),
      storage: accounting.formatMoney(this.formatContainerPrice().storage),
      dueOnDelivery,
      damageWaiver:
        dueOnDelivery.addOns && dueOnDelivery.addOns.damageWaiver
          ? accounting.formatMoney(dueOnDelivery.addOns.damageWaiver)
          : null,
      contentsProtection:
        dueOnDelivery.addOns && dueOnDelivery.addOns.contentsProtection
          ? accounting.formatMoney(dueOnDelivery.addOns.contentsProtection)
          : null,
      movingKit:
        dueOnDelivery.addOns && dueOnDelivery.addOns.movingKit
          ? accounting.formatMoney(dueOnDelivery.addOns.movingKit)
          : null,
      due: accounting.formatMoney(dueOnDelivery.due)
    };

    const futureTransportProps = {
      selectedService,
      selectedLocation,
      movePrice: accounting.formatMoney(movePrice),
      returnPrice: accounting.formatMoney(returnPrice),
      suggestLiveUnload,
      isMandatoryLiveUnload,
      liveUnloadSavings,
      afterLiveUnload: accounting.formatMoney(afterLiveUnload),
      futureTransportCost: accounting.formatMoney(futureTransportCost),
      tollPrice: tollPrice,
      miles_choice: miles_choice
    };

    return (
      <div className="col-md-6" id="scroll" ref={this.quote}>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Your Instant Quote</h3>
          </div>
          <div className="panel-body">
            {quoteRequsted && (
              <div className="beforeSend">Please enter your details.</div>
            )}

            {isLongDistance &&  (
              <div className="doNotService">
                Sorry, we do not currently service that area.
              </div>
            // ) : (
            //   <div className="quoteSent">
            //       Thank you. Your booking request has been sent!
            //     <br />
            //       We will contact you soon.
            //     <br />
            //   </div>
            )}

            {/*<button*/}
              {/*className="btn btn-success newQuote"*/}
              {/*onClick={handleNewQuote}*/}
            {/*>*/}
              {/*New Quote*/}
            {/*</button>*/}

            {!isLongDistance && (
              <div className="quote-box">
                <div id="quote">
                  <section id="quoteInfo">
                    <Destinations {...destinationProps} />
                    <hr />
                    <Service {...serviceProps} />
                    <hr />
                    <StoragePerMonth {...storagePerMonthProps} />
                    <hr />
                    <DueOnDelivery {...dueOnDeliveryProps} />
                    <hr />
                    {/*{this.props.miles_choice!==0 && bing  && (*/}
                          {/*<RoutesBing bing = {bing}/>*/}
                    {/*)}*/}

                    {/*{this.props.miles_choice!==0  && tollguru && (*/}
                          {/*<TollsGuru tollguru = {tollguru} tollRouteNo={tollRouteNo}/>*/}
                    {/*)}*/}
                    <FutureTransport {...futureTransportProps} />
                  </section>
                  <hr />
                  <div className="line">
                    <span>
                      <strong>Pick Date:</strong>
                    </span>
                  </div>
                  <div className="line">
                    <input
                      type="date"
                      id="desiredDate"
                      className="form-control"
                      onChange={handleDateChange}
                      defaultValue={this.getToday()}
                    />
                  </div>
                  <div className="line">
                    *Date is not guaranteed. We will call to confirm.
                  </div>
                  {/* <div className='line payPalBtn'>
                                        <PayPalButton />
                                    </div>
                                    <div className='line'>
                                        -OR-
                                    </div> */}
                  <div className="line">
                    <button className="btn btn-success">
                      I'm ready to reserve - please call me
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default YourInstantQuote;
