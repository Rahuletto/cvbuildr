from typing import List, Optional
from pydantic import BaseModel
from transformers import pipeline

class WorkExperience(BaseModel):
    company: str
    position: str
    startYear: str
    endYear: Optional[str] = None

class Project(BaseModel):
    name: str
    link: str
    description: str
    keyAchievements: str
    startYear: str
    endYear: Optional[str] = None

class SkillSet(BaseModel):
    title: str
    skills: List[str]

class ResumeForm(BaseModel):
    summary: str
    workExperience: List[WorkExperience]
    projects: List[Project]
    skills: List[SkillSet]


classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli", device=0)

def classify_section_with_explainability(section_text, labels=["strong", "moderate", "weak"]):
    result = classifier(section_text, candidate_labels=labels)
    strength_label = result['labels'][0]
    confidence_score = result['scores'][0]
    return strength_label, round(confidence_score * 100, 2)

def analyze_resume(resume_data: ResumeForm):
    summary_strength, summary_conf = classify_section_with_explainability(resume_data.summary) if resume_data.summary else (0, 0)
    
    skills_text = " ".join([", ".join(skill.skills) for skill in resume_data.skills])
    skills_strength, skills_conf = classify_section_with_explainability(skills_text) if skills_text else (0, 0)
    
    work_experience_text = " ".join([f"{job.position} at {job.company}" for job in resume_data.workExperience])
    work_experience_strength, work_experience_conf = classify_section_with_explainability(work_experience_text) if work_experience_text else (0, 0)
    
    projects_text = " ".join([f"{project.name}: {project.description}" for project in resume_data.projects])
    projects_strength, projects_conf = classify_section_with_explainability(projects_text) if projects_text else (0, 0)

    confidences = [summary_conf, skills_conf, work_experience_conf, projects_conf]
    overall_confidence = round(sum(confidences) / len(confidences), 2)

    return {
        "summary": {
            "strength": summary_strength,
            "confidence": summary_conf
        },
        "skills": {
            "strength": skills_strength,
            "confidence": skills_conf
        },
        "experience": {
            "strength": work_experience_strength,
            "confidence": work_experience_conf
        },
        "projects": {
            "strength": projects_strength,
            "confidence": projects_conf
        },
        "overall": {
            "strength": (
                "strong" if overall_confidence > 80 else
                "moderate" if overall_confidence > 60 else
                "weak"
            ),
            "confidence": overall_confidence
        }
    }
