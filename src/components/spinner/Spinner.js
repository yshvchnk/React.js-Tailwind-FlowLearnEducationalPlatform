import React from "react";
import "./Spinner.scss";

const Spinner = () => {
    return (
        <div className="flex items-center justify-center flex-col">
            <div
                className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] spinner"
                role="status"
            ></div>
            <br />
            <p className="spinner-text">Preparing magic for you 🪄</p>
        </div>
    );
};

export default Spinner;
