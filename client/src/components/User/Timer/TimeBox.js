import React, { useEffect, useState } from "react";
import "./Timebox.css";

const Timebox = () => {
  const [liveTime, setLiveTime] = useState("");

  useEffect(() => {
    setInterval(() => {
      let dateobject = new Date();
      let livetime = dateobject.toLocaleTimeString();
      setLiveTime(livetime);
    }, 1000);
  }, []);

  return (
    <div className="content2">
      <div className="container2">
        <div className="timebox2">{liveTime}</div>
      </div>
    </div>
  );
};

export default Timebox;
