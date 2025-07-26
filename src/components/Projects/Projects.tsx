import type { Project } from "../../types/Project"
import Item from "../Item/Item"

interface ProjectsProps {
    projects: Project[] | undefined
    componentId?: string
    isLoading?: boolean
}
const Projects: React.FC<ProjectsProps> = ({
    projects,
    componentId = "Projetos",
    isLoading,
}) => {
/*     const [projects, setProjects] = useState<Project[] | null>(null)

    useEffect(() => {
        const  fetchData = async () => {
            try {
                const startTimeStamp: number = Date.now();

                const response = await axios.get((dataApi && dataApi) + "/get/projects?people_id=" + personId)

                const endTimeStamp: number = Date.now();
                const result: number = endTimeStamp - startTimeStamp;
                console.log(`Total request time for Projects: ${result}ms`);
                if(response){
                    setProjects(response.data)
                }
            } catch (error) {
                console.error("Error fetching  for Projects data:", error);
            }
        }

        fetchData();
    }, [personId, dataApi])
 */
    return (
        <Item items={projects} componentId={componentId} isLoading={isLoading}></Item>
    )
}
export default Projects