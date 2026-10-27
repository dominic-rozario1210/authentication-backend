import dotenv from "dotenv";
import { BrevoClient } from "@getbrevo/brevo";

dotenv.config();

const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY
})

export const sendWelcomeMail = async (email, name) => {
    try {
        await brevo.transactionalEmails.sendTransacEmail({
            sender: {
                name: process.env.BREVO_SENDER_NAME,
                email: process.env.BREVO_SENDER_EMAIL
            },
            to: [
                {
                    email,
                    name
                },
            ],
            subject: "Welcome to bala labs",
            htmlContent: `
                 <h2> Welcome ${name}</h2>
                  <p>Your account has been created successfully</p>
                 <p>We are excited to have to onboard</p>
                 <p>Happy Learning</p>

                 <br>

                 <p>regards</p>
                 <h3>Blala Labs </h3>
        
            `
        });
        console.log("welcome email sent successfully");
        
    } catch (error) {
        console.log("unable to send mail");
        console.log(error.body || error);
    }
}


export const sendResetPasswordMail = async (email, resetToken) => {
    try {
        const resetLink = `https://mernstack-authentication.vercel.app//${resetToken}`;

        const response = await brevo.transactionalEmails.sendTransacEmail({
            sender: {
                name: process.env.BREVO_SENDER_NAME,
                email: process.env.BREVO_SENDER_EMAIL
            },
            to: [
                {
                    email: email
                }
            ],
            subject: "Reset Your Password",
            htmlContent: `
                <h2>Password Reset Request</h2>
                <p>We received a request to reset your password.</p>
                <p>Click the button below to choose a new password:</p>
                <a href="${resetLink}">
                    Click here to Reset Password
                </a>
                <p>This link should expire in 15 minutes.</p>
                <p>If you did not request a password reset, ignore this email.</p>
            `
        });

        console.log("Reset password email sent:", response.messageId);
        return response;

    } catch (error) {
        console.error("Reset email failed:", error.message);
        throw error;
    }
};
