import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../resources/img/logo_flowlearn_transparent.png";

import "./AppHeader.scss";

function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="flex items-center justify-between flex-wrap p-2 app-header">
            <div className="flex items-center flex-shrink-0 mr-6">
                <Link to="/">
                    <img
                        src={logo}
                        alt="Logo Flow Learn"
                        className="h-20 w-20 mx-4 logo-img"
                    />
                </Link>

                <span className="font-semibold tracking-tight logo-name">
                    Flow Learn
                </span>
            </div>

            <div className="w-full hidden lg:block flex-grow lg:flex lg:items-center lg:w-auto ">
                <div className="lg:flex-grow">
                    <a
                        href="/stub"
                        className="block mt-4 lg:inline-block lg:mt-0 ml-8 mr-8 menu-item"
                    >
                        About us
                    </a>
                    <a
                        href="/"
                        className="block mt-4 lg:inline-block lg:mt-0 mr-8 menu-item"
                    >
                        Courses
                    </a>
                    <a
                        href="/stub"
                        className="block mt-4 lg:inline-block lg:mt-0 menu-item"
                    >
                        Blog
                    </a>
                </div>
                <div>
                    <a
                        href="/stub"
                        className="inline-block px-4 py-2 leading-none border rounded mt-4 mr-4 lg:mt-0 menu-item"
                    >
                        Sign Up
                    </a>
                </div>
            </div>

            <div className="block lg:hidden">
                <button
                    className="flex items-center px-2 py-2 border rounded menu-button menu-item"
                    type="button"
                    onClick={toggleMenu}
                >
                    <svg
                        className="fill-current h-8 w-8"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div
                className={`${
                    isMenuOpen ? "" : "hidden"
                } w-full lg:hidden lg:flex-grow lg:items-center lg:w-auto`}
            >
                <div className="lg:flex-grow">
                    <a
                        href="/stub"
                        className="block mt-4 ml-4 menu-item"
                        onClick={closeMenu}
                    >
                        About us
                    </a>
                    <a
                        href="/"
                        className="block mt-4 ml-4 menu-item"
                        onClick={closeMenu}
                    >
                        Courses
                    </a>
                    <a
                        href="/stub"
                        className="block mt-4 ml-4 menu-item"
                        onClick={closeMenu}
                    >
                        Blog
                    </a>
                </div>
                <div>
                    <a
                        href="/stub"
                        className="block my-4 ml-4 menu-item"
                        onClick={closeMenu}
                    >
                        Sign Up
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default AppHeader;
