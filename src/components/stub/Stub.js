import React from "react";

import "./Stub.scss";

function Stub() {
    return (
        <div>
            <h1 className="text-center my-4 stub-title">
                🦄 Gathering unicorns to create this page...
            </h1>
            <div className="flex items-center justify-center flex-col">
                <div
                    className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] spinner"
                    role="status"
                ></div>
            </div>
        </div>
    );
}

export default Stub;
