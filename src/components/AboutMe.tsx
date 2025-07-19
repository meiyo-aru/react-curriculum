import Card from "./Card";
import React from 'react';

interface AboutMeProps {
  title: string;
  text: string;
}

const AboutMe: React.FC<AboutMeProps> = ({
  title, 
  text
}) => {
  return (
    <>
      <Card title={title} content={text} />
    </>
  );
}
export default AboutMe;