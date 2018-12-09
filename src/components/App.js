import React, { Component } from 'react';
import Euro from "../api/Euro";
import SearchBar from './SearchBar'
import EuroChart from './EuroChart'
import Current from './Current'
import moment from 'moment';

const options = {
    title: {
        display: true,
        text: 'Cotação do Euro'
    },
    legend: {
        display: false
    }
}

const data = {
    datasets: [
        {
            label: 'Euro',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
        }
    ]
};

class App extends Component {

    state = {
        data: {},
        options: options
    }

    onSearchSubmit = async dates => {
        const response = await Euro.get('/euros', { params: dates })
        const mdates = response.data.map(data => data.date)
        const values = response.data.map(data => data.value)
        data.labels = mdates
        data.datasets[0].data = values
        this.setState({ data: data })
    }

    async componentDidMount() {
        const today = moment(new Date())
        const endDate = today.format('DD-MM-YYYY');
        const startDate = today.subtract(30, 'day').format('DD-MM-YYYY');
        const response = await Euro.get('/euros', { params: { startDate: startDate, endDate: endDate } })
        const dates = response.data.map(data => data.date)
        const values = response.data.map(data => data.value)
        data.labels = dates
        data.datasets[0].data = values
        this.setState({ data: data })
    }

    render() {
        return (
            <div>
                <h1 className="ui block header" style={{textAlign:'center'}}>Cotação do Euro</h1>
                <div className="ui container" style={{ marginTop: '10px' }}>
                    <Current />
                    <SearchBar onSubmit={this.onSearchSubmit} />
                    <EuroChart data={this.state.data} options={this.state.options} />
                </div>
                <p className="ui block header" style={{textAlign:'center'}}>&copy; {new Date().getFullYear()} Diego Augusto</p>
            </div>
        )
    }
}

export default App