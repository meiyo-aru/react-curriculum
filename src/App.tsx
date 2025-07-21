import Card from "./components/card";
import AboutMe from "./components/AboutMe";
import { useEffect, useState } from "react";
import axios from "axios";
<<<<<<< Updated upstream
/* import { useState } from "react";
 */
=======
import React, { useEffect, useState } from "react";
import AboutMe from "./components/AboutMe/AboutMe";
import Header from "./components/Header/Header";

import type { Person } from "./types/Person"
import AcademicTrainings from "./components/AcademicTrainings/AcademicTrainings";
import Experiences from "./components/Experiences/Experiences";

>>>>>>> Stashed changes
function App() {
    const [about, setAboutMe] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const startTimeStamp: number = Date.now();
                
                const response = await axios.get('https://curriculum-data-api.onrender.com/get');
                
                const endTimeStamp: number = Date.now();

                const result: number = endTimeStamp - startTimeStamp;
                console.log(`Tempo total de requisições: ${result}ms`);

<<<<<<< Updated upstream
                if(response){
                    const data = response.data;
                    console.log(data);
                    setAboutMe(data.about);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    /*     
        const [language, setLanguage] = useState("pt");
    
        const handleLanguageChange = () => {
            setLanguage(language => language === "pt" ? "en" : "pt");
            alert('Língua mudada')
        }
    */
    return (
        <>
            <AboutMe title="Sobre mim" text={about}/>
        </>
    )
=======
  useEffect(() => {
      const fetchData = async () => {
          try {
              const startTimeStamp: number = Date.now();
              
              const response = await axios.get("https://curriculum-data-api.onrender.com/get/people?people_id=" + personId);
              
              const endTimeStamp: number = Date.now();

              const result: number = endTimeStamp - startTimeStamp;
              console.log(`Total request time for Person: ${result}ms`);

              if(response){
                  setPeople(response.data);
                  handleLoadingPeople(false);
              }
          } catch (error) {
              console.error("Error fetching for Person data:", error);
          }
      };
      fetchData();
  }, []);
  

  return (
      <div className="column responsive-gap">
        <Header person={person && person} isLoading={loadingPeople}></Header>
        <AboutMe text={person && person.about} isLoading={loadingPeople}></AboutMe>
        <AcademicTrainings personId={personId} isLoading={loadingPeople}></AcademicTrainings>
        <Experiences personId={personId} isLoading={loadingPeople}></Experiences>
      </div>
  )
>>>>>>> Stashed changes
}
export default App;