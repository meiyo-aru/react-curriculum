"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Card from "../Card/Card"
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import styles from "./Info.module.scss"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { setFocusedInfo } from "../../features/Info/InfoSlice"

interface InfoProps {
    componentId?: string | null // optional, to identify which component this info belongs to
    infoId: number // unique identifier for this info icon
    text: string // text to display in the info box
}

export const Info: React.FC<InfoProps> = ({...props}) => {

    const infoIdFocused = useSelector((state: RootState) => state.Info.infoFocused) // global state to control which info is focused
    const componentIdFocused = useSelector((state: RootState) => state.Info.componentId) // global state to control which component's info is focused

    const dispatch = useDispatch()
    // toggle focused state
    function handleFocused() {
        dispatch(setFocusedInfo({infoFocused: isFocused() ? null : props.infoId, componentId: props.componentId ? props.componentId : null}))
    }
    // check if this info is focused
    function isFocused() {
        return props.infoId === infoIdFocused && (componentIdFocused ? props.componentId === componentIdFocused : true)
    }

    return (
        <>
            <span className={styles['info-icon']} onClick={handleFocused}>
                <FontAwesomeIcon icon={faCircleInfo} />
            </span>
            <Card type="card" classes={`${isFocused() ? styles['active'] : styles['inactive']} ${styles['info']} bg-light-grey`} content={
                <span>{props.text}</span>
            }>
            </Card> 
        </>
    )
}