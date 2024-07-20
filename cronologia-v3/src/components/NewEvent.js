import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const NewEvent = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  // Fetch categories from the backend
  useEffect(() => {
    axios
      .get("https://cronology-v3.onrender.com/categories")
      .then((response) => {
        const categoryOptions = response.data.map((cat) => ({
          value: cat._id,
          label: cat.name,
        }));
        setCategories(categoryOptions);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = {
      name,
      date,
      description,
      categoryId: category ? category.value : "",
    };

    console.log("Submitting event:", newEvent);

    try {
      const response = await axios.post(
        "https://cronology-v3.onrender.com/events",
        newEvent
      );
      console.log("Event created successfully:", response.data);
      // Clear the form after successful submission
      setName("");
      setDate("");
      setDescription("");
      setCategory(null);
    } catch (error) {
      console.error("Error creating event:", error);
      console.error("Error response:", error.response); // Added this line to log the full error response
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#E5E7EB", // Tailwind bg-gray-200 equivalent
      borderColor: "#E5E7EB", // Tailwind border-gray-200 equivalent
      padding: "0.5rem",
      width: "300px", // Adjust the width as needed
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#3B82F6"
        : state.isFocused
        ? "#E5E7EB"
        : "white", // Tailwind bg-blue-500 and bg-gray-200 equivalent
      color: state.isSelected ? "white" : "black",
      "&:hover": {
        backgroundColor: "#E5E7EB", // Tailwind bg-gray-300 equivalent
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.5rem",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    }),
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Nombre
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="name"
              type="text"
              placeholder="Nombre del Evento"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="date"
            >
              Fecha
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Descripción
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="description"
              placeholder="Describe el Evento"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="category"
            >
              Categoría
            </label>
            <div className="relative">
              <Select
                styles={customStyles}
                options={categories}
                value={category}
                onChange={(selectedOption) => setCategory(selectedOption)}
                placeholder="Selecciona una categoría"
                className="w-full"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Crear Evento
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewEvent;
