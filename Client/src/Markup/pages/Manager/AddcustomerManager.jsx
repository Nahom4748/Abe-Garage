import React from "react";
import ManagerMenu from "../../Components/Manager/ManagerMenu/ManagerMenu";
import AddCustomer from "../../Components/Admin/AddCustomer/AddCustomer";

function AddcustomerManager() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <ManagerMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <AddCustomer />
          </div>
        </div>
      </div>
    </>
  );
}

export default AddcustomerManager;
