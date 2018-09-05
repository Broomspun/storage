import React from "react";
import classnames from 'classnames';

const ServiceOptions = ({ selectedService, handleServiceSelection }) => {
    const movingBtn = classnames({
        'btn': true,
        'btn-success': selectedService === 'moving' ? true : false,
        'btn-default': selectedService !== 'moving' ? true: false
      });

      const storageBtn = classnames({
        'btn': true,
        'btn-success': selectedService === 'storage' ? true : false,
        'btn-default': selectedService !== 'storage' ? true: false
      });

    const bothBtn = classnames({
        'btn': true,
        'btn-success': selectedService === 'both' ? true : false,
        'btn-default': selectedService !== 'both' ? true : false
      });

    return (
        <React.Fragment>
            <h5>I need a container for:</h5>
            <div className="btn-group btn-group-justified" role="group" aria-label="...">
                <div className="btn-group group-three" role="group">
                    <button type="button" className={movingBtn} onClick={handleServiceSelection.bind(this, 'moving')}>Moving</button>
                </div>
                <div className="btn-group group-three" role="group">
                    <button type="button" className={storageBtn} onClick={handleServiceSelection.bind(this, 'storage')}>Storage</button>
                </div>
                <div className="btn-group group-three" role="group">
                    <button type="button" className={bothBtn} onClick={handleServiceSelection.bind(this, 'both')}>Both</button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ServiceOptions;
