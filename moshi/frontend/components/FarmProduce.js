import React, { useState,useEffect } from "react";
import testImage from "../assets/fam.png";
import SellModal from "./SellModal";

import Footer from "./Footer";
import { Link } from "react-router-dom";

function FarmProduce({wallet,contractId,isSignedIn}) {

  const[produces, setProduces] = useState([]);
  const [userProfile, setUserProfile] = useState([]);

  const viewProfile = () => {
    const profile = window.nearwallet.viewMethod({ method: "get_users", contractId }).then((result) => result[window.nearwallet.accountId]).then(data => data);
    return profile;
}

    useEffect(() => {
    getProduces().then(setProduces);
    viewProfile().then((data) => (setUserProfile(data)));
  }, []);

  const [sellModalOpen, setSellModalOpen] = useState(false);
  const handleOpenModal = () => {
    setSellModalOpen(true);
  }
  const handleCloseModal = () => {
    setSellModalOpen(false);
  }

  function getProduces() {
	  return wallet.viewMethod({ method: "get_produces", contractId });
	}
  
  const signIn = () => {
    wallet.signIn();
  };
  return (
    <div>
      {sellModalOpen && <SellModal handleCloseModal={handleCloseModal} wallet ={wallet} contractId={contractId} />}
      <div className="w3-auto">
      <br />
      <br />
        <div className="w3-center">
          {isSignedIn?
           <>
          {userProfile? <button onClick={handleOpenModal} className="w3-button w3-green"> Sell </button>:
          
          <button>
          <Link to="/account" className="w3-button w3-green"> Please Update Profile To Start To Selling</Link>
         </button> 
          }
          </> :                 
          <button onClick={signIn} className="w3-button w3-green w3-round">
                Please Login to Start Selling
          </button> }

        </div>
        <h2> Products Available</h2>
        <br />
        <div className="">
              <div className="w3-row-padding">
              {Object.values(produces).map((produce, index) => {
                        if (produce.produce_sold == false) {


                                  const produceTo = {
                                    pathname:"/produce-view/"+produce.id,
                                }

                                return (
                                          <div key={index} className="w3-col l4 w3-card w3-margin-bottom">
                                            <div className="card-header">
                                              <img src={produce.produce_image} alt="rover" />
                                            </div>
                                            <div className="card-body">
                                              <span className="tag tag-teal"></span>
                                              <h4>
                                              {produce.produce_name}
                                              </h4>
                                              <div className="des">
                                                <p>
                                                {produce.produce_description}
                                                </p>
                                              </div>
                                              <div>
                                                <p>{produce.produce_price}</p>
                                              </div>
                                              <div className="user">
                                                <div className="user-info">
                                                  <h5>
                                                  <button className="w3-button w3-green">
                                                  <Link className="btn-h" to={produceTo} > view </Link>
                                                  </button>
                                                  </h5>
                                                  <small>{produce.produce_owner}</small>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                    );

                                  }
                  
                          })}
                  </div>


        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FarmProduce;
