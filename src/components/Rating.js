import React from "react";
import strFull from "../image/star.png";
import strEmpty from "../image/star-empty.png";

function Rating({ rating = 4 }) {
  return (
    <div className="rating-continer">
      <img className="rating-str" src={rating > 0 ? strFull : strEmpty} />
      <img className="rating-str" src={rating > 1 ? strFull : strEmpty} />
      <img className="rating-str" src={rating > 2 ? strFull : strEmpty} />
      <img className="rating-str" src={rating > 3 ? strFull : strEmpty} />
      <img className="rating-str" src={rating > 4 ? strFull : strEmpty} />
    </div>
  );
}

export default Rating;
