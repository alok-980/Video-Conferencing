import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import bcrypt, { hash } from "bcrypt";
import crypto from "crypto";
import { Meeting } from "../models/meeting.model.js";

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username or password is incorrect" });
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
        }

        let isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (isPasswordCorrect) {
            let token = crypto.randomBytes(20).toString("hex");

            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({ token: token, message: "User Loggedin" });
        }
    } catch (e) {
        return res.status(500).json({ message: `Something went wrong ${e}` });
    }
}

const register = async (req, res) => {
    const { name, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(httpStatus.FOUND).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword
        })

        await newUser.save();

        res.status(httpStatus.CREATED).json({ message: "User Registered" })
    } catch (e) {
        res.status({ message: `Something went wrong ${e}` });
    }
}

const getUserHistory = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Authorization token missing" });
    }

    try {
        const user = await User.findOne({ token: token });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const meetings = await Meeting.find({ user_id: user.username });
        res.json(meetings);
    } catch (err) {
        res.status(500).json({ message: `Something went wrong: ${err.message}` });
    }
}

const addToHistory = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    const { meeting_code } = req.body;

    if (!token || !meeting_code) {
        return res.status(400).json({ message: "Token and meeting code are required" });
    }

    try {
        const user = await User.findOne({ token: token });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newMeeting = new Meeting({
            user_id: user.username,
            meetingCode: meeting_code
        });

        await newMeeting.save();

        res.status(201).json({ message: "Added code to history" });
    } catch (err) {
        res.status(500).json({ message: `Something went wrong: ${err.message}` });
    }
}

export { login, register, getUserHistory, addToHistory };