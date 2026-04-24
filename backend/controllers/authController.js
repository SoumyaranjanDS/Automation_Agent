const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateToken, decodedToken } = require("../utils/jwt");

const handleUserSignup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        name,
        email,
        password: hashPassword,
    })

    return res.status(201).json({
        message: "User created successfully",
        user,
    })
}

const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    const existUser = await User.findOne({ email })
    if (!existUser) {
        return res.status(400).json({
            message: "User not found"
        })
    }
    const matchPassword = await bcrypt.compare(password, existUser.password)
    if (!matchPassword) {
        return res.status(400).json({
            message: "Invalid password"
        })
    }

    const token = generateToken({ id: existUser._id })

    return res.status(200).json({
        message: "User logged in successfully",
        token,
        user: existUser,
    })
}

module.exports = { handleUserSignup, handleUserLogin }