import createError from "../utils/error.js";
import JWT from 'jsonwebtoken';
import User from '../models/userModel.js';

export const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(createError(401, "Please log in again"));
    }

    try {
        const userDetails = await JWT.verify(token, process.env.JWT_SECRET);
        req.user = userDetails;
        next();
    } catch (err) {
        return next(createError(401, "Invalid token. Please log in again"));
    }
};

export const authorizedRole = (...roles) => async (req, res, next) => {
    // Ensure that user is present and has the 'role' property
    const currentUserRole = req.user?.role;

    if (!currentUserRole || !roles.includes(currentUserRole)) {
        return next(createError(403, "You do not have permission"));
    }

    next();
};

export const verifySubscription = async (req, res, next) => {
    const { id } = req.user;

    if (!id) {
        return next(createError(400, "User ID is missing"));
    }

    try {
        const user = await User.findById(id);
        
        // Check if user exists
        if (!user) {
            return next(createError(404, "User not found"));
        }

        const subscription = user.subscription?.status; // Safely access subscription status
        const currentUserRole = user.role;

        // Handle case where subscription is inactive or user is not an ADMIN
        if (currentUserRole !== 'ADMIN' && subscription !== 'active') {
            return next(createError(403, "Please subscribe to access this"));
        }

        next();

    } catch (err) {
        return next(createError(500, "Server error while verifying subscription"));
    }
};
