import React from "react";
import ManagerMenu from "../../Components/Manager/ManagerMenu/ManagerMenu";
import Listorder from "../../Components/Admin/ListOrder/Listorder";

function OrdersManager() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <ManagerMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <Listorder />
          </div>
        </div>
      </div>
    </>
  );
}

export default OrdersManager;
