import React from "react";
import EmployeeMenu from "../../../Components/Employee/EmployeeMenu/EmployeeMenu";
import EmpProfile from "../../../Components/Employee/EmpProfile/EmpProfile";

function EmployeePofile() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <EmployeeMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <EmpProfile />
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeePofile;
