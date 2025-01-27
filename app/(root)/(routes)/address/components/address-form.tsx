"use client";

import { Address } from "@/lib/types";
import { useState, useEffect } from "react";

interface AddressFormProps {
  addresses: Address[];
  setAddresses: (address: Address) => void;
  editAddress?: Address | null;
  onSubmit?: (address: Address) => void;
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
    number: "",
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
    number: "",
  });

  const validate = () => {
    let valid = true;
    const newErrors: Partial<Record<keyof Address, string>> = {};

    if (!inputValues.neighborhood.trim()) {
      newErrors.neighborhood = "Neighborhood is required.";
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
    if (!inputValues.number.trim()) {
      newErrors.number = "House number is required.";
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
        number: "",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name as keyof Address]: value });
  };

  const SearchZip = async (value: string) => {
    const validSearchZip = value.replace(/\D/g, "");

    if (validSearchZip && /^[0-9]{8}$/.test(validSearchZip)) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${validSearchZip}/json/`
        );
        const data = await response.json();

        if (!data.erro) {
          setInputValues((prevValues) => ({
            ...prevValues,
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf,
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            zipCode: "ZIP Code not found.",
          }));
        }
      } catch (error) {
        console.error("Error searching the address:", error);
      }
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        zipCode: "Invalid ZIP Code.",
      }));
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        {[
          { label: "ZIP Code", name: "zipCode" },
          { label: "Neighborhood", name: "neighborhood" },
          { label: "Street", name: "street" },
          { label: "City", name: "city" },
          { label: "State", name: "state" },
          { label: "House Number", name: "number" },
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
              onBlur={
                name === "zipCode"
                  ? () => SearchZip(inputValues.zipCode)
                  : undefined
              }
              className="w-full p-2 border-2 rounded-lg border-gray-300 focus:outline-none focus:border-blue-500 transition"
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
