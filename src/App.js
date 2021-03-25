import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [address, setAddress] = useState("");
  const [whitelist, setWhitelist] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        "https://badgerdao.tk/rewards/yearn_whitelist.json"
      );
      const response = await result.json();
      setWhitelist(response);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="boost">
          <h3 className="underline-title">Spadavault Access</h3>
          <h5 className="underline-title">Conditions</h5>

          <ul className="conditions">
            <li>Badger Staking and LP before Digg launch</li>
            <li>Badger Staking and LP after Digg launch</li>
            <li>Badger Staking and LP before Badger Launch</li>
            <li>Digg Staker and LP after Digg Launch</li>
            <li>Digg Supporter Below Peg</li>
            <li>Governance participant</li>
            <li>Owns a Badger NFT</li>
          </ul>
          
       
         
          <span className="badger-emoji">🦡🏦</span>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="address"
            placeholder="Enter ethereum address"
          ></input>
          <div className="whitelist">
            {whitelist.includes(address) ? (
              <div className="whitelist-emoji">🔓</div>
            ) : (
              <div className="whitelist-emoji">🔒</div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
