const express = require("express")
const app = express()
const path = require("path")
const studentModel = require("./models/student")

// image
const multer = require("multer");
// const student = require("./models/student");


// Static folder to serve images
app.use('/uploads', express.static('uploads'));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where images are saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({ storage: storage });


app.set("view engine", "ejs")

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")))
app.use('/uploads', express.static('uploads'));


app.get("/", function(req, res){
    res.render("index")
})

app.get("/create", function(req, res){
    res.render("create")
})




// All students
app.get("/read", async (req, res)=> {
    let allUsers = await studentModel.find();
    console.log(allUsers);
    res.render("read",  {Users: allUsers})    
});

// delete Student
app.get("/delete/:userid", async (req, res)=> {
     let DeleteStudent = await studentModel.findOneAndDelete({_id: req.params.userid})
     res.redirect("/read")
});


app.get("/edit/:userid", async (req, res)=> { 
     let editStudent = await studentModel.findOne({_id: req.params.userid})
     console.log(editStudent);
     res.render("edit", {Useredit: editStudent})     
});



// Crate student
app.post("/create", upload.single('image'), async function(req, res){
    let craetedSudent = await studentModel.create({
        name: req.body.name,
        email: req.body.email,
        class: req.body.class,
        image: req.file.filename 
    });

    //  await student.save()
    res.redirect("/read")

});


app.get("/checkdb", (req, res) => {
  res.send("✅ Database connection working with MongoDB Atlas");
});



app.post("/update/:userid", async (req, res)=> {
    // let {name, email, class } = req.body;
     let updateStudent = await studentModel.findOneAndUpdate({_id: req.params.userid}, {name: req.body.name, email: req.body.email, class: req.body.class}, {new: true})
     res.redirect("/read")
})





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// app.listen(3000, function(){
//     console.log("Its Running");
// })