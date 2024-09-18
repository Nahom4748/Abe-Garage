import React from "react";
import EmployeeMenu from "../../../Components/Employee/EmployeeMenu/EmployeeMenu";
import EmployeeHistory from "../../../Components/Employee/Taskhistory/EmployeeHistory";

function TaskHistory() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <EmployeeMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <EmployeeHistory />
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskHistory;
