import React from "react";

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
              <a href="signup.html" className="btn btn-primary">
                Sign up
              </a>
              <a href="login.html" className="btn btn-light">
                Login
              </a>
            </div>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Landing;
