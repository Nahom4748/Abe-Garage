import React from "react";
import ManagerMenu from "../../Components/Manager/ManagerMenu/ManagerMenu";

function CustomersManager() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <ManagerMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <h1>Customer</h1>{" "}
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomersManager;
