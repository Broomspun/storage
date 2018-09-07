import React from "react";
import accounting from "accounting-js";
class Service extends React.Component {
  constructor(props) {
    super(props);

    this.formatText = this.formatText.bind(this);
  }

  formatText(text) {
    let formatted;

    switch (text) {
      case "both":
        formatted = "Moving and Storage";
        break;
      case "moving":
        formatted = "Moving";
        break;
      case "storage":
        formatted = "Storage";
        break;
      default:
        formatted = "";
        break;
    }
    return formatted;
  }

  render() {
    const {
      selectedService,
      selectedLocation,
      deliverTo,
      returnFrom,
      deliveryPrice
    } = this.props;

    return (
      <React.Fragment>
        <div className="line">
          <span>
            <strong>Service:</strong>
          </span>
          <span>
            <strong>{this.formatText(selectedService)}</strong>

            {/* service is storage */}
            {selectedService === "storage" && (
              <React.Fragment>
                {/* storage location is warehouse */}
                {selectedLocation === "warehouse" && (
                  <span> (in our warehouse)</span>
                )}

                {/* storage location is mine */}
                {selectedLocation === "mine" && <span> (at my location)</span>}
              </React.Fragment>
            )}

            {/* service is both */}
            {selectedService === "both" && (
              <React.Fragment>
                {/* storage location is warehouse */}
                {selectedLocation === "warehouse" && (
                  <span> (in our warehouse)</span>
                )}

                {/* storage location is mine */}
                {selectedLocation === "mine" && <span> (at my location)</span>}
              </React.Fragment>
            )}
          </span>
        </div>

        <div className="line r-align" style={{ clear: "both" }}>
          Deliver to {deliverTo}
        </div>

        {/* service is storage */}
        {selectedService === "storage" && (
          <React.Fragment>
            {/* location is warehouse */}
            {selectedLocation === "warehouse" && (
              <React.Fragment>
                <div className="line r-align" style={{ clear: "both" }}>
                  Store at this location
                </div>
                <div className="line r-align" style={{ clear: "both" }}>
                  Transport to iCan Facility
                </div>
                <div className="line r-align" style={{ clear: "both" }}>
                  Store at iCan Facility
                </div>
                <div className="line r-align" style={{ clear: "both" }}>
                    Transport to {deliverTo}
                </div>
                <div className="line r-align" style={{ clear: "both" }}>
                  Store at this location
                </div>
              </React.Fragment>
            )}
            {/* location is mine */}
            {selectedLocation === "mine" && (
              <div className="line r-align" style={{ clear: "both" }}>
                Store at this location
              </div>
            )}
          </React.Fragment>
        )}

        {/* service is both */}
        {selectedService === "both" && (
          <React.Fragment>
            <div className="line r-align" style={{ clear: "both" }}>
              Store at this location
            </div>
            {/* location is warehouse */}
            {selectedLocation === "warehouse" && (
              <React.Fragment>
                <div className="line r-align" style={{ clear: "both" }}>
                    Transport to iCan Facility
                </div>
                <div className="line r-align" style={{ clear: "both" }}>
                  Store at iCan Facility
                </div>
              </React.Fragment>
            )}
            <div className="line r-align" style={{ clear: "both" }}>
                Transport to {returnFrom}
            </div>
            <div className="line r-align" style={{ clear: "both" }}>
              Store at this location
            </div>
          </React.Fragment>
        )}

        {/* Service is moving */}
        {selectedService === "moving" && (
          <React.Fragment>
            <div className="line r-align" style={{ clear: "both" }}>
              Store at this location
            </div>
            <div className="line r-align" style={{ clear: "both" }}>
                Transport to {returnFrom}
            </div>
            <div className="line r-align" style={{ clear: "both" }}>
              Store at this location
            </div>
          </React.Fragment>
        )}

        <div className="line r-align" style={{ clear: "both" }}>
          Return container
        </div>
        <hr />
          <div className="line"><span><strong>Initial Delivery to {deliverTo} :</strong></span></div>
          <div className="line"><span>Delivery:</span><span>{accounting.formatMoney(deliveryPrice)}</span></div>
      </React.Fragment>
    );
  }
}

export default Service;
