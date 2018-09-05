import React from "react";
import {connect} from 'react-redux';
import {updateSetOrigin} from './../Actions';

class MovingInputs extends React.Component {
    constructor(props) {
        super(props);

        this.address1Field = React.createRef();
        this.address2Field = React.createRef();
        this.calculateDistance = this.calculateDistance.bind(this);

        this.state = {
            warehouse1: props.warehouse,
            // warehouse1: "10920",
            warehouse2: "117 Whisconier Rd, Brookfield, CT 06804, USA", // switch to actual warehouse location when provided!
            setOrigin: null
        };


    }
    componentWillReceiveProps(nextProps){
    }

    componentDidUpdate() {
        if(this.address2Field.current===null)
            this.address2Field = React.createRef();


        // instantiate google places on address 1 field
        const autocomplete1 = new window.google.maps.places.Autocomplete(
            this.address1Field.current,
            {
                types: ["geocode"],
                componentRestrictions: { country: "us" },
                forceSelection: true
            }
        );
        // instantiate google places on address 2 field
        let autocomplete2;

        if(this.props.selectedService !=='storage') {
            autocomplete2 = new window.google.maps.places.Autocomplete(
                this.address2Field.current,
                {
                    types: ["geocode"],
                    componentRestrictions: {country: "us"},
                    forceSelection: true
                }
            );
        }

        // clear out all listeners
        window.google.maps.event.clearInstanceListeners(autocomplete1);
        if(this.props.selectedService !=='storage')
            window.google.maps.event.clearInstanceListeners(autocomplete2);

        let fromAddress = null;
        let toAddress = null;

        // add listeners to capture addresses from google

        window.google.maps.event.addListener(autocomplete1, "place_changed", () => {
            fromAddress = autocomplete1.getPlace();
            this.calculateDistance(
                "deliveryPrice",
                null,
                fromAddress.formatted_address,
                1
            );

            // recalculate return price if delivery address is changed
            // if (this.props.selectedService !== "storage" && toAddress) {
            //     toAddress = autocomplete2.getPlace();
            //   this.calculateDistance(
            //     "returnPrice",
            //     this.state.setOrigin,
            //     toAddress.formatted_address,
            //     2
            //   );
            // }
            // determine which iCAN location is closest
        });

        if(this.props.selectedService !=='storage') {
            window.google.maps.event.addListener(autocomplete2, "place_changed", () => {
                toAddress = autocomplete2.getPlace();
                this.calculateDistance(
                    "returnPrice",
                    this.state.setOrigin,
                    toAddress.formatted_address,
                    2
                );
            });
        }
    }

    componentDidMount() {

        //set up mutation observer to remove chrome autofill/autocomplete
        // const self = this;
        // const observeOptions = {
        //     attributes: true,
        //     attributeFilter: ["autocomplete"]
        // };
        // //
        // const autocompleteWatcher1 = new MutationObserver(() => {
        //     autocompleteWatcher1.disconnect();
        //     self.address1Field.current.autocomplete = "none";
        // });
        // //
        // const autocompleteWatcher2= new MutationObserver(() => {
        //         autocompleteWatcher2.disconnect();
        //         self.address2Field.current.autocomplete = "none";
        //     });
        // //
        // autocompleteWatcher1.observe(this.address1Field.current, observeOptions);
        // autocompleteWatcher2.observe(this.address2Field.current, observeOptions);
        if(this.address2Field.current===null)
            this.address2Field = React.createRef();


        // instantiate google places on address 1 field
        const autocomplete1 = new window.google.maps.places.Autocomplete(
            this.address1Field.current,
            {
                types: ["geocode"],
                componentRestrictions: { country: "us" },
                forceSelection: true
            }
        );
        // instantiate google places on address 2 field
        let autocomplete2;

        if(this.props.selectedService !=='storage') {
            autocomplete2 = new window.google.maps.places.Autocomplete(
                this.address2Field.current,
                {
                    types: ["geocode"],
                    componentRestrictions: {country: "us"},
                    forceSelection: true
                }
            );
        }

        // clear out all listeners
        window.google.maps.event.clearInstanceListeners(autocomplete1);
        if(this.props.selectedService !=='storage')
            window.google.maps.event.clearInstanceListeners(autocomplete2);

        let fromAddress = null;
        let toAddress = null;

        // add listeners to capture addresses from google

        window.google.maps.event.addListener(autocomplete1, "place_changed", () => {
            fromAddress = autocomplete1.getPlace();
            this.calculateDistance(
                "deliveryPrice",
                null,
                fromAddress.formatted_address,
                1
            );

            // recalculate return price if delivery address is changed
            // if (this.props.selectedService !== "storage" && toAddress) {
            //     toAddress = autocomplete2.getPlace();
            //   this.calculateDistance(
            //     "returnPrice",
            //     this.state.setOrigin,
            //     toAddress.formatted_address,
            //     2
            //   );
            // }
            // determine which iCAN location is closest
        });

        if(this.props.selectedService !=='storage') {
            window.google.maps.event.addListener(autocomplete2, "place_changed", () => {
                toAddress = autocomplete2.getPlace();
                this.calculateDistance(
                    "returnPrice",
                    this.state.setOrigin,
                    toAddress.formatted_address,
                    2
                );
            });
        }
    }

    calculateDistance(name, origin, destination, locationNum) {
        const { warehouse1, warehouse2 } = this.state;
        const { handleLocationInputUpdates } = this.props;
        const origins = origin ? [origin] : [warehouse1, warehouse2];

        if (!destination) {
            destination = warehouse1;
        }

        // if (!origin) origin = warehouse1;

        var service = new window.google.maps.DistanceMatrixService();

        service.getDistanceMatrix(
            {
                origins,
                destinations: [destination],
                travelMode: window.google.maps.TravelMode.DRIVING,
                unitSystem: window.google.maps.UnitSystem.IMPERIAL,
                avoidHighways: false,
                avoidTolls: false
            },
            (response, status) => {
                console.log('google', response);
                let distanceInt = null;

                if (name === "returnPrice") {
                    let distance = response.rows[0].elements[0].distance.text;
                    distanceInt = distance.replace(",", "");
                    distanceInt = distanceInt.split(" ")[0];
                    distanceInt = Math.round(parseFloat(distanceInt));
                } else {
                    // get the closest distance from destination based on multiple origins
                    let setOrigin = (distanceInt = response.rows
                        .map((row, index) => {
                            const elObj = row.elements[0];

                            const originEl = {
                                index,
                                distanceInt: Math.round(
                                    parseFloat(elObj.distance.text.replace(",", "").split(" ")[0])
                                )
                            };

                            return originEl;
                        })
                        .sort((a, b) => a.distanceInt - b.distanceInt))[0];

                    distanceInt = setOrigin.distanceInt;

                    this.props.updateSetOrigin(response.originAddresses[setOrigin.index]);

                    this.setState({
                        setOrigin: response.originAddresses[setOrigin.index]
                    });
                }

                let locationToUpdate = "location" + String(locationNum);

                handleLocationInputUpdates(
                    locationToUpdate,
                    name,
                    destination,
                    distanceInt
                );
            }
        );
    }

    render() {
        const { selectedService } = this.props;

        return (
            <React.Fragment>
                <h5>
                    {selectedService === "storage"
                        ? "Deliver container to:"
                        : "Moving from:"}
                </h5>
                <p>
                    <input
                        id="deliverTo"
                        ref={this.address1Field}
                        className="form-control"
                        force-selection="true"
                        placeholder="Address"
                        autoComplete=""
                    />
                </p>
                {selectedService !== "storage" && (
                    <React.Fragment>
                        <h5>Moving to:</h5>
                        <p>
                            <input
                                id="returnFrom"
                                ref={this.address2Field}
                                className="form-control"
                                force-selection="true"
                                placeholder="Address"
                                autoComplete=""
                            />
                        </p>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { setOrigin} = state.mainReducer;
    return {setOrigin};
};
export default connect(mapStateToProps, {updateSetOrigin})(MovingInputs);

