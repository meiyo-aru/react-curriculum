import axios from "axios";
import React, { useEffect, useState } from "react";
import AboutMe from "./components/AboutMe/AboutMe";
import Header from "./components/Header/Header";
import type { Person } from "./types/Person"
import TechnicalSkills from "./components/TechnicalSkills/TechnicalSkills";
import Languages from "./components/Languages/Languages";
import Item from "./components/Item/Item";

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
                <Item items={person?.academic_trainings} componentId={"Formações Acadêmicas"} isLoading={loadingPeople}></Item>
                <Item items={person?.experiences} componentId={"Experiências"} isLoading={loadingPeople}></Item>
                <Item items={person?.projects_rel} componentId={"Projetos"} isLoading={loadingPeople}></Item>
                <Item items={person?.courses} componentId={"Cursos e Certificações"} isLoading={loadingPeople}></Item>
            </div>
            <div className="main-container-b">
                <TechnicalSkills technicalSkill={person?.skills} isLoading={loadingPeople}></TechnicalSkills>
                <Languages languages={person?.langs} isLoading={loadingPeople}></Languages>
            </div>
        </div>
    )
}
export default App;