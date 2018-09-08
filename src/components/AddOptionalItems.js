import React from "react";
import {connect} from 'react-redux';
import {updateAddonPrice, handleInputChange} from "../Actions";


class AddOptionalItems extends React.Component {
  render() {
    const {
      damageWaiverPrice,
      contentsProtectionPrice,
    } = this.props;

    return (
      <React.Fragment>
        <h5>Add optional items:</h5>
        <div className="checkbox abc-checkbox abc-checkbox-success">
          <input
            id="damageWaiverSelected"
            type="checkbox"
            onChange={this.props.handleInputChange}
          />
          <label htmlFor="damage" onClick={this.props.handleInputChange}>
            <div className="bold">
              Damage Waiver - ${damageWaiverPrice}
              /month
            </div>
            <div className="small">
              Protects you in case of damage to the iCan container
            </div>
          </label>
        </div>
        <div className="checkbox abc-checkbox abc-checkbox-success">
          <input
            id="contentsProtectionSelected"
            type="checkbox"
            onChange={this.props.handleInputChange}
          />
          <label htmlFor="protection" onClick={this.props.handleInputChange}>
            <div className="bold">
              Contents Protection 5K – ${contentsProtectionPrice}
              /month
            </div>
            <div className="small">
              Contents Protection protects your stored items up to $5,000
            </div>
          </label>
        </div>
        {/* <div className='checkbox'>
                    <input id='movingKitSelected' type='checkbox' onChange={handleInputChange}/>
                    <label htmlFor='movingKit' onClick={handleInputChange}>
                        <div className='bold'>
                        Moving Kit Rental – ${movingKitPrice}/month
                        </div>
                        <div className="small">iMove kit includes (1) hand truck, (4) moving blankets, (6) tie-down straps & (1) Shoulder Dolly
                        </div>
                    </label>
                </div> */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
    const {  damageWaiverSelected, contentsProtectionSelected,damageWaiver, contentsProtection,
        damageWaiverPrice,contentsProtectionPrice
    } = state.mainReducer;
    return {damageWaiverSelected, contentsProtectionSelected,damageWaiver, contentsProtection,
        damageWaiverPrice,contentsProtectionPrice
    };
};
export default connect(mapStateToProps, {handleInputChange})(AddOptionalItems);
// export default AddOptionalItems;
