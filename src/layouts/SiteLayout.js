import React from "react";

export default function SiteLayout({ children, menu = (c) => null }) {
  return (
    <div className="site-container">
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">
            {/* <img src="/favicon.ico" alt="Logo" width="30" height="24" class="d-inline-block align-text-top" /> */}
            スーパー銭湯
          </a>
        </div>
      </nav>
      <div className="d-flex justify-content-center text-center">
        <div>{menu()}</div>
        <div>{children}</div>
      </div>
    </div>
  );
}
