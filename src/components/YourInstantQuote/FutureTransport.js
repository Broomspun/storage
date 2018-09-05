import React from "react";

const FutureTransport = ({
  selectedService,
  selectedLocation,
  movePrice,
  returnPrice,
  suggestLiveUnload,
  isMandatoryLiveUnload,
  liveUnloadSavings,
  afterLiveUnload,
  futureTransportCost,
  tollPrice,
  miles_choice
}) => {
  return (
    <React.Fragment>
      <div className="line">
        <span>
          <strong>Future Transportation Costs:</strong>
        </span>
      </div>
      <div className="line">
        {/* location is warehouse */}
        {selectedLocation === "warehouse" && (
          <span>Delivery to and Return from iCan Facility:</span>
        )}

        {/* service is both and location is mine */}
        {selectedService === "both" &&
          selectedLocation === "mine" && <span>Move Price:</span>}

        {/* service is moving */}
        {selectedService === "moving" && <span>Move Price:</span>}

        {/* movePrice here */}
        {movePrice !== "$NaN.undefined" && <span>{movePrice}</span>}
      </div>
      <div className="line">
        <span>Pick Up Price:</span>
        <span> {returnPrice}</span>
      </div>

        {/*{miles_choice>0 && (*/}
        {/*<div className="line">*/}
            {/*<span>Toll Price:</span>*/}
            {/*<span> {tollPrice}</span>*/}
        {/*</div>*/}
        {/*)}*/}

      {/* not mandatory live unload */}
      {!isMandatoryLiveUnload && (
        <div className="line">
          <span>Total Future Costs:</span>
          <span>{futureTransportCost}</span>
        </div>
      )}

      {/* suggest live unload, but not mandatory - I don't think logic for this is in place in price calculation */}
      {suggestLiveUnload &&
        !isMandatoryLiveUnload && (
          <React.Fragment>
            <div className="saveMoneyWithLiveUnload line">
              Save money with live unload!
            </div>
            <div className="line">
              <span>Live Unload Savings:</span>
              <span>{liveUnloadSavings}</span>
            </div>
            <div className="line">
              <span>Total with Live Unload Discount:</span>
              <span> {afterLiveUnload}</span>
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
                <span>{liveUnloadSavings}
                </span>
            </div>
            <div className="line">
              <span>Total:</span>
              <span> {afterLiveUnload}</span>
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
};

export default FutureTransport;
