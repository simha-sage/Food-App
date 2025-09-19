// routes/restaurant.js
import express from "express";
import Restaurant from "../models/restaurantSchema.js";

const router = express.Router();

// POST: Create a new restaurant
router.post("/create", async (req, res) => {
  try {
    const {
      name,
      ownerName,
      phoneNumber,
      email,
      location,
      restaurantType,
      cuisines,
      openingHours,
      closingHours,
      media,
    } = req.body;

    // Create new restaurant document
    const newRestaurant = new Restaurant({
      name,
      ownerName,
      phoneNumber,
      email,
      location,
      restaurantType,
      cuisines,
      openingHours,
      closingHours,
      media,
      dishes: [], // empty by default
    });

    await newRestaurant.save();
    console.log("success");
    res.status(201).json({
      success: true,
      message: "Restaurant created successfully",
      data: newRestaurant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
});

router.post("/:restaurantId/addDish", async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { name, price, description, category, isAvailable, image } = req.body;

    // Validate required fields
    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, price, and category are required",
      });
    }

    // Step 1: Find the restaurant
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    // Step 2: Check if category already exists
    let categoryObj = restaurant.categories.find(
      (cat) => cat.title.toLowerCase() === category.toLowerCase()
    );

    // Step 3: If category doesn’t exist, create it
    if (!categoryObj) {
      // Create a new subdocument using Mongoose model
      categoryObj = restaurant.categories.create({
        title: category,
        dishes: [],
      });
      restaurant.categories.push(categoryObj);
    }

    // Now push dish normally
    categoryObj.dishes.push({
      name,
      price,
      description,
      isAvailable: isAvailable ?? true,
      image,
    });

    // Step 5: Save changes
    await restaurant.save();

    res.status(200).json({
      success: true,
      message: `Dish added successfully under ${category}`,
      data: restaurant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
});

router.get("/all", async (req, res) => {
  try {
    const restaurants = await Restaurant.find(); // fetch all restaurants
    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
});

router.delete("/restaurants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Restaurant.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting restaurant", error });
  }
});

// DELETE /restaurants/:restaurantId/dishes/:dishId
router.delete(
  "/restaurants/:restaurantId/:categoryId/:dishId",
  async (req, res) => {
    try {
      const { restaurantId, categoryId, dishId } = req.params;

      const updatedRestaurant = await Restaurant.findOneAndUpdate(
        { _id: restaurantId, "categories._id": categoryId },
        { $pull: { "categories.$.dishes": { _id: dishId } } },
        { new: true }
      );

      if (!updatedRestaurant) {
        return res
          .status(404)
          .json({ message: "Restaurant or category not found" });
      }

      res.json({
        message: "Dish removed successfully",
        restaurant: updatedRestaurant,
      });
    } catch (error) {
      res.status(500).json({ message: "Error deleting dish", error });
    }
  }
);

export default router;
