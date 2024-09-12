import React from "react";
import AdminMenu from "../../Components/Admin/AdminMenu/AdminMenu";

// import AddCustomer from "../../Components/Admin/AddCustomer/AddCustomer";
import AddCustomerForm from "../../Components/Admin/AddCustomer/AddCustomerForm";

function Addcustomer() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <AddCustomerForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default Addcustomer;
