"use client"; // necessário para usar hooks e Redux

import { Curriculum } from "@/components/Curriculum/Curriculum";
import React from "react";
import { Usable } from "react";

interface Props {
  params: Usable<{ token: string }>;
}

export default function CurriculumTokenPage({ params }: Props) {
  const token = React.use(params).token;

  return <Curriculum token={token} />;
}