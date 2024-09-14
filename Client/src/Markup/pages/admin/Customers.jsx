import React from "react";
import AdminMenu from "../../Components/Admin/AdminMenu/AdminMenu";
import CustomersList from "../../Components/Admin/CustomersList/CustomersList";
// import CustomerEdit from "./CustomerEdit";

function Customers() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            
            <CustomersList />
            {/* <CustomerEdit /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Customers;
