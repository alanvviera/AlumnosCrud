import React, { useState } from "react";

//Componente servidor

const EditForm = ({ editedContendant, onUpdate, onCancel, handleInputChange }) => {
  const handleSaveClick = () => {
    fetch(`http://localhost:3000/api/registros/${editedContendant.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedContendant),
    })
      .then((response) => response.json())
      .then((responseData) => {
        onUpdate(responseData);
      })
      .catch((error) => {
        console.error("Error updating contendant:", error);
      });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
  <div className="text-center space-y-4">
    <div className="flex flex-col">
      <label className="text-2xl mb-2">Nombre:</label>
      <input
        className="border border-gray-700 p-2 rounded-md bg-white text-black"
        type="text"
        name="nombre"
        value={editedContendant.nombre}
        onChange={handleInputChange}
      />
    </div>

    <div className="flex flex-col">
      <label className="text-2xl text-center mb-2">Genero:</label>
      <select
        className="border border-gray-700 p-2 rounded-md bg-white text-black"
        name="genero"
        value={editedContendant.genero}
        onChange={handleInputChange}
      >
        <option value="Masculino">Masculino</option>
        <option value="Femenino">Femenino</option>
      </select>
    </div>
  </div>

  <div className="text-center space-y-4">
    <div className="flex flex-col">
      <label className="text-2xl text-center mb-2">Edad:</label>
      <input
        className="border border-gray-700 p-2 rounded-md bg-white text-black"
        type="number"
        name="edad"
        value={editedContendant.edad}
        onChange={handleInputChange}
      />
    </div>

    <div className="flex flex-col">
      <label className="text-2xl text-center mb-2">Carrera:</label>
      <input
        className="border border-gray-700 p-2 rounded-md bg-white text-black"
        type="text"
        name="carrera"
        value={editedContendant.carrera}
        onChange={handleInputChange}
      />
    </div>
  </div>

  <div className="flex flex-col mt-4">
    <button
      className="bg-gradient-to-br from-green-800 via-green-900 to-teal-500 text-white py-2 px-4 rounded-md shadow-md hover:shadow-lg mb-2"
      onClick={handleSaveClick}
    >
      Guardar
    </button>
    <button
      className="bg-gradient-to-br from-red-700 via-red-900 to-yellow-300 text-white py-2 px-4 rounded-md shadow-md hover:shadow-lg"
      onClick={onCancel}
    >
      Cancelar
    </button>
  </div>
</div>
  );
};

export default EditForm;