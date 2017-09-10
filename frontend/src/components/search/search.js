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
        {this.props.completedSearch
          ? <div>
              <Link to="/app/driver">
                <button>Drive</button>
              </Link>
              <Link to="/app/passenger">
                <button>Ride</button>
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
