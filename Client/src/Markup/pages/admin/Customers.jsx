import React from "react";
import AdminMenu from "../../Components/Admin/AdminMenu/AdminMenu";
import CustomersList from "../../Components/Admin/CustomersList/CustomersList";

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
          </div>
        </div>
      </div>
    </>
  );
}

export default Customers;
