import { useMemo, useState } from "react"
import type { TechnicalSkill } from "../../types/TechnicalSkill"
import Card from "../Card/Card"
import Text from "../Text/Text"
import styles from "./TechnicalSkills.module.scss"
import ShowMoreButton from "../../features/ShowMoreButton/ShowMoreButton"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { setShowMoreClicked } from "../../features/ShowMoreButton/ShowMoreButtonSlice"
import { Info } from "../Info/Info"


interface TechnicalSkillsProps {
    technicalSkill: TechnicalSkill[] | undefined
    isLoading?: boolean
    componentId?: string
}

const TechnicalSkills: React.FC<TechnicalSkillsProps> = ({
    technicalSkill,
    isLoading,
    componentId = "Habilidades Técnicas",
}) => {
    const [focused, setFocused] = useState<number|null>(null)
    const maxItems = 6

/* 
    Commented because multiple asynchronous requests are so much costly for free plan of Render,
    then only one complex request is more interesting in this context
*/
/*     const [technicalSkill, setTechnicalSkill] = useState<TechnicalSkill[] | null>(null)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const startTimeStamp: number = Date.now();
    
                const response = await axios.get((dataApi && dataApi) + "/get/technical_skills?people_id=" + personId)
    
                const endTimeStamp: number = Date.now();
                const result: number = endTimeStamp - startTimeStamp;
                console.log(`Total request time for Experiences: ${result}ms`);
                
                if(response){
                    setTechnicalSkill(response.data)
                }
            } catch (error) {
                console.error("Error fetching  for Experiences data:", error);
            }
        }
        fetchData()
    }, [personId, dataApi])
 */    
    const sortedTechnicalSkills = useMemo(() => {
        if (!technicalSkill) {
        return []; 
        }
        return [...technicalSkill].sort((a, b) => b.percent_level - a.percent_level);
    }, [technicalSkill]); 

    const ShowMoreState = useSelector((state: RootState) => state.ShowMore)
    const dispatch = useDispatch();

    if(!isLoading && technicalSkill) {
        return (
            <Card title={
                    <>
                        {componentId}
                        <Info infoId={-1} text="Habilidades técnicas são capacidades ou aptidões que um profissional possui. A barra de aptidão mensura o nível de confiança, experiência prática e conhecimento sobre o assunto."></Info>
{/*                         <span style={{float: "right", color: "#4b678f", cursor: "pointer"}} onClick={() => {
                            handleFocused(-1)
                        }}>
                            <FontAwesomeIcon icon={faCircleInfo} />
                        </span>
                        <Card type="card" isLoading={isLoading} classes={`${isFocused(-1) ? styles.active : styles.inactive} ${styles.info} bg-light-grey`} content={
                            <span>Habilidades técnicas são capacidades ou aptidões que um profissional possui. A barra de aptidão mensura o nível de confiança, experiência prática e conhecimento sobre o assunto.</span>
                        }>
                        </Card>  */}
                    </>
                } boxShadow={true} isLoading={isLoading} classes="column sm-row-gap" content={
                <div className="flex column sm-row-gap">
                    {sortedTechnicalSkills.map((skill, index) => (
                        (index < maxItems || ShowMoreState.componentId === componentId) &&                
                        <Card key={index} type="card" boxShadow={true} style={{padding: "10px 12px"}} onMouseEnter={() => {setFocused(skill.id)}} onMouseLeave={() => {setFocused(null)}} isLoading={isLoading} content={
                            <>
                                    <Text type="h5" content={
                                        <div className="column">
                                            <div className="row space-between">
                                                <strong>
                                                    {skill.name}
                                                </strong>
                                                <Info infoId={index} text={skill.about}></Info>
                                            </div>
                                            <span className="sm-font-size" style={{textAlign: "end"}}>{skill.level}</span>
                                        </div>
                                    }></Text> 
                                    <div className={`${styles.percentageBar} ${focused === skill.id && styles.focused}`} title="Nível de proficiência de 1 à 100">
                                        {focused === skill.id && 
                                            <h5 className={`${styles.percentageLevel} sm-font-size`}>{skill.percent_level} / 100</h5>
                                        }
                                        <div className={`${styles.percentage}`} style={{width: `${skill.percent_level}%`}}>
                                        </div>
                                    </div>
                                </>
                            }></Card>
                        
                    ))}
                    {sortedTechnicalSkills.length > maxItems &&
                        <ShowMoreButton componentId={componentId} onClick={() => {dispatch(setShowMoreClicked({componentId: componentId}))}}></ShowMoreButton>
                    }
                </div>
            }></Card>
        )
    } else {
        return (
            <Card title={componentId} boxShadow={true} isLoading={isLoading} classes="column sm-row-gap" content={
                <Card type="card" isLoading={isLoading} classes="column sm-row-gap" content={
                    <>
                        <Text type="h5" isLoading={isLoading}></Text>
                        <Text type="h5" isLoading={isLoading}></Text>
                    </>
                }></Card>
            }></Card>
        )
    } 
}
export default TechnicalSkills