import { useEffect, useState } from "react"
import type { TechnicalSkill } from "../../types/TechnicalSkill"
import axios from "axios"
import Card from "../Card/Card"
import Loading from "../Loading/Loading"

interface TechnicalSkillsProps {
    personId: number | null
    isLoading?: boolean | null
    componentId?: string
}

const TechnicalSkills: React.FC<TechnicalSkillsProps> = ({
    personId,
    isLoading,
    componentId = "Habilidades Técnicas"
}) => {
    const [technicalSkill, setTechnicalSkill] = useState<TechnicalSkill[] | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const startTimeStamp: number = Date.now();
    
                const response = await axios.get("https://curriculum-data-api.onrender.com/get/experience?people_id=" + personId)
    
                const endTimeStamp: number = Date.now();
                const result: number = endTimeStamp - startTimeStamp;
                console.log(`Total request time for Experiences: ${result}ms`);
                
                if(response){
                    setTechnicalSkill(response.data)
                }
            } catch (error) {
                console.error("Error fetching  for Experiences data:", error);
            }
        }
        fetchData()
    }, [personId])

    if(isLoading && technicalSkill) {
        return (
            <Card title={componentId}></Card>
        )
    } else {
        return (
            <Loading title={componentId}></Loading>
        )
    }
}
export default TechnicalSkills