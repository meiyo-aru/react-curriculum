import React from 'react';

interface CardProps {
    title?: string;
    content: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
    title,
    content
}) => {
  return (
    <div className="card">
      {title && <h2>{title}</h2>}
        <div className="content">
            {content}
        </div>
    </div>
  );
}

export default Card;