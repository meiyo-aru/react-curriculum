import { useEffect, useState } from "react"
import type { Experience } from "../../types/Experience"
import axios from "axios"
import Card from "../Card/Card"
import Loading from "../Loading/Loading"
import Text from "../Text/Text"
import SeeMore from "../../features/SeeMore/SeeMore"
import { useDispatch, useSelector } from "react-redux"
import { setSeeMoreClicked } from "../../features/SeeMore/SeeMoreSlice"
import type { RootState } from "../../store"

interface ExperiencesProps {
    personId?: number | null
    componentId?: string
    isLoading?: boolean
}
const Experiences: React.FC<ExperiencesProps> = ({
    personId,
    componentId = "Experiences",
    isLoading
}) => {
    const [experiences, setExperiences] = useState<Experience[] | null>(null)
    const [hoveredItemId, setHoveredItemId] = useState<number | null>(null)

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

    const handleMouseEnter = (itemId:number) => {
        setHoveredItemId(itemId)
    }
    const handleMouseLeave = () => {
        setHoveredItemId(null)
    }
    
    const SeeMoreState = useSelector((state: RootState) => state.SeeMore)
    const dispatch = useDispatch();

    if(!isLoading && experiences) {
        return (
            <Card title="Experiências" boxShadow={true} isLoading={isLoading} onMouseLeave={() => handleMouseLeave()} content={
                <div className="column sm-row-gap">
                    {experiences?.map((item)=>(
                        <Card key={item.id} isLoading={isLoading} boxShadow={true} onMouseEnter={() => handleMouseEnter(item.id)} type="card" content={
                            <div className="column sm-row-gap">
                                <div className="row flex sm-column-gap sm-row-gap">
                                    <Text type="h3" isLoading={isLoading} content={item.name}></Text>
                                    <span className="row flex sm-row-gap sm-column-gap">
                                        <Card type="smCard" isLoading={isLoading} cardClasses="bg-light-blue" title={item.position}></Card>
                                        <Card type="smCard" isLoading={isLoading} cardClasses={item.end_date ? "bg-orange" : "bg-green"} title={item.end_date ? item.end_date : "Empregado aqui"}></Card>
                                    </span>
                                </div>
                                <div className="responsive-row">
                                    <Card isLoading={isLoading} type="card" cardClasses="bg-light-grey center" content={
                                        <>
                                            <div className="row sm-row-gap flex">
                                                <div className="column" style={{flexGrow: "1"}}>
                                                    <span>
                                                        <Text type="h5" isLoading={isLoading} content={
                                                            <>
                                                                <strong>Empresa: </strong>{item.enterprise}
                                                            </>
                                                            }></Text>
                                                    </span>
                                                    <span>
                                                        <Text type="h5" isLoading={isLoading} content={
                                                            <>
                                                                <strong>Localização: </strong>{item.address}
                                                            </>
                                                        }></Text>
                                                    </span>
                                                </div>
                                                <div className="column" style={{flexGrow: "1"}}>
                                                    <span>
                                                        <Text type="h5" isLoading={isLoading} style={{flexGrow: "1"}} content={
                                                            <>
                                                                <strong>Início: </strong>{item.start_date}
                                                            </>
                                                        }></Text>
                                                    </span>
                                                    <span>
                                                        <Text type="h5" isLoading={isLoading} style={{flexGrow: "1"}}content={
                                                            <>
                                                                <strong>Fim: </strong>{item.end_date ? item.end_date : "Até o momento"}
                                                            </>
                                                        }></Text>
                                                    </span>
                                                </div>
                                                <div className={`${"expansive-container"} ${(SeeMoreState.componentId === componentId && SeeMoreState.seeMoreId === item.id) && "active"}`}>
                                                    <p><strong>Sobre: </strong>{item.about}</p>
                                                </div>
                                            </div>
                                        </>
                                    }></Card>
                                    <SeeMore isActive={hoveredItemId === item.id} onClick={() => {
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
            <Loading title="Experiências"></Loading>
        )
    }
}
export default Experiences