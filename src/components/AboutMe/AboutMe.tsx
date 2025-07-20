import Card from "../Card/Card";
import React from 'react';
import Paragraph from "../Text/Paragraph";

interface AboutMeProps {
  text: string | null
  isLoading?: boolean
}

const AboutMe: React.FC<AboutMeProps> = ({
  text,
  isLoading
}) => {
  return (
    <Card isLoading={isLoading} title="Sobre mim" content={<Paragraph isLoading={isLoading} content={text && text} />} />
  );
}
export default AboutMe;