const axios = require('axios');

async function testAI() {
    try {
        console.log('Attempting to call AI service at http://localhost:8001/api/agents/plan...');
        const response = await axios.post('http://localhost:8001/api/agents/plan', {
            name: "Test Campaign",
            description: "Selling coffee to developers"
        });
        console.log('AI Response:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('AI Service Error:', error.message);
        if (error.response) {
            console.error('Data:', error.response.data);
        }
    }
}

testAI();
