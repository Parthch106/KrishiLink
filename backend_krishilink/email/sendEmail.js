const axios = require("axios");

async function sendResetPasswordEmail(recipientEmail, recipientFullName, resetPasswordLink) {
    const currentYear = new Date().getFullYear();
    const emailContent = {
        from: {
            name: 'Krishi Link',
            email: 'no-reply@krishilink.ommaniya.site',
        },
        recipients: [
            {
                name: recipientFullName,
                email: recipientEmail,
            }
        ],
        content: {
            subject: 'Krishi Link Password Reset',
            text_body: 'Plain text body',
            html_body: `
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-spacing: 0;">
        <tr>
            <td style="padding: 40px 30px; text-align: center; background-color: #4CAF50;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Krishi Link</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px 30px;">
                <h2 style="color: #333333; margin-bottom: 20px; font-size: 20px;">Reset Your Password</h2>
                <p style="color: #505050; font-weight: 700;">Hello ${recipientFullName}</p>
                <p style="color: #666666; margin-bottom: 20px; line-height: 1.5;">
                    We received a request to reset your password for your Krishi Link account. Click the button below to create a new password. This link will expire in 1 hour for security purposes.
                </p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetPasswordLink}" style="display: inline-block; padding: 12px 30px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
                </div>
                
                <p style="color: #666666; margin-bottom: 20px; line-height: 1.5;">
                    If you didn't request a password reset, please ignore this email or contact our support team if you have concerns about your account's security.
                </p>
                
                <p style="color: #666666; margin-bottom: 20px; line-height: 1.5;">
                    If the button doesn't work, copy and paste this link into your browser:
                    <br>
                    <span style="color: #4CAF50;">${resetPasswordLink}</span>
                </p>
            </td>
        </tr>
        <tr>
            <td style="padding: 30px; background-color: #f8f8f8; text-align: center; border-top: 1px solid #eeeeee;">
                <p style="color: #888888; margin: 0; font-size: 14px;">
                    © ${currentYear} Krishi Link. All rights reserved.
                </p>
                <p style="color: #888888; margin: 10px 0 0 0; font-size: 14px; line-height: 1.5;">
                    G-12, Pinnacle Business Park<br>
                    Connaught Place, New Delhi - 110001<br>
                    India
                </p>
                <p style="color: #888888; margin: 10px 0 0 0; font-size: 12px;">
                    This is an automated message, please do not reply to this email.
                </p>
            </td>
        </tr>
    </table>
</body>`
        },
    };
    try {
        await axios.post('https://api.ahasend.com/v1/email/send', emailContent, {
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': process.env.EMAIL_CLIENT_API_KEY,
            }
        });
        return true;
    } catch (error) {
        return false;
    }
}

async function sendVerificationEmail(recipientEmail, recipientFullName, verificationLink) {
    const currentYear = new Date().getFullYear();
    const emailContent = {
        from: {
            name: 'Krishi Link',
            email: 'no-reply@krishilink.ommaniya.site',
        },
        recipients: [
            {
                name: recipientFullName,
                email: recipientEmail,
            }
        ],
        content: {
            subject: 'Verify Your Krishi Link Account',
            text_body: 'Plain text body',
            html_body: `
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-spacing: 0;">
        <tr>
            <td style="padding: 40px 30px; text-align: center; background-color: #4CAF50;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Krishi Link</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px 30px;">
                <h2 style="color: #333333; margin-bottom: 20px; font-size: 20px;">Verify Your Email Address</h2>
                <p style="color: #505050; font-weight: 700;">Hello ${recipientFullName}</p>
                <p style="color: #666666; margin-bottom: 20px; line-height: 1.5;">
                    Thank you for signing up with Krishi Link! To complete your registration and access all our features, please verify your email address by clicking the button below.
                </p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${verificationLink}" style="display: inline-block; padding: 12px 30px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Email Address</a>
                </div>
                
                <p style="color: #666666; margin-bottom: 20px; line-height: 1.5;">
                    If you didn't create an account with Krishi Link, please ignore this email.
                </p>
                
                <p style="color: #666666; margin-bottom: 20px; line-height: 1.5;">
                    If the button doesn't work, copy and paste this link into your browser:
                    <br>
                    <span style="color: #4CAF50;">${verificationLink}</span>
                </p>
            </td>
        </tr>
        <tr>
            <td style="padding: 30px; background-color: #f8f8f8; text-align: center; border-top: 1px solid #eeeeee;">
                <p style="color: #888888; margin: 0; font-size: 14px;">
                    © ${currentYear} Krishi Link. All rights reserved.
                </p>
                <p style="color: #888888; margin: 10px 0 0 0; font-size: 14px; line-height: 1.5;">
                    G-12, Pinnacle Business Park<br>
                    Connaught Place, New Delhi - 110001<br>
                    India
                </p>
                <p style="color: #888888; margin: 10px 0 0 0; font-size: 12px;">
                    This is an automated message, please do not reply to this email.
                </p>
            </td>
        </tr>

    </table>
</body>`
        },
    };
    try {
        await axios.post('https://api.ahasend.com/v1/email/send', emailContent, {
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': process.env.EMAIL_CLIENT_API_KEY,
            }
        });
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = { sendResetPasswordEmail, sendVerificationEmail };