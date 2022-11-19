import "./Header.css";
import React, { useState, useEffect } from "react";

function Header() {
  const [userActiveStatus, setUserActiveStatus] = useState();

  useEffect(() => {
    var loginStatus = sessionStorage.getItem("userActiveStatus");
    setUserActiveStatus(loginStatus);
  }, []);

  const logOut = () => {
    sessionStorage.clear();
    window.location = "/";
  };

  return (
    <div>
      <div className=" text-white header" fixed="bottoom">
        <div style={{ display: "flex" }}>
          <h2
            className="headerText"
            onClick={() => {
              if (userActiveStatus) {
                window.location = "/admin-landing";
              } else {
                window.location = "/";
              }
            }}
          >
            TRIPMA ADMIN
          </h2>
          {userActiveStatus ? (
            <button
              onClick={() => logOut()}
              type="button"
              className="btn btn-danger buttonStyle"
            >
              LOGOUT
            </button>
          ) : null}
          {/* <button type="button" className="btn btn-danger buttonStyle">
            LOGOUT
          </button> */}
        </div>
      </div>
    </div>
  );
}
export default Header;
