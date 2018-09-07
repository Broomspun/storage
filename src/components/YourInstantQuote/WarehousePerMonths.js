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
        const { wareRates, setOrigin_index } = this.props;
        let indoor, outdoor;

        if(setOrigin_index===0) {
            indoor = wareRates.w1_i;
            outdoor = wareRates.w1_o;
        }
        else {
            indoor = wareRates.w2_i;
            outdoor = wareRates.w2_o;
        }

        return (
            <React.Fragment>
                <div className="line">
                    <span><strong>Storage Options at iCan Facility:</strong></span>
                </div>
                <div className="line">
                    <span className="warehouse">Indoor(monthly) </span>
                    <span>{accounting.formatMoney(indoor)}</span>
                </div>
                <div className="line">
                    <span className="warehouse">Outdoor(monthly) </span>
                    <span>{accounting.formatMoney(outdoor)}</span>
                </div>
                <hr />
            </React.Fragment>
        )
    }
};
const mapStateToProps = (state) => {
    const { wareRates,setOrigin_index} = state.mainReducer;
    return {wareRates,setOrigin_index};
};
export default connect(mapStateToProps, {})(WarehousePerMonths);
