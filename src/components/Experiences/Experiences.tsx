import type { Experience } from "../../types/Experience"
import Item from "../Item/Item"

interface ExperiencesProps {
    experiences: Experience[] | undefined
    componentId?: string
    isLoading?: boolean
}
const Experiences: React.FC<ExperiencesProps> = ({
    experiences,
    componentId = "Experiências",
    isLoading,
}) => {
/*     const [experiences, setExperiences] = useState<Experience[] | null>(null)

    useEffect(() => {
        const  fetchData = async () => {
            try {
                const startTimeStamp: number = Date.now();

                const response = await axios.get((dataApi && dataApi) + "/get/experience?people_id=" + personId)

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
    }, [personId, dataApi])

 */    return (
        <Item items={experiences} componentId={componentId} isLoading={isLoading}></Item>
    )
}
export default Experiences