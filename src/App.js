import "./App.css";
import "./tooltip.css";
import { useEffect, useState } from "react";
import web3 from "web3";
import Whitelist from './components/Whitelist'
import conditions from "./conditions";
const dfd_addrs = [
  '0x3Ac10927B78faE299C37b6dAdfB3A09a4e340924',
  '0xDA1480828D9EfEb694DA1809b1bB251CF5eB7441',
  '0x24108A70FeDa0313C3C595656Bf39be9e8E2B8E4',
  '0x2d55a5781E9972650fa4F7fC90a6250609E23333',
  '0xf92E00183788F5d4F716959aDBE4c29F3a7cA00b',
  '0x90C0Bf8D71369d21F8ADDF0Da33D21DcB0B1C384',
  '0x473F9715EE5434523e4dfc4d8ba6a2DC2eC4dafA',
  '0xDA07Dc4ff3fE332Fd16CA49Ef160A74a3d427482',
  '0xc4297F25e5469b79305AB524D485053553A8DA39',
  '0xDb4dad95d46380C7Bf29b1C6eEb5E5cBE313ab76',
  '0x962699DB05A9334C5cd1f9C2867d5160C8E37742',
  '0x00194b4A1D57E72a26f6BFA6E382A146Df73C322'
]
function App() {
  const [address, setAddress] = useState("");
  const [whitelist, setWhitelist] = useState([]);
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", function (accounts) {
      setAddress(accounts[0]);
    });
  }
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        "https://badgerdao.tk/rewards/scores.json"
      );
      const response = await result.json();
      let scores = {};
      Object.keys(response).forEach((addr) => {
        let data = response[addr];
        let sum = Object.values(data).reduce((a, b) => a + b, 0);
        if (sum >= 4) {
          data.vaultAllowed = true;
          data.diggAirdrop = true
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
      <div></div>
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
              addr = addr.replace(/ /g, "");
              setAddress(addr);
            }}
            className="address"
            placeholder="Enter ethereum address"
          ></input>
          <div className="whitelist">
           <Whitelist
            allowed={(address in whitelist && whitelist[address].diggAirdrop) || dfd_addrs.includes(address)}
            name={"ibBTC Access"}
            link={"https://app.badger.finance/ibBTC"}
            />
            {/*<Whitelist
            allowed={address in whitelist}
            name={"Digg Airdrop"}
            link={"https://app.badger.finance"}
            />*/}
           
           
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
