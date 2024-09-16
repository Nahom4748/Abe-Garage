import React from "react";
import AdminMenu from "../../Components/Admin/AdminMenu/AdminMenu";
import Listorder from "../../Components/Admin/ListOrder/Listorder";

function Orders() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <Listorder />
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;
