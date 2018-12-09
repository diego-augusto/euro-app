import React, { Component } from 'react'
import moment from 'moment';

class SearchBar extends Component {

    state = {
        startDate: '',
        endDate: ''
    }

    onSearchClick = () => {
        this.props.onSubmit({
            startDate : moment(this.state.startDate).format('DD-MM-YYYY'),
            endDate : moment(this.state.endDate).format('DD-MM-YYYY'),
        })
    }

    render() {
        return (
            <div className="ui segment">
                <div className="ui center aligned form">
                    <div className="fields">
                        <div className="field">
                            <input type="date"
                                value={this.state.startDate}
                                onChange={e => this.setState({ startDate: e.target.value })} />
                        </div>
                        <div className="field">
                            <input type="date"
                                value={this.state.endDate}
                                onChange={e => this.setState({ endDate: e.target.value })} />
                        </div>
                        <div className="field">
                            <div onClick={this.onSearchClick} className="ui submit button">Pesquisar</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default SearchBar