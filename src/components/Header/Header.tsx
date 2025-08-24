import type { Person } from "../../types/Person"
import Card from "../Card/Card"
import { CopyURL } from "../CopyURL/CopyURL"
import Text from "../Text/Text"

interface HeaderProps {
    person: Person | null
    isLoading?: boolean
}

const Header: React.FC<HeaderProps> = ({
    person,
    isLoading,
}) => {
    return (
        // Header with name, positions, contact info and CopyURL button
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
                        <span>E-mail: <a href={`mailTo:${person?.mail}`} className="link-yellow">{person?.mail}</a></span><br/>
                        <span>LinkedIn: <a href={`http://${person?.linkedin}`} className="link-yellow">Perfil</a></span>
                    </>
                }></Text>
                <CopyURL></CopyURL>
            </>
        } type="header"></Card>
    )
}
export default Header;