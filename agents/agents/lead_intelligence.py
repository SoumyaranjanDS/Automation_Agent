from agno.agent import Agent

def get_lead_intelligence_agent():
    """
    Creates the Lead Intelligence Agent.
    Analyzes lead data to surface hyper-relevant pain points.
    """
    return Agent(
        model="groq:llama-3.1-8b-instant",
        description="You are a Lead Intelligence Analyst. You analyze lead data to surface hyper-relevant pain points.",
        instructions=[
            "Analyze the lead record: name, email, role, company, description, and LinkedIn snippet.",
            "Identify likely pain points and likely objections.",
            "IMPORTANT: Your entire response MUST be a single JSON object with these keys:",
            "pain_points (list of strings), likely_objections (list of strings), relevance_score (number 0-100), personalization_hooks (list of strings).",
            "Do not include any text before or after the JSON."
        ],
        markdown=True,
        add_datetime_to_context=True,
    )
