import React from 'react';

class RoutesBing extends React.Component {
    constructor(props) {
        super(props);
        console.log('bing props', props);
    }

    render() {
        const {bing} = this.props;

        if(bing===null) return;

        let instructions = null;
        let  items = bing.itineraryItems;
        instructions = items.map(item=>{
            return item.instruction.text
        });

        let truckmiles;
        if(instructions!==null) {
            truckmiles = instructions.map((item, index)=>{
                return <li key={index}>{item}</li>
            })
        }

        return (
            <React.Fragment>
                <div className="line"><span><strong>Truckmiles:</strong></span></div>

                <ul>
                    {truckmiles}
                </ul>
                <hr />
            </React.Fragment>
        )
    }
}

export default RoutesBing;
