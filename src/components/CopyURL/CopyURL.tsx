import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Card from "../Card/Card"
import { faCopy } from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux"
import type { RootState } from "../../store"

export const CopyURL: React.FC = () => {

    const person = useSelector((state: RootState) => state.Person.person)

    return (
        <Card type="button" transform style={{backgroundColor:"#244b7cff", color:"white"}} onClick={
            () => {
                navigator.clipboard.writeText("https://react-curriculum-render.vercel.app/curriculum/" + person?.token)
            }
        } content={
            <span className="sm-font-size row sm-column-gap center" style={{float:"left"}} title="Copia a URL do currículo com o token atualizado, o currículo pode ser acessado por ela">
                <FontAwesomeIcon icon={faCopy} fontSize={"25px"}></FontAwesomeIcon>
                Copiar URL
            </span>
        }></Card>
    )
}