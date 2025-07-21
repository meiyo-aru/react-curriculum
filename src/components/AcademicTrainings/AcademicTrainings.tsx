import { useEffect, useState } from 'react'
import type {AcademicTraining} from '../../types/AcademicTraining'
import axios from 'axios'
import Card from '../Card/Card'
import Text from '../Text/Text'
interface AcademicTrainingProps {
    personId?: number | null
    isLoading?: boolean
}

const AcademicTrainings: React.FC<AcademicTrainingProps> = ({
    personId,
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
                console.log(`Tempo total de requisição para academicTraining: ${result}ms`);

                if(response) {
                    setAcademicTraining(response.data)
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        } 
        fetchData()
    }, [personId])

    if(academicTrainings){
        return (
            <Card title='Formação Acadêmica' isLoading={isLoading} content={
                <>
                    {academicTrainings?.map((item)=>(
                        <Card isLoading={isLoading} type='card' content={
                            <Text type="h3" content={item.name}></Text>
                        }></Card>
                    ))}
                </>
            }></Card>
        )
    } else {
        return (
            <Card title='Formação Acadêmica' isLoading={isLoading} content={
                <Card isLoading={isLoading} type='card' content={
                    <div className='column gap'>
                        <div className='row flex gap'>
                            <Text type="h3" isLoading={isLoading}></Text>
                            <Card type='tag'></Card>
                        </div>

                    </div>
                }></Card>
            }></Card>
        )
    }

}
export default AcademicTrainings;