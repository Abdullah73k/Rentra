import nodemailer from "nodemailer"
import { GMAIL_APP_PASSWORD, GMAIL_USER } from "../constants/auth.constants.js"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
    },
});

export async function sendEmail({
    to: email, subject, text, 
}: {to: string, subject: string, text: string}) {
    try {
        const info = await transporter.sendMail({
            from: `"Property Management" <${GMAIL_USER}>`,
            to: email,
            subject: subject,
            text: text,
        });

        console.log("Email sent", info.messageId);
    } catch (error) {
        console.error("Error sending email", error);
    }
}
