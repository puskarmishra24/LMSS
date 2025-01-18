import User from '../models/userModel.js';
import createError from '../utils/error.js';
import sendMail from '../utils/sendMail.js';

export const contactUs = async (req, res, next) => {
    const { name, email, message } = req.body;

    // Validate input fields
    if (!name || !email || !message) {
        return next(createError(400, "All input fields are required"));
    }

    const subject = `New message from ${name}`;
    const replySubject = `Thank you, ${name}`;
    const replyText = `
        <h3>Hello ${name},</h3>
        <p>Thank you for reaching out! We have received your message and will get back to you as soon as possible.</p>
        <br/>
        <p>Best regards,</p>
        <p>Support Team</p>
    `;
    const textMessage = `
        <h3>Message from ${name} (${email}):</h3>
        <p>${message}</p>
    `;

    try {
        // Send the message to your support email
        await sendMail(process.env.GMAIL_ID, email, subject, textMessage);

        // Send an acknowledgment email to the user
        await sendMail(email, process.env.GMAIL_ID, replySubject, replyText);

        // Respond to the client after emails are sent
        res.status(200).json({
            success: true,
            message: "Message sent successfully. We’ll get back to you soon!",
        });
    } catch (error) {
        // Handle email-sending errors
        next(createError(500, `Failed to send message: ${error.message}`));
    }
};

export const userStats = async (req, res, next) => {
    try {
        // Fetch user statistics
        const allUserCount = await User.countDocuments();
        const subscribedUser = await User.countDocuments({
            'subscription.status': 'active',
        });

        // Respond with statistics
        res.status(200).json({
            success: true,
            message: 'User statistics fetched successfully',
            allUserCount,
            subscribedUser,
        });
    } catch (error) {
        // Handle database query errors
        next(createError(500, `Failed to fetch user statistics: ${error.message}`));
    }
};
