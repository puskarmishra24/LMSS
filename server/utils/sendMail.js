import nodemailer from 'nodemailer';

const sendMail = async (fromMail, toMail, subject, message) => {
    try {
        console.log("Preparing to send email...");
        console.log(`From: ${fromMail}`);
        console.log(`To: ${toMail}`);
        console.log(`Subject: ${subject}`);

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_ID,
                pass: process.env.APP_PASSWORD,
            },
        });

        const info = await transporter.sendMail({
            from: fromMail,
            to: toMail,
            subject: subject,
            html: message,
        });

        console.log("Email sent successfully:", info.response);
        return {
            success: true,
            info,
        };
    } catch (error) {

        console.error("Error sending email:", error.message);
        return {
            success: false,
            error: error.message,
        };
    }
};

export default sendMail;
