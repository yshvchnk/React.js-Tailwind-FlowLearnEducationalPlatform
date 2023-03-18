import React, { useState } from "react";

import "./AppCard.scss";

function AppCard({ name, image, lessons, skills, rating, preview }) {
    const [isPlaying, setIsPlaying] = useState(false);

    const handleMouseEnter = () => {
        setIsPlaying(true);
    };

    const handleMouseLeave = () => {
        setIsPlaying(false);
    };

    return (
        <div
            className="mx-auto my-5 rounded-lg shadow-md overflow-hidden card-body"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative">
                <img
                    className="object-cover object-center h-64 w-full"
                    src={image}
                    alt="Course"
                />
                {isPlaying && (
                    <video
                        src={preview}
                        className="absolute inset-0 object-cover object-center h-full w-full"
                        autoPlay
                        muted
                        loop
                        type="video/m3u8"
                    />
                )}
            </div>
            <div className="py-4 px-6">
                <h2 className="font-semibold card-title">{name}</h2>
                <div className="flex flex-col mt-4">
                    <div className="flex justify-between mb-4">
                        <div className="card-text">
                            Lessons:{" "}
                            <span className="font-semibold">{lessons}</span>
                        </div>
                        <div className="card-text">
                            Rating:{" "}
                            <span className="font-semibold">{rating}</span>
                        </div>
                    </div>
                    <div className="card-skills">
                        <div className="card-text">Skills: </div>
                        <div className="text-sm card-text-skills">{skills}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppCard;
