// @flow

import * as React from "react";


type Props = {
    selectedElement: {
        _id: string,
        name: string,
        vicinity: number,
        loc: Array<Number>,
        icon: string,
    },
    deletePlace: (_id: string) => {}
}

type State = {}
export class StatusBar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    render() {
        const {selectedElement} = this.props;
        return (
            <div className = "statusBar">
                <div className="info">
                    <h1>{selectedElement && selectedElement.name}</h1>
                    <h3>{selectedElement && selectedElement.vicinity}</h3>
                    <span>Long:{selectedElement && selectedElement.loc[0].toFixed(2)}</span>
                    <span>Lat:{selectedElement && selectedElement.loc[1].toFixed(2)}</span>
                </div>
                {selectedElement && <img src={selectedElement.icon}/>}
                <div>
                <button
                onClick={() => this.props.deletePlace(selectedElement._id)}
                >Hide This Place</button>
                </div>
            </div>
        );
    }
}

export default StatusBar;
