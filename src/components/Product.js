import React from 'react'
import { useNavigate } from 'react-router-dom';
import Rating from './Rating';

function Product({item}) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/overview/${item.id.toString()}`)}
      className="product"
    >
      <img className="product__img" src={item && item.image} />

      <div className="product__description">
        <p className="product__name">{item && item.name}</p>
        <Rating rating={item && +item.rating.toString()} />
        <p className="product__price">
          {item && `${+item.cost.toString()} ETH`}
        </p>
      </div>
    </div>
  );
}

export default Product