// @flow

import * as React from 'react';
import Map from '../../components/Map';

type Props = {
};

type State = {
    markers: Object,
    selectedElement: Object
}

export class Dashboard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            markers: [
            ],
            selectedElement: null
        };
    }

    render() {
        return(
            <div>
                <Map
                    select = {(el) => this.setState({ selectedElement: el })}
                    markers ={this.state.markers} />
            </div>
        );
    }
}

export default Dashboard;
