import React from "react";

import Footer from "../../components/User/Footer/Footer";
import Header from "../../components/User/layout/Header";
import TimeBox from "../../components/User/Timer/TimeBox";

const Home = () => {
  return (
    <div>
      <div className="ocean">
        <div className="wave" />
        <div className="wave" />
      </div>
      <Header />
      <TimeBox />
      <Footer /> 
    </div>
  );
};

export default Home;
