import { useEffect, useState } from "react"
import type { Project } from "../../types/Project"
import axios from "axios"
import Item from "../Item/Item"

interface ProjectsProps {
    personId?: number | null
    componentId?: string
    isLoading?: boolean
    dataApi?: string
}
const Projects: React.FC<ProjectsProps> = ({
    personId,
    componentId = "Projetos",
    isLoading,
    dataApi
}) => {
    const [projects, setProjects] = useState<Project[] | null>(null)

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
    }, [personId])

    return (
        <Item items={projects} componentId={componentId} isLoading={isLoading}></Item>
    )
}
export default Projects