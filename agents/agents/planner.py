from agno.agent import Agent
from agno.models.groq import Groq
from pydantic import BaseModel, Field
from typing import List
import os
from dotenv import load_dotenv

# Load API keys
load_dotenv()

def get_planner_agent():
    """
    Creates the Campaign Planner Agent.
    Note: We avoid output_model/response_model to bypass a bug in the Agno validator.
    """
    return Agent(
        model="groq:llama-3.1-8b-instant",
        description="You are a Senior Sales Growth Architect who creates high-converting outreach strategies.",
        instructions=[
            "Analyze the campaign goal, description, and tone preference.",
            "Generate 3 specific messaging pillars, a CTA, brand voice, and ICP.",
            "IMPORTANT: Your entire response MUST be a single JSON object with these keys:",
            "messaging_pillars (list of 3 strings), cta_type (string), tone_profile (string), audience_icp (string).",
            "Do not include any text before or after the JSON."
        ],
        markdown=True,
        add_datetime_to_context=True,
    )
