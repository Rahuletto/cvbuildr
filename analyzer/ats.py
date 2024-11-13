from fastapi import FastAPI
from fastapi.responses import JSONResponse
from analyse import analyze_resume
from format import prompt

from pydantic import BaseModel
from typing import List


class WorkExperience(BaseModel):
    company: str
    position: str

class Project(BaseModel):
    name: str
    description: str

class SkillSet(BaseModel):
    title: str
    skills: List[str]

class ResumeForm(BaseModel):
    summary: str
    workExperience: List[WorkExperience]
    projects: List[Project]
    skills: List[SkillSet]


class Format(BaseModel):
    resume: str
    
app = FastAPI()


@app.post("/format")
async def formatter(formatbody: Format):
    try:
        body = formatbody.dict()
        resume = body['resume']
        generated = prompt(resume)
        return JSONResponse(content=generated, status_code=200)

    except Exception as e:
        return JSONResponse(content={"error": f"Failed to process data from FORMAT: {str(e)}"}, status_code=500)

@app.post("/analyse")
async def analyzer(ResumeForm: ResumeForm):
    try:
        analysis_result = analyze_resume(ResumeForm)

        return JSONResponse(content=analysis_result, status_code=200)

    except Exception as e:
        return JSONResponse(content={"error": f"Failed to process data: {str(e)}"}, status_code=500)
    