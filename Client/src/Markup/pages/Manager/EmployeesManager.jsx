import React from "react";
import ManagerMenu from "../../Components/Manager/ManagerMenu/ManagerMenu";
import EmployeesList from "../../Components/Admin/EmployeesList/EmployeesList";

function EmployeesManager() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <ManagerMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <EmployeesList />
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeesManager;
