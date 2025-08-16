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
        <Card type="button" transform style={{padding: "10px 15px",backgroundColor: "transparent"}} onClick={
            () => {
                navigator.clipboard.writeText("https://react-curriculum-render.vercel.app/curriculum/" + person?.token);
                setCopied(true)
            }
        } content={
            <div className="sm-font-size row sm-column-gap center" style={{color: copied ? "rgb(107 137 169)" : "white"}} title="Copia a URL do currículo com o token atualizado, o currículo pode ser acessado por ela">
                <FontAwesomeIcon icon={faCopy} fontSize={"25px"}></FontAwesomeIcon>
                {copied ? "Copiado" : "Copiar URL"}
            </div>
        }></Card>
    )
}