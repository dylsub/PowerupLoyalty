"use client"

// import { getUsers } from "../../lib/users";
// npm install next react react-dom

import { Tourney } from "next/font/google";
const tourney = Tourney({ subsets: ["latin"] });
import { useState } from 'react';


export default function Home() {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/fridge');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        setRecords(data); // Store the records in state
      } catch (error) {
        console.error("Could not fetch the data", error);
      }
    };
    fetchData();
  }, [])

  // const users = await getUsers()
  const [isTransitioned, setIsTransitioned] = useState(true);


  return (
    <div>
      <div className="main">
        <div className="list" id="list">
          <div className="title__content">
            <div className="title__content__header">
              <img className="w-32 mr-5" src="logo.png"></img>
              <h1 className={tourney.className}>Fridg.ai</h1>
            </div>
            <p>View your stored items in your refrigerator!</p>
          </div>
          <div className="list__content">
            
          </div>
          <div className="signout">
            <a className="signout__button" href="#">Log Out</a>
          </div>
        </div>
        {isTransitioned ?
        <a href="#list" className="transition" onClick={() => setIsTransitioned(!isTransitioned)}>
          <p className="transition__button">{"<"}</p>
        </a> :
        <a href="#add" className="transition" onClick={() => setIsTransitioned(!isTransitioned)}>
          <p className="transition__button">{">"}</p>
        </a>
        }
        
        <div className="add" id="add">
          <div className="title__content text-white">
            <div className="title__content__header">
              <h1 className={tourney.className}>Fridg View</h1>
              <img className="w-32" src="logo.png"></img>
            </div>
          </div>
          <div className="add__video">
          </div>
        </div>
      </div>
    </div>
  )
}


