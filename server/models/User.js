import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, unique: false },
    password: { type: String, required: false },
    avatar: {type: String},
    point: {type: Number, default: 0},
    level: {type: Number, default: 1},
    isPremium: { type: Boolean, default: false },
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription", default: null },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

export default User;
