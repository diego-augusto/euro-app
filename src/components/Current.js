import React, { Component } from 'react';
import euro from "../api/euro";
import moment from 'moment';

class Current extends Component {

    constructor(props) {
        super(props)

        this.state = {
            today: ""
        }
    }

    componentDidMount() {
        var today = moment(new Date()).format('DD-MM-YYYY');
        euro.get('/euros/' + today)
            .then(res => {
                this.setState({ today: res.data.value.toString() })
            })
    }

    render() {
        return (
            <div>
                <div className="ui center aligned segment">
                    <p>(Cotação Atual)</p>
                    <h2>EUR 1,00 - R$ {this.state.today.replace('.', ',')}</h2>
                </div>
            </div>
        )
    }
}

export default Current