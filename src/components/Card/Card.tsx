import styles from "./Card.module.scss"
import React from "react";
import clsx from "clsx";

interface CardProps {
    title?: string | React.ReactNode | null
    content?: React.ReactNode | null
    type?: "smCard" | "card" | "section" | "header"
    boxShadow?: boolean
    isLoading?: boolean
    classes?: string
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
    onMouseEnter,
    onMouseLeave,
    onClick
}) => {
  const smCardClass = clsx(styles.smCard, "bg-grey", classes, boxShadow && "hover-shadow");
  const cardClass = clsx(styles.card, "bg-light", classes, boxShadow && "hover-shadow");
  const sectionClass = clsx(styles.card, "bg-white", classes, boxShadow && "hover-shadow");
  const headerClass = clsx(styles.header, classes, boxShadow && "hover-shadow");

  switch (type) {
    case "smCard": 
      return (
          isLoading ?
            <div className={`${smCardClass} ${clsx("loading-gradient", styles.minSize)}`}>
            </div>
            :
            <div className={smCardClass} onClick={onClick && onClick} onMouseEnter={onMouseEnter && onMouseEnter} onMouseLeave={onMouseLeave && onMouseLeave}>
              {title && <h5>{title}</h5>}
            </div>
      )

    case "card":
      return (
        <div className={`${cardClass} ${clsx(styles.minSize)}`} onClick={onClick && onClick} onMouseEnter={onMouseEnter && onMouseEnter} onMouseLeave={onMouseLeave && onMouseLeave}>
          {content && content}
        </div>
      )
    
    case "header":
      return (
        <div className={`${headerClass} ${clsx(styles.minSize)}`} onClick={onClick && onClick} onMouseEnter={onMouseEnter && onMouseEnter} onMouseLeave={onMouseLeave && onMouseLeave}>
          {content && content}
        </div>
      )

    default:
      return (
        <div className={`${sectionClass} ${clsx(styles.minSize)}`} onClick={onClick && onClick} onMouseEnter={onMouseEnter && onMouseEnter} onMouseLeave={onMouseLeave && onMouseLeave}>
          {title && <h2>{title}</h2>}
          {content && content}
        </div>
      )
  } 
}

export default Card;