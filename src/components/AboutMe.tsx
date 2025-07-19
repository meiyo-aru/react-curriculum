import Card from "./card";
import React from 'react';
import { useState } from "react";

const AboutMe: React.FC = () => {
  return (
    <>
      <Card title="Sobre mim" content={
        <p>teste</p>
      }></Card>
    </>
  );
}
export default AboutMe;