import React from "react";
import AdminMenu from "../../Components/Admin/AdminMenu/AdminMenu";
import EmployeesList from "../../Components/Admin/EmployeesList/EmployeesList";

function Employees() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <EmployeesList />
          </div>
        </div>
      </div>
    </>
  );
}

export default Employees;
