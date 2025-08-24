"use client"

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
    technicalSkill: TechnicalSkill[] | undefined // array of technical skills
    isLoading?: boolean // loading state
    componentId?: string // optional component ID for title
}

const TechnicalSkills: React.FC<TechnicalSkillsProps> = ({
    technicalSkill,
    isLoading,
    componentId = "Habilidades Técnicas",
}) => {

    const [focused, setFocused] = useState<number|null>(null) // state to track which skill is focused
    const maxItems = 6 // maximum items to show before "show more" button its clicked
   
    // sort technical skills by percent_level in descending order
    const sortedTechnicalSkills = useMemo(() => {
        if (!technicalSkill) {
        return []; 
        }
        return [...technicalSkill].sort((a, b) => b.percent_level - a.percent_level);
    }, [technicalSkill]); 

    const ShowMoreState = useSelector((state: RootState) => state.ShowMore) // global state to control "show more" button
    const dispatch = useDispatch(); // dispatch function to send actions to the store

    if(!isLoading && technicalSkill) { // if not loading and technical skills exist, show the skills, else show loading state
        return (
            <Card title={
                    <>
                        {componentId}
                        <Info infoId={-1} text="Habilidades técnicas são capacidades ou aptidões que um profissional possui. A barra de aptidão mensura o nível de confiança, experiência prática e conhecimento sobre o assunto."></Info>
                    </>
                } boxShadow={true} isLoading={isLoading} classes="column sm-row-gap" content={
                    <div className="flex column sm-row-gap">
                    {/* list of technical skills with their levels and proficiency bars */}
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
                                    <div className={`${styles['percentage-bar']} ${focused === skill.id && styles['focused']}`} title="Nível de proficiência de 1 à 100">
                                        {focused === skill.id && 
                                            <h5 className={`${styles['percentage-level']} sm-font-size`}>{skill.percent_level} / 100</h5>
                                        }
                                        <div className={`${styles['percentage']}`} style={{width: `${skill.percent_level}%`}}>
                                        </div>
                                    </div>
                                </>
                            }></Card>
                        
                    ))}
                    {/* show "show more" button if there are more items than maxItems */}
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