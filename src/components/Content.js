import React from "react";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";

const Content = ({ file, tipCreator }) => {
  const val = BigNumber.from(file.tipAmount.toString());
  const tipAmount = formatEther(val);

  const handleTip = () => {
    tipCreator(file.id, "1000000000000000");
  };

  return (
    <div className="content">
      <a
        href={`https://ipfs.infura.io/ipfs/${file.hash}`}
        rel="noreferrer"
        target="_blank"
      >
        <img
          src={`https://ipfs.infura.io/ipfs/${file.hash}`}
          alt=""
          style={{ width: "100%", height: "300px" }}
        />
      </a>
      <div className="action">
        <p>{file.desc}</p>
        <br />
        <small>By: {file.contentCreator}</small>
        <h4>Tipped: {tipAmount} ETH</h4>

        <button className="btn" onClick={handleTip}>
          Tip 0.001 ETH
        </button>
      </div>
    </div>
  );
};

export default Content;
