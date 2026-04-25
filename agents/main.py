from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from agents.planner import get_planner_agent
from agents.writer import (
    get_real_estate_agent, 
    get_investment_banker_agent, 
    get_financial_advisor_agent
)
import uvicorn
import os
import json
import re
from dotenv import load_dotenv

# Load API keys and configurations
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="AutomationAgent AI Intelligence Service",
    description="Python microservice powered by Agno and Groq to handle agentic reasoning."
)

def parse_ai_response(text: str):
    """
    Ultra-robust parser that handles Tags, JSON, and even broken JSON strings.
    """
    # 1. Try Tag-based extraction (The Preferred Way)
    subject_match = re.search(r'\[SUBJECT\]\s*(.*)', text, re.IGNORECASE)
    body_match = re.search(r'\[BODY\]\s*(.*)', text, re.DOTALL | re.IGNORECASE)
    
    if subject_match and body_match:
        return {
            "subject": subject_match.group(1).strip().replace('"', ''),
            "body": body_match.group(1).strip()
        }

    # 2. Try Manual Regex for JSON-like keys (Handles broken JSON with newlines)
    subj_regex = re.search(r'["\']?subject["\']?:\s*["\'](.*?)(?=["\']\s*,\s*["\']body)', text, re.DOTALL | re.IGNORECASE)
    body_regex = re.search(r'["\']?body["\']?:\s*["\'](.*?)["\']\s*\}?$', text, re.DOTALL | re.IGNORECASE)
    
    if subj_regex and body_regex:
        return {
            "subject": subj_regex.group(1).strip(),
            "body": body_regex.group(1).strip().replace('\\n', '\n')
        }

    # 3. Last Resort: Standard JSON Parser
    try:
        match = re.search(r'\{.*\}', text, re.DOTALL)
        if match:
            cleaned_json = match.group()
            return json.loads(cleaned_json)
        return json.loads(text)
    except Exception:
        # If all else fails, return what we have
        return {
            "subject": "AI Draft Ready",
            "body": text,
            "error": "Non-standard format"
        }

# Define the expected request bodies
class PlannerRequest(BaseModel):
    model_config = {'protected_namespaces': ()}
    name: str
    description: str
    tone: str = "professional"

class WriterRequest(BaseModel):
    model_config = {'protected_namespaces': ()}
    niche: str
    description: str
    instruction: str
    lead_name: str

@app.post("/api/agents/plan")
async def plan_campaign(request: PlannerRequest):
    try:
        planner = get_planner_agent()
        prompt = (
            f"Please plan a campaign based on the following details:\n"
            f"- Campaign Name: {request.name}\n"
            f"- Description: {request.description}\n"
            f"- Preferred Tone: {request.tone}\n"
        )
        response = planner.run(prompt)
        return parse_ai_response(response.content)
    except Exception as e:
        print(f"Error in Agent Pipeline: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/agents/generate")
async def generate_email(request: WriterRequest):
    try:
        # Normalize niche naming
        raw_niche = request.niche or "general"
        niche_key = raw_niche.lower().replace("_", "").replace(" ", "")
        
        
        if 'realestate' in niche_key:
            agent = get_real_estate_agent()
        elif 'investment' in niche_key or 'banker' in niche_key:
            agent = get_investment_banker_agent()
        elif 'financial' in niche_key or 'advisor' in niche_key:
            agent = get_financial_advisor_agent()
        else:
            agent = get_financial_advisor_agent()

        prompt = (
            f"Write a personalized email for {request.lead_name}.\n"
            f"Context about the lead: {request.description}\n"
            f"Your specific instruction for this email: {request.instruction}\n"
        )
        response = agent.run(prompt)
        return parse_ai_response(response.content)
    except Exception as e:
        print(f"Error in Generation Pipeline: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {
        "status": "active", 
        "engine": "Agno", 
        "model": "llama-3.1-8b-instant"
    }

if __name__ == "__main__":
    print("🚀 AutomationAgent AI Intelligence Service starting...")
    uvicorn.run(app, host="0.0.0.0", port=8001)
