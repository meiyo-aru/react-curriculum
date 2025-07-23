import { useEffect, useState } from "react"
import type {AcademicTraining} from "../../types/AcademicTraining"
import axios from "axios"
import Item from "../Item/Item"

interface AcademicTrainingProps {
    personId?: number | null
    componentId?: string
    isLoading?: boolean
}

const AcademicTrainings: React.FC<AcademicTrainingProps> = ({
    personId,
    componentId = "Formações Acadêmicas",
    isLoading
}) => {
    const [academicTrainings, setAcademicTraining] = useState<AcademicTraining[] | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const startTimeStamp: number = Date.now();

                const response = await axios.get("https://curriculum-data-api.onrender.com/get/academic_training?people_id=" + personId)

                const endTimeStamp: number = Date.now();

                const result: number = endTimeStamp - startTimeStamp;
                console.log(`Total request time for academicTraining: ${result}ms`);

                if(response) {
                    setAcademicTraining(response.data)
                }
            } catch (error) {
                console.error("Error fetching for academicTraining data:", error);
            }
        } 
        fetchData()
    }, [personId])

    return (
        <Item items={academicTrainings} componentId={componentId} isLoading={isLoading}></Item>
    )


}
export default AcademicTrainings;