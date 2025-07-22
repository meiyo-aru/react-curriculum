import { useEffect, useState } from "react"
import type {AcademicTraining} from "../../types/AcademicTraining"
import axios from "axios"
import Card from "../Card/Card"
import Text from "../Text/Text"
import SeeMore from "../../features/SeeMore/SeeMore"
import Loading from "../Loading/Loading"
import { setSeeMoreClicked } from "../../features/SeeMore/SeeMoreSlice"
import { useDispatch, useSelector } from "react-redux"
import type {RootState} from "../../store"

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
    const [hoveredItemId, setHoveredItemId] = useState<number | null>(null)

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

    const handleMouseEnter = (itemId:number) => {
        setHoveredItemId(itemId)
    }
    const handleMouseLeave = () => {
        setHoveredItemId(null)
    }

    const SeeMoreState = useSelector((state: RootState) => state.SeeMore)
    const dispatch = useDispatch();

    if(!isLoading && academicTrainings){
        return (
            <Card title={componentId} boxShadow={true} isLoading={isLoading} onMouseLeave={() => handleMouseLeave()} content={
                <div className="column sm-row-gap">
                    {academicTrainings?.map((item)=>(
                        <Card key={item.id} isLoading={isLoading} boxShadow={true} onMouseEnter={() => handleMouseEnter(item.id)} type="card" content={
                            <div className="column sm-row-gap">
                                <div className="row flex sm-column-gap sm-row-gap">
                                    <Text type="h3" isLoading={isLoading} content={item.name}></Text>
                                    <span className="row flex sm-row-gap sm-column-gap">
                                        <Card type="smCard" isLoading={isLoading} classes="bg-light-blue" title={item.level}></Card>
                                        <Card type="smCard" isLoading={isLoading} classes={item.end_date ? "bg-green" : "bg-orange"} title={item.end_date ? "Completo" : "Cursando"}></Card>
                                    </span>
                                </div>
                                <div className="responsive-row">
                                    <Card isLoading={isLoading} type="card" classes="bg-light-grey center" content={
                                        <>
                                            <div className="row sm-row-gap flex">
                                                <div className="column" style={{flexGrow: "1"}}>
                                                    <span>
                                                        <Text type="h5" isLoading={isLoading} content={
                                                            <>
                                                                <strong>Instituição: </strong>{item.institution}
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
export default AcademicTrainings;