import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import Home from "./Home";
import NavBar from "./NavBar";
import OverView from "./OverView";
import config from "../constants/config.json";
import abi from "../constants/abi.json";

function App() {
  const [account, setAccount] = useState(null);
  const [products, setProducts] = useState(null);
  const [isMetamask, setIsMetamask] = useState(false);
  const [isGoerly, setIsGoerly] = useState(false);
  const [decazon, setDecazon] = useState(null)

  const loadBlocchainData = async () => {
    if (window.ethereum) {
      setIsMetamask(true);

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }

      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });

      const metamaskProvider = new ethers.providers.Web3Provider(
        window.ethereum
      );
      const network = await metamaskProvider.getNetwork();
      if (network.chainId.toString() === "5") {
        setIsGoerly(true);
        const metamaskProvider = new ethers.providers.Web3Provider(
          window.ethereum
        );

        const signer = metamaskProvider.getSigner();

        const network = await metamaskProvider.getNetwork();

        // connect the smart contract
        let Decazon = new ethers.Contract(
          config[network.chainId].decazon.address,
          abi,
          metamaskProvider
        );

        Decazon = Decazon.connect(signer);

        setDecazon(Decazon);


      }

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }

    // Load Products

    try {
      const apiKey = process.env.REACT_APP_ALCHEMY_API_KEY || "";
      const alchemyProvider = new ethers.providers.AlchemyProvider(
        "goerli",
        apiKey
      );
      const alchemyDecazon = new ethers.Contract(
        config["5"].decazon.address,
        abi,
        alchemyProvider
      );

      const items = [];

      for (let i = 0; i < 9; i++) {
        const item = await alchemyDecazon.items(i + 1);
        items.push(item);
      }

      setProducts(items);
    } catch (error) {
      loadBlocchainData();
    }
  };

  useEffect(() => {
    loadBlocchainData();
  }, []);
  return (
    <div className="App">
      <NavBar
        account={account}
        setAccount={setAccount}
        isMetamask={isMetamask}
        isGoerly={isGoerly}
      />
      <Routes>
        <Route
          path="/overview/:id"
          element={<OverView account={account} products={products} decazon={decazon} isGoerly={isGoerly} />}
        ></Route>
        <Route path="/" element={<Home products={products} />}></Route>
        <Route path="*" element={<Home products={products} />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
