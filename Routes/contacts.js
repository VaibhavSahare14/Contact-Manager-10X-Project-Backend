const express = require("express");
const router = express.Router();
const contacts = require("../Models/contacts");
const user = require("../Models/user");
router.use(express.json());
const cors = require("cors");
router.use(cors());
const { validateToken } = require("../Middleware/Middleware");
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

// router.post("/contacts", async (req, res) => {
//     console.log(req.body);
//     // try {
//     //     console.log(req.body);
//     // } catch (err) {
//     //     res.status(400).json({ message: err.message });
//     // }
// });


/*---------------GET USERNAME---------------*/
router.get("/username", validateToken, async (req, res) => {
    const data = await user.findOne({ _id: req.user });
    res.json(data);
});

/*---------------GET ONE PAGE DATA(Contacts for one page)---------------*/
router.get("/all", validateToken, async (req, res) => {
    try {
        const { page } = req.query;

        const data = await contacts.find({ userId: req.user }).limit(10).skip((page - 1) * 10);
        res.json(data);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/*---------------GET ALL CONTACTS---------------*/
router.get("/alldata", validateToken, async (req, res) => {
    try {
        const data = await contacts.find({ userId: req.user })
        res.json(data);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


/*---------------ADD NEW DETAILS---------------*/
router.post("/add", validateToken, async (req, res) => {
    console.log(req.body);
    try {
        let input = Array.isArray(req.body);

        if (input) {
            let lists = req.body;
            lists.map(async (user) => {
                const data = await contacts.create({
                    Name: user.name,
                    Designation: user.designation,
                    Company: user.company,
                    Industry: user.industry,
                    Email: user.email,
                    PhoneNumber: user.phonenumber,
                    Country: user.country,
                    userId: req.user,
                });
            });
            res.json({ message: "success" });
        } else {
            const data = await contacts.create({
                Name: req.body.name,
                Designation: req.body.designation,
                Company: req.body.company,
                Industry: req.body.industry,
                Email: req.body.email,
                PhoneNumber: req.body.phonenumber,
                Country: req.body.country,
                userId: req.user,
            });
            res.json({ message: "success" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/*---------------DELETE ALL DATA OF A PAGE---------------*/
router.post("/delete", validateToken, async (req, res) => {
    try {
        const datas = req.body;
        if (datas.length > 0) {
            const data = await contacts.find({ userId: req.user });
            if (data) {
                datas.map(async (ids) => {
                    await contacts.deleteOne({ _id: ids.id });
                });
                res.json({ message: "success", data });
            }
        } else {
            res.json("not deleted");
        }
    } catch (e) {
        res.status(400).json({ message: err.message });
    }
});

/*---------------DELETE SELECTED DATA---------------*/
router.post("/sdelete", validateToken, async (req, res) => {
    try {
        const datas = req.body;
        if (datas[0].id != "" && datas.length > 0) {
            const data = await contacts.find({ userId: req.user });
            if (data) {
                datas.map(async (ids) => {
                    await contacts.deleteOne({ _id: ids.id });
                });
                res.json({ message: "success", data });
            }
        }
    } catch (e) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;