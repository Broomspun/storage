import React from 'react';
import connect from "react-redux/es/connect/connect";

import classnames from 'classnames';
import {handleWarehouseSelection} from "../Actions";

class WarehouseOptions extends React.Component {
    constructor(props) {
        super(props);
    }

    render()
    {
        const {selectedWarehouse} = this.props;

        const indoor = classnames({
            'btn': true,
            'btn-success': selectedWarehouse === 'indoor' ? true : false,
            'btn-default': selectedWarehouse !== 'indoor' ? true : false
        });

        const outdoor = classnames({
            'btn': true,
            'btn-success': selectedWarehouse === 'outdoor' ? true : false,
            'btn-default': selectedWarehouse !== 'outdoor' ? true : false,
        });
        return (
            <React.Fragment>
                <h5 style={{textAlign:'left'}}>Warehouse options: </h5>
                <div className="btn-group btn-group-justified" role="group" aria-label="...">
                    <div className="btn-group group-two" role="group">
                        <button type="button" className={indoor}
                                onClick={()=>this.props.handleWarehouseSelection('indoor')}>Indoor
                        </button>
                    </div>
                    <div className="btn-group group-two" role="group">
                        <button type="button" className={outdoor}
                                onClick={()=>this.props.handleWarehouseSelection('outdoor')}>Outdoor
                        </button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    const {selectedWarehouse } = state.mainReducer;
    return {selectedWarehouse};
};
export default connect(mapStateToProps, {handleWarehouseSelection})(WarehouseOptions);
