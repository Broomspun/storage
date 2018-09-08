import React from "react";

const Destinations = ({ deliverTo, returnFrom, selectedService }) => {
  return (
    <React.Fragment>
      <div className="line">
        <span>
          <strong>Delivery Location:</strong>
        </span>
        <span className="pull-right"  style={{float:'right',textAlign: 'right'}}>{deliverTo}</span>
      </div>
      {selectedService !== "storage" && (
        <div className="line">
          <span>
            <strong>Destination Location:</strong>
          </span>
          <span className="pull-right"  style={{float:'right',textAlign: 'right'}}>{returnFrom}</span>
        </div>
      )}
    </React.Fragment>
  );
};

export default Destinations;
