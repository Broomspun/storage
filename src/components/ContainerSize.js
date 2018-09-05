import React from "react";
import {connect} from 'react-redux';
import Constants from './../Common/Constants'

import classnames from 'classnames';
import {handleSizeSelection} from "../Actions";

class ContainerSize extends React.Component {
    constructor(props) {
        super(props);
        console.log('tollguru props', props);
    }

    componentDidUpdate(){
    }

    render() {
        const  {c16, c20, selectedSize, selectedService, selectedLocation} = this.props;
        const disableChecker = (selectedService, selectedLocation) => {
            if (selectedService === 'moving' || selectedService === 'both') {
                return true;
            }
            else if (selectedService === 'storage' && selectedLocation === 'warehouse') {
                return true;
            } else {
                return false;
            }
        }

        const c16Btn = classnames({
            'btn': true,
            'container-box': true,
            'text-center': true,
            'btn-success': selectedSize === 'c16' ? true : false,
            'btn-default': selectedSize !== 'c16' ? true : false
        });

        const c20Btn = classnames({
            'btn': true,
            'container-box': true,
            'text-center': true,
            'btn-success': selectedSize === 'c20' ? true : false,
            'btn-default': selectedSize !== 'c20' ? true : false,
            // 'disabled': selectedService === 'moving' || selectedService === 'both' ? true : false,
            'disabled': disableChecker(selectedService, selectedLocation)
        });

        return (
            <React.Fragment>
                <h5>
                    Container size:
                </h5>
                <div className='container-wrap'>
                    <div className={c16Btn} onClick={()=>this.props.handleSizeSelection('c16',selectedService, selectedLocation)}>
                        <h1 className="text-center white">16′</h1>
                        <p>Holds 3-4 rooms</p>
                        <p className='price-16'>${Constants.c16Price}.00/month</p>
                        {!c16 && <p className='unavailable'>Currently unavailable</p>}
                    </div>
                </div>
                <div className='container-wrap'>
                    <div className={c20Btn} onClick={()=>this.props.handleSizeSelection('c20',selectedService, selectedLocation)}>
                        <h1 className="text-center white">20′</h1>
                        <p>Holds 4-5 rooms</p>
                        <p className='price-20'>${Constants.c20Price}.00/month</p>
                        {!c20 && <p className='unavailable'>Currently unavailable</p>}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    const {  damageWaiverSelected, contentsProtectionSelected,damageWaiver, contentsProtection,selectedSize
    } = state.mainReducer;
    return {damageWaiverSelected, contentsProtectionSelected,damageWaiver, contentsProtection,selectedSize};
};
export default connect(mapStateToProps, {handleSizeSelection})(ContainerSize);

