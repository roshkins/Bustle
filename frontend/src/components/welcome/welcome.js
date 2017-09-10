import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./welcome.css";

class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <h1>Bustle</h1>
        <h2>instant ride pairing with friendly commuters</h2>
        <label>
          {" "}name
          <input
            type="text"
            onChange={e => {
              this.props.changeName(e.target.value);
            }}
          />
        </label>
        <Link to="/app/search">
          <button>Sign In</button>
        </Link>
      </div>
    );
  }
}

Welcome.propTypes = {
  changeName: PropTypes.func.isRequired
};

export default Welcome;
