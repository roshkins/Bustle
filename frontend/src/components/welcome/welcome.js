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
        <form>
          <input
            placeholder='username'
            type="text"
            onChange={e => {
              this.props.changeName(e.target.value);
            }}
          />
          <Link to="/app/search">
            <button>Sign In</button>
          </Link>
        </form>
      </div>
    );
  }
}

Welcome.propTypes = {
  changeName: PropTypes.func.isRequired
};

export default Welcome;
