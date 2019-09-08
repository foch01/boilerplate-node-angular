import bcrypt from "bcrypt-nodejs";
import mongoose from "mongoose";
import {AuthToken, UserDocument} from "./User";

export type UserModelDocument = mongoose.Document & {
    email: string;
    password: string;
};

const userModelSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,

}, { timestamps: true });

/**
 * Password hash middleware.
 */
userModelSchema.pre("save", function save(next) {
    const user = this as UserModelDocument;
    if (!user.isModified("password")) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

export const UserModel = mongoose.model<UserDocument>("UserModel", userModelSchema);