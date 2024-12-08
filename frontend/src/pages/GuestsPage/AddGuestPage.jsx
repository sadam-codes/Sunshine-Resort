import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddGuestPage = () => {
  const [guest, setGuest] = useState({
    FirstName: "",
    LastName: "",
    Phone: "",
    Email: "",
    Address: "",
    CNIC: "",
  });

  const [errors, setErrors] = useState({
    FirstName: "",
    LastName: "",
    Phone: "",
    CNIC: "",
    Email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuest((prevState) => ({ ...prevState, [name]: value }));

    // Reset error for the changed field
    setErrors((prevState) => ({ ...prevState, [name]: "" }));
  };

  const validate = () => {
    let isValid = true;
    let errors = {};

    // Validation checks
    if (!guest.FirstName) {
      errors.FirstName = "First Name is required.";
      isValid = false;
    }
    if (!guest.LastName) {
      errors.LastName = "Last Name is required.";
      isValid = false;
    }
    if (!guest.Phone) {
      errors.Phone = "Phone number is required.";
      isValid = false;
    }
    if (!guest.CNIC) {
      errors.CNIC = "CNIC is required.";
      isValid = false;
    }
    if (!guest.Email) {
      errors.Email = "Email is required.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fill all required fields.");
      return;
    }

    // Check for duplicate data on the backend (email, phone, name, etc.)
    axios
      .post("http://localhost:5000/api/guests/check-duplicate", guest)
      .then((response) => {
        console.log("Duplicate Check Response:", response.data); // Log the response

        // If no duplicate data exists
        if (!response.data.isDuplicate) {
          axios
            .post("http://localhost:5000/api/guests", guest)
            .then((response) => {
              toast.success("Guest added successfully!");
              console.log(response.data);
              setGuest({
                FirstName: "",
                LastName: "",
                Phone: "",
                Email: "",
                Address: "",
                CNIC: "",
              });
            })
            .catch((err) => {
              console.error("Error adding guest:", err);
              toast.error("Error adding guest.");
            });
        } else {
          // Show specific duplicate error based on the type
          if (response.data.error === "Email") {
            toast.error("Email already exists.");
          } else if (response.data.error === "Phone") {
            toast.error("Phone number already exists.");
          } else if (response.data.error === "Name") {
            toast.error("Guest with this name already exists.");
          }
        }
      })
      .catch((err) => {
        console.error("Error checking for duplicates:", err); // Log the error
        toast.error("Error checking for duplicates.");
      });
  };

  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Guest</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="FirstName"
          placeholder="First Name"
          value={guest.FirstName}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
        {errors.FirstName && <p className="text-red-500">{errors.FirstName}</p>}

        <input
          type="text"
          name="LastName"
          placeholder="Last Name"
          value={guest.LastName}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
        {errors.LastName && <p className="text-red-500">{errors.LastName}</p>}

        <input
          type="text"
          name="Phone"
          placeholder="Phone"
          value={guest.Phone}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
        {errors.Phone && <p className="text-red-500">{errors.Phone}</p>}

        <input
          type="email"
          name="Email"
          placeholder="Email"
          value={guest.Email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
        {errors.Email && <p className="text-red-500">{errors.Email}</p>}

        <input
          type="text"
          name="Address"
          placeholder="Address"
          value={guest.Address}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />

        <input
          type="text"
          name="CNIC"
          placeholder="CNIC"
          value={guest.CNIC}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
        {errors.CNIC && <p className="text-red-500">{errors.CNIC}</p>}

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Guest
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddGuestPage;
