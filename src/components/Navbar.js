import React from "react";

const Navbar = ({ myAcc }) => {
  return (
    <div className="nav">
      <h3>Top Content</h3>
      <p>
        {myAcc.slice(0, 6)}...{myAcc.slice(36)}
      </p>
    </div>
  );
};

export default Navbar;
