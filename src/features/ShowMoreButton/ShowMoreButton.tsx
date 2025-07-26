import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../../store"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import style from "./ShowMoreButton.module.scss"
import clsx from "clsx"

interface ShowMoreButtonProps {
    onClick?: React.MouseEventHandler<HTMLElement>
    componentId?: string
    classes?: string
}
const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({
    onClick,
    componentId,
    classes

}) => {
    const [clicked, setClicked] = useState<boolean>(false);

    const ShowMoreState = useSelector((state: RootState) => state.ShowMore)

    useEffect(()=>{
        if(ShowMoreState.componentId === componentId){
            setClicked(true)
        } else {
            setClicked(false)
        }
    }, [ShowMoreState, componentId])
    
    return (
        <span onClick={onClick} className={`${style.chevronDownIcon} ${clsx(classes)}`}>
            <FontAwesomeIcon icon={clicked ? faChevronUp : faChevronDown}></FontAwesomeIcon>
        </span>
    )

}
export default ShowMoreButton