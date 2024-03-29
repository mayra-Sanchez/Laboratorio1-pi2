import React from "react";
import Navbar from "../Components/Navbar.js";
import Image from "../Resources/Professor.png";
import { useNavigate } from "react-router";
import { useState } from "react";
import { addCourse } from "../Services/Course";
import Swal from "sweetalert2";
import "./Professor.css";

function Professor() {
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState({
    name: "",
    instructor_name: "",
    description: "",
    context: "",
  });

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...courseData,
    };

    console.log("LA INFO", data);

    Swal.fire({
      title: "Atención, estás seguro de realizar esta acción",
      text: "Vas a registrar un nuevo curso",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      showLoaderOnConfirm: true,
      cancelButtonColor: "#d33",
      confirmButtonText: `Confirmar`,
      allowOutsideClick: false,
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        return new Promise((resolve, reject) => {
          addCourse(data)
            .then((response) => {
              Swal.fire({
                icon: "success",
                title: "Operación exitosa",
                text: "Ha registrado el curso de forma exitosa",
                confirmButtonText: "Continuar",
                allowOutsideClick: false,
                showCancelButton: false,
              }).then(() => {
                navigate("/Professor");
              });
            })
            .catch((err) => {
              onError("Error al crear el curso, intenta de nuevo.");
              console.log(err);
            });
        });
      },
    });
  };

  const onError = (error) => {
    Swal.fire({
      icon: "error",
      title: "Algo salió mal",
      text: "Ocurrió un error al crear el curso, intentalo de nuevo",
      confirmButtonText: "Continuar",
      allowOutsideClick: false,
      showCancelButton: false,
    });
    console.log("este es el error", error);
  };

  return (
    <>
      <Navbar href={"/Professor"} image={Image} role={"users"} />
      <div className="container">
        <h1 className="title">Creación del curso</h1>
        <form className="forms-container" onSubmit={handleSubmit}>
          <div className="form1">
            <h2 className="title2">Registro</h2>
            <div className="input-group">
              <span className="spanName">
                Nombre del curso: <span className="redStar"> *</span>
              </span>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <span className="spanName">
                Nombre del instructor: <span className="redStar"> *</span>
              </span>
              <input
                type="text"
                className="form-control"
                name="instructor_name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <span className="spanName">
                Descripcion del curso: <span className="redStar"> *</span>
              </span>
              <textarea
                rows="7"
                type="text"
                className="form-control"
                name="description"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="container2">
            <div className="form2">
              <div className="input-group">
                <span className="spanName">
                  Escribele al tutor virtual que temas se verán en el curso:{" "}
                  <span className="redStar"> *</span>
                </span>
                <textarea
                  rows="14"
                  type="text"
                  className="form-control"
                  name="context"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button type="submit" className="buttonRegister">
              Registrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Professor;
