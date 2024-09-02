import React from "react";
import ManagerMenu from "../../Components/Manager/ManagerMenu/ManagerMenu";
function ManagerDashbord() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <ManagerMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <h1>Manager Dashbord</h1>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashbord;
