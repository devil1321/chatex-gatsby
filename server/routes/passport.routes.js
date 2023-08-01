const express = require('express')
const router = require('express').Router()
const passport = require("passport");

router.get("/google",
  passport.authenticate("google", { scope: ["profile","email"] })
);

router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000/login" }),
  (req, res) => {
    // Successful authentication, redirect to a success page or do something else
    res.redirect("http://localhost:8000");
  }
);

module.exports = router