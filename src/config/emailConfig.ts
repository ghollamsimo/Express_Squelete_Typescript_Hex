import nodemailer, { Transporter } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface EmailOptions {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

export class EmailConfig {
    private static transporter: Transporter;
    private user: string;

    constructor(user: string) {
        this.user = user;

        if (!EmailConfig.transporter) {
            EmailConfig.transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.APP_EMAIL || '',
                    pass: process.env.APP_EMAIL_PASS || '',
                },
            });
        }
    }

    public async sendEmail({ to, subject, text, html }: EmailOptions): Promise<void> {
        const mailOptions = {
            from: '"NAME_YOUR_APP" <no-reply@NAME_YOUR_APP.com>',
            to,
            subject,
            text,
            html,
        };

        try {
            const info = await EmailConfig.transporter.sendMail(mailOptions);
            console.log("Message sent: %s", info.messageId);
        } catch (error) {
            console.error("Error sending email: ", error);
            throw error;
        }
    }
}
