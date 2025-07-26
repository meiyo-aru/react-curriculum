import type { AcademicTraining } from "./AcademicTraining"
import type { Experience } from "./Experience"
import type { ExtracurricularCourses } from "./ExtracurricularCourses"
import type { Languages } from "./Languages"
import type { Project } from "./Project"
import type { TechnicalSkill } from "./TechnicalSkill"

export interface Person {
  name: string
  positions: string
  about: string
  address: string
  phone_01: string
  phone_02: string
  mail: string
  linkedin: string
  id: number
  academic_trainings: AcademicTraining[]
  courses: ExtracurricularCourses[]
  experiences: Experience[]
  projects_rel: Project[]
  skills: TechnicalSkill[]
  langs: Languages[]
}