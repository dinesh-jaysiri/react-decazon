import React from "react";

function SubMenu() {
  return (
    <div className="sub-menu">
      <div className="continer">
        <ul className="menu-list">
          <li className="menu-list__item"> <a href="#clothing">Clothing & Jewelry</a> </li>
          <li className="menu-list__item"> <a href="#electrical">Electrical & Electronic</a> </li>
          <li className="menu-list__item"> <a href="#toys">Toys & Gaming</a> </li>
        </ul>
      </div>
    </div>
  );
}

export default SubMenu;
