"use client";

import { Address } from "@/lib/address";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface AddressFormProps {
  addresses: Address[];
  setAddresses: (address: Address) => Promise<void>;
  editAddress?: Address | null;
}

const AddressForm = ({
  addresses,
  setAddresses,
  editAddress,
}: AddressFormProps) => {
  const [inputValues, setInputValues] = useState<Address>({
    neighborhood: "",
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
    neighborhood: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const validate = () => {
    let valid = true;
    const newErrors: Partial<Record<keyof Address, string>> = {};

    if (!inputValues.neighborhood.trim()) {
      newErrors.neighborhood = "Full name is required.";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const addressToSave = editAddress
        ? { ...inputValues, id: editAddress.id }
        : { ...inputValues };

      await setAddresses(addressToSave);
      setInputValues({
        neighborhood: "",
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
          { label: "Neighborhood", name: "neighborhood" },
          { label: "Street", name: "street" },
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
          {editAddress ? "Update Address" : "Save Address"}
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
