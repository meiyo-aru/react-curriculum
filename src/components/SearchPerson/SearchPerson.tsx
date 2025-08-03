import axios from "axios";
import React, { useEffect, useState } from "react";
import {Button} from "meiyo-react-components"
import "meiyo-react-components/dist/meiyo-react-components.css"
import style from "./SearchPerson.module.scss"
import { useDispatch } from "react-redux";
import { setPerson } from "../../features/Person/PersonSlice";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
export const SearchPerson: React.FC = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [usernameExists, setUsernameExists] = useState<boolean>(false)
    const [personAuthenticated, setPersonAuthenticated] = useState<boolean | null>(null)
    const [loadingCurriculum, setLoadingCurriculum] = useState<boolean>(false);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const apiURL = import.meta.env.VITE_API_URL
    console.log(apiURL)
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.currentTarget.value)
    }
 
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(usernameExists){
            const password = event.currentTarget.password.value as string
            const fetchAuthenticate = async () => {
                try {
                    const startTimeStamp: number = Date.now();
                    
                    const response = await axios.post(apiURL + "/post/curriculum", {"username" : username, "password" : password});
                    
                    const endTimeStamp: number = Date.now();
    
                    const result: number = endTimeStamp - startTimeStamp;
                    console.log(`Total request time for authenticate requisition: ${result}ms`);
    
                    if(response){
                        setPersonAuthenticated(true)
                        dispatch(setPerson({person: response.data}))
                        setLoadingCurriculum(false)
                        navigate("/curriculum/" + response.data.token)
                    }
                } catch (error) {
                    console.error("Error fetching for authenticate requisition:", error);
                    setPersonAuthenticated(false)
                    setLoadingCurriculum(false)
                }
            }
            if(usernameExists && password?.trim()) {
                fetchAuthenticate();
                setLoadingCurriculum(true)
            }
    
        }
    }
    
    useEffect(() => {
        const fetchVerifyUsername = async () => {
            try {
                const startTimeStamp: number = Date.now();
                
                const response = await axios.get(apiURL + "/get/verify_username?username=" + username);
                
                const endTimeStamp: number = Date.now();

                const result: number = endTimeStamp - startTimeStamp;
                console.log(`Total request time for verify username: ${result}ms`);

                setUsernameExists(response.data)

            } catch (error) {
                console.error("Error fetching for verify username:", error);
            }
        }

        fetchVerifyUsername()
    }, [username, apiURL]);

    return (
        <Card title="React Curriculum Render" style={{padding: "20px 20px"}} boxShadow content={
            <form onSubmit={handleFormSubmit}>
                <div className="row flex sm-column-gap">
                    <div className="column sm-row-gap">
                        <div className="column flex md-row-gap" style={{width: "40rem"}}>
                            <span className="column flex">
                                <label htmlFor="username"><strong>Nome de usuário:</strong></label>
                                <input type="text" name="username" className={style.input} onChange={(event) => {handleUsernameChange(event)}} id="username" placeholder="Digite seu nome de usuário"></input>
                                {
                                    (!usernameExists && username?.trim()) &&
                                        <span className={style.alert}>
                                            *Nome de usuário não existe!
                                        </span>
                                }
                            </span>
                            <span className="column flex">
                                <label htmlFor="password"><strong>Senha: </strong></label>
                                <input id="password" name="password" placeholder="Digite sua senha" type="password" className={style.input} />
                                
                                {
                                    personAuthenticated === false &&
                                        <>
                                            <span className={style.alert}>
                                                *Senha incorreta!
                                            </span>
                                        </>
                                }
                            </span>
                            <Button text="Continuar" type="primary" size="md" shadow></Button>
                            {
                                loadingCurriculum &&
                                    <Card type="info" content={
                                        <span className="row md-column-gap">
                                            <FontAwesomeIcon icon={faSpinner} pulse color="white" fontSize={"25px"} />
                                            Tenha paciência, estamos validando seus dados...
                                        </span>
                                    }>
                                    </Card>
                            }
                        </div>

                    </div>
                </div>
            </form>
        }></Card>
    )

}