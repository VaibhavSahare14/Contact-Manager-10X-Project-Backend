const express = require("express");
const router = express.Router();
const contacts = require("../Models/contacts");
const user = require("../Models/user");
router.use(express.json());
const cors = require("cors");
router.use(cors());

router.post("/contacts", async (req, res) => {

    try {
        console.log(req.body);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
