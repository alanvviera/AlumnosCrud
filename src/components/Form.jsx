import React from "react";

const Form = ({ onFormSubmit, onInputChange, newContendant, isUpdating }) => {

  

  return (
<div className="bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-800 text-white rounded-md shadow-lg p-4 md:w-90% mx-auto mb-5 text-center">
  <p className="text-yellow-300 text-xl mb-4">
    {isUpdating ? "Actualizar Estudiante" : "Agregar un Estudiante"}
  </p>
  <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={onFormSubmit}>
    {isUpdating && (
      <input
        type="hidden"
        name="id"
        value={newContendant.id}
        onChange={onInputChange}
        required
      />
    )}
    <div className="flex flex-col mb-4">
      <label className="text-lg">Nombre</label>
      <input
        type="text"
        className="p-2 rounded-md border text-black w-full md:w-auto" // Ajuste de ancho aquí
        name="nombre"
        value={newContendant.nombre}
        onChange={onInputChange}
        required
      />
    </div>
    <div className="flex flex-col">
  <label className="text-lg">Genero</label>
  <div className="flex items-center justify-between space-x-2">
    <input
      type="radio"
      id="generoMasculino"
      name="genero"
      value="Masculino"
      checked={newContendant.genero === "Masculino"}
      onChange={onInputChange}
      className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8"

    />
    <label htmlFor="generoMasculino">Masculino</label>
    <input 
      type="radio"
      id="generoFemenino"
      name="genero"
      value="Femenino"
      checked={newContendant.genero === "Femenino"}
      onChange={onInputChange}
      className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8"
    />
    <label htmlFor="generoFemenino">Femenino</label>
  </div>
</div>
    <div className="flex flex-col mb-4">
      <label className="text-lg">Edad</label>
      <input
        type="number"
        className="p-2 rounded-md border text-black w-full md:w-auto" // Ajuste de ancho aquí
        name="edad"
        value={newContendant.edad}
        onChange={onInputChange}
      />
    </div>
    <div className="flex flex-col mb-4">
      <label className="text-lg">Carrera</label>
      <input
        type="text"
        className="p-2 rounded-md border text-black w-full md:w-auto" // Ajuste de ancho aquí
        name="carrera"
        value={newContendant.carrera}
        onChange={onInputChange}
        required
      />
    </div>
    <button
      type="submit"
      className="bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 col-span-2 p-2 bg-gray-500 rounded-md hover-bg-gray-300"
    >
      {isUpdating ? "Actualizar" : "Enviar"}
    </button>
  </form>
</div>
  );
};

export default Form