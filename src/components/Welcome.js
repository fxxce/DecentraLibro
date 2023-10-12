import React from "react";

const Welcome = ({ Connect_to_Wallet, Current_Account }) => {
  return (
    <div>
      <div>
        <h1 className="text-gradient">
          Explore the Treasure Trove <br/> of Borrowed Books
        </h1>
        <p className="text-gradient ">
          Uncover The Decentralized Community of Book Lovers
        </p>
        {!Current_Account && (
          <button type="button" onClick={Connect_to_Wallet} className="button">
            <p> Connect Wallet</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default Welcome;