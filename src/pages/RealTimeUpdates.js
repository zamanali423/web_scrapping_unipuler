import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("ws://webscrappingbackend.vercel.app");

function RealTimeUpdates() {
  const [data, setData] = useState([]);

  useEffect(() => {
    socket.on("batchUpdate", (batch) => {
      setData((prevData) => [...prevData, ...batch]);
      console.log("scrapping result data backend...");
    });
    console.log("scrapping...");
    socket.on("scrapingComplete", (message) => {
      console.log(message);
    });

    socket.on("scrapingError", (error) => {
      console.error("Scraping error:", error.message);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <h1>Live Scraping Data</h1>
      {data.map((item, index) => (
        <div key={index}>
          <h3>{item.storeName}</h3>
          <p>{item.address}</p>
          {/* Display other fields */}
        </div>
      ))}
    </div>
  );
}

export default RealTimeUpdates;
