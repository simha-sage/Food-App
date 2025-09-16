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
    if (!name || !price) {
      return res
        .status(400)
        .json({ success: false, message: "Name and price are required" });
    }

    // Push new dish into restaurant's dishes array
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      {
        $push: {
          dishes: {
            name,
            price,
            description,
            category,
            isAvailable: isAvailable ?? true,
            image,
          },
        },
      },
      { new: true } // return updated document
    );

    if (!updatedRestaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    res.status(200).json({
      success: true,
      message: "Dish added successfully",
      data: updatedRestaurant,
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
router.delete("/restaurants/:restaurantId/dishes/:dishId", async (req, res) => {
  try {
    const { restaurantId, dishId } = req.params;

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { $pull: { dishes: { _id: dishId } } }, // remove dish
      { new: true } // return updated restaurant
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json({
      message: "Dish removed successfully",
      restaurant: updatedRestaurant,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting dish", error });
  }
});

export default router;
