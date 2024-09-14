import React from "react";

const AssignItems = ({ customer, vehicles }) => {
  return (
    <div>
      <h4>Assign Items</h4>
      <p>Assign items for {customer ? customer.name : "selected customer"}</p>
      {/* Add your form or logic for assigning items */}
    </div>
  );
};

export default AssignItems;
