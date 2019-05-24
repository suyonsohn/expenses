import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logOut } from "../../actions/auth";

const Navbar = ({ logOut, auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <ul>
      <li>
        <a onClick={logOut} href="/">
          <i className="fas fa-sign-out-alt" />
          <span className="hide-sm"> Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/">Employees</Link>
      </li>
      <li>
        <Link to="/signup">Sign up</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-receipt" /> Expenses
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logOut: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logOut }
)(Navbar);
