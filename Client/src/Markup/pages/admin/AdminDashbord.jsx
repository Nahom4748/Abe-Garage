import React from "react";
import AdminMenu from "../../Components/Admin/AdminMenu/AdminMenu";
import AdminDashboard from "../../Components/Admin/AdminDashboard/AdminDashboard";

function AdminDashbord() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <AdminDashboard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashbord;
