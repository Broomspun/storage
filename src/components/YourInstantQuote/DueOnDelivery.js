import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleInputChange} from "../../Actions";
import accounting from "accounting-js";

class DueOnDelivery extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        console.log('dueOn', nextProps)
    }
    componentDidUpdate(){

    }

    render(){
        const { rental, storage, dueOnDelivery, movingKit, due } = this.props;

        const { deliveryPrice } = this.props;
        const { containerPrice } = this.props.dueOnDelivery1;
        const { damageWaiver,contentsProtection } = this.props.dueOnDelivery1.addOns;

        let duePrice = accounting.formatMoney(deliveryPrice+containerPrice+damageWaiver+contentsProtection);

        return (<React.Fragment>
            <div className="line">
                <span><strong>Due on Delivery:</strong></span>
                {/*<span className="pull-right">{due}</span>*/}
            </div>
            {/*<div className='line'>*/}
            {/*<span>*/}
            {/*<strong>Due on Delivery:</strong>*/}
            {/*</span>*/}
            {/*</div>*/}
            <div className='line'>
            <span>
                *Tax not included
            </span>
            </div>
            {/*<div className='line'>*/}
            {/*<span>*/}
            {/*Delivery Price:*/}
            {/*</span>*/}
            {/*<span>*/}
            {/*{deliveryPrice}*/}
            {/*</span>*/}
            {/*</div>*/}
            {/*<div className='line'>*/}
            {/*<span>*/}
            {/*Container Price:*/}
            {/*</span>*/}
            {/*<span>*/}
            {/*{rental}*/}
            {/*</span>*/}
            {/*</div>*/}
            {/* Uncomment to include warehouse storage first month as part of due on delivery */}
            {/* {this.formatContainerPrice().storage !== 0 &&
        <div className='line'>
            <span>
                Container Storage:
            </span>
            <span>
                {accounting.formatMoney(this.formatContainerPrice().storage)}
            </span>
        </div>
        } */}

            {dueOnDelivery.addOns &&
            <React.Fragment>
                {damageWaiver !== 0 &&
                <div className='line'>
                <span>
                    Damage Waiver:
                </span>
                    <span>{accounting.formatMoney(damageWaiver)}
                </span>
                </div>
                }

                {contentsProtection !== 0 &&
                <div className='line'>
                <span>
                    Contents Protection:
                </span>
                    <span> {accounting.formatMoney(contentsProtection)}
                </span>
                </div>
                }

                {dueOnDelivery.addOns.movingKit !== 0 &&
                <div className='line'>
                <span>
                    Moving Kit:
                </span>
                    <span>{movingKit}
                </span>
                </div>
                }

                <div className='line'>
                    <span>Total: </span>
                    {/*<span>{due}</span>*/}
                    <span>{duePrice}</span>
                </div>
            </React.Fragment>
            }
        </React.Fragment>
        )
    }
};
const mapStateToProps = (state) => {
    const { dueOnDelivery1,damageWaiver, contentsProtection, deliveryPrice, selectedSize, selectedLocation,selectedWarehouse,wareRates,setOrigin_index, warehouse1, warehouse2} = state.mainReducer;
    return {dueOnDelivery1,damageWaiver, contentsProtection, deliveryPrice, selectedSize, selectedLocation,selectedWarehouse,wareRates,setOrigin_index, warehouse1, warehouse2};
};
export default connect(mapStateToProps, {handleInputChange})(DueOnDelivery);
