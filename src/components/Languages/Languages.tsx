import type { Language } from "../../types/Language"
import Card from "../Card/Card"
import Text from "../Text/Text"

interface LanguagesProps {
    languages: Language[] | undefined
    isLoading?: boolean
    componentId?: string
}
const Languages: React.FC<LanguagesProps> = ({
    languages,
    isLoading,
    componentId = "Idiomas"
}) => {
    return (
        <Card title={componentId} isLoading={isLoading} boxShadow={true} content={
            <div className="column sm-row-gap">
                {languages?.map((language) => (
                    <Card key={language.id} type="card" content={
                        <Text type="h5" classes="space-between flex row" content={
                            <>
                                <span>
                                    <strong>
                                        {language.name} 
                                    </strong>
                                </span>
                                <span className="sm-font-size">
                                    {language.level}
                                </span>
                            </>
                        }></Text>
                    }></Card>
                ))}
            </div>
        }></Card>
    )
}
export default Languages