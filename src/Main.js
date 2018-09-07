import React, {Component} from "react";
// import {connect} from 'react-redux';
import {css} from 'react-emotion';
import {ClipLoader} from 'react-spinners';
import moment from 'moment';

import classnames from "classnames";
import ContainerSize from "./components/ContainerSize";
import LocationOptions from "./components/LocationOptions";
import ServiceOptions from "./components/ServiceOptions";
import MovingInputs from "./components/MovingInputs";
import AddOptionalItems from "./components/AddOptionalItems";
import ContactInputs from "./components/ContactInputs";
import YourInstantQuote from "./components/YourInstantQuote/YourInstantQuote";
import {update_price_info, handleLocationSelection, handleSizeSelection, initializeWarehouseRates, initializeWarehouses} from "./Actions";

import "./App.css";
import axios from 'axios';

import connect from "react-redux/es/connect/connect";


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
//// DONE: when moving/both is selected, disable clicking on 20s
//// DONE: when storage and 20 selected, disable 'your warehouse'
//// API URL/KEY: https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyBEEfplFwlrvCgXs8I9XAjaSzEthmAjgCA&ver=bd1a84a2a77e505cfd2088ec2efff629

//// Window variables
const instance = axios.create({
    headers: {'Content-Type': 'application/json','x-api-key': '3zerZjhxOV8DDIlnDZ2A73YV0BxIf5Mo6xNxvyov'},
});

const constants = {
    c16: window.c16,
    c20: window.c20,
    availableFrom: window.availableFrom,
    availableText: window.availableText,
    c16Price: window.c16Price,
    c20Price: window.c20Price,
    warehouseStorage: window.warehouseStorage,
    milePrice: window.milePrice,
    flatDeliveryPrice: window.flatDeliveryPrice,
    flatDeliveryMiles: window.flatDeliveryMiles,
    longDistanceMin: window.longDistanceMin,
    longDistanceMilePrice: window.longDistanceMilePrice,
    mandatoryLiveUnloadMiles: window.mandatoryLiveUnloadMiles,
    warehouseLocation1: "10920",
    waitPrice: window.waitPrice,
    minLiveUnloadSave: window.minLiveUnloadSave,
    damageWaiverPrice: 9.95,
    contentsProtectionPrice: 20
};

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            availableFrom: constants.availableFrom,
            availableText: constants.availableText,
            c16: constants.c16,
            c16Price: constants.c16Price,
            c20: constants.c20,
            c20Price: constants.c20Price,
            damageWaiverPrice: constants.damageWaiverPrice,
            contentsProtectionPrice: constants.contentsProtectionPrice,
            movingKitPrice: 49.95,
            selectedService: "moving",
            selectedSize: "c16",
            selectedLocation: "mine",
            damageWaiverSelected: false,
            contentsProtectionSelected: false,
            movingKitSelected: false,
            email: {
                value: "",
                isValid: false
            },
            phone: {
                value: "",
                isValid: false
            },
            location1: {
                name: "deliverTo",
                formattedAddress: null,
                distance: null
            },
            location2: {
                name: "returnFrom",
                formattedAddress: null,
                distance: null
            },
            displayAddressPrompt: false,
            dueOnDelivery: {},
            deliveryPrice: 0,
            movePrice: 0,
            returnPrice: 0,
            isLongDistance: false,
            suggestLiveUnload: false,
            isMandatoryLiveUnload: false,
            liveUnloadSavings: 0,
            afterLiveUnload: 0,
            quoteRequested: false,
            desiredDate: moment(),
            quoteHTML: "",
            bing: null,
            tollguru: null,
            tollPrice: 0,
            tollRouteNo: 0,
            miles_choice: 0,
            bCalculated: null,
            loading: false,
            warehouse: null
        };


        axios.get('https://kleinboysllc.com/wp-json/ican_rest_server/v1/settings')
            .then((res)=>{
                this.setState({miles_choice: parseInt(res.data.miles_choice)});
                this.setState({warehouse: res.data.warehouse_choice});
                this.props.initializeWarehouseRates(res.data.conger_indoor_rate,res.data.conger_outdoor_rate,res.data.brookfield_indoor_rate,res.data.brookfield_outdoor_rate);
                this.props.initializeWarehouses(res.data.warehouse1,res.data.warehouse2);
            });

        this.handleServiceSelection = this.handleServiceSelection.bind(this);
        this.handleLocationSelection = this.handleLocationSelection.bind(this);
        this.handleLocationInputUpdates = this.handleLocationInputUpdates.bind(
            this
        );
        this.handleInputChange = this.handleInputChange.bind(this);

        this.calculateDueOnDelivery = this.calculateDueOnDelivery.bind(this);
        this.calculateQuote = this.calculateQuote.bind(this);
        this.checkDistance = this.checkDistance.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleAndValidateEmailAndPhone = this.handleAndValidateEmailAndPhone.bind(
            this
        );
        this.handleAndValidateEmail = this.handleAndValidateEmail.bind(
            this
        );

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleNewQuote = this.handleNewQuote.bind(this);
        this.getQuoteHTML = this.getQuoteHTML.bind(this);

        this.stateHelper = this.stateHelper.bind(this);
    }

    stateHelper(key, value) {
        this.setState(() => {
            return {
                [key]: value
            };
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState(
            {
                damageWaiverSelected: nextProps.damageWaiverSelected,
                contentsProtectionSelected: nextProps.contentsProtectionSelected,
                selectedSize: nextProps.selectedSize,
                selectedLocation: nextProps.selectedLocation
            });
    }

    componentDidUpdate(){
        // console.log(this.props);
    }

    calculateTruckmilesFromBing = async (from, to) => {
        let body =  JSON.stringify({
            "waypoints": [{
                "address": from
            },{
                "address": to
            }],
            "vehicleSpec": {
                "dimensionUnit": "foot",
                "weightUnit": "pound",
                "vehicleHeight": 13,
                "vehicleWidth": 8,
                "vehicleLength": 30,
                "vehicleWeight": 14000,
                "vehicleAxles": 2
            },
            "avoid": "minimizeTolls"
        });


        let res = await axios.post('https://dev.virtualearth.net/REST/v1/Routes/Truck?key=AhOgmXmCL-SWhvYQ9ahdQiqH3QDzi4_TlkojUFmLa0VTxSgmkkUxgaxY3XiDzZGn', body);
        try {
            console.log('Bing api', res);
            if(res.data.statusCode===200) {
                return await res.data.resourceSets[0].resources[0].routeLegs[0];
            } else {
                return  null;
            }
        } catch (error) {
            return await null;
        }
    };

    calculateTollsFromTollguru = async (from, to) => {
        return null;
        let body = JSON.stringify({
            "from": {
                "address": from
            },
            "to": {
                "address": to
            },
            "waypoints": [
            ],
            "vehicleType": "2AxlesTruck",
            "fuelPrice": "3.00",
            "fuelPriceCurrency": "USD",
            "fuelEfficiency": {
                "city": 17.2,
                "hwy": 22.1,
                "units": "mpg"
            }
        });


        await instance.post('https://dev.tollguru.com/beta00/calc/gmaps', body)
            .then((res)=>console.log(res))
            .catch(error =>{
                if(error.response) {
                    console.log(error.response);
                    // return Promise.reject(error.response.data);

                }
            })
        ;
        // console.log('toll api', res);
        // let res = await instance.post('https://dev.tollguru.com/beta00/calc/gmaps', body);
        // try {
        //     if(res.status===200) {
        //         console.log('toll api', res);
        //         return await res.data.routes;
        //     } else {
        //         return  null;
        //     }
        // } catch (error) {
        //     console.log(error.response);
        // }
    };

    calculateDueOnDelivery() {
        const {
            c16Price,
            c20Price,
            contentsProtectionSelected,
            contentsProtectionPrice,
            damageWaiverSelected,
            damageWaiverPrice,
            movingKitSelected,
            movingKitPrice,
            deliveryPrice,
            selectedSize
        } = this.state;


        let dueOnDelivery = {
            due: 0,
            containerPrice: 0,
            addOns: {
                damageWaiver: 0,
                movingKit: 0,
                contentsProtection: 0
            }
        };

        // determine selectedSize
        if (selectedSize === "c16") {
            dueOnDelivery.containerPrice = c16Price;
        } else if (selectedSize === "c20") {
            dueOnDelivery.containerPrice = c20Price;
        }

        if (contentsProtectionSelected) {
            dueOnDelivery.addOns.contentsProtection += contentsProtectionPrice;
        }
        if (damageWaiverSelected) {
            dueOnDelivery.addOns.damageWaiver += damageWaiverPrice;
        }
        if (movingKitSelected) {
            dueOnDelivery.addOns.movingKit += movingKitPrice;
        }

        dueOnDelivery.due =
            deliveryPrice +
            dueOnDelivery.containerPrice +
            dueOnDelivery.addOns.damageWaiver +
            dueOnDelivery.addOns.contentsProtection +
            dueOnDelivery.addOns.movingKit;
        this.stateHelper("dueOnDelivery", dueOnDelivery);
    }

    calculateQuote = async ()=> {
        this.setState({quoteRequested: false});
        const {
            location1,
            location2,
            selectedLocation,
            selectedService,
        } = this.state;
        let deliveryPrice;
        let returnPrice;

        //DE: deliver empty container : from warehouse to deliver to.

        await this.setState({
            suggestLiveUnload: false,
            isMandatoryLiveUnload: false,
            tollPrice: '0',
            tollguru: null,
            bing: null,
            bCalculated: false
        });

        const {setOrigin_index, warehouse1, warehouse2} = this.props;

        let warehouse = warehouse1;
        if(setOrigin_index===1)
            warehouse = warehouse2;

        await this.setState({
            loading: true
        });

        const {miles_choice} = this.state;
        let res, toll_DE = 0, toll_CC=0;

        console.log(this.state);
        if(miles_choice!==0) {
            res = await this.calculateTruckmilesFromBing(warehouse, location1.formattedAddress);
            if(res) {
                this.setState({bing: res});
                location1.distance = res.travelDistance; //distance calculation for deliver empty container
            }

            res  = await this.calculateTollsFromTollguru(warehouse, location1.formattedAddress);//  toll calculation for deliver empty container


            this.setState({tollguru: res});

            let toll_routes ;
            let tollRouteNo = 0;

            if(this.state.tollguru && this.state.tollguru.length>1) {
                toll_routes = this.state.tollguru.map(route => {
                    return {hasTolls: route.summary.hasTolls, diffs: route.summary.diffs};
                });

                console.log(toll_routes);

                //Route choice
                toll_routes.forEach((route, index) => {
                    if (route.diffs.cheapest !== 0 && route.diffs.fastest !== 0 && route.hasTolls)
                        if (tollRouteNo === 0)
                            tollRouteNo = index;
                });


                this.setState({tollRouteNo: tollRouteNo});
                if (this.state.tollguru[tollRouteNo].costs.prepaidCard)
                    this.setState({tollPrice: (Math.ceil(this.state.tollguru[tollRouteNo].costs.prepaidCard * 2) / 2).toFixed(2)});

                if (this.state.tollguru[tollRouteNo].costs.prepaidCard)
                    toll_DE = (Math.ceil(this.state.tollguru[tollRouteNo].costs.prepaidCard * 2) / 2).toFixed(2);
            }

            //Toll CC calculation (from their current house to their new house)
            if (selectedService === "moving" || selectedService === "both") {
                res = await this.calculateTruckmilesFromBing(warehouse, location2.formattedAddress);
                if(res) {
                    this.setState({bing: res});
                    location2.distance = res.travelDistance; //distance calculation for deliver empty container
                }

                let routes  = await this.calculateTollsFromTollguru(warehouse, location2.formattedAddress);//  toll calculation for deliver empty container

                let toll_routes ;
                tollRouteNo = 0;

                if(routes && routes.length>1) {

                    toll_routes = routes.map(route => {
                        return {hasTolls: route.summary.hasTolls, diffs: route.summary.diffs};
                    });

                    console.log('cccc',toll_routes);

                    //Route choice
                    toll_routes.forEach((route, index)=>{
                        if(route.diffs.cheapest!==0 && route.diffs.fastest!==0 && route.hasTolls)
                            if(tollRouteNo===0)
                                tollRouteNo = index;
                    }) ;
                }
                if(routes && routes[tollRouteNo].costs.prepaidCard)
                    toll_CC = (Math.ceil(routes[tollRouteNo].costs.prepaidCard * 2) / 2).toFixed(2);
            }
        }


        // check for longDistance
        if (
            location1.distance >= constants.longDistanceMin ||
            location2.distance >= constants.longDistanceMin
        ) {
            // sorry we don't serve this area
            this.stateHelper("isLongDistance", true);
        } else {
            this.stateHelper("isLongDistance", false);
        }

        // get delivery and return prices based only on mileage
        deliveryPrice = parseFloat(this.checkDistance(location1.distance))+ parseFloat(toll_DE);

        this.props.update_price_info({prop:'deliveryPrice',value: deliveryPrice});

        // if service is moving or both, get return price from location2 distance check
        if (selectedService === "moving" || selectedService === "both") {
            returnPrice = parseFloat(this.checkDistance(location2.distance)) + parseFloat(toll_CC);
            // if service is storage, return price is delivery price
        } else {
            returnPrice = deliveryPrice;
        }

        let movePrice;
        let liveUnloadSavings;
        let afterLiveUnload;
        let futureTransportCost;
        let suggestLiveUnloadVar;

        // this.stateHelper('deliveryPrice', deliveryPrice);
        this.setState(() => {
            return {
                deliveryPrice: deliveryPrice
            };
        }, this.calculateDueOnDelivery);

        // calculate dueOnDelivery
        // this.calculateDueOnDelivery();

        // service is STORAGE
        if (selectedService === "storage") {
            if (selectedLocation === "warehouse") {
                futureTransportCost = deliveryPrice * 3;
                movePrice = deliveryPrice * 2;
            } else if (selectedLocation === "mine") {
                futureTransportCost = deliveryPrice;
            }
        }

        // service is MOVING or BOTH
        if (selectedService === "moving" || selectedService === "both") {
            futureTransportCost = returnPrice;
            movePrice = returnPrice + deliveryPrice;

            if (
                futureTransportCost - constants.waitPrice >=
                constants.minLiveUnloadSave ||
                location1.distance > constants.mandatoryLiveUnloadMiles
            ) {
                liveUnloadSavings = futureTransportCost - constants.waitPrice;
                // debugger;
                suggestLiveUnloadVar = true;
                this.setState(() => {
                    return {
                        suggestLiveUnload: true,
                        isMandatoryLiveUnload: true
                    };
                });
            }
            futureTransportCost = deliveryPrice + returnPrice * 2;
        }

        futureTransportCost = (Math.ceil(futureTransportCost * 2) / 2).toFixed(2);


        // afterLiveUnload price
        liveUnloadSavings =  (Math.ceil(liveUnloadSavings * 2) / 2).toFixed(2)
        afterLiveUnload = futureTransportCost - liveUnloadSavings;

        movePrice =  (Math.ceil(movePrice * 2) / 2).toFixed(2)
        returnPrice =  (Math.ceil(returnPrice * 2) / 2).toFixed(2)

        if (location1.distance > constants.mandatoryLiveUnloadMiles) {
            futureTransportCost = afterLiveUnload;
            liveUnloadSavings = 0;
        }

        this.stateHelper("futureTransportCost", futureTransportCost);
        this.stateHelper("afterLiveUnload", afterLiveUnload);
        this.stateHelper("liveUnloadSavings", liveUnloadSavings);
        this.stateHelper("movePrice", movePrice);
        this.stateHelper("returnPrice", returnPrice);
        this.stateHelper("tollPrice", this.state.tollPrice);

        console.log("deliveryPrice: ", deliveryPrice);
        console.log("movePrice: ", movePrice);
        console.log("returnPrice: ", returnPrice);
        console.log("toll_DE: ", toll_DE);
        console.log("toll_CC: ", toll_CC);
        console.log("futureTransportCost: ", futureTransportCost);
        console.log("suggestLiveUnload: ", suggestLiveUnloadVar);
        console.log("isLongDistance", this.state.isLongDistance);
        console.log("liveUnloadSavings: ", liveUnloadSavings);
        console.log("afterLiveUnload: ", afterLiveUnload);
        console.log('final state', this.state);

        await this.setState({
            bCalculated: true,
            loading: false,
            quoteRequested: true
        });
    };

    checkDistance(distance) {
        let price;

        if (distance <= constants.flatDeliveryMiles) {
            // distance is within flat delivery radius
            price = constants.flatDeliveryPrice;
        } else if (distance > constants.flatDeliveryMiles) {
            // distance is outside flat delivery radius
            price = distance  * constants.milePrice;
            // price =
            //     constants.flatDeliveryPrice +
            //     (distance - constants.flatDeliveryMiles) * constants.milePrice;
            if (distance >= constants.longDistanceMin) {
                // distance is greater than or equal to long distance min
                price = distance * constants.longDistanceMilePrice;
            }
        }

        // return price;
        return (Math.ceil(price * 2) / 2).toFixed(2);
    }

    handleLocationInputUpdates(locationToUpdate, name, destination, distance) {
        this.setState(prevState => {
            return {
                ...prevState,
                [locationToUpdate]: {
                    name: name,
                    formattedAddress: destination,
                    distance: distance
                },
                displayAddressPrompt: false
            };
        });
    }

    handleInputChange(e) {
        e.persist();
        let key;
        let value;

        // if clicking on box:
        if (e.target.type === "checkbox") {
            value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
            key = e.target.id;
            // if clicking NOT on box:
        } else if (e.target.closest(".checkbox").firstChild.type === "checkbox") {
            key = e.target.closest(".checkbox").firstChild.id;
            // if already checked:
            if (e.target.closest(".checkbox").firstChild.checked) {
                value = false;
                e.target.closest(".checkbox").firstChild.checked = false;
            } else {
                value = true;
                e.target.closest(".checkbox").firstChild.checked = true;
            }
        } else {
            value = e.target.value;
        }

        this.setState({ [key]: value});
    }

    handleServiceSelection(service) {
        const {selectedService, quoteRequested} = this.state;

        if(selectedService==='storage' && quoteRequested)
            this.setState({quoteRequested: false});

        if(selectedService==='moving' && quoteRequested && service==='storage')
            this.setState({quoteRequested: false});

        if(selectedService==='both' && quoteRequested && service==='storage')
            this.setState({quoteRequested: false});

        const { selectedSize } = this.props;

        let newSize;

        if (selectedSize === "c20") {
            if (service !== "storage") {
                newSize = "c16";

                this.props.handleSizeSelection(newSize, service, this.props.selectedLocation);
                this.setState(() => {
                    return {
                        selectedSize: newSize
                    };
                });
            }
        }

        if(service==='both') {
            this.props.handleLocationSelection('warehouse');
            this.setState(() => {
                return {
                    selectedLocation: 'warehouse'
                };
            });
        }
        this.setState({
                selectedService: service,
        });
    }

    handleLocationSelection(location) {
        const { selectedSize } = this.props;
        if (selectedSize === "c20") {
            location = "mine";
        }
        this.setState({
            selectedLocation: location,
                // quoteRequested: false
        });
    }

    handleAndValidateEmail(e) {
        let pattern;
        let isValid = false;
        let msg;
        // validation
        if (e.target.id === "email") {
            pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (pattern.test(e.target.value)) {
                isValid = true;
            }
            else {
                msg = <span className="badge badge-danger" style={{fontWeight: 'normal'}}>Invalid Email Format</span>
            }
        }
        this.setState(() => {
            return {
                email: {
                    value: this.state.email.value,
                    isValid: isValid,
                    msg: msg
                }
            };
        });
    }

    handleAndValidateEmailAndPhone(e) {
        e.persist();
        let pattern;
        let isValid = false;

        // validation
        if (e.target.id === "email") {
            pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (pattern.test(e.target.value)) {
                isValid = true;
            }
            else {
            }
            this.setState(() => {
                return {
                    [e.target.id]: {
                        value: e.target.value,
                        isValid: isValid
                    }
                };
            });
        } else if (e.target.id === "phone") {
            pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
            if (pattern.test(e.target.value)) {
                isValid = true;
            }
            this.setState(() => {
                return {
                    [e.target.id]: {
                        value: e.target.value,
                        isValid: isValid,
                    }
                };
            });
        }


    }

    handleDateChange(date) {
        this.setState(() => {
            return {
                desiredDate: date
            };
        });
    }

    handleNewQuote() {
        window.scrollTo({
            top: 0,
            left: 0
        });

        // clear inputs
        document.getElementById("deliverTo").value = "";
        if (document.getElementById("returnFrom")) {
            document.getElementById("returnFrom").value = "";
        }

        this.setState(() => {
            return {
                selectedService: "moving",
                selectedSize: "c16",
                selectedLocation: "mine",
                damageWaiverSelected: false,
                contentsProtectionSelected: false,
                movingKitSelected: false,
                email: {
                    value: "",
                    isValid: false
                },
                phone: {
                    value: "",
                    isValid: false
                },
                location1: {
                    name: "deliverTo",
                    formattedAddress: null,
                    distance: null
                },
                location2: {
                    name: "returnFrom",
                    formattedAddress: null,
                    distance: null
                },
                displayAddressPrompt: false,
                dueOnDelivery: {},
                deliveryPrice: 0,
                movePrice: 0,
                returnPrice: 0,
                isLongDistance: false,
                suggestLiveUnload: false,
                isMandatoryLiveUnload: false,
                liveUnloadSavings: 0,
                afterLiveUnload: 0,
                quoteRequested: false,
                desiredDate: moment()
            };
        });
    }

    submitForm(e) {
        e.preventDefault();
        const { location1, location2, email, phone, selectedService } = this.state;
        console.log(location1, location2, email, phone, selectedService);


        // if service is moving or both
        if (selectedService === "moving" || selectedService === "both") {
            if (!location1.formattedAddress || !location2.formattedAddress) {
                this.setState(() => {
                    return {
                        displayAddressPrompt: true
                    };
                });
                return;
            }
            // if service is storage
        } else {
            if (!location1.formattedAddress) {
                this.setState(() => {
                    return {
                        displayAddressPrompt: true
                    };
                });
                return;
            }
        }

        if (!email.isValid || !phone.isValid) {
            return;
        }

        this.calculateQuote();

    }

    getQuoteHTML(quoteHTML) {
        this.setState(() => {
            return {
                quoteHTML: quoteHTML
            };
        });
    }


    render() {
        const serviceOptionsProps = {
            selectedService: this.state.selectedService,
            handleServiceSelection: this.handleServiceSelection
        };

        const containerSizeProps = {
            c16: this.state.c16,
            c20: this.state.c20,
            c16Price: this.state.c16Price,
            c20Price: this.state.c20Price,
            selectedSize: this.state.selectedSize,
            selectedService: this.state.selectedService,
            selectedLocation: this.state.selectedLocation
        };

        const movingInputsProps = {
            selectedService: this.state.selectedService,
            handleLocationInputUpdates: this.handleLocationInputUpdates,
            deliverTo: this.state.location1.formattedAddress,
            returnFrom: this.state.location2.formattedAddress,
            warehouse: this.state.warehouse
        };

        const addOptionalItemsProps = {
            damageWaiverPrice: this.state.damageWaiverPrice,
            contentsProtectionPrice: this.state.contentsProtectionPrice,
            movingKitPrice: this.state.movingKitPrice,
            handleInputChange: this.handleInputChange
        };

        const contactInfoProps = {
            handleAndValidateEmailAndPhone: this.handleAndValidateEmailAndPhone,
            handleAndValidateEmail: this.handleAndValidateEmail,
            email: this.state.email,
            phone: this.state.phone
        };

        const _renderRightBlock = ()=>{

            if(this.state.quoteRequested && (this.state.miles_choice===0 || this.state.selectedService==='storage'))
                return <YourInstantQuote {...yourInstantQuoteProps} />
            else if (this.state.quoteRequested && this.state.miles_choice!==0 ) {
                if(this.state.bing && this.state.bCalculated) {

                    return <YourInstantQuote {...yourInstantQuoteProps} />
                }
            }
            else {
                return (
                    <div className="col-md-6" id="scroll">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Your Instant Quote</h3>
                            </div>
                            <div className="panel-body">
                                <div className="beforeSend">Please enter your details on the left side.</div>
                            </div>
                        </div>
                    </div>
                )
            }

        };

        const yourInstantQuoteProps = {
            afterLiveUnload: this.state.afterLiveUnload,
            deliverTo: this.state.location1.formattedAddress,
            deliveryPrice: this.state.deliveryPrice,
            isLongDistance: this.state.isLongDistance,
            isMandatoryLiveUnload: this.state.isMandatoryLiveUnload,
            suggestLiveUnload: this.state.suggestLiveUnload,
            liveUnloadSavings: this.state.liveUnloadSavings,
            returnFrom: this.state.location2.formattedAddress,
            returnPrice: this.state.returnPrice,
            movePrice: this.state.movePrice,
            selectedService: this.state.selectedService,
            selectedLocation: this.state.selectedLocation,
            selectedSize: this.state.selectedSize,
            c16Price: this.state.c16Price,
            c20Price: this.state.c20Price,
            warehouseStorage: constants.warehouseStorage,
            dueOnDelivery: this.state.dueOnDelivery,
            futureTransportCost: this.state.futureTransportCost,
            quoteRequested: this.state.quoteRequested,
            desiredDate: this.state.desiredDate,
            handleDateChange: this.handleDateChange,
            handleNewQuote: this.handleNewQuote,
            getQuoteHTML: this.getQuoteHTML,
            pre:
                '<!DOCTYPE html><html><head><style type="text/css"></style></head><body><div style="max-width:800px">',
            post: "</div></body></html>",
            title: "",
            email: this.state.email.value,
            phone: this.state.phone.value,
            miles_choice: this.state.miles_choice,
            bing: this.state.bing,
            tollguru: this.state.tollguru,
            tollPrice: this.state.tollPrice,
            tollRouteNo: this.state.tollRouteNo,
        };

        return (
            <div className="container-fluid App">
                {this.state.loading && (
                    <div className='sweet-loading'>
                        <ClipLoader
                            className={override}
                            sizeUnit={"px"}
                            size={100}
                            color={'#1a023e'}
                            loading={this.state.loading}
                        />
                    </div>
                )}
                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Please Choose</h3>
                            </div>
                            <div className="panel-body">
                                <form>
                                    {/* Service Selection */}
                                    <div className="form-group">
                                        <ServiceOptions {...serviceOptionsProps} />
                                    </div>

                                    {/* Location Selection */}
                                    {this.state.selectedService !== "moving" && (
                                        <React.Fragment>
                                            <hr />
                                            <div className="form-group">
                                                <LocationOptions  selectedService={this.state.selectedService}/>
                                            </div>
                                        </React.Fragment>
                                    )}

                                    <hr />

                                    {/* Container Size Selection */}
                                    <div className="form-group" style={{ textAlign: "center" }}>
                                        <ContainerSize {...containerSizeProps} />
                                    </div>

                                    {/* Moving Inputs */}
                                    {this.props.warehouse1 && (
                                    <div className="form-group">
                                        <MovingInputs {...movingInputsProps} />
                                    </div>
                                    )}
                                    <hr />
                                    {/* Add Optional Items */}
                                    <div className="form-group">
                                        <AddOptionalItems {...addOptionalItemsProps} />
                                    </div>
                                    <hr />
                                    {/* Contact Inputs */}
                                    <div className="form-group">
                                        <ContactInputs {...contactInfoProps} />
                                    </div>
                                    <div className="form-group">
                                        <button
                                            className={classnames({
                                                "btn btn-success": true,
                                                disabled:
                                                    this.state.email.isValid && this.state.phone.isValid && !this.state.displayAddressPrompt
                                                        ? false
                                                        : true
                                            })}
                                            onClick={this.submitForm}
                                        >
                                            Get Quote
                                        </button>
                                    </div>
                                    {/* Address Prompt */}
                                    {this.state.displayAddressPrompt && (
                                        <div className="form-group test">
                                            <div className="addressPrompt">
                                                Please enter an address.
                                            </div>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                    {_renderRightBlock()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {  damageWaiverSelected, contentsProtectionSelected, selectedSize,selectedLocation, deliveryPrice, wareRates,setOrigin_index, warehouse1, warehouse2
    } = state.mainReducer;
    return {damageWaiverSelected, contentsProtectionSelected, selectedSize, selectedLocation, deliveryPrice, wareRates,setOrigin_index, warehouse1, warehouse2};
};
export default connect(mapStateToProps, {update_price_info,handleSizeSelection, handleLocationSelection,initializeWarehouseRates,initializeWarehouses})(Main);

