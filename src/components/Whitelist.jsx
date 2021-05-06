
function Whitelist({allowed,name,link}) {
    return(
    <div className="unlockable">
    {allowed ? (
      <div>
        <div className="whitelist-text">{name} 🔓</div>
        <div className="whitelist-text">
          Accessible at{" "}
          <a href={link}>
            {link}
          </a>
        </div>
      </div>
    ) : (
      <div className="whitelist-text">{name} 🔒</div>
    )}
  </div>)
}


export default Whitelist