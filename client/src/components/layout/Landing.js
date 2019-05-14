import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">
            <p className="lead">
              Get your business trip expenses reimbursed with zero effort!
            </p>
            <div className="buttons">
              <Link to="/signup" className="btn btn-primary">
                Sign up
              </Link>
              <Link to="/login" className="btn btn-light">
                Login
              </Link>
            </div>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Landing;
