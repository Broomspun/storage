import React from "react";
import {connect} from 'react-redux';
import accounting from "accounting-js";

class FutureTransport extends React.Component {

    render() {
        const {
            selectedService, movePrice,  returnPrice, suggestLiveUnload, isMandatoryLiveUnload,
            liveUnloadSavings, afterLiveUnload, futureTransportCost,selectedLocation,deliveryPrice
        } = this.props;


        let futureTransportCost1 = accounting.unformat(futureTransportCost);
        let movePrice1 = accounting.unformat(movePrice);

        if (selectedService === "storage") {
            if (selectedLocation === "warehouse") {
                futureTransportCost1 = deliveryPrice * 3;
                movePrice1 = deliveryPrice * 2;
            } else if (selectedLocation === "mine") {
                futureTransportCost1 = deliveryPrice;
            }
        }

        return (
            <React.Fragment>
                <div className="line">
        <span>
          <strong>Future Transportation Costs:</strong>
        </span>
                </div>
                <div className="line">
                    {/* location is warehouse */}
                    {selectedService!=='moving' && selectedLocation === "warehouse" && (
                        <span>Delivery to and Return from iCan Facility:</span>
                    )}

                    {/* service is both and location is mine */}
                    {selectedService === "both" &&
                    selectedLocation === "mine" && <span>Move Price:</span>}

                    {/* service is moving */}
                    {selectedService === "moving" && <span>Move Price:</span>}

                    {/* movePrice here */}
                    {movePrice1>0 && <span style={{float:'right',textAlign: 'right'}}>{accounting.formatMoney(movePrice1)}</span>}
                </div>
                <div className="line" style={{justifyContent: 'space-between'}}>
                    <span>Final Pick Up Price:</span>
                    <span style={{float:'right',textAlign: 'right'}}> {returnPrice}</span>
                </div>

                {/* not mandatory live unload */}
                {!isMandatoryLiveUnload && (
                    <div className="line" style={{justifyContent: 'space-between'}}>
                        <span>Total Future Transportation Costs:</span>
                        <span style={{float:'right',textAlign: 'right'}}>{accounting.formatMoney(futureTransportCost1)}</span>
                    </div>
                )}

                {/* suggest live unload, but not mandatory - I don't think logic for this is in place in price calculation */}
                {suggestLiveUnload &&
                !isMandatoryLiveUnload && (
                    <React.Fragment>
                        <div className="saveMoneyWithLiveUnload line" style={{justifyContent: 'space-between'}}>
                            Save money with live unload!
                        </div>
                        <div className="line">
                            <span>Live Unload Savings:</span>
                            <span style={{float:'right',textAlign: 'right'}}>{liveUnloadSavings}</span>
                        </div>
                        <div className="line" >
                            <span>Total with Live Unload Discount:</span>
                            <span style={{float:'right',textAlign: 'right'}}> {afterLiveUnload}</span>
                        </div>
                    </React.Fragment>
                )}

                {/* suggest live unload AND is mandatory */}
                {suggestLiveUnload &&
                isMandatoryLiveUnload && (
                    <React.Fragment>
                        <div className='line'>
                <span>
                Live Unload Savings:
                </span>
                            <span style={{float:'right',textAlign: 'right'}}>{liveUnloadSavings}
                </span>
                        </div>
                        <div className="line">
                            <span>Total:</span>
                            <span style={{float:'right',textAlign: 'right'}}> {afterLiveUnload}</span>
                        </div>
                        <div className="line">
              <span>
                This includes 2 hours of driver wait time while the container is
                unloaded.
              </span>
                        </div>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { deliveryPrice,selectedLocation} = state.mainReducer;
    return {deliveryPrice,selectedLocation};
};
export default connect(mapStateToProps, {})(FutureTransport);

