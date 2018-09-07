import React from "react";

const StoragePerMonth = ({ rental, storage, total, selectedLocation }) => {
  return (
    <React.Fragment>
      <div className="line">
        <span>
          <strong>Storage per Month:</strong>
        </span>
      </div>
      <div className="line">
        <span>Container rental:</span>
        <span>{rental}</span>
      </div>
    </React.Fragment>
  );
};

export default StoragePerMonth;
