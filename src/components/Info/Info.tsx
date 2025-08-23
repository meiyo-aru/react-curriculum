import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Card from "../Card/Card"
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import styles from "./Info.module.scss"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { setFocusedInfo } from "../../features/Info/InfoSlice"

interface InfoProps {
    componentId?: string | null
    infoId: number
    text: string
}

export const Info: React.FC<InfoProps> = ({...props}) => {
    
    const infoIdFocused = useSelector((state: RootState) => state.Info.infoFocused)
    const componentIdFocused = useSelector((state: RootState) => state.Info.componentId)

    const dispatch = useDispatch()

    function handleFocused() {
        dispatch(setFocusedInfo({infoFocused: isFocused() ? null : props.infoId, componentId: props.componentId ? props.componentId : null}))
    }
    function isFocused() {
        return props.infoId === infoIdFocused && (componentIdFocused ? props.componentId === componentIdFocused : true)
    }

    return (
        <>
            <span className={styles.infoIcon} onClick={handleFocused}>
                <FontAwesomeIcon icon={faCircleInfo} />
            </span>
            <Card type="card" classes={`${isFocused() ? styles.active : styles.inactive} ${styles.info} bg-light-grey`} content={
                <span>{props.text}</span>
            }>
            </Card> 
        </>
    )
}