import type {AcademicTraining} from "../../types/AcademicTraining"
import Item from "../Item/Item"

interface AcademicTrainingProps {
    academicTrainings: AcademicTraining[] | undefined
    componentId?: string
    isLoading?: boolean
}

const AcademicTrainings: React.FC<AcademicTrainingProps> = ({
    academicTrainings,
    componentId = "Formações Acadêmicas",
    isLoading
}) => {
/*     const [academicTrainings, setAcademicTraining] = useState<AcademicTraining[] | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const startTimeStamp: number = Date.now();

                const response = await axios.get((dataApi && dataApi) + "/get/academic_training?people_id=" + personId)

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
    }, [personId, dataApi])  */

    return (
        <Item items={academicTrainings && academicTrainings} componentId={componentId} isLoading={isLoading}></Item>
    )


}
export default AcademicTrainings;