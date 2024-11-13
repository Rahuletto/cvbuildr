import requests
import json

def generate_content(prompt: str, api_key: str):
    url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent'
    
    headers = {
        'Content-Type': 'application/json'
    }
    
    data = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ]
    }
    
    response = requests.post(url, headers=headers, json=data, params={"key": api_key})

    if response.status_code == 200:
        res = response.json()
        response_text = res['candidates'][0]['content']['parts'][0]['text']
        return response_text
    else:
        print(f"Error: {response.status_code}, {response.text}")
        return None

def importToNew(resume: str):
    api_key = "AIzaSyCcqXy0N_m1wAnKuYKrgvTis6IMp59DJqY" 
    prompt = (
    f"I'll provide you with a text from a resume I just found. The text might not be perfect and may have weird formatting due to its PDF nature, but I want you to generate JSON from it. "
    f"Here is the resume: {resume}. "
    "Please provide the JSON in the following format: "
    "export interface ResumeForm { name: string; position: string; number: string; email: string; address: string; profilePicture?: string; "
    "socialMedia: { socialMedia: string; link: string; }[]; summary: string; education: { school: string; degree: string; startYear: string; endYear: string; }[]; "
    "workExperience: { company: string; position: string; description?: string; keyAchievements?: string; startYear: string; endYear: string; }[]; "
    "projects: { name: string; link: string; description?: string; keyAchievements?: string; startYear: string; endYear: string; }[]; "
    "skills: { title: string; skills?: string[]; }[]; certifications?: string[]; languages?: string[]; } "
    "Avoid markdown formatting and just give me the raw JSON. also remove unnecessary spaces and all ok? Dont use backtick json and just send as raw text"
    )

    generated = generate_content(prompt, api_key)
    return generated


def prompt(resume: str):
    api_key = "AIzaSyCcqXy0N_m1wAnKuYKrgvTis6IMp59DJqY" 
    prompt = (
    f"I'll provide you with a text from a resume I just found. The text might not be perfect and may have weird formatting due to its PDF nature, but I want you to generate JSON from it. "
    f"Here is the resume: {resume}. "
    "Please provide the JSON in the following format: "
    "{ summary: string; skills: { title: string; skills: string[]; }[]; workExperience: { company: string; position: string; }[]; projects: { name: string; description: string; }[]; }"
    "Avoid markdown formatting and just give me the raw JSON. also remove unnecessary spaces and all ok? Dont make your own stuff and i only want you to extract from it alright but fix the spaces and grammar alright?!"
    )

    markdown_content = generate_content(prompt, api_key)

    json_str = markdown_content.replace("```json\n", "").replace("\n```", "")

    # Parse the JSON string
    resume_data = json.loads(json_str)
    return resume_data
