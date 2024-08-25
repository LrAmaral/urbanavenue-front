"use client";

import { useState } from "react";

const AddressForm = () => {
  const [address, setAddress] = useState({
    fullName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = {
      fullName: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
    };

    if (!address.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
      valid = false;
    }
    if (!address.streetAddress.trim()) {
      newErrors.streetAddress = "Street address is required.";
      valid = false;
    }
    if (!address.city.trim()) {
      newErrors.city = "City is required.";
      valid = false;
    }
    if (!address.state.trim()) {
      newErrors.state = "State is required.";
      valid = false;
    }
    if (!address.zipCode.trim() || !/^\d{5}$/.test(address.zipCode)) {
      newErrors.zipCode = "Valid ZIP code is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Address saved:", address);
      alert("Address saved successfully!");
    }
  };

  return (
    <div className="max-w-lg w-full md:w-1/2 mx-auto bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-semibold mb-6">Shipping Address</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={address.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          {errors.fullName && (
            <p className="text-red-600 text-sm">{errors.fullName}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="streetAddress" className="block text-gray-700">
            Street Address
          </label>
          <input
            type="text"
            name="streetAddress"
            id="streetAddress"
            value={address.streetAddress}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          {errors.streetAddress && (
            <p className="text-red-600 text-sm">{errors.streetAddress}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700">
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            value={address.city}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          {errors.city && <p className="text-red-600 text-sm">{errors.city}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="state" className="block text-gray-700">
            State
          </label>
          <input
            type="text"
            name="state"
            id="state"
            value={address.state}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          {errors.state && (
            <p className="text-red-600 text-sm">{errors.state}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="zipCode" className="block text-gray-700">
            ZIP Code
          </label>
          <input
            type="text"
            name="zipCode"
            id="zipCode"
            value={address.zipCode}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          {errors.zipCode && (
            <p className="text-red-600 text-sm">{errors.zipCode}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-zinc-800 text-white p-2 rounded-lg hover:bg-zinc-900"
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
