import React from "react";
import AdminMenu from "../../Components/Admin/AdminMenu/AdminMenu";

function Orders() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <h1>Orders</h1>{" "}
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;
