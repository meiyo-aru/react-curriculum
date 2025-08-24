"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Card from "../Card/Card"
import { faCopy } from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux"
import type { RootState } from "../../store"
import { useState } from "react"
import style from "./CopyURL.module.scss"

export const CopyURL: React.FC = () => {
    
    const person = useSelector((state: RootState) => state.Person.person) // global state to get person data
    const [copied, setCopied] = useState<boolean>(false) // state to control if the URL has been copied

    return (
        // Button to copy the curriculum URL with token to clipboard
        <Card type="button" classes={`${style['copy']}`} style={{padding: "10px 15px",backgroundColor: "transparent", color: copied ? "rgb(107 137 169)" : undefined}} onClick={
            () => {
                navigator.clipboard.writeText("https://react-curriculum-render.vercel.app/curriculum/" + person?.token);
                setCopied(true)
            }
        } content={
            <div className="sm-font-size row sm-column-gap center" title="Copia a URL do currículo com o token atualizado, o currículo pode ser acessado por ela">
                <FontAwesomeIcon icon={faCopy} fontSize={"25px"}></FontAwesomeIcon>
                {copied ? "Copiado" : "Copiar URL"}
            </div>
        }></Card>
    )
}