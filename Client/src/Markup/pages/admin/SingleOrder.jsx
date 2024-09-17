import React from "react";
import DetailSingleOrder from "../../Components/Admin/DetailSingleOrder/DetailSingleOrder";
import AdminMenu from "../../Components/Admin/AdminMenu/AdminMenu";

function SingleOrder() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <DetailSingleOrder />
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleOrder;
