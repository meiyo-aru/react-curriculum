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

  const dataApiURL = "http://localhost:8000"
  const handleLoadingPeople = (loading: boolean) => {
      setLoadingPeople(loading);
  }

  useEffect(() => {
      const fetchData = async () => {
          try {
              const startTimeStamp: number = Date.now();
              
              const response = await axios.get(dataApiURL + "/get?people_id=" + personId);
              
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
            <AboutMe text={person?.about} isLoading={loadingPeople}></AboutMe>
            <AcademicTrainings academicTrainings={person?.academic_trainings} isLoading={loadingPeople}></AcademicTrainings>
            <Experiences experiences={person?.experiences} isLoading={loadingPeople}></Experiences>
            <Projects projects={person?.projects_rel} isLoading={loadingPeople}></Projects>
        </div>
        <div className="main-container-b">
            <TechnicalSkills technicalSkill={person?.skills} isLoading={loadingPeople}></TechnicalSkills>
        </div>
    </div>
  )
}
export default App;