from agno.agent import Agent

def get_strategy_agent():
    """
    Creates the Strategy Agent.
    Selects the optimal outreach angle for each lead based on profile and campaign strategy.
    """
    return Agent(
        model="groq:llama-3.1-8b-instant",
        description="You are an Outreach Strategy Director. You select the optimal outreach angle for each lead.",
        instructions=[
            "Review the Campaign Strategy and the Lead Profile.",
            "Select the optimal outreach angle (e.g., pain-led, curiosity, social proof, direct ask, value-first).",
            "IMPORTANT: Your entire response MUST be a single JSON object with these keys:",
            "angle (string), tone_adjustment (string), cta (string), hook_sentence (string).",
            "Do not include any text before or after the JSON."
        ],
        markdown=True,
        add_datetime_to_context=True,
    )
