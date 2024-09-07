import express, { response } from "express";
import mysql from 'mysql'
import cors from 'cors'
import bcrypt from 'bcrypt'
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import multer from "multer";

const salt = 10;

const app = express();
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(express.json())
app.use("/images", express.static("./images"))




const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "",
    database: 'react'
})


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         return cb(null, "public/images")
//     },
//     filename: function (req, file, cb) {
//         return cb(null, `${Date.now()}_${file.originalname}`)
//     }
// })

// const upload = multer({ storage })

app.post('/login', (req, res) => {
    const sql = "INSERT INTO `signup` (`name`, `username`, `email`, `phone`, `password`, `cpassword`, `address`,`breakingnews`) VALUES(?)";
    // const sql="INSERT INTO login (`name`,`email`,`password`) VALUES(?)";
    const values = [
        req.body.name,
        req.body.username,
        req.body.email,
        req.body.phone,
        req.body.address,
        req.body.password,
        req.body.cpassword,
        req.body.breakingnews
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    })
})

//----Breaking News--------
//INSERT INTO `breakingnews` (`id`, `news`) VALUES

app.post('/break', (req, res) => {
    const sql = "INSERT INTO `breakingnews` (`news`) VALUES(?)";
    const values = [
        req.body.name,
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    })
})

//----Breaking News--------

app.get('/break', (req, res) => {
    const sql = " SELECT * FROM `breakingnews`";
    db.query(sql, (err, data) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(data);
    })
})

// app.listen(8004,()=>{
//         console.log("listening")

//     })


// app.post('/profile',(req,res)=>{
//     const sql="SELECT * FROM `signup` WHERE username = ? AND password=?";
//     // const sql="INSERT INTO login (`name`,`email`,`password`) VALUES(?)";
//     const values=[
//         req.body.username,
//         req.body.password,
//     ]
//     db.query(sql,[values],(err,data)=>{
//         if(err){
//             return res.json(err);
//         }
//         if(data.length>0){
//             bcrypt.compare(req.body.password.toString(),data[0].password,(err,response)=>{
//                 if(err) return res.json({Error:"Password compare error"});
//                 if(response){
//                     const name=data[0].name;
//                     const token=Jwt.sign({name},"jwt-secret-key",{expiresIn:'id'});
//                     res.cookie('token',token);
//                     return res.json({Status:"Success"})
//                 }
//                 else{
//                     return res.json({Error:"Password Not Matched"});
//                 }
//             })
//         }
//         else{
//             return res.json({Error:"No email existed"})
//         }
//         return res.json(data);
//     })
// })    


// app.post('/profile', (req, res) => {
//     const sql = "SELECT * FROM `createaccount1` WHERE username = ? AND password=?";
//     // const sql="INSERT INTO login (`name`,`email`,`password`) VALUES(?)";
//     // const values=[
//     //     req.body.username,
//     //     req.body.password,
//     // ]
//     db.query(sql, [req.body.username, req.body.password], (err, data) => {
//         if (err) {
//             return res.json(err);
//         }
//         if (data.length > 0) {
//             return res.json("Login Successfully")
//         }
//         return res.json(data);
//     })
// })



//  ------------------------ Create Account -----------------

app.post('/createAccount', (req, res) => {
    const sql = "INSERT INTO `createaccount1` ( `username`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.username,
        req.body.email,
        req.body.password,
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    })
})

app.post('/profile', (req, res) => {
    const sql = "SELECT * FROM `createaccount1` WHERE email = ? AND password=?";
    // const sql="INSERT INTO login (`name`,`email`,`password`) VALUES(?)";
    // const values=[
    //     req.body.username,
    //     req.body.password,
    // ]
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json(err);
        }
        if (data.length > 0) {
            return res.json("Success");
        }
       
        return res.json(data);
    })
})



//--------------------Customer Stories



// app.post('/customer',upload.single('file'),(req,res)=>{
//     const sql="INSERT INTO `customerstories` ( `name`,`image`) VALUES(?)";
//     const values=[
//         req.body.name,
//         req.file.filename
//     ]
//     db.query(sql,[values],(err,data)=>{
//         if(err){
//             return res.json(err);
//         }
//         return res.json(data);
//     })
// })

app.get('/customer2', (req, res) => {
    const sql = 'SELECT * FROM `customerstories`';
    db.query(sql, (err, data) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(data);
    })
})


//------------------------------------- Contact

app.post('/contact', (req, res) => { 
    const sql = "INSERT INTO `contact` (`fname`, `lname`, `email`, `address`, `message`, `select`, `city`) VALUES (?)";
    const values = [
        req.body.fname,
        req.body.lname,
        req.body.email,
        req.body.address,
        req.body.messages,
        req.body.select,
        req.body.city,
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    })
})


//        ---------------- Price Table ---------------

// INSERT INTO `price` (`id`, `name`, `net`, `message`, `day`) VALUES

app.post('/price', (req, res) => {
    const sql = "INSERT INTO `price` (`name`, `net`, `message`, `day`,`price`) VALUES(?)";
    // const sql="INSERT INTO login (`name`,`email`,`password`) VALUES(?)";
    const values = [
        req.body.name,
        req.body.net,
        req.body.message,
        req.body.days,
        req.body.price

    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    })
})

app.get('/price1', (req, res) => {
    const sql = 'SELECT * FROM `price`';
    db.query(sql, (err, data) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(data);
    })
})

app.post('/price', (req, res) => {
    const sql = "INSERT INTO `price` (`name`, `net`, `message`, `day`, `price`) VALUES ?";
    const values = [
        [
            req.body.name,
            req.body.net,
            req.body.message,
            req.body.day, // Corrected "days" to "day" based on your SQL query
            req.body.price
        ]
    ];
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});


app.get('/checkout/:id', (req, res) => {
    const sql = 'SELECT * FROM `price` WHERE id=?';
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(data);
    })
})


// ------------------------------------- Admin --------------------------------------------   

const upload = multer({ dest: 'uploads/' });
// app.post('/addProductActivity', upload.single('file'), (req, res) => {
//     const sql="INSERT INTO addproductactivity (`name`, `desc1`, `image`) VALUES(? ? ?)";
//     const image = req.file;
//     const values=[
//                     req.body.name,
//                     req.body.desc,
//                 ]
//                 db.query(query, [image.originalname, values], (error, results, fields) => {
//                     if (error) throw error;
//                     res.json({ success: true, message: 'Image uploaded successfully' });
//                   });

// })

app.post('/addProductActivity',upload.single('file'),(req,res)=>{
  
        const sql="INSERT INTO addproductactivity (`name`, `desc1`, `image`) VALUES(?)";
        const values=[
            req.body.name,
            req.body.desc,
            req.file.filename
        ]
        db.query(sql,[values],(err,data)=>{
            if(err){
                return res.json(err);
            }
            return res.json(data);
        })
    })


    app.listen(8081, () => {
        console.log("listening")
    })
    