import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./search.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryWords: ""
    };
  }
  componentDidMount() {
    this.searchField.focus();
  }

  updateField(e) {
    this.setState({ queryWords: e.target.value });
  }
  createDriverRoute() {}
  createPassengerRoute() {}

  render() {
    console.log(this.props.destination)
    return (
      <div className="search">
        <form
          onSubmit={e => {
            e.preventDefault();
            this.props.searchDestination(this.state.queryWords);
          }}
        >
          <label>
            <input
              ref={input => {
                this.searchField = input;
              }}
              onChange={this.updateField.bind(this)}
              name="destination"
              type="text"
            />
          </label>
          <input value="search" type="submit" />
        </form>
        {this.props.destination
          ? <div className = "drive-ride-buttons">
              <p>{this.state.queryWords}</p>
              <Link to="/app/driver">
                <button onClick={this.props.sendDriver}>
                  Drive</button>
              </Link>
              <Link to="/app/passenger">
                <button onClick={this.props.sendPassenger}>
                  Ride</button>
              </Link>
            </div>
          : <span />}
      </div>
    );
  }
}

Search.propTypes = {
  destinationChange: PropTypes.func.isRequired,
  searchDestination: PropTypes.func.isRequired,
  completedSearch: PropTypes.bool.isRequired
};
export default Search;
