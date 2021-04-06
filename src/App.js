import "./App.css";
import { useEffect, useState } from "react";
import web3 from "web3";

function App() {
  const [address, setAddress] = useState("");
  const [whitelist, setWhitelist] = useState([]);
  const conditions = {
    cond1: "Badger staking and LP before Digg launch",
    cond2: "Badger staking and LP after Digg launch",
    cond3: "In a non-native Sett since Badger Launch",
    cond4: "Digg staker and LP after Digg Launch",
    cond5: "Digg supporter below peg",
    cond6: "Badger governance participant",
    cond7: "Owns a Badger NFT",
  };
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
      setWhitelist(scores);
    };
    fetchData();
  }, []);
  return (
    <div className="App">
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
                  {conditions[cond]} {emoji}
                </li>
              );
            })}
          </ul>

          <span className="badger-emoji">🦡🏦</span>
          <input
            value={address}
            onChange={(e) => {
              let addr = "";
              try {
                addr = web3.utils.toChecksumAddress(e.target.value);
              } catch {
                addr = e.target.value;
              }
              setAddress(addr);
            }}
            className="address"
            placeholder="Enter ethereum address"
          ></input>
          <div className="whitelist">
            {address in whitelist && whitelist[address].vaultAllowed ? (
              <div>
                <div className="whitelist-emoji">Vault 🔓</div>
                <div className="vault-link">
                  Vault Accessible at
                  <a href="https://badger.cetedel.rocks">
                    https://badger.cetedel.rocks
                  </a>
                </div>
              </div>
            ) : (
              <div className="whitelist-emoji vault-link">Vault 🔒</div>
            )}
            {address in whitelist && whitelist[address].merchAllowed ? (
              <div>
                <div className="whitelist-emoji">Merch 🔓</div>
                <div className="vault-link">
                  Merch Accessible at
                  <a href="https://shop.badger.finance<">
                    https://shop.badger.finance
                  </a>
                </div>
              </div>
            ) : (
              <div className="whitelist-emoji vault-link">Merch 🔒</div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
