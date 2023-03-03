import React from 'react'
import Card from './Card';
import SubMenu from './SubMenu';
import Product from "./Product"

function Home({products}) {

  return (
    <>
      <SubMenu />
      <div className="home">
        <div className="continer">
          <h2>Decazon Best Sellers</h2>
          <Card id={"clothing"} header="Clothing and Jewelry">
            {products &&
              products
                .filter((item) => item.category === "clothing")
                .map((item) => (
                  <Product key={item.id.toString()} item={item} />
                ))}
          </Card>
          <Card id={"electrical"} header="Electrical and Electronics">
            {products &&
              products
                .filter((item) => item.category === "electronics")
                .map((item) => (
                  <Product key={item.id.toString()} item={item} />
                ))}
          </Card>
          <Card id={"toys"} header="Toys and Gaming">
            {products &&
              products
                .filter((item) => item.category === "toys")
                .map((item) => (
                  <Product key={item.id.toString()} item={item} />
                ))}
          </Card>
        </div>
      </div>
    </>
  );
}

export default Home