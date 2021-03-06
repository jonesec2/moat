import React from "react";
import Button from "../Button";
// import "./sass/style.scss";

function Card({ children, props }) {
    return (
        <div className="card">
            <div className="card-body">
                {children}
            </div>
        </div>
    );
}

export default Card;