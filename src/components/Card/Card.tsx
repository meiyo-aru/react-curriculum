/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
 */
import styles from './Card.module.scss'
import React from 'react';
import clsx from 'clsx';

interface CardProps {
    title?: string | null
    content?: React.ReactNode | null
    type?: 'smCard' | 'card' | 'section' 
    isLoading?: boolean
    cardClasses?: string
}

const Card: React.FC<CardProps> = ({
    title,
    content,
    type,
    isLoading,
    cardClasses
}) => {
  const smCardClass = clsx(styles.smCard, 'bg-grey', cardClasses);
  const cardClass = clsx(styles.card, 'bg-light', cardClasses);
  const sectionClass = clsx(styles.card, 'bg-white', cardClasses);
  switch (type) {
    case 'smCard': 
      return (
          isLoading ?
            <div className={`${smCardClass} ${clsx('loading-gradient', styles.minSize)}`}>
            </div>
            :
            <div className={smCardClass}>
              {title && <h5>{title}</h5>}
            </div>
      )

    case 'card':
      return (
        <div className={`${cardClass} ${clsx(styles.minSize)}`}>
          {content && content}
        </div>
      )

    default:
      return (
        <div className={`${sectionClass} ${clsx(styles.minSize)}`}>
          {title && <h2>{title}</h2>}
          {content && content}
        </div>
      )
  } 
}

export default Card;