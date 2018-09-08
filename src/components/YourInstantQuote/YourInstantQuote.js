import React from "react";
import accounting from "accounting-js";
import axios from "axios";
import {connect} from 'react-redux';

import Destinations from "./Destinations";
import Service from "./Service";
import StoragePerMonth from "./StoragePerMonth";
import DueOnDelivery from "./DueOnDelivery";
import FutureTransport from "./FutureTransport";

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import WarehousePerMonths from "./WarehousePerMonths";

// import RoutesBing from "./RoutesBing";
// import TollsGuru from "./TollsGuru";

class YourInstantQuote extends React.Component {
    constructor(props) {
        super(props);

        this.quote = React.createRef();
        this.formatText = this.formatText.bind(this);
        this.formatContainerPrice = this.formatContainerPrice.bind(this);

        this.state = {
            startDate: moment(),
            bSentEmail: false
        };
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
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

        window.scrollTo({
            top: 100,
            behavior: "smooth"
        });

        this.sendEmail();
    }

    sendEmail(){
        const { getQuoteHTML, email, phone } = this.props;

        const quote = document.getElementById("quoteInfo").innerHTML;

        console.log(this.state.startDate.format("MM/DD/YYYY"));

        getQuoteHTML(quote);

        let pick_date_sec = `<div class="line"><span><strong>Pick Date:</strong></span><span style="float: right; text-align: right;"><strong>Serviced From:</strong></span></div>`;
        pick_date_sec += `<div class="line"><span>${this.state.startDate.format("MM/DD/YYYY")}</span><span style="float: right; text-align: right;">${this.props.warehouse_names[this.props.setOrigin_index]}</span></div>`;

        // const url = "https://www.icanstorage.com/thank-you/";
        const pre =
            '<!DOCTYPE html><html><head><style>div.line{margin: 5px auto} .r-align{text-align: right}</style></head><body><div style="max-width:600px">';
        const post = "<hr/>"+pick_date_sec+"</div></body></html>";


        let title = "<h3>We are happy to serve you.  Your quote is below.</h3><br>";

        let emails;

        title += "<h5>Email: " + email + ", Phone: " + phone + "</h5><br>";

        const footer = "<br>";

        let template = pre + title + quote + footer + post;

        template = template.replace(/\/\"/g, '"');
        console.log(template);

        axios.post('https://mailgun.angelsolution.net/wp-json/ican_rest_server/v1/request_emails',
            `email=${email}&phone=${phone}&content=${template}`
        )
            .then(res=>{
                if(res.data.result) {
                    console.log(res);
                }
            })

    }

    forwardsEmails(){
        const { getQuoteHTML, phone, email, email_lists } = this.props;

        const quote = document.getElementById("quoteInfo").innerHTML;

        let pick_date_sec = `<div class="line"><span><strong>Pick Date:</strong></span><span style="float: right; text-align: right;"><strong>Serviced From:</strong></span></div>`;
        pick_date_sec += `<div class="line"><span>${this.state.startDate.format("MM/DD/YYYY")}</span><span style="float: right; text-align: right;">${this.props.warehouse_names[this.props.setOrigin_index]}</span></div>`;

        getQuoteHTML(quote);

        // const url = "https://www.icanstorage.com/thank-you/";
        const pre =
            '<!DOCTYPE html><html><head><style>div.line{margin: 5px auto} .r-align{text-align: right}</style></head><body><div style="max-width:600px">';
        const post = "</div></body></html>";

        let emails = email_lists.split(',');

        emails.map(email1 => {
            let title = "<h3>We are happy to serve you.  Your quote is below.</h3><br>";
            title += "<h5>Email: " + email + ", Phone: " + phone + "</h5><br>";

            const footer = "<br>";

            let template = pre + title + quote + footer + post;

            template = template.replace(/\/\"/g, '"');
            console.log(template);

            axios.post('https://mailgun.angelsolution.net/wp-json/ican_rest_server/v1/request_emails',
                `email=${email1}&phone=${phone}&content=${template}&forward=1`
            )
                .then(res=>{
                    if(res.data.result) {
                        console.log(res);
                    }
                })
        });

        this.setState({bSentEmail: true});
    }

    resetMailStatus = ()=>{
        this.setState({bSentEmail: false});
        this.props.handleNewQuote();
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
            movePrice: accounting.formatMoney(movePrice),
            returnPrice: accounting.formatMoney(returnPrice),
            suggestLiveUnload,
            isMandatoryLiveUnload,
            liveUnloadSavings,
            afterLiveUnload: accounting.formatMoney(afterLiveUnload),
            futureTransportCost: accounting.formatMoney(futureTransportCost),
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
                        )}

                        {this.state.bSentEmail && (
                            <React.Fragment>

                                <div className="quoteSent">
                                    Thank you. Your reservation request has been sent!
                                    <br />
                                    We will contact you soon.
                                    <br />
                                </div>

                                <button
                                    className="btn btn-success newQuote"
                                    onClick={()=>this.resetMailStatus()}
                                >
                                    New Quote
                                </button>
                            </React.Fragment>
                        )}

                        {!isLongDistance && !this.state.bSentEmail && (
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

                                        {selectedService==='storage' && selectedLocation==='warehouse' && (
                                            <WarehousePerMonths />
                                        )}

                                        {selectedService==='both' && selectedLocation==='warehouse' && (
                                            <WarehousePerMonths />
                                        )}
                                        <FutureTransport {...futureTransportProps} />
                                    </section>
                                    <hr />
                                    <div className="line">
                                        <span>
                                          <strong>Pick Date:</strong>
                                        </span>
                                        <span><strong>Serviced From:</strong></span>
                                    </div>
                                    <div className="line date-time-picker" id="mail_footer">
                                        <DatePicker className="form-control"
                                                    selected={this.state.startDate}
                                                    onChange={this.handleChange}
                                                    dateFormat="MM/DD/YYYY"
                                        />
                                        <div >{this.props.warehouse_names[this.props.setOrigin_index]}</div>
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
                                        <button className="btn btn-success" onClick={()=>this.forwardsEmails()}>
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
const mapStateToProps = (state) => {
    const {
        email_lists,
        c16Price,
        c20Price,
        warehouse_names,
        setOrigin_index
    } = state.mainReducer;
    return {
        email_lists,
        c16Price,
        c20Price,
        warehouse_names,
        setOrigin_index
    };
};
export default connect(mapStateToProps, {})(YourInstantQuote);

