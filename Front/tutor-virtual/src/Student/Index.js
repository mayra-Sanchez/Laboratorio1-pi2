import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar.js";
import Image from "../Resources/Student.png";
import "./Student.css";
import CourseCard from "../Components/CourseCard.js";
import { listCourses } from "../Services/Course.js";

function Student() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listCourses();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar href={"/Student"} image={Image} role={"users"} />
      <div className="titleStudent">
        <h2>Cursos</h2>
      </div>
      <div className="course-container-scroll">
        <div className="course-container">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <CourseCard
                courseId={course.id}
                name={course.name}
                teacher={course.instructor_name}
                creationDate={course.creation_date}
                description={course.description}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Student;
