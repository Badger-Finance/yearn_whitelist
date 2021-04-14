import "./App.css";
import "./tooltip.css";
import { useEffect, useState } from "react";
import web3 from "web3";
import loadWeb3 from "./loadWeb3";
import conditions from "./conditions";

function App() {
  const [address, setAddress] = useState("");
  const [whitelist, setWhitelist] = useState([]);

  window.ethereum.on("accountsChanged", function (accounts) {
    setAddress(accounts[0]);
  });
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        "https://badgerdao.tk/rewards/yearn_whitelist_scores.json"
      );
      const response = await result.json();
      let scores = {};
      Object.keys(response).forEach((addr) => {
        let data = response[addr];
        let sum = Object.values(data).reduce((a, b) => a + b, 0);
        if (sum >= 4) {
          data.vaultAllowed = true;
        }
        if (sum >= 2) {
          data.merchAllowed = true;
        }
        scores[addr] = response[addr];
      });

    // await loadWeb3();
      setWhitelist(scores);
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      <div>
        
      </div>
      <header className="App-header">
        <div className="boost">
          <h3 className="underline-title">Badger Score</h3>
          <h5 className="underline-title">Conditions</h5>

          <ul className="conditions">
            {Object.keys(conditions).map((cond) => {
              let emoji = "❌";
              if (address in whitelist) {
                if (cond in whitelist[address]) emoji = "✅";
              } else {
              }
              return (
                <li key={cond}>
                  <div className="tooltip">
                    {conditions[cond].condition} {emoji}
                    <div className="tooltiptext">
                      {conditions[cond].tooltip}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <span className="badger-emoji">🦡🎯</span>
          <input
            value={address}
            onChange={(e) => {
              let addr = "";
              try {
                addr = web3.utils.toChecksumAddress(e.target.value);
              } catch {
                addr = e.target.value;
              }
              addr = addr.replace(/ /g, '');
              setAddress(addr);
            }}
            className="address"
            placeholder="Enter ethereum address"
          ></input>
          <div className="whitelist">
            <div className="unlockable">
              {address in whitelist && whitelist[address].vaultAllowed ? (
                <div className="unlockable">
                  <div className="whitelist-text">Vault 🔓</div>
                  <div className="whitelist-text">
                    Vault Accessible at {}
                    <a href="https://badger.cetedel.rocks">
                      https://badger.cetedel.rocks
                    </a>
                  </div>
                </div>
              ) : (
                <div className="whitelist-text">Vault 🔒</div>
              )}
            </div>
            <div className="unlockable">
              {address in whitelist && whitelist[address].merchAllowed ? (
                <div>
                  <div className="whitelist-text">Merch 🔓</div>
                  <div className="whitelist-text">
                    Merch Accessible at{" "}
                    <a href="https://shop.badger.finance<">
                      https://verification.badger.finance
                    </a>
                  </div>
                </div>
              ) : (
                <div className="whitelist-text">Merch 🔒</div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
