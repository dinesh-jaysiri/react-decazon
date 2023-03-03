import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";
import Rating from "./Rating";
import config from "../constants/config.json";
import abi from "../constants/abi.json";

function OverView({ account, products, decazon, isGoerly }) {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [order, setOrder] = useState(null);
  useEffect(() => {
    if (!products) return;
    const items = products.filter((item) => item.id.toString() === id);
    setItem(items[0]);
    fachData();
  },[]);

  const fachData = async () => {
    if (!account) return;

    try {
      

      // event
      const event = await decazon.queryFilter("Buy");
      const orders = event.filter(
        (event) =>
          event.args.buyer === account &&
          event.args.itemId.toString() === item.id.toString()
      );

      console.log(orders)

      if (orders.length === 0) return;
      const order = await decazon.orders(account, orders[0].args.orderId);

      setOrder(order);
    } catch (error) {
      console.log(error);
    }
  };
  const buyHandler = async () => {
    console.log("call")
    if (!account) return;
    console.log("call2")

    try {
      const transaction = await decazon.buy(item.id, {
        value: item.cost,
      });

      await transaction.wait(1);
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="overview">
      <div className="continer">
        <div className="overview__continer">
          <img className="overview__img" src={item && item.image} />

          <div className="overview__description">
            <Card header={item && item.name}></Card>
            <Card header={item && `${item.cost.toString()} ETH`}>
              <Rating />
            </Card>
            <Card header="Overview">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
              </p>
            </Card>
          </div>

          <div className="buy-now__continer">
            <p className="buy-now__price">{`${
              item && item.cost.toString()
            } ETH`}</p>
            <p className="buy-now__delevery">Free delevery</p>
            <p className="buy-now__date">
              {new Date(Date.now() + 345600000).toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="buy-now__stork">
              {item && +item.stock.toString() > 0 ? "In Stock" : "Out of Stock"}
            </p>

            <button
              disabled={!(isGoerly && account && item && +item.stock.toString() > 0)}
              onClick={buyHandler}
              className="btn"
            >
              Buy Now
            </button>

            <p className="buy-item__ship">Ships from Decazon</p>
            <p className="buy-item__ship">Sold By Decazon</p>
            <div className="perchesed buy-now__date">
              {order &&
                `Item bought on ${new Date(
                  Number(order.time.toString() + "000")
                ).toLocaleDateString(undefined, {
                  weekday: "long",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                })}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverView;
