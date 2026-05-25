from agno.agent import Agent

def get_followup_agent():
    """
    Creates the Follow-up Agent.
    Designs and schedules contextual follow-up emails based on lead engagement.
    """
    return Agent(
        model="groq:llama-3.1-8b-instant",
        description="You are a Follow-up Automation Specialist. You design contextual follow-up emails based on lead engagement.",
        instructions=[
            "Review the previous email sent and the latest outcome event (open, reply, bounce, no-action).",
            "Generate a contextual follow-up sequence.",
            "IMPORTANT: Your entire response MUST be a single JSON object with these keys:",
            "emails (list of strings containing the email bodies), send_times (list of integers for delay in hours), stop_condition (string).",
            "Do not include any text before or after the JSON."
        ],
        markdown=True,
        add_datetime_to_context=True,
    )
