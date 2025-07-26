import { useEffect, useMemo, useState } from "react"
import type { TechnicalSkill } from "../../types/TechnicalSkill"
import axios from "axios"
import Card from "../Card/Card"
import Text from "../Text/Text"
import styles from "./TechnicalSkills.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'


interface TechnicalSkillsProps {
    personId: number | null
    isLoading?: boolean
    componentId?: string
    dataApi?: string
}

const TechnicalSkills: React.FC<TechnicalSkillsProps> = ({
    personId,
    isLoading,
    componentId = "Habilidades Técnicas",
    dataApi
}) => {
    const [technicalSkill, setTechnicalSkill] = useState<TechnicalSkill[] | null>(null)
    const [focused, setFocused] = useState<number|null>(null)
    const [maxItems, setMaxItems] = useState<number>(5)
    const [infoFocused, setInfoFocused] = useState<boolean>(false)

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
    }, [personId])
    
    const sortedTechnicalSkills = useMemo(() => {
        if (!technicalSkill) {
        return []; 
        }
        return [...technicalSkill].sort((a, b) => b.percent_level - a.percent_level);
    }, [technicalSkill]); 


    if(!isLoading && technicalSkill) {
        return (
            <Card title={
                    <>
                        {componentId}
                        <h3 style={{float: "right", color: "#4b678f", cursor: "pointer"}} onClick={() => {setInfoFocused(infoFocused ? false : true)}}>
                            <FontAwesomeIcon icon={faCircleInfo} />
                        </h3>
                        <Card type="card" isLoading={isLoading} classes={`${infoFocused ? styles.active : styles.inactive} ${styles.info} bg-light-grey`} content={
                            <h5>Habilidades técnicas são capacidades ou aptidões que um profissional possui. A barra de aptidão mensura o nível de confiança, experiência prática e conhecimento sobre o assunto.</h5>
                        }>
                        </Card> 
                    </>
                } boxShadow={true} isLoading={isLoading} classes="column sm-row-gap" content={
                <div className="flex column sm-row-gap">
                    {sortedTechnicalSkills.map((skill, index) => (
                        index < maxItems &&

                            <Card type="card" boxShadow={true} onMouseEnter={() => {setFocused(skill.id)}} onMouseLeave={() => {setFocused(null)}} isLoading={isLoading} content={
                                <>
                                    <Text type="h5" content={
                                        <div className="column">
                                            <strong>
                                                {skill.name}
                                            </strong>
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
                    <span onClick={() => {setMaxItems(maxItems === 999 ? 5 : 999)}} className={`${styles.chevronDownIcon}`}>
                        
                        <FontAwesomeIcon icon={maxItems === 5 ? faChevronDown : faChevronUp} />
                    </span>
                </div>
            }></Card>
        )
    } /* else {
        return (
            <Loading title={componentId}></Loading>
        )
    } */
}
export default TechnicalSkills