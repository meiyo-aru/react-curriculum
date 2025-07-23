import { useEffect, useState } from "react"
import type { Experience } from "../../types/Experience"
import axios from "axios"
import Item from "../Item/Item"

interface ExperiencesProps {
    personId?: number | null
    componentId?: string
    isLoading?: boolean
}
const Experiences: React.FC<ExperiencesProps> = ({
    personId,
    componentId = "Experiências",
    isLoading
}) => {
    const [experiences, setExperiences] = useState<Experience[] | null>(null)

    useEffect(() => {
        const  fetchData = async () => {
            try {
                const startTimeStamp: number = Date.now();

                const response = await axios.get("https://curriculum-data-api.onrender.com/get/experience?people_id=" + personId)

                const endTimeStamp: number = Date.now();
                const result: number = endTimeStamp - startTimeStamp;
                console.log(`Total request time for Experiences: ${result}ms`);
                
                if(response){
                    setExperiences(response.data)
                }
            } catch (error) {
                console.error("Error fetching  for Experiences data:", error);
            }
        }

        fetchData();
    }, [personId])

    return (
        <Item items={experiences} componentId={componentId} isLoading={isLoading}></Item>
    )
}
export default Experiences