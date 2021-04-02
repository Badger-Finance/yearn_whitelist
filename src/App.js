import "./App.css";
import { useEffect, useState } from "react";
import web3 from "web3"

function App() {
  const [address, setAddress] = useState("");
  const [whitelist, setWhitelist] = useState([]);
  const conditions = { 
    cond1:"Badger staking and LP before Digg launch",
    cond2:"Badger staking and LP after Digg launch",
    cond3:"Badger staking and LP after Digg launch",
    cond4:"Digg staker and LP after Digg Launch",
    cond5:"Digg supporter below peg",
    cond6:"Badger governance participant",
    cond7:"Owns a Badger NFT"
  }
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        "https://badgerdao.tk/rewards/yearn_whitelist_scores.json"
      );
      const response = await result.json();
      let scores = {}
      Object.keys(response).forEach(addr => {
        let data = response[addr]
        let sum = Object.values(data).reduce((a, b) => a + b, 0) 
        if (sum >=4) {
          data.allowed = true
        }
        scores[addr] = response[addr]
      }) 
      setWhitelist(scores);
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <div className="boost">
          <h3 className="underline-title">WBTC Vault Access</h3>
          <h5 className="underline-title">Conditions</h5>

          <ul className="conditions">
            {Object.keys(conditions).map(cond => {
               let emoji = "❌"
               if (address in whitelist) {
                 if (cond in whitelist[address])
                   emoji = "✅"
               } else {
               }
                return (<li key={cond}>
                  {conditions[cond]} {emoji}
                </li>)
            } )}
          </ul>
          
          <span className="badger-emoji">🦡🏦</span>
          <input
            value={address}
            onChange={(e) => {
              let addr = ""
              try {
                addr = web3.utils.toChecksumAddress(e.target.value)
              } catch {
                addr = e.target.value 
              }
              setAddress(addr)
            }}
            className="address"
            placeholder="Enter ethereum address"
          ></input>
          <div className="whitelist">
            {address in whitelist && whitelist[address].allowed  ? (
              <div>
              <div className="whitelist-emoji">🔓</div>
                <div className="vault-link">Vault Accessible at <a href="https://ape.tax">https://ape.tax</a></div>
              </div>
            ) : (
              <div className="whitelist-emoji vault-link">🔒</div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
