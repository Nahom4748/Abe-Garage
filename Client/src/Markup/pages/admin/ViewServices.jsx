import React from "react";
import AdminMenu from "../../Components/Admin/AdminMenu/AdminMenu";
import ServiceManagment from "../../Components/Admin/ServiceManagment/ServiceManagment";

function ViewServices() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <ServiceManagment />
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewServices;
