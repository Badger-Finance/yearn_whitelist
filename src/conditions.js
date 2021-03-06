const conditions = {
  cond1: {
    condition: "Badger Staking & LPing",
    tooltip: "Badger staked/LP on 6/17",
  },
  cond2: {
    condition: "DIGG Staking & LPing",
    tooltip: "Digg staked/LP on 6/17",
  },
  cond3: {
    condition: "Governance participant",
    tooltip: "Voted on snapshot before 6/17",
  },
  cond4: {
    condition: "Owns a Badger NFT",
    tooltip: "Owns any of the Badger NFTS",
  },
  cond5: {
    condition: "Non-native Sett user",
    tooltip: `Balance is >0 for either of: 
 crvRenWBTC,
 crvRenWSBTC, 
 tbtc/sbtcCRV,
 crvRenWBTC harvest,
 wbtc/eth SLP,
 wBTC yearn Vault`,
  },
  cond6: {
    condition: "ibBTC Sett user",
    tooltip: "Balance > 0 for ibBTC sushi sett",
  },
};

export default conditions;
