const axios = require("axios");

async function validateEmail(email) {
    try {
        const response = await axios.get(`https://api.mails.so/v1/validate?email=${email}`, {
            headers: {
                'x-mails-api-key': process.env.EMAIL_VERIFIER_API_KEY
            }
        });

        if (response.status === 200) {
            return response.data.data.result === 'deliverable';
        }
    } catch (error) {
        return "Unable to validate email";
    }
}

module.exports = { validateEmail };