import React from "react";
import AdminMenu from "../../Components/Admin/AdminMenu/AdminMenu";
import AdminDashboard from "../../Components/Admin/AdminDashboard/AdminDashboard";
import EmployeeStatsChart from "../../Components/EmployeeStatsChart/EmployeeStatsChart";

function AdminDashbord() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side p-2">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side p-0 m-0">
            <EmployeeStatsChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashbord;
