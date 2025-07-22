import { useEffect, useState } from "react"
import type { Project } from "../../types/Project"
import axios from "axios"
import Card from "../Card/Card"
import Loading from "../Loading/Loading"
import Text from "../Text/Text"
import SeeMore from "../../features/SeeMore/SeeMore"
import { useDispatch, useSelector } from "react-redux"
import { setSeeMoreClicked } from "../../features/SeeMore/SeeMoreSlice"
import type { RootState } from "../../store"
import style from "./Projects.module.scss"

interface ProjectsProps {
    personId?: number | null
    componentId?: string
    isLoading?: boolean
}
const Projects: React.FC<ProjectsProps> = ({
    personId,
    componentId = "Projetos",
    isLoading
}) => {
    const [projects, setProjects] = useState<Project[] | null>(null)
    const [hoveredItemId, setHoveredItemId] = useState<number | null>(null)

    useEffect(() => {
        const  fetchData = async () => {
            try {
                const startTimeStamp: number = Date.now();

                const response = await axios.get("https://curriculum-data-api.onrender.com/get/projects?people_id=" + personId)

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

    const handleMouseEnter = (itemId:number) => {
        setHoveredItemId(itemId)
    }
    const handleMouseLeave = () => {
        setHoveredItemId(null)
    }
    
    const SeeMoreState = useSelector((state: RootState) => state.SeeMore)
    const dispatch = useDispatch();

    if(!isLoading && projects) {
        return (
            <Card title={componentId} boxShadow={true} isLoading={isLoading} onMouseLeave={() => handleMouseLeave()} content={
                <div className="column sm-row-gap">
                    {projects?.map((item)=>(
                        <Card key={item.id} isLoading={isLoading} boxShadow={true} onMouseEnter={() => handleMouseEnter(item.id)} type="card" content={
                            <div className="column sm-row-gap">
                                <div className="row flex sm-column-gap sm-row-gap">
                                    <Text type="h3" isLoading={isLoading} content={item.name}></Text>
                                    <span className="row flex sm-row-gap sm-column-gap">
                                        <Card type="smCard" isLoading={isLoading} classes={item.end_date ? "bg-green" : "bg-orange" } title={item.end_date ? "Completo" : "Em desenvolvimento"}></Card>
                                    </span>
                                </div>
                                <div className="responsive-row">
                                    <Card isLoading={isLoading} type="card" classes="bg-light-grey center" content={
                                        <>
                                            <div className="column sm-row-gap flex">
                                                <div className="row sm-row-gap sm-column-gap flex">
                                                    <strong>Tags: </strong>
                                                    {item.tags?.split(",").map((tag) => (
                                                        <Card type="smCard" title={tag} isLoading={isLoading}></Card>
                                                    ))}
                                                </div>
                                                <div className="row sm-column-gap sm-row-gap flex">
                                                    <div className="column" style={{flexGrow: "1"}}>
                                                        <Text type="h5" isLoading={isLoading} content={
                                                            <>
                                                                <strong>Início: </strong>{item.start_date}
                                                            </>
                                                        }></Text>
                                                    </div>
                                                    <div className="column" style={{flexGrow: "1"}}>
                                                        <Text type="h5" isLoading={isLoading} content={
                                                            <>
                                                                <strong>Fim: </strong>{item.end_date ? item.end_date : "Até o momento"}
                                                            </>
                                                        }></Text>
                                                    </div>
                                                </div>
                                                <div className={`${style.resume}`}>
                                                    <Text type="h5" content={<><strong>Resumo: </strong> {item.resume}</>}></Text>
                                                </div>
                                                <div className={`${"expansive-container"} ${(SeeMoreState.componentId === componentId && SeeMoreState.seeMoreId === item.id) && "active"}`}>
                                                    <p>{item.about}</p>
                                                </div>
                                            </div>
                                        </>
                                    }></Card>
                                    <SeeMore componentId={componentId} seeMoreId={item.id} isActive={hoveredItemId === item.id} onClick={() => {
                                        dispatch(setSeeMoreClicked({seeMoreId: item.id, componentId: componentId}))
                                        }}></SeeMore>
                                </div>
                            </div>
                        }></Card>
                    ))}
                </div>
            }></Card>
        )
    } else {
        return (
            <Loading title={componentId}></Loading>
        )
    }
}
export default Projects