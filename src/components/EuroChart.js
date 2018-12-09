import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class EuroChart extends Component {
    render() {
        return (
            <div>
                <div>
                    <Line data={this.props.data} options={this.props.options} />
                </div>
            </div>
        )
    }
}

export default EuroChart