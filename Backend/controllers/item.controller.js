const itemService = require("../services/item.service");

// Create the add item controller
async function createItem(req, res, next) {
  try {
    // Get the item data from the request body
    const itemData = req.body;
    console.log("Item data:", itemData);

    // Call the createItem method from the item service
    const item = await itemService.createItem(itemData);
    console.log("Item created:", item);

    if (!item) {
      return res.status(400).json({ error: "Item not created" });
    } else {
      return res
        .status(201)
        .json({ message: "Item created successfully", success: "true" });
    }
  } catch (error) {
    // Send the error as a response with a more descriptive message
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An error occurred while creating the item.",
    });
  }
}

// Create a function to get all items
async function getAllItems(req, res, next) {
  try {
    // Call the getAllItems method from the item service
    const items = await itemService.getAllItems();
    if (!items || items.length === 0) {
      return res.status(404).json({ error: "No items found." });
    }

    // Send the items as a response
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items in controller:", error);
    // Send the error as a response
    res.status(500).json({
      error: "Internal Server Error",
      message: "An error occurred while fetching the items.",
    });
  }
}

// Create a function to get an item by name
async function getItemByName(req, res, next) {
  try {
    // Get the item name from the request parameters
    const item_name = req.params.item_name;
    console.log("Item name:", item_name);

    // Call the getItemByName method from the item service
    const item = await itemService.getItemByName(item_name);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    } else {
      return res.status(200).json(item);
    }
  } catch (error) {
    // Send the error as a response with a more descriptive message
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An error occurred while fetching the item.",
    });
  }
}

// Export the createItem and getAllItems functions
module.exports = {
  createItem,
  getAllItems,
  getItemByName,
};
