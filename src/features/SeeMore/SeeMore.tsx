import { useEffect, useState } from "react";
import style from "./SeeMore.module.scss"
import type {RootState} from "../../store"
import { useSelector } from "react-redux";
import clsx from "clsx";

interface SeeMoreProps {
    isActive?: boolean // if true, the "see more" is active (can be clicked)
    onClick?: React.MouseEventHandler<HTMLElement> // optional click event handler
    componentId?: string // optional, to identify which component this button belongs to
    seeMoreId?: number // optional, to identify which "see more" this is within the component
    classes?: string // optional, additional classes to add
}
const SeeMore: React.FC<SeeMoreProps> = ({
    isActive,
    onClick,
    componentId,
    seeMoreId,
    classes
}) => {

    const [clicked, setClicked] = useState<boolean>(false); // state to control if the button is clicked (showing less or more)
    const SeeMoreState = useSelector((state: RootState) => state.SeeMore) // global state to control "see more" button

    // update clicked state based on global state
    useEffect(()=>{
        if(SeeMoreState.componentId === componentId && SeeMoreState.seeMoreId === seeMoreId){
            setClicked(true)
        } else {
            setClicked(false)
        }
    }, [SeeMoreState, componentId, seeMoreId])
    
    // Render the "see more" button with appropriate text based on clicked state
    return (
        <div className={`${style['see-more']} `} onClick={(event) => {
                if(onClick){
                    onClick(event);
                }
            }}>
            <span className={`${isActive && style['active']} ${clsx(classes && classes)} ${ clicked && style['clicked']}`}>
                {clicked ? "Ver menos" : "Ver mais"}
            </span>
        </div>
    )
}
export default SeeMore;