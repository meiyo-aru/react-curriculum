import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../../store"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import style from "./ShowMoreButton.module.scss"
import clsx from "clsx"

interface ShowMoreButtonProps {
    onClick?: React.MouseEventHandler<HTMLElement> // optional click event handler
    componentId?: string // optional, to identify which component this button belongs to
    classes?: string // optional, additional classes to add
}
const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({
    onClick,
    componentId,
    classes

}) => {
    const [clicked, setClicked] = useState<boolean>(false); // state to control if the button is clicked (showing less or more)

    const ShowMoreState = useSelector((state: RootState) => state.ShowMore) // global state to control "show more" button

    // update clicked state based on global state
    useEffect(()=>{
        if(ShowMoreState.componentId === componentId){
            setClicked(true)
        } else {
            setClicked(false)
        }
    }, [ShowMoreState, componentId])
    
    // Render the button with appropriate icon based on clicked state
    return (
        <span onClick={onClick} className={`${style['chevron-down-icon']} ${clsx(classes)}`}>
            <FontAwesomeIcon icon={clicked ? faChevronUp : faChevronDown}></FontAwesomeIcon>
        </span>
    )

}
export default ShowMoreButton