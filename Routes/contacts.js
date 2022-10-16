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



/*---------------GET USERNAME---------------*/
router.get("/username", validateToken, async (req, res) => {
    
    const data = await user.findOne({ _id: req.user });
    res.json(data);
});

/*---------------GET ONE PAGE DATA(Contacts for one page)---------------*/
// router.get("/dataPerPage", validateToken, async (req, res) => {
//     try {
//         const { page } = parseInt(req.query);
//         const limit=3;
//         const start=(page-1)*limit;
//         const end =page*limit;
//         const data = await contacts.find({ userId: req.user });
//         // const newdata=data.slice(start,end);
//         // console.log(data)
//       res.json({data,
//         start,
//         end
//       }
//        );
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

/*---------------GET ALL CONTACTS---------------*/
router.get("/alldata", validateToken, async (req, res) => {
    try {
        const data = await contacts.find({ userId: req.user })
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


/*---------------ADD NEW DETAILS---------------*/
router.post("/add", validateToken  ,cors(), async (req, res) => {
    // console.log(req.body);
    try {
        let data = await contacts.find({ userId: req.user });
        console.log(req.body);
        
        // console.log(data);
        if (data.length>0) {
        //   console.log("hello")
          data = await contacts.find({ userId: req.user }).updateOne(
            {},
            {
              $push: {
                contact: req.body,
              },
            }
          );
        } 
        else {
            console.log("hello")
          data = await contacts.create({
            contact: req.body,
            userId: req.user,
          });
        }
        res.status(200).json({
          status: "Sucess",
          message: data,
        });
      } catch (error) {
        res.status(500).json({
          status: "Failed",
          message: error.message,
        });
      }
   
});

/*---------------DELETE ALL DATA OF A PAGE---------------*/
// router.post("/delete", validateToken, async (req, res) => {
//     try {
//         const datas = req.body;
//         if (datas.length > 0) {
//             const data = await contacts.find({ userId: req.user });
//             if (data) {
//                 datas.map(async (ids) => {
//                     await contacts.deleteOne({ _id: ids.id });
//                 });
//                 res.json({ message: "success", data });
//             }
//         } else {
//             res.json("not deleted");
//         }
//     } catch (e) {
//         res.status(400).json({ message: err.message });
//     }
// });
router.delete("/delete/:id",validateToken, async (req, res) => {
  
  try {
    let data = await contacts.updateOne(
      { userId: req.user },
      { $pull: { contact: { _id: req.params.id } } }
    );
    res.status(200).json({
      status: "Sucess",
      message: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "Delete Failed",
      message: error.message,
    });
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