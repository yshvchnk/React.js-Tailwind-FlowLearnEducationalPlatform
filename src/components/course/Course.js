import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getCourse } from "../../services/service";
import Spinner from "../spinner/Spinner";

import "./Course.scss";

function CoursePage() {
    const params = useParams();
    const [course, setCourse] = useState(null);
    const [currentLesson, setCurrentLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [videoPath, setVideoPath] = useState(null);
    const [speed, setSpeed] = useState(1);
    const videoRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [downloadProgress, setDownloadProgress] = useState(0);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const data = await getCourse(params.courseId);
            setCourse(data);
            setLoading(false);
            setVideoPath(data.lessons[0].link);
        }
        fetchData();
    }, [params.courseId]);

    useEffect(() => {
        return () => {
            localStorage.setItem("videoProgress", JSON.stringify(currentTime));
        };
    }, [currentTime]);

    useEffect(() => {
        const savedProgress = localStorage.getItem("videoProgress");
        if (savedProgress) {
            setCurrentTime(JSON.parse(savedProgress));
        }
    }, []);

    const handleTimeUpdate = () => {
        setCurrentTime(videoRef.current.currentTime);
    };

    // useEffect(() => {
    //     localStorage.setItem(
    //         "course_progress",
    //         JSON.stringify({
    //             course_id: course.id,
    //             lesson_id: currentLesson.id,
    //         })
    //     );
    // }, [currentLesson, course]);

    useEffect(() => {
        const progress =
            JSON.parse(localStorage.getItem("course_progress")) || {};
        if (course && progress[course.id]) {
            const lesson = course.lessons.find(
                (lesson) => lesson.id === progress[course.id]
            );
            setCurrentLesson(lesson);
        }
    }, [course]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === "q") {
                setSpeed(speed + 0.25);
            } else if (event.ctrlKey && event.key === "w") {
                setSpeed(Math.max(speed - 0.25, 0.25));
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [speed]);

    const handleLessonClick = (lesson) => {
        setVideoPath(lesson.link);
        if (currentLesson) {
            const progress =
                JSON.parse(localStorage.getItem("course_progress")) || {};
            progress[course.id] = currentLesson.id;
            localStorage.setItem("course_progress", JSON.stringify(progress));
        }
        setCurrentLesson(lesson);
    };

    const handleVideoClick = async () => {
        if (videoRef.current) {
            try {
                await videoRef.current.requestPictureInPicture();
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (downloadProgress < 100) {
                setDownloadProgress((prevProgress) => prevProgress + 10);
            }
        }, 500);

        return () => {
            clearInterval(intervalId);
        };
    }, [downloadProgress]);

    const handleLoadedData = () => {
        setIsLoading(false);
        videoRef.current.play();
    };

    return (
        <div className="container mx-auto px-20">
            {loading ? (
                <Spinner />
            ) : (
                <div>
                    <h1 className="my-4 course-title">
                        {course.title ||
                            "🔮 Charging our crystals for you... Please come back later."}
                    </h1>
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                        <div className="xl:col-span-2 flex flex-col">
                            <div className="aspect-w-16 aspect-h-9">
                                {loading ? (
                                    <Spinner />
                                ) : (
                                    <div className="course-video">
                                        <div
                                            className="flex flex-col items-center justify-center p-10 course-loading-animation"
                                            style={{
                                                display: isLoading
                                                    ? "block"
                                                    : "none",
                                            }}
                                        >
                                            <div className="mt-12 mb-4 text-center course-loading-text">
                                                🐿️🐿️ Squirrels are working on
                                                downloading...
                                            </div>
                                            <div className="my-4 flex items-center justify-center flex-col">
                                                <div
                                                    className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] spinner"
                                                    role="status"
                                                ></div>
                                            </div>
                                            <div className="mt-4 course-loading-progress-bar">
                                                <div
                                                    className="course-loading-progress"
                                                    style={{
                                                        width: `${downloadProgress}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                        <video
                                            className="w-full h-full course-pip"
                                            controls
                                            autoPlay
                                            playbackrate={speed}
                                            onTimeUpdate={handleTimeUpdate}
                                            currenttime={currentTime}
                                            ref={videoRef}
                                            onLoadedData={handleLoadedData}
                                            style={{
                                                display: isLoading
                                                    ? "none"
                                                    : "block",
                                            }}
                                        >
                                            <source
                                                src={videoPath}
                                                type="video/m3u8"
                                            ></source>
                                            Sorry but your browser does not hove
                                            enough crystals to play this
                                            video...
                                        </video>
                                    </div>
                                )}
                            </div>
                            <div className="text-end course-label my-2">
                                CTRL+W to overtake CTRL+Q to meditate
                            </div>
                            <button
                                className="rounded-full px-5 py-2 mt-2 self-end course-button"
                                onClick={handleVideoClick}
                            >
                                Pic-in-pic Mode
                            </button>
                            <h3 className="mt-4 mb-2 course-subtitle">
                                About course:
                            </h3>
                            <div className="p-4 rounded-lg shadow-lg course-about">
                                <p className="mb-1">
                                    <span className="font-semibold">
                                        Description:{" "}
                                    </span>{" "}
                                    {course.description}
                                </p>
                                <p className="mb-1">
                                    <span className="font-semibold">
                                        Status:{" "}
                                    </span>{" "}
                                    {course.status}
                                </p>
                                <p className="mb-1">
                                    <span className="font-semibold">
                                        Duration:{" "}
                                    </span>
                                    {course.duration}
                                </p>
                                <p className="mb-1">
                                    <span className="font-semibold">
                                        Number of Lessons:{" "}
                                    </span>
                                    {course.lessons.length}
                                </p>
                                <p className="mb-1">
                                    <span className="font-semibold">
                                        Rating:{" "}
                                    </span>
                                    {course.rating}
                                </p>
                            </div>
                        </div>
                        <div className="xl:col-span-1">
                            <div>
                                <h3 className="mb-2 course-subtitle">
                                    Lessons:
                                </h3>
                                <ul>
                                    {course.lessons.map((lesson) => (
                                        <li
                                            key={lesson.id}
                                            className="mb-2 cursor-pointer"
                                            onClick={() =>
                                                handleLessonClick(lesson)
                                            }
                                        >
                                            {lesson.status === "locked" ? (
                                                <div className="rounded-lg shadow-lg p-4 course-lessons-blocked">
                                                    <h3 className="font-semibold">
                                                        {lesson.order}{" "}
                                                        {lesson.title}
                                                    </h3>
                                                    <p>
                                                        Lesson duration:{" "}
                                                        {lesson.duration}
                                                    </p>
                                                </div>
                                            ) : (
                                                <div
                                                // className={
                                                //     "rounded-lg shadow-lg" +
                                                //         lesson.id ===
                                                //     currentLesson.id
                                                //         ? " course-lessons-active"
                                                //         : ""
                                                // }
                                                >
                                                    <div className="rounded-lg shadow-lg p-4 course-lessons">
                                                        <h3 className="font-semibold">
                                                            {lesson.order}{" "}
                                                            {lesson.title}
                                                        </h3>
                                                        <p>
                                                            Lesson duration:{" "}
                                                            {lesson.duration}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CoursePage;
