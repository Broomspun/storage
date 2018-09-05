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
      {(storage !== 0) & (selectedLocation !== "mine") ? (
        <div className="line">
          <span>Indoor storage:</span>
        </div>
      ) : ''
      }
      {/*<div className="line">*/}
        {/*<span>Total:</span>*/}
        {/*<span>{total}</span>*/}
      {/*</div>*/}
    </React.Fragment>
  );
};

export default StoragePerMonth;
