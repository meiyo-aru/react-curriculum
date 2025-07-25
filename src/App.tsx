import axios from "axios";
import React, { useEffect, useState } from "react";
import AboutMe from "./components/AboutMe/AboutMe";
import Header from "./components/Header/Header";

import type { Person } from "./types/Person"
import AcademicTrainings from "./components/AcademicTrainings/AcademicTrainings";
import Experiences from "./components/Experiences/Experiences";
import TechnicalSkills from "./components/TechnicalSkills/TechnicalSkills";
import Projects from "./components/Projects/Projects";

function App() {
  const personId = 1;
  const [person, setPeople] = useState<Person | null>(null);
  const [loadingPeople, setLoadingPeople] = React.useState<boolean>(true);

  const handleLoadingPeople = (loading: boolean) => {
      setLoadingPeople(loading);
  }

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
    <div className="main-container">
        <div className="main-container-a">
            <Header person={person && person} isLoading={loadingPeople}></Header>
            <AboutMe text={person && person.about} isLoading={loadingPeople}></AboutMe>
            <AcademicTrainings personId={personId} isLoading={loadingPeople}></AcademicTrainings>
            <Experiences personId={personId} isLoading={loadingPeople}></Experiences>
            <Projects personId={personId} isLoading={loadingPeople}></Projects>
        </div>
        <div className="main-container-b">
            <TechnicalSkills personId={personId} isLoading={loadingPeople}></TechnicalSkills>
        </div>
    </div>
  )
}
export default App;