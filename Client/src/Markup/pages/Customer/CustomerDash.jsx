import React from "react";
import CustumerMenu from "../../Components/CustomerPage/CustomerMenu/CustumerMenu";

function CustomerDash() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <CustumerMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <h1>Customer</h1>{" "}
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerDash;
