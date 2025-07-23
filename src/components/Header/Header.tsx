import type { Person } from "../../types/Person"
import Card from "../Card/Card"
import Text from "../Text/Text"

interface HeaderProps {
    person: Person | null
    isLoading?: boolean
}

const Header: React.FC<HeaderProps> = ({
    person,
    isLoading
}) => {
    return (
        <Card boxShadow={true} isLoading={isLoading} content={
            <>
                <Text type="h1" isLoading={isLoading} content={person && person.name}></Text>
                <Text type="h2" isLoading={isLoading} content={person && person.positions}></Text>
                <Text type="p" isLoading={isLoading} content={
                    <>
                        <span>Endereço: {person?.address}</span><br/>
                        <span>Celular: {person?.phone_01} |
                            {person?.phone_02} 
                        </span><br/>
                        <span>E-mail: <a className="link-yellow" href={`mailTo:${person?.mail}`}>{person?.mail}</a></span><br/>
                        <span>LinkedIn: <a className="link-yellow" href={`http://${person?.linkedin}`}>Perfil</a></span>
                    </>
                }></Text>
            </>
        } type="header"></Card>
    )
}
export default Header;