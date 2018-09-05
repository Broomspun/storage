import React from 'react';
import classnames from 'classnames';

const LocationOptions = ({ selectedLocation, selectedSize, handleLocationSelection }) => {
    const mineBtn = classnames({
        'btn': true,
        'btn-success': selectedLocation === 'mine' ? true : false,
        'btn-default': selectedLocation !== 'mine' ? true : false
      });

    const warehouseBtn = classnames({
        'btn': true,
        'btn-success': selectedLocation === 'warehouse' ? true : false,
        'btn-default': selectedLocation !== 'warehouse' ? true : false,
        'disabled': selectedSize === 'c20' ? true : false
      });

    return (
      <React.Fragment>
        <h5>I will store my stuff at:</h5>
        <div className="btn-group btn-group-justified" role="group" aria-label="...">
          <div className="btn-group group-two" role="group">
            <button type="button" className={mineBtn} onClick={handleLocationSelection.bind(this, 'mine')}>My location</button>
          </div>
          <div className="btn-group group-two" role="group">
            <button type="button" className={warehouseBtn} onClick={handleLocationSelection.bind(this, 'warehouse')}>Your warehouse</button>
          </div>
        </div>
      </React.Fragment>
    )
}

export default LocationOptions;