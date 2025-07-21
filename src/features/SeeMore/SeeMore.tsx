import { useState } from "react";
import style from "./SeeMore.module.scss"

interface SeeMoreProps {
    isActive?: boolean
    onClick?: React.MouseEventHandler<HTMLElement>
}
const SeeMore: React.FC<SeeMoreProps> = ({
    isActive,
    onClick
}) => {
    const [clicked, setClicked] = useState<boolean>(false);
    const handleClicked = () => {
        setClicked(clicked ? false : true)
    }
    /* const [active, setActive] = useState<boolean>(isActive || false);
    const handleActive = () => {
        setActive(clicked ? false : true)
    } */

    return (
        <div className={`${style.seeMore}`} onClick={(event) => {
                handleClicked();
                if(onClick){
                    onClick(event);
                }
            }}>
            <span className={`${isActive && style.active} ${clicked && style.clicked}`}>
                {clicked ? "Ver menos" : "Ver mais"}
            </span>
        </div>
    )
}
export default SeeMore;