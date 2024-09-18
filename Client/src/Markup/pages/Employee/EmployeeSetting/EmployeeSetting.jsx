import React from "react";
import EmployeeMenu from "../../../Components/Employee/EmployeeMenu/EmployeeMenu";
import EmpSetting from "../../../Components/Employee/EmpSetting/EmpSetting";
function EmployeeSetting() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <EmployeeMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <EmpSetting />
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeSetting;
