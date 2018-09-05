import React, {Component} from 'react';
import {connect} from 'react-redux';
import accounting from "accounting-js";

class WarehousePerMonths extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
    }
    componentDidUpdate(){
    }

    render(){
        const { wareRates, selectedWarehouse } = this.props;


        return (
            <React.Fragment>
                <div className="line">
                    <span><strong>Storage Options at iCan Facility:</strong></span>
                </div>
                <div className='line'></div>
            </React.Fragment>
        )
    }
};
const mapStateToProps = (state) => {
    const { wareRates,selectedWarehouse} = state.mainReducer;
    return {wareRates,selectedWarehouse};
};
export default connect(mapStateToProps, {})(WarehousePerMonths);
