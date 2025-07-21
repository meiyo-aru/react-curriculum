import { useEffect, useState } from "react"
import type {AcademicTraining} from "../../types/AcademicTraining"
import axios from "axios"
import Card from "../Card/Card"
import Text from "../Text/Text"
import SeeMore from "../SeeMore/SeeMore"
interface AcademicTrainingProps {
    personId?: number | null
    isLoading?: boolean
}

const AcademicTrainings: React.FC<AcademicTrainingProps> = ({
    personId,
    isLoading
}) => {
    const [academicTrainings, setAcademicTraining] = useState<AcademicTraining[] | null>(null)
    const [hoveredItemId, setHoveredItemId] = useState<number | null>(null)
    const [clickedSeeMoreId, setClickedSeeMoreId] = useState<number | null>(null)

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

    const handleMouseEnter = (itemId:number) => {
        setHoveredItemId(itemId)
    }
    const handleMouseLeave = () => {
        setHoveredItemId(null)
    }

    const handleSeeMoreClick = (itemId:number) => {
        setClickedSeeMoreId(clickedSeeMoreId ? null : itemId)
    }

    if(academicTrainings){
        return (
            <Card title="Formação Acadêmica" boxShadow={true} isLoading={isLoading} onMouseLeave={() => handleMouseLeave()} content={
                <div className="column sm-row-gap">
                    {academicTrainings?.map((item)=>(
                        <Card isLoading={isLoading} boxShadow={true} onMouseEnter={() => handleMouseEnter(item.id)} type="card" content={
                            <div className="column sm-row-gap">
                                <div className="row flex sm-column-gap sm-row-gap">
                                    <Text type="h3" isLoading={isLoading} content={item.name}></Text>
                                    <span className="row flex sm-row-gap sm-column-gap">
                                        <Card type="smCard" isLoading={isLoading} cardClasses="bg-light-blue" title={item.level}></Card>
                                        <Card type="smCard" isLoading={isLoading} cardClasses={item.end_date ? "bg-green" : "bg-orange"} title={item.end_date ? "Completo" : "Cursando"}></Card>
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
                                                                <strong>Fim: </strong>{item.end_date ? item.end_date : "Cursando"}
                                                            </>
                                                        }></Text>
                                                    </span>
                                                </div>
                                                <div className={`${"expansive-container"} ${clickedSeeMoreId === item.id && "active"}`}>
                                                    <p><strong>Sobre: </strong>{item.about}</p>
                                                </div>
                                            </div>
                                        </>
                                    }></Card>
                                    <SeeMore isActive={hoveredItemId === item.id} onClick={() => {handleSeeMoreClick(item.id)}}></SeeMore>
                                </div>
                            </div>
                        }></Card>
                    ))}
                </div>
            }></Card>
        )
    } else { 
        return (
            <Card title="Formação Acadêmica" isLoading={isLoading} boxShadow={true} content={
                <Card boxShadow={true} isLoading={isLoading} type="card" content={
                    <div className="column sm-row-gap">
                        <div className="row flex md-column-gap md-row-gap">
                            <Text type="h3" isLoading={isLoading}></Text>
                            <Card type="smCard" isLoading={isLoading} cardClasses="bg-light-blue"></Card>
                            <Card type="smCard" isLoading={isLoading} cardClasses="bg-green"></Card>
                        </div>
                        <Card isLoading={isLoading} type="card" cardClasses="bg-light-grey center" content={
                            <div className="column sm-row-gap">
                                <div className="row">
                                    <Text type="h5" isLoading={isLoading} style={{flexGrow: "1"}}></Text>
                                    <Text type="h5" isLoading={isLoading} style={{flexGrow: "1"}}></Text>
                                </div>
                                 <div className="row">
                                    <Text type="h5" isLoading={isLoading} style={{flexGrow: "1"}}></Text>
                                    <Text type="h5" isLoading={isLoading} style={{flexGrow: "1"}}></Text>
                                </div>
                            </div>
                        }></Card>
                    </div>
                }></Card>
            }></Card>
        )
    }

}
export default AcademicTrainings;