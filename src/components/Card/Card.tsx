/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
 */
import styles from "./Card.module.scss"
import React, { type CSSProperties } from "react";
import clsx from "clsx";

interface CardProps {
    title?: string | React.ReactNode |null
    content?: React.ReactNode | null
    type?: "smCard" | "card" | "section" | "header"
    boxShadow?: boolean
    isLoading?: boolean
    classes?: string
    style?: CSSProperties
    onMouseEnter?: React.MouseEventHandler<HTMLElement>
    onMouseLeave?: React.MouseEventHandler<HTMLElement>
    onClick?: React.MouseEventHandler<HTMLElement>
}

const Card: React.FC<CardProps> = ({
    title,
    content,
    type,
    boxShadow,
    isLoading,
    classes,
    style,
    onMouseEnter,
    onMouseLeave,
    onClick
}) => {
  const smCardClass = clsx(classes, styles.smCard, "bg-grey", boxShadow && "hover-shadow flex-grow");
  const cardClass = clsx(styles.card, "bg-light", boxShadow && "hover-shadow flex-grow", classes);
  const sectionClass = clsx(classes, styles.card, "bg-white", boxShadow && "hover-shadow flex-grow");
  const headerClass = clsx(classes, styles.header, boxShadow && "hover-shadow flex-grow");

  switch (type) {
    case "smCard": 
      return (
          isLoading ?
            <div style={style && style} className={`${smCardClass} ${clsx("loading-gradient", styles.minSize)}`}>
            </div>
            :
            <div style={style && style} className={smCardClass} onClick={onClick && onClick} onMouseEnter={onMouseEnter && onMouseEnter} onMouseLeave={onMouseLeave && onMouseLeave}>
              {title && <h5>{title}</h5>}
            </div>
      )

    case "card":
      return (
        <div style={style && style} className={`${cardClass}`} onClick={onClick && onClick} onMouseEnter={onMouseEnter && onMouseEnter} onMouseLeave={onMouseLeave && onMouseLeave}>
          {content && content}
        </div>
      )
    
    case "header":
      return (
        <div style={style && style} className={`${headerClass}`} onClick={onClick && onClick} onMouseEnter={onMouseEnter && onMouseEnter} onMouseLeave={onMouseLeave && onMouseLeave}>
          {content && content}
        </div>
      )

    default:
      return (
        <div style={style && style} className={`${sectionClass}`} onClick={onClick && onClick} onMouseEnter={onMouseEnter && onMouseEnter} onMouseLeave={onMouseLeave && onMouseLeave}>
          {title && <h2>{title}</h2>}
          {content && content}
        </div>
      )
  } 
}

export default Card;