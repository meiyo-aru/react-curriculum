"use client"
import { useDispatch, useSelector } from "react-redux"
import AboutMe from "../AboutMe/AboutMe"
import Header from "../Header/Header"
import Item from "../Item/Item"
import Languages from "../Languages/Languages"
import TechnicalSkills from "../TechnicalSkills/TechnicalSkills"
import type { RootState } from "../../store"
import { useEffect, useState } from "react"
import axios from "axios"
import { setPerson } from "../../features/Person/PersonSlice"
import Card from "../Card/Card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

interface CurriculumProps {
    token?: string | null // token from URL query parameter
}

export const Curriculum: React.FC<CurriculumProps> = ({
    token
}) => {
    const person = useSelector((state: RootState) => state.Person.person) // global state to control person data
    const [validToken, setValidToken] = useState<boolean | null>(null)  // state to control if the token is valid
    const dispatch = useDispatch() // to dispatch actions to the redux store
    const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"; // API URL from environment variable or default to localhost
    
    // if no token in URL and no person in state, redirect to home
    useEffect(() => {
        const fetchValidateToken = async () => {
            try {
                const startTimeStamp: number = Date.now();
                const response = await axios.post(apiURL + "/post/curriculum_by_token", {"token" : token}); // validate token and get person data
                const endTimeStamp: number = Date.now();
                const result: number = endTimeStamp - startTimeStamp;
                console.log(`Total request time for curriculum by token requisition: ${result}ms`);

                // if response is valid, set person in state and mark token as valid
                if(response){
                    setValidToken(true)
                    dispatch(setPerson({person: response.data}))
                }
            } catch (error) { // if error, token is invalid
                console.error("Error fetching for authenticate token:", error);
                setValidToken(false)
            }
        }
        if(token && validToken === null) { // only validate if there's a token and we haven't validated yet
            fetchValidateToken()
        }
    }, [token, dispatch, apiURL, person, validToken])

    return (
        // loading state while validating token
        (!person && validToken === null && token) ?
            <Card type="info" content={
                <span className="row md-column-gap">
                    <FontAwesomeIcon style={{maxHeight:"25px"}} icon={faSpinner} pulse color="white" fontSize={"25px"} />
                    Tenha paciência, estamos validando o token...
                </span>
            }>
            </Card>
        :
            // if token is valid or person data is already in state, show the curriculum, if token is invalid, show error message
            (validToken === true || person) ?
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