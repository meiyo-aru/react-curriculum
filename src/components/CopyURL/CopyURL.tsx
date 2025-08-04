import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Card from "../Card/Card"
import { faCopy } from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux"
import type { RootState } from "../../store"
import { useState } from "react"

export const CopyURL: React.FC = () => {

    const person = useSelector((state: RootState) => state.Person.person)
    const [copied, setCopied] = useState<boolean>(false)

    return (
        <Card type="button" transform style={{padding: "10px 15px",backgroundColor: copied ? "rgb(73 91 113)" : "#224a7b", color:"white"}} onClick={
            () => {
                navigator.clipboard.writeText("https://react-curriculum-render.vercel.app/curriculum/" + person?.token);
                setCopied(true)
            }
        } content={
            <span className="sm-font-size row sm-column-gap center" style={{float:"left", color: copied ? "rgb(185 200 211)" : "white"}} title="Copia a URL do currículo com o token atualizado, o currículo pode ser acessado por ela">
                <FontAwesomeIcon icon={faCopy} fontSize={"25px"}></FontAwesomeIcon>
                {copied ? "Copiado" : "Copiar URL"}
            </span>
        }></Card>
    )
}