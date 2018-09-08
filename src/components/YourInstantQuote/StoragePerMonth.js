import React from "react";
import {connect} from 'react-redux';
import {handleInputChange} from "../../Actions";

class StoragePerMonth extends React.Component {
    render() {
        const { rental, selectedSize} = this.props;
        return (
            <React.Fragment>
                <div className="line">
        <span>
          <strong>Storage per Month:</strong>
        </span>
                </div>
                <div className="line">
                    <span>Container rental ({selectedSize==='c16'? "16'": "20'"}) :</span>
                    <span style={{float: 'right', textAlign: 'right'}}>{rental}</span>
                </div>
            </React.Fragment>
        );
    }
};
const mapStateToProps = (state) => {
    const { selectedSize} = state.mainReducer;
    return {selectedSize};
};
export default connect(mapStateToProps, {handleInputChange})(StoragePerMonth);

