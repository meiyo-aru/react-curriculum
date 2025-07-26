import Card from "../Card/Card";
import React from "react";
import Text from "../Text/Text";

interface AboutMeProps {
  text: string | null
  isLoading?: boolean
}

const AboutMe: React.FC<AboutMeProps> = ({
  text,
  isLoading,
}) => {
  return (
    <Card isLoading={isLoading} title="Sobre mim" boxShadow={true} content={<Text isLoading={isLoading} type="p" content={text && text} />} />
  );
}
export default AboutMe;