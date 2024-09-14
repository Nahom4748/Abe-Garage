import React from "react";
import AdminMenu from "../../Components/Admin/AdminMenu/AdminMenu";
import OrderStepper from "../../Components/Admin/NewOrder/OrderStepper";
function NewOrder() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <OrderStepper />
          </div>
        </div>
      </div>
    </>
  );
}

export default NewOrder;
