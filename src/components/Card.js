import React from "react";

function Card({ id, children , header="Header" }) {
  return (
    <div id={id} className="card">
      <div className="card-header">
        <h3>{header}</h3>
        <div className="separator"></div>
        <div className="card-continer">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Card;
