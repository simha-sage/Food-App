import { useState, useEffect } from "react";
import { useSwiggy } from "../context/SwiggyContext";
const Restaurants = ({ setCurrentMain, setSelectRestaurant }) => {
  const { restaurants, setRestaurants } = useSwiggy();
  const AddingForm = () => {
    //basic info
    const [restaurantName, setRestaurantName] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    //location
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    //details
    const [restaurantType, setRestaurantType] = useState("");
    const [openingHours, setOpeningHours] = useState("");
    const [closingHours, setClosingHours] = useState("");
    //media
    const [logo, setLogo] = useState(null);
    const [coverPhoto, setCoverPhoto] = useState(null);
    const saveRestaurant = async () => {
      try {
        const uploadToClodinary = async (file) => {
          const mediaData = new FormData();
          mediaData.append("file", file);
          mediaData.append("upload_preset", "resraurant");
          mediaData.append("cloud_name", "dwmatbjdw");
          const res = await fetch(
            "https://api.cloudinary.com/v1_1/dwmatbjdw/image/upload",
            {
              method: "POST",
              body: mediaData,
            }
          );
          const data = await res.json();
          return data.secure_url;
        };
        const [logoUrl, coverPhotoUrl] = await Promise.all([
          uploadToClodinary(logo),
          uploadToClodinary(coverPhoto),
        ]);

        const response = await fetch(
          "http://localhost:5000/api/restaurant/create",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: restaurantName,
              ownerName,
              phoneNumber,
              email,
              location: { city, pincode },
              restaurantType,
              openingHours,
              closingHours,
              media: {
                logo: logoUrl,
                coverPhoto: coverPhotoUrl,
              },
            }),
          }
        );
        const data = await response.json();
        if (data.success) {
          alert("restaurant created successfully");
          setRestaurants((prev) => [...prev, data.data]);
          setCurrentMain(() => Restaurants);
        } else {
          alert("failed to create restaurant");
        }
      } catch (err) {
        console.error(err);
      }
    };
    return (
      <div className="p-8">
        <p className="font-extrabold text-2xl mb-6">Create New Restaurant</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveRestaurant();
          }}
        >
          {/* Basic Info */}
          <div className="flex flex-col w-1/2 mx-auto p-6 bg-white shadow-lg rounded-lg mb-6">
            <p className="font-bold text-lg mb-4">Basic Info</p>

            <div className="flex items-center gap-4 mb-3">
              <label className="w-40 font-medium">Restaurant Name</label>
              <input
                className="border rounded px-3 py-2 flex-1"
                type="text"
                value={restaurantName}
                required
                onChange={(e) => {
                  setRestaurantName(e.target.value);
                }}
              />
            </div>

            <div className="flex items-center gap-4 mb-3">
              <label className="w-40 font-medium">Owner Name</label>
              <input
                className="border rounded px-3 py-2 flex-1"
                type="text"
                value={ownerName}
                required
                onChange={(e) => {
                  setOwnerName(e.target.value);
                }}
              />
            </div>

            <div className="flex items-center gap-4 mb-3">
              <label className="w-40 font-medium">Phone Number</label>
              <input
                className="border rounded px-3 py-2 flex-1"
                type="text"
                value={phoneNumber}
                required
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
            </div>

            <div className="flex items-center gap-4 mb-3">
              <label className="w-40 font-medium">Email</label>
              <input
                className="border rounded px-3 py-2 flex-1"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col w-1/2 mx-auto p-6 bg-white shadow-lg rounded-lg mb-6">
            <p className="font-bold text-lg mb-4">Location</p>

            <div className="flex items-center gap-4 mb-3">
              <label className="w-40 font-medium">City</label>
              <input
                className="border rounded px-3 py-2 flex-1"
                type="text"
                value={city}
                required
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </div>

            <div className="flex items-center gap-4 mb-3">
              <label className="w-40 font-medium">Pincode</label>
              <input
                className="border rounded px-3 py-2 flex-1"
                type="text"
                value={pincode}
                required
                onChange={(e) => {
                  setPincode(e.target.value);
                }}
              />
            </div>
          </div>

          {/* Restaurant Details */}
          <div className="flex flex-col w-1/2 mx-auto p-6 bg-white shadow-lg rounded-lg mb-6">
            <p className="font-bold text-lg mb-4">Restaurant Details</p>

            <div className="flex items-center gap-4 mb-3">
              <label className="w-40 font-medium">Restaurant Type</label>
              <input
                className="border rounded px-3 py-2 flex-1"
                type="text"
                value={restaurantType}
                required
                onChange={(e) => {
                  setRestaurantType(e.target.value);
                }}
              />
            </div>

            <div className="flex items-center gap-4 mb-3">
              <label className="w-40 font-medium">Opening Hours</label>
              <input
                className="border rounded px-3 py-2 flex-1"
                type="time"
                required
                value={openingHours}
                onChange={(e) => {
                  setOpeningHours(e.target.value);
                }}
              />
            </div>

            <div className="flex items-center gap-4 mb-3">
              <label className="w-40 font-medium">Closing Hours</label>
              <input
                className="border rounded px-3 py-2 flex-1"
                type="time"
                value={closingHours}
                required
                onChange={(e) => {
                  setClosingHours(e.target.value);
                }}
              />
            </div>
          </div>

          {/* Media */}
          <div className="flex flex-col w-1/2 mx-auto p-6 bg-white shadow-lg rounded-lg">
            <p className="font-bold text-lg mb-4">Media</p>

            <div className="flex items-center gap-4 mb-3">
              <label className="w-40 font-medium">Restaurant Logo</label>
              <input
                className="border rounded px-3 py-2 flex-1"
                type="file"
                required
                onChange={(e) => {
                  setLogo(e.target.files[0]);
                }}
              />
            </div>

            <div className="flex items-center gap-4 mb-3">
              <label className="w-40 font-medium">Cover Photo</label>
              <input
                className="border rounded px-3 py-2 flex-1"
                type="file"
                required
                onChange={(e) => {
                  setCoverPhoto(e.target.files[0]);
                }}
              />
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex justify-center gap-6 mt-6">
            <button
              className="bg-amber-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-600 transition"
              type="submit"
            >
              Save Restaurant
            </button>
            <button
              className="bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-500 transition"
              onClick={() => setCurrentMain(() => Restaurants)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Your Restaurants</h2>
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
          onClick={() => setCurrentMain(() => AddingForm)}
        >
          + Add New Restaurant
        </button>
      </div>

      <div className="space-y-2">
        {restaurants.map((data, index) => (
          <p
            key={data._id}
            className="p-3 border rounded-md bg-gray-50 hover:bg-gray-100 transition"
            onClick={() => {
              setSelectRestaurant(data);
              setCurrentMain(() => Dishes);
            }}
          >
            🍴 {data.name}
          </p>
        ))}
      </div>
    </div>
  );
};
const Dishes = ({
  setCurrentMain,
  selectedRestaurant,
  setSelectRestaurant,
}) => {
  const AddDishForm = () => {
    const [dishName, setDishName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const saveDish = async () => {
      if (!dishName || !price) {
        alert("Dish name and price are required");
        return;
      }
      const uploadToClodinary = async (file) => {
        const mediaData = new FormData();
        mediaData.append("file", file);
        mediaData.append("upload_preset", "resraurant");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dwmatbjdw/image/upload",
          {
            method: "POST",
            body: mediaData,
          }
        );
        const data = await res.json();
        return data.secure_url;
      };
      const imgUrl = await uploadToClodinary(image);
      const response = await fetch(
        `http://localhost:5000/api/restaurant/${selectedRestaurant._id}/addDish`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: dishName,
            price: Number(price),
            description,
            category,
            image: imgUrl,
          }),
        }
      );
      const data = await response.json();

      if (data.success) {
        alert("Dish added successfully");
        setSelectRestaurant(data.data);
        console.log(data);
        setCurrentMain(() => Dishes);
      } else {
        alert("Failed to add dish");
      }
    };
    return (
      <div className="p-8">
        <p className="font-extrabold text-2xl mb-6">Add New Dish</p>

        {/* Dish Info */}
        <div className="flex flex-col w-1/2 mx-auto p-6 bg-white shadow-lg rounded-lg mb-6">
          <p className="font-bold text-lg mb-4">Dish Details</p>

          <div className="flex items-center gap-4 mb-3">
            <label className="w-40 font-medium">Dish Name</label>
            <input
              className="border rounded px-3 py-2 flex-1"
              type="text"
              placeholder="Enter dish name"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4 mb-3">
            <label className="w-40 font-medium">Category</label>
            <input
              className="border rounded px-3 py-2 flex-1"
              type="text"
              placeholder="e.g. Starter, Main Course"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4 mb-3">
            <label className="w-40 font-medium">Price</label>
            <input
              className="border rounded px-3 py-2 flex-1"
              type="number"
              placeholder="₹"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4 mb-3">
            <label className="w-40 font-medium">Description</label>
            <textarea
              className="border rounded px-3 py-2 flex-1"
              rows="2"
              placeholder="Short description of dish"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4 mb-3">
            <label className="w-40 font-medium">Dish Image</label>
            <input
              className="border rounded px-3 py-2 flex-1"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-6 mt-6">
          <button
            className="bg-amber-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-600 transition"
            onClick={() => {
              saveDish();
            }}
          >
            Save Dish
          </button>
          <button
            className="bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-500 transition"
            onClick={() => setCurrentMain(() => Dishes)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const [kebab, setKebab] = useState(false);
  const { setRestaurants } = useSwiggy();
  const removeRestaurant = async () => {
    if (confirm(`Do you want remove ${selectedRestaurant.name} `)) {
      await fetch(
        `http://localhost:5000/api/restaurant/restaurants/${selectedRestaurant._id}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => alert(data.message))
        .then(
          setRestaurants((prev) =>
            prev.filter((f) => f._id !== selectedRestaurant._id)
          )
        )
        .then(setCurrentMain(() => Restaurants));
    }
  };
  const removeDish = async (restaurantId, categoryId, dishId) => {
    if (confirm("Are you sure you want to remove this dish?")) {
      const res = await fetch(
        `http://localhost:5000/api/restaurant/restaurants/${restaurantId}/${categoryId}/${dishId}`,
        { method: "DELETE" }
      );

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        // update local state (remove dish)
        setSelectRestaurant((prev) => ({
          ...prev,
          categories: prev.categories.map((category) => ({
            ...category,
            dishes: category.dishes.filter((f) => f._id !== dishId),
          })),
        }));
      } else {
        alert("Error deleting dish");
      }
    }
  };

  return (
    <>
      {selectedRestaurant === null ? (
        <div>
          <p className="font-extrabold text-2xl mb-6">select restaurant</p>
          <button
            className="bg-amber-500 px-4 py-2 rounded-2xl"
            onClick={() => setCurrentMain(() => Restaurants)}
          >
            GO
          </button>
        </div>
      ) : (
        <div className="p-6 bg-white shadow-md rounded-lg">
          {/* Restaurant Title */}
          <div className="flex justify-between items-center mb-6">
            <span className="font-extrabold text-2xl mb-4 text-gray-800">
              {selectedRestaurant.name}
            </span>
            <div className="relative">
              <span
                className="font-extrabold cursor-pointer p-4"
                onClick={() => setKebab(!kebab)}
              >
                ⋮
              </span>
              {kebab && (
                <div className="absolute right-0  mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => removeRestaurant()}
                    className="block w-full text-left px-4 py-2 text-sm text-orange-600 hover:bg-gray-100 rounded-lg"
                  >
                    Remove Restaurant
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Section Title */}
          <p className="font-bold text-lg mb-3 text-gray-700">Your Dishes</p>

          {/* Dishes List */}
          <div className="space-y-3">
            {selectedRestaurant.categories.map((category) => (
              <div key={category.title}>
                {category.dishes.map((dish) => (
                  <div
                    key={dish._id}
                    className="flex justify-between items-center border p-3 rounded-lg hover:bg-gray-50"
                  >
                    <p className="font-medium text-gray-800">{dish.name}</p>
                    <div className="flex gap-3">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        onClick={() =>
                          removeDish(
                            selectedRestaurant._id,
                            category._id,
                            dish._id
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Add Dish Button */}
          <div className="mt-5">
            <button
              className="bg-amber-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-600 transition"
              onClick={() => setCurrentMain(() => AddDishForm)}
            >
              + Add New Dish
            </button>
          </div>
        </div>
      )}
    </>
  );
};
const Categories = ({ selectedRestaurant }) => {
  return (
    <div>
      <div className="space-y-3">
        {selectedRestaurant.categories.map((category) => (
          <div key={category.title}>
            <h2 className="font-bold text-lg mb-2">{category.title}</h2>

            {category.dishes.map((dish) => (
              <div
                key={dish._id}
                className="flex justify-between items-center border p-3 rounded-lg hover:bg-gray-50"
              >
                <p className="font-medium text-gray-800">{dish.name}</p>
                <div className="flex gap-3">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    onClick={() =>
                      removeDish(selectedRestaurant._id, category._id, dish._id)
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
const Orders = () => {
  return <div>Orders</div>;
};
const Reviews = () => {
  return <div>Reviews</div>;
};

const AdminDashboard = () => {
  const [CurrentMain, setCurrentMain] = useState(() => Restaurants);
  const [selectedRestaurant, setSelectRestaurant] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/restaurant/all"); // backend URL
        const data = await res.json();
        if (data.success) {
          setRestaurants(data.data);
        } else {
          console.error("Failed to fetch restaurants");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) return <p>Loading restaurants...</p>;
  return (
    <div className="flex">
      <div className="fixed top-0 left-0 bg-blue-600 text-white w-2/12 h-screen shadow-lg flex flex-col">
        <h1 className="text-center font-extrabold text-xl py-6 border-b border-blue-400">
          Admin Panel
        </h1>

        <nav className="flex-1 mt-4">
          {[
            {
              name: "Restaurants",
              action: () => setCurrentMain(() => Restaurants),
            },
            { name: "Dishes", action: () => setCurrentMain(() => Dishes) },
            {
              name: "Categories",
              action: () => setCurrentMain(() => Categories),
            },
            { name: "Orders", action: () => setCurrentMain(() => Orders) },
            { name: "Reviews", action: () => setCurrentMain(() => Reviews) },
          ].map((item, index) => (
            <p
              key={index}
              className="ml-6 mr-4 my-2 py-2 px-3 font-semibold rounded-lg cursor-pointer transition-colors duration-200 hover:bg-blue-500 hover:text-amber-300"
              onClick={item.action}
            >
              {item.name}
            </p>
          ))}
        </nav>

        <button
          onClick={() => alert("logout")}
          className="m-6 mt-auto py-2 px-4 bg-amber-500 text-blue-900 font-bold rounded-lg hover:bg-amber-400 transition duration-200"
        >
          Logout
        </button>
      </div>

      <div className="ml-[16.7%] p-6 w-10/12">
        <CurrentMain
          setCurrentMain={setCurrentMain}
          selectedRestaurant={selectedRestaurant}
          setSelectRestaurant={setSelectRestaurant}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
