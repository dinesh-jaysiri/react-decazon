import { ethers } from "ethers";
import React, { useEffect } from "react";

import Logo from "./Logo";
import Search from "./Search";

function NavBar({ account, setAccount, isMetamask, isGoerly }) {
  const connectHandler = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = ethers.utils.getAddress(accounts[0]);

      setAccount(account);
    } catch (error) {
      console.log(error);
    }
  };

  const networHandler = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x5" }], // chainId must be in hexadecimal numbers
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="nav">
      <div className="continer">
        <Logo  />
        <Search />
        {isMetamask ? (
          account ? (
            isGoerly ? (
              <button className="btn">
                {account.slice(0, 6) + "..." + account.slice(38, 42)}
              </button>
            ) : (
              <button className="btn" onClick={networHandler}>
                Switch Network
              </button>
            )
          ) : (
            <button className="btn" onClick={connectHandler}>
              Connect Wallet
            </button>
          )
        ) : (
          <button className="btn">No Metamask!</button>
        )}
      </div>
    </div>
  );
}

export default NavBar;
