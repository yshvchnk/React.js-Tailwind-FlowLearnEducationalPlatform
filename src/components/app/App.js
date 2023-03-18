import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";

import AppHeader from "../appHeader/AppHeader";
import CoursesList from "../coursesList/CoursesList";
import Course from "../course/Course";
import Stub from "../stub/Stub";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <StrictMode>
                    <AppHeader />
                </StrictMode>
                <Routes>
                    <Route path="/" element={<CoursesList />}></Route>
                    <Route path=":courseId" element={<Course />}></Route>
                    <Route path="stub" element={<Stub />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
