import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./CourseCard.css";
import { addCoursesFavorites, listCourses } from "../Services/Course";
import { IoIosStarOutline } from "react-icons/io";
import Swal from "sweetalert2";

//Component courses
const CourseCard = ({ courseId, name, teacher, creationDate, description }) => {
  const [course, setCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courses = await listCourses();
        const selectedCourse = courses.find((c) => c.id === courseId);
        setCourse(selectedCourse);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [courseId]);

  const openModal = () => {
    setShowModal(true);
    setSelectedCourseId(courseId);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCourseId(null);
  };

  var creation_date = creationDate;
  var dateObj = new Date(creation_date);
  var year = dateObj.getFullYear();
  var month = dateObj.getMonth() + 1;
  var day = dateObj.getDate();
  var date =
    (day < 10 ? "0" : "") +
    day +
    "-" +
    (month < 10 ? "0" : "") +
    month +
    "-" +
    year;

  const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    iconColor: "white",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  const addFavorites = () => {
    // const body = {
    //   id: courseId,
    //   name: name,
    // };
    // addCoursesFavorites(body).then(() => {
    //   Toast.fire({
    //     icon: "success",
    //     title: "Curso añadido a favoritos",
    //   });
    // });
    Toast.fire({
      icon: "success",
      title: "Curso añadido a favoritos",
    });
  };

  return (
    <>
      {course && (
        <div className="course-container-scroll-student">
          <div className="course-container-teacher">
            <div className="container-add-fav">
              <button className="button-add-fav">
                <IoIosStarOutline
                  className="icon-add-fav"
                  onClick={() => addFavorites()}
                />
              </button>
            </div>
            <div className="card-body-teacher" onClick={openModal}>
              <label className="card-title-teacher">
                <h2 className="title-teacher">Nombre del curso:</h2> {name}
              </label>
              <div className="card-text-teacher">
                <h2 className="title-teacher">Profesor:</h2> {teacher}
              </div>
              <div className="card-text-teacher">
                <h2 className="title-teacher">Descripción:</h2>{" "}
                {course.description}
              </div>
              <div className="card-text-teacher">
                <h2 className="title-teacher">Fecha de creación:</h2> {date}
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              <AiOutlineClose />
            </button>
            <h2>Nomre del curso: {name}</h2>
            <h3>Profesor: {teacher}</h3>
            <p>Creado: {date}</p>
            <p>Descripción: {description}</p>
            <br></br>
            <Link to={`/Student/${selectedCourseId}/Tutor`} className="ask-btn">
              Preguntale al tutor
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseCard;
