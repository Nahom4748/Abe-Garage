import React from "react";
import AdminMenu from "../../Components/Admin/AdminMenu/AdminMenu";
<<<<<<< HEAD
import AddCustomerForm from "../../Components/Admin/AddCustomer/AddCustomerForm";
=======
import AddCustomer from "../../Components/Admin/AddCustomer/AddCustomer";
>>>>>>> 5501dedc74602ac902b417b23852dee02ba91de3

function Addcustomer() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
<<<<<<< HEAD
            <AddCustomerForm />
=======
            <AddCustomer />
>>>>>>> 5501dedc74602ac902b417b23852dee02ba91de3
          </div>
        </div>
      </div>
    </>
  );
}

export default Addcustomer;
