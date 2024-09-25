"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface AddressFormProps {
  addresses: Address[];
  setAddresses: (address: Address) => void;
  editAddress?: Address | null;
}

const AddressForm = ({
  addresses,
  setAddresses,
  editAddress,
}: AddressFormProps) => {
  const [inputValues, setInputValues] = useState<Address>({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  useEffect(() => {
    if (editAddress) {
      setInputValues(editAddress);
    }
  }, [editAddress]);

  const [errors, setErrors] = useState<Partial<Record<keyof Address, string>>>({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const validate = () => {
    let valid = true;
    const newErrors: Partial<Record<keyof Address, string>> = {};

    if (!inputValues.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
      valid = false;
    }
    if (!inputValues.street.trim()) {
      newErrors.street = "Street address is required.";
      valid = false;
    }
    if (!inputValues.city.trim()) {
      newErrors.city = "City is required.";
      valid = false;
    }
    if (!inputValues.state.trim()) {
      newErrors.state = "State is required.";
      valid = false;
    }
    if (!inputValues.zipCode.trim() || !/^\d{8}$/.test(inputValues.zipCode)) {
      newErrors.zipCode = "A valid ZIP code is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setAddresses(inputValues);
      toast.success("Address saved successfully!");

      setInputValues({
        fullName: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name as keyof Address]: value });
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        {[
          { label: "Full Name", name: "fullName" },
          { label: "Street Address", name: "street" },
          { label: "City", name: "city" },
          { label: "State", name: "state" },
          { label: "ZIP Code", name: "zipCode" },
        ].map(({ label, name }) => (
          <div className="mb-4" key={name}>
            <label htmlFor={name} className="block text-gray-700">
              {label}
            </label>
            <input
              type="text"
              name={name}
              id={name}
              value={inputValues[name as keyof Address]}
              onChange={handleChange}
              className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition"
            />
            {errors[name as keyof Address] && (
              <p className="text-red-600 text-sm">
                {errors[name as keyof Address]}
              </p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-zinc-800 text-white p-2 rounded-lg hover:bg-zinc-900 transition"
        >
          {editAddress ? "Update Address" : "Save Address"}{" "}
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
