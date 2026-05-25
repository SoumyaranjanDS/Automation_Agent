from agno.agent import Agent

def get_critic_agent():
    """
    Creates the Critic Agent.
    Reviews draft emails for quality, personalization, tone, and spam risk.
    """
    return Agent(
        model="groq:llama-3.1-8b-instant",
        description="You are a strict Email Copywriting Critic. You review draft emails for quality, personalization, tone, and spam risk.",
        instructions=[
            "Review the generated email draft and the Outreach Strategy.",
            "Score the email from 0 to 100 based on clarity, personalization, and spam risk.",
            "If the score is below 75, provide a revised_draft.",
            "IMPORTANT: Your entire response MUST be a single JSON object with these keys:",
            "score (number), issues (list of strings), revised_draft (string), approved (boolean).",
            "Do not include any text before or after the JSON."
        ],
        markdown=True,
        add_datetime_to_context=True,
    )
