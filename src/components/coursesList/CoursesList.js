import React, { useState, useEffect } from "react";
import { getAllCourses } from "../../services/service";
import { Link } from "react-router-dom";

import AppCard from "../appCard/AppCard";
import Pagination from "../pagination/Pagination";
import Spinner from "../spinner/Spinner";

import "./CoursesList.scss";

function CoursesList() {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [coursesPerPage] = useState(10);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const data = await getAllCourses();
            setCourses(data.courses);
            setLoading(false);
        }
        fetchData();
    }, []);

    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstPost = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstPost, indexOfLastCourse);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto">
            <h1 className="text-center my-2 courseslist-header">
                Home of your inner magic
            </h1>
            {loading ? (
                <Spinner />
            ) : (
                <div
                    className="flex flex-wrap justify-center shrink-0	gap-4 mt-6"
                    courses={currentCourses}
                >
                    {currentCourses.map((course) => (
                        <Link to={course.id}>
                            <AppCard
                                key={course.id}
                                name={course.title}
                                image={course.previewImageLink + "/cover.webp"}
                                lessons={course.lessonsCount}
                                skills={course?.meta?.skills.map(
                                    (skill, index) => (
                                        <li className="text-xs" key={index}>
                                            {skill}
                                        </li>
                                    )
                                )}
                                rating={course.rating}
                                preview={course.meta.courseVideoPreview.link}
                            />
                        </Link>
                    ))}
                </div>
            )}
            <Pagination
                coursesPerPage={coursesPerPage}
                totalCourses={courses.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
}

export default CoursesList;
