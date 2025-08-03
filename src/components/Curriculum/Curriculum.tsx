import { useDispatch, useSelector } from "react-redux"
import AboutMe from "../AboutMe/AboutMe"
import Header from "../Header/Header"
import Item from "../Item/Item"
import Languages from "../Languages/Languages"
import TechnicalSkills from "../TechnicalSkills/TechnicalSkills"
import type { RootState } from "../../store"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { setPerson } from "../../features/Person/PersonSlice"
import Card from "../Card/Card"

export const Curriculum: React.FC = () => {
    const person = useSelector((state: RootState) => state.Person.person)
    const [validToken, setValidToken] = useState<boolean>(false)
    const dispatch = useDispatch()
    const apiURL = import.meta.env.VITE_API_URL
    
    const {token} = useParams()
    const navigate = useNavigate()
/*     useEffect(() => {
        const fetchGenerateNewToken = async () => {
            try {
                const startTimeStamp: number = Date.now();
                const response = await axios.patch(apiURL + "/patch/token", {"username" : person?.username, "password" : person?.password});
                
                const endTimeStamp: number = Date.now();

                const result: number = endTimeStamp - startTimeStamp;
                console.log(`Total request time for generate new token requisition: ${result}ms`);

                if(response){
                    if(person){
                        person.token = response.data
                        dispatch(setPerson({person: person}))
                    }
                    setValidToken(true)
                }
            } catch (error) {
                console.error("Error fetching for generate new token:", error);
                setValidToken(false)
            }
        }
        if(person)
            fetchGenerateNewToken()
    }, [person, apiURL, dispatch])
 */
    useEffect(() => {
        const fetchValidateToken = async () => {
            try {
                const startTimeStamp: number = Date.now();
                
                const response = await axios.post(apiURL + "/post/curriculum_by_token", {"token" : token});
                
                const endTimeStamp: number = Date.now();

                const result: number = endTimeStamp - startTimeStamp;
                console.log(`Total request time for curriculum by token requisition: ${result}ms`);

                if(response){
                    dispatch(setPerson({person: response.data}))
                    setValidToken(true)
                }
            } catch (error) {
                console.error("Error fetching for authenticate token:", error);
                setValidToken(false)
            }
        }
        if(token && !person) {
            fetchValidateToken()
        }
    }, [token, navigate])

    return (
        validToken || person ?
            <div className="main-container">
                <div className="main-container-a" style={person?.skills.length && person?.langs.length ? undefined : {width: "100%"}}>
                    <Header person={person && person} isLoading={person ? false : true}></Header>
                    <AboutMe text={person?.about} isLoading={person ? false : true}></AboutMe>
                    {person?.academic_trainings.length ?
                        <Item items={person?.academic_trainings} componentId={"Formações Acadêmicas"} isLoading={person ? false : true}></Item>
                        :
                        null
                    }
                    {person?.experiences.length ?
                        <Item items={person?.experiences} componentId={"Experiências"} isLoading={person ? false : true}></Item>
                        :
                        null
                    }
                    {person?.projects_rel.length ?
                        <Item items={person?.projects_rel} componentId={"Projetos"} isLoading={person ? false : true}></Item>
                        :
                        null
                    }
                    {person?.courses.length ?
                        <Item items={person?.courses} componentId={"Cursos e Certificações"} isLoading={person ? false : true}></Item>
                        :
                        null
                    }
                </div>
                {
                    person?.skills.length && person?.langs.length ?
                        <div className="main-container-b">
                            {person?.skills.length ?
                                <TechnicalSkills technicalSkill={person?.skills} isLoading={person ? false : true}></TechnicalSkills>
                                :
                                null
                            }
                            {person?.langs.length ?
                                <Languages languages={person?.langs} isLoading={person ? false : true}></Languages>
                                :
                                null
                            }
                        </div>
                        :
                        null
                }
            </div>
            :
            <Card type="alert" content={
                <>
                    Token inválido!
                    <br />
                    Faça login ou acesse o endereço com um token válido!
                </>
            }></Card>
    )
}