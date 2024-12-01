const axios = require('axios');

const verifyCaptcha = async (req, res, next) => {
    const captchaToken = req.body.recaptcha_token;
    if (!captchaToken) {
        return res.status(400).json({ message: 'Captcha token is missing' });
    }

    console.log('Received captcha token:', captchaToken);

    try {
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        const response = await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            {},
            {
                params: {
                    secret: secretKey,
                    response: captchaToken,
                },
            }
        );

        console.log("Captcha token received:", captchaToken);
        console.log("Google reCAPTCHA response:", response.data);


        const { success, score } = response.data;
        if (!success || (score !== undefined && score < 0.5)) {
            return res.status(403).json({ message: 'Captcha verification failed' });
        }

        next();
    } catch (error) {
        console.error('Captcha verification error:', error.message);
        res.status(500).json({ message: 'Internal server error during CAPTCHA verification' });
    }
};

module.exports = verifyCaptcha;
