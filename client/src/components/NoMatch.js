import React from "react";

export default function NoMatch({ location }) {
  return (
    <section className="hero is-dark is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-6-tablet is-5-desktop is-4-widescreen">
              <div className="notification is-danger has-text-centered">
                <span>No matching route found:</span>
                <div>
                  <code>{location.pathname}</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
