import axios from "axios";
import React, { useEffect, useState } from "react";
import {Button} from "meiyo-react-components"
import "meiyo-react-components/dist/meiyo-react-components.css"
import style from "./SearchPerson.module.scss"
import { useDispatch } from "react-redux";
import { setPerson } from "../../features/Person/PersonSlice";

interface SearchPersonProps {
    apiURL: string
}
export const SearchPerson: React.FC<SearchPersonProps> = ({apiURL}) => {

    const [personSelect, setPersonSelect] = useState<[{"id": number, "name": string}] | null>(null)
    const [personInput, setPersonInput] = useState<string | null>(null);
    const [personId, setPersonId] = useState<number | null>(null)

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPerson = async () => {
            try {
                const startTimeStamp: number = Date.now();
                
                const response = await axios.get(apiURL + "/get/people_id?people_name=" + personInput);
                
                const endTimeStamp: number = Date.now();

                const result: number = endTimeStamp - startTimeStamp;
                console.log(`Total request time for searching person_id: ${result}ms`);

                if(response){
                    setPersonSelect(response.data)
                } else {
                    setPersonSelect(null)
                }
            } catch (error) {
                console.error("Error fetching for Person data:", error);
            }
        }
        if(personInput?.trim()) {
            fetchPerson();
        } else {
            setPersonSelect(null)
        }
    }, [personInput, apiURL]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPersonInput(event.currentTarget.value)
    }
    const handleSelectPerson = (id:number, name:string) => {
        const select = document.getElementById("selectContainer") as HTMLDivElement
        select.classList.add(style.inactive)

        const input = document.getElementById("inputPerson") as HTMLInputElement
        if(input) {
            input.value = name
            setPersonId(id)
        }
    }
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(personId){
            dispatch(setPerson({personId: personId}))
        }
    }
    const handleInputFocus = () => {
        const select = document.getElementById("selectContainer") as HTMLDivElement
        select.classList.remove(style.inactive)
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="row flex sm-column-gap">
                <div className="column sm-row-gap">
                    <div className="column flex md-row-gap" style={{width: "40rem"}}>
                        <span className="column flex">
                            <label htmlFor="inputPerson"><strong>Nome:</strong></label>
                            <input type="text" name="person" className={style.input} onChange={(event) => {handleInputChange(event); handleInputFocus()}} id="inputPerson" placeholder="Digite um nome para gerar o currículo"></input>
                            <div id="selectContainer" className={`column flex ${style.selectContainer} ${style.inactive}`}>
                                {personSelect ?
                                        personSelect?.map((person, index) => (
                                            index < 10 &&
                                            <div key={index} className={style.selectItem} onClick={() => {handleSelectPerson(person.id, person.name)}}>{person.name}</div>
                                        ))
                                    :
                                        <div>Nenhum resultado encontrado...</div>
                                }
                            </div>
                        </span>
                        {
                            personId &&
                                <>
                                    <span className="column flex">
                                        <label htmlFor="inputPassword"><strong>Senha: </strong></label>
                                        <input id="inputPassword" name="password" type="password" className={style.input} />
                                    </span>
                                    <Button text="Continuar" type="primary" size="md" shadow></Button>
                                </>
                        }
                    </div>

                </div>
            </div>
        </form>
    )

}