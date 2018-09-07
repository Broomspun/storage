import React from 'react';
import connect from "react-redux/es/connect/connect";

import classnames from 'classnames';
import {handleLocationSelection} from "../Actions";

class LocationOptions extends React.Component {
    constructor(props) {
        super(props);
    }

   render()
    {
        const {selectedLocation, selectedSize, selectedService} = this.props;

        const mineBtn = classnames({
            'btn': true,
            'btn-success': selectedLocation === 'mine' ? true : false,
            'btn-default': selectedLocation !== 'mine' ? true : false,
            'disabled': selectedService==='both'? true: false
        });

        const warehouseBtn = classnames({
            'btn': true,
            'btn-success': selectedLocation === 'warehouse' ? true : false,
            'btn-default': selectedLocation !== 'warehouse' ? true : false,
            'disabled': selectedSize === 'c20' ? true : false
        });
        return (
            <React.Fragment>
                {selectedLocation==='mine' && (
                <h5>I will store my stuff at:</h5>
                )}
                {selectedLocation==='warehouse' && (
                    <h5>iCan Storage Facility</h5>
                )}

                <div className="btn-group btn-group-justified" role="group" aria-label="...">
                    <div className="btn-group group-two" role="group">
                        <button type="button" className={mineBtn}
                                onClick={()=>this.props.handleLocationSelection(
                                    selectedService==='both'? 'warehouse':'mine',
                                    selectedSize)
                                }>My location
                        </button>
                    </div>
                    <div className="btn-group group-two" role="group">
                        <button type="button" className={warehouseBtn}
                                onClick={()=>this.props.handleLocationSelection('warehouse', selectedSize)}>Your warehouse
                        </button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    const {selectedSize, selectedLocation} = state.mainReducer;
    return {selectedSize, selectedLocation};
};
export default connect(mapStateToProps, {handleLocationSelection})(LocationOptions);
