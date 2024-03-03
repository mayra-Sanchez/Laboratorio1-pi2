import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addCourse } from "../Services/Course.js";
import Navbar from "../Components/Navbar.js";
import Image from "../Resources/Professor.png";
import Swal from "sweetalert";
import "./Professor.css";

function Professor() {
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState({
    name: "",
    teacher: "",
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

    console.log(data);

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
              onError("Error al crear el usuario, intenta de nuevo.");
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
          <form className="form1">
            <h2 className="title2">Registro</h2>
            <div className="input-group">
              <span className="spanName">
                Nombre del curso: <span className="redStar"> *</span>
              </span>
              <input
                type="text"
                className="form-control"
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
                onChange={handleChange}
                required
              />
            </div>
          </form>
          <div className="container2">
            <form className="form2">
              <div className="input-group">
                <span className="spanName">
                  Escribele al tutor virtual que temas se verán en el curso:{" "}
                  <span className="redStar"> *</span>
                </span>
                <textarea
                  rows="10"
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
            </form>
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
