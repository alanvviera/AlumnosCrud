import React, { useState } from "react";
import EditForm from "./EditForm";

//Componente de servidor

const ContendantCard = ({ contendant, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContendant, setEditedContendant] = useState({
    nombre: contendant.nombre,
    genero: contendant.genero,
    edad: contendant.edad,
    carrera: contendant.carrera,
    id: contendant.id, // Establecer el ID del contendor
  });

  const handleDeleteClick = () => {
    onDelete(contendant.id);
  };

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedContendant({ ...editedContendant, [name]: value });
  };

  const handleUpdate = () => {
  const updatedData = { ...contendant, ...editedContendant };
  fetch(`http://localhost:3000/api/registros/${contendant.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => response.json())
    .then((responseData) => {
      onUpdate(responseData);
      setIsEditing(false);
    })
    .catch((error) => {
      console.error("Error updating contendant:", error);
    });
};

  return (
    <div className="px-2 my-2 pt-2 bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-800 w-[90%] h-auto text-white rounded-md p-4 border border-purple-950 shadow-2xl">
      {isEditing ? (
        <EditForm
          editedContendant={editedContendant}
          onUpdate={handleUpdate}
          onCancel={handleCancelClick}
          handleInputChange={handleInputChange}
        />
      ) : (
        <div className="flex flex-col justify-center space-y-4">
          <p>
            <label className="text-2xl text-center">Nombre:</label> {contendant.nombre}
          </p>
          <p>
            <label className="text-2xl text-center">Genero:</label> {contendant.genero}
          </p>
          <p>
            <label className="text-2xl text-center">Edad:</label> {contendant.edad}
          </p>
          <p>
            <label className="text-2xl text-center">Carrera:</label> {contendant.carrera}
          </p>
          <div className="flex justify-end">
            <button
              className="bg-gradient-to-br from-red-700 via-red-900 to-yellow-300 text-white py-2 px-4 rounded-md shadow-md hover:shadow-lg mr-2"
              onClick={handleDeleteClick}
            >
              Borrar
            </button>
            <button
              className="bg-gradient-to-br from-green-800 via-green-900 to-teal-500 text-white py-2 px-4 rounded-md shadow-md hover:shadow-lg"
              onClick={handleUpdateClick}
            >
              Actualizar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContendantCard;