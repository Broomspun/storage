import React from 'react';

class TollsGuru extends React.Component {
    constructor(props) {
        super(props);
        console.log('tollguru props', props);
    }

    render() {
        const {tollguru, tollRouteNo} = this.props;

        if(tollguru===null) return;

        let tolls;

        if(tollguru[tollRouteNo]!==null) {
            tolls = tollguru[tollRouteNo].tolls.map((item, index)=>{
                return <li key={index}>{item.prepaidCardCost} ({item.road || 'end: '+item.end.road})</li>
            })
        }

        let routes;
        if(tollguru[tollRouteNo]!==null) {
            routes = tollguru[tollRouteNo].directions.map((item, index)=>{
                return <li key={index} dangerouslySetInnerHTML={{__html: item.html_instructions}} />
            })
        }


        return (
            <React.Fragment>
                <div className="line"><span><strong>Toll:</strong></span></div>
                <div className="line">
                    <span>Toll Price:</span>
                    <ul>
                        {tolls}
                    </ul>
                </div>
                <div className="line">
                    <span>Total toll Price:</span>
                    <span>${(Math.ceil(tollguru[tollRouteNo].costs.prepaidCard * 2) / 2).toFixed(2)}</span>
                </div>
                <hr />
            </React.Fragment>
        )
    }
}
`   `
export default TollsGuru;
