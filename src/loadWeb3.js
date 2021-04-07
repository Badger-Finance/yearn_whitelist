import Web3 from "web3";

async function loadWeb3() {
  console.log("loading web3")
    if (window.ethereum) {
      console.log("asdkjsadjk")
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      console.log("enabled")
    }
    else if (window.web3) {
      console.log("jkasdjksdkj")
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  } 

export default loadWeb3