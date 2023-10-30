'use client'
import CardAlumno from "@/components/CardAlumno";
import { obtenerDatos } from "@/libs/obtenerDatos";
import Form from "@/components/Form";
import React, { Suspense, useEffect, useState } from "react";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [newContendant, setNewContendant] = useState({
    nombre: "",
    genero: "Masculino",
    edad: "",
    carrera: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchData = () => {
    obtenerDatos()
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isUpdating) {
      // Realiza la solicitud de actualización si estamos en modo de actualización
      fetch(`http://localhost:3000/api/registros/${newContendant.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContendant),
      })
        .then((response) => response.json())
        .then((responseData) => {
          setIsUpdating(false);
          onUpdate(responseData);
        })
        .catch((error) => {
          console.error("Error updating contendant:", error);
        });
    } else {
      // Realiza la solicitud de creación si no estamos en modo de actualización
      fetch("http://localhost:3000/api/registros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContendant),
      })
        .then((response) => response.json())
        .then((responseData) => {
          setData([...data, responseData]);
          setNewContendant({
            nombre: "",
            genero: "Masculino",
            edad: "",
            carrera: "",
          });
        })
        .catch((error) => {
          console.error("Error adding contendant:", error);
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContendant({ ...newContendant, [name]: value });
  };

  const handleDelete = (contendantId) => {
    fetch(`http://localhost:3000/api/registros/${contendantId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setData(data.filter((contendant) => contendant.id !== contendantId));
          console.log(`Contendant with ID ${contendantId} deleted successfully.`);
        } else {
          console.error(`Failed to delete contendant with ID ${contendantId}`);
        }
      })
      .catch((error) => {
        console.error("Error deleting contendant:", error);
      });
  };

  const handleUpdate = (updatedContendant) => {
    const updatedData = data.map((contendant) =>
      contendant.id === updatedContendant.id ? updatedContendant : contendant
    );

    setData(updatedData);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center p-4">

      <div div className="max-w-screen-lg ">
      <Suspense>
        <Form
          onFormSubmit={handleFormSubmit}
          onInputChange={handleInputChange}
          newContendant={newContendant}
          isUpdating={isUpdating}
        />
        </Suspense>
      </div>

       <div className="flex flex-col items-center bg-gray-900 text-white rounded-md shadow-lg  mt-4 w-full max-w-screen-lg ">
        <Suspense>
       <div className="mt-4 items-center flex flex-col overflow-y-scroll max-h-96 lg:max-h-[70vh] w-full">
                {data.map((contendant) => (
            <CardAlumno
              key={contendant.id}
              contendant={contendant}
              onDelete={handleDelete}
              onUpdate={handleUpdate} 
            />
          ))}
        </div>
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
