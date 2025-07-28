import { useSelector } from "react-redux"
import type { Person } from "../../types/Person"
import AboutMe from "../AboutMe/AboutMe"
import Header from "../Header/Header"
import Item from "../Item/Item"
import Languages from "../Languages/Languages"
import TechnicalSkills from "../TechnicalSkills/TechnicalSkills"
import type { RootState } from "../../store"
import { useEffect, useState } from "react"
import axios from "axios"

interface CurriculumProps {
    apiURL: string,
}

export const Curriculum: React.FC<CurriculumProps> = ({ apiURL }) => {
    const personId = useSelector((state: RootState) => state.Person.personId)
    const [person, setPerson] = useState<Person | null>(null)
    const [loadingPerson, setLoadingPerson] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () =>{
            try {
                const startTimeStamp: number = Date.now();
                console.log(apiURL + "/get?people_id=" + personId)
                const response = await axios.get(apiURL + "/get?people_id=" + personId);
                
                const endTimeStamp: number = Date.now();
    
                const result: number = endTimeStamp - startTimeStamp;
                console.log(`Total request time for get full person data: ${result}ms`);
    
                if(response){
                    setPerson(response.data)
                    setLoadingPerson(false)
                } else {
                    setPerson(null)
                    setLoadingPerson(true)
                }
            } catch (error) {
                console.error("Error fetching for Person data:", error);
            }
        }
        fetchData()
    }, [personId, apiURL])

    return (
        <div className="main-container">
            <div className="main-container-a">
                <Header person={person && person} isLoading={loadingPerson}></Header>
                <AboutMe text={person?.about} isLoading={loadingPerson}></AboutMe>
                {person?.academic_trainings.length ?
                    <Item items={person?.academic_trainings} componentId={"Formações Acadêmicas"} isLoading={loadingPerson}></Item>
                    :
                    null
                }
                {person?.experiences.length ?
                    <Item items={person?.experiences} componentId={"Experiências"} isLoading={loadingPerson}></Item>
                    :
                    null
                }
                {person?.projects_rel.length ?
                    <Item items={person?.projects_rel} componentId={"Projetos"} isLoading={loadingPerson}></Item>
                    :
                    null
                }
                {person?.courses.length ?
                    <Item items={person?.courses} componentId={"Cursos e Certificações"} isLoading={loadingPerson}></Item>
                    :
                    null
                }
            </div>
            <div className="main-container-b">
                {person?.skills.length ?
                    <TechnicalSkills technicalSkill={person?.skills} isLoading={loadingPerson}></TechnicalSkills>
                    :
                    null
                }
                {person?.langs.length ?
                    <Languages languages={person?.langs} isLoading={loadingPerson}></Languages>
                    :
                    null
                }
            </div>
        </div>
    )
}