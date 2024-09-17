import React from "react";
import EmployeeMenu from "../../Components/Employee/EmployeeMenu/EmployeeMenu";
function EmployeeDash() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <EmployeeMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <h1>Employee Dashboard</h1>{" "}
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeDash;
