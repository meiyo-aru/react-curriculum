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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { CopyURL } from "../CopyURL/CopyURL"
import type {Person} from "../../types/Person"

export const Curriculum: React.FC = () => {
    const person = useSelector((state: RootState) => state.Person.person)
    const [validToken, setValidToken] = useState<boolean | null>(null)
    const [generatedNewToken, setGeneratedNewToken] = useState<boolean>(false)
    const dispatch = useDispatch()
    const apiURL = import.meta.env.VITE_API_URL
    
    const {token} = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchGenerateNewToken = async () => {
            if(person){
                try {
                    const startTimeStamp: number = Date.now();
                    const response = await axios.patch(apiURL + "/patch/token", {"token" : person.token});
                    const endTimeStamp: number = Date.now();
                    const result: number = endTimeStamp - startTimeStamp;
                    console.log(`Total request time for generate new token requisition: ${result}ms`);
    
                    if(response){
                        if(person && response.data){
                            setGeneratedNewToken(true)
                            const updatedPerson: Person = {...person, token: response.data }
                            dispatch(setPerson({person: updatedPerson}))
                        }
                    }
                } catch (error) {
                    console.error("Error fetching for generate new token:", error);
                }
            }
        }
        if(((token && validToken) || person?.token) && !generatedNewToken) {
            fetchGenerateNewToken()
        }
    }, [apiURL, dispatch, generatedNewToken, person, token, validToken])

    useEffect(() => {
        const fetchValidateToken = async () => {
            try {
                const startTimeStamp: number = Date.now();
                const response = await axios.post(apiURL + "/post/curriculum_by_token", {"token" : token});
                const endTimeStamp: number = Date.now();
                const result: number = endTimeStamp - startTimeStamp;
                console.log(`Total request time for curriculum by token requisition: ${result}ms`);

                if(response){
                    setValidToken(true)
                    dispatch(setPerson({person: response.data}))
                }
            } catch (error) {
                console.error("Error fetching for authenticate token:", error);
                setValidToken(false)
            }
        }
        if(token && validToken === null) {
            fetchValidateToken()
        }
    }, [token, navigate, dispatch, apiURL, person])

    return (
        (!person && validToken === null && token) ?
            <Card type="info" content={
                <span className="row md-column-gap">
                    <FontAwesomeIcon icon={faSpinner} pulse color="white" fontSize={"25px"} />
                    Tenha paciência, estamos validando o token...
                </span>
            }>
            </Card>
        :
            (validToken === true || person) ?
                <div className="main-container">
                    <CopyURL></CopyURL>
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