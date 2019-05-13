import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <a href="index.html">
          <i className="fas fa-receipt" /> Expenses
        </a>
      </h1>
      <ul>
        <li>
          <a href="profiles.html">Employees</a>
        </li>
        <li>
          <a href="signup.html">Sign up</a>
        </li>
        <li>
          <a href="login.html">Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
