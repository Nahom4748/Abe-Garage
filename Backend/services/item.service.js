const db = require("../config/db.config");

// A function to check if an item exists
async function checkIfItemExists(item_name) {
  // Check if the item already exists in the garage_purchases table
  const query = `SELECT * FROM garage_purchases WHERE item_name = ?`;
  const rows = await db.query(query, [item_name]);
  console.log(rows);

  if (rows.length > 0) {
    return true;
  } else {
    return false;
  }
}

// A function to create an item (garage purchase)
async function createItem(item) {
  let createdItem = {};
  try {
    // Insert into the garage_purchases table
    const query = `
      INSERT INTO garage_purchases (item_name, quantity, price, purchase_date, image_url) 
      VALUES (?, ?, ?, ?, ?)`;

    const rows = await db.query(query, [
      item.item_name,
      item.quantity,
      item.price,
      item.purchase_date,
      item.image_url, // Assuming you're using the image URL approach
    ]);

    if (rows.affectedRows !== 1) {
      return false;
    }

    const item_id = rows.insertId;

    // Construct the item object to return
    createdItem = {
      item_id,
      item_name: item.item_name,
      quantity: item.quantity,
      price: item.price,
      purchase_date: item.purchase_date,
      image_url: item.image_url,
    };
  } catch (error) {
    console.error("Error creating item:", error);
    return false;
  }

  // Return the created item
  return createdItem;
}

// A function to get all items (garage purchases)
async function getAllItems() {
  console.log("Fetching all items");

  const query = `
    SELECT * 
    FROM garage_purchases
    ORDER BY id DESC`; // Fetch all items, ordered by the latest first

  try {
    const rows = await db.query(query);
    console.log("Query result (rows):", rows); // Ensure it logs an array of objects
    return rows;
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
}

// A function to get an item by name (garage purchase)
async function getItemByName(item_name) {
  console.log("Searching for item with name:", item_name); // Log the item name

  const query = `SELECT * FROM garage_purchases WHERE item_name = ?`;

  try {
    const [rows] = await db.query(query, [item_name]);
    console.log("Query Results:", rows); // Log the raw query results

    if (rows.length === 0) {
      return null; // Item not found
    }

    return rows[0]; // Return the first (and only) row
  } catch (error) {
    console.error("Error fetching item:", error); // Log any errors
    return null;
  }
}

// Export the functions
module.exports = {
  checkIfItemExists,
  createItem,
  getAllItems,
  getItemByName,
};
