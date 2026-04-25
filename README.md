# AutomationAgent: AI-Powered Outreach Machine 🚀

AutomationAgent is a hyper-personalized outreach platform designed for Digital Growth Agencies. It uses **Agno-powered AI Agents** to transform cold leads into warm opportunities using the "Hidden Client" strategy.

## ✨ Features

- **AI Campaign Planning**: Automatically generates messaging pillars and ICP analysis for any niche.
- **Agentic Email Writer**: Specialized agents for Real Estate, Banking, and Advisory niches.
- **Smart CSV Import**: Map any custom lead data to AI personalization fields.
- **Hyper-Personalization**: AI analyzes lead info to write emails that sound like a real client inquiry.
- **Modern Dashboard**: Built with React, Tailwind, and Framer Motion for a premium experience.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Lucide Icons, Framer Motion.
- **Backend**: Node.js, Express, MongoDB (Mongoose), PapaParse.
- **AI Engine**: Python, FastAPI, Agno (formerly Phidata), Groq (Llama 3.1).

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Automation_Agent
```

### 2. Setup AI Microservice (Python)
```bash
cd agents
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env  # Add your GROQ_API_KEY
python main.py
```

### 3. Setup Backend (Node.js)
```bash
cd ../backend
npm install
cp .env.example .env  # Add your MONGO_URI and JWT_SECRET
npm run dev
```

### 4. Setup Frontend (React)
```bash
cd ../Frontend
npm install
npm run dev
```

## 📈 Outreach Strategy: "The Hidden Client"
Instead of a generic sales pitch, the agents are trained to:
1. Start like a real potential client interested in the lead's services.
2. Point out a specific "Digital Gap" (e.g., lack of online proof or portfolio).
3. Smoothly transition into offering a specialized solution as a Growth Agency.

## 📄 License
MIT
