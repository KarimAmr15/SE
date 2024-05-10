
const express = require('express')
const path = require('path');
const app = express()
app.use(express.static('views'))
const port = 3000;
const mongoose = require('mongoose');
app.use(express.urlencoded({extended: true}))

const Customer = require("./models/mydataSchema");
const Product = require('./models/productsSchema');







app.get('/Home.html', (req, res) => {

    res.sendFile("./views/Home.html", { root: __dirname })

})

app.get('/About.html', (req, res) => {

    res.sendFile("./views/About.html", { root: __dirname })

})

app.get('/Login.html', (req, res) => {

    res.sendFile("./views/Login.html", { root: __dirname })

})

app.get('/', (req, res) => {

    res.sendFile("./views/Home.html", { root: __dirname })

})

app.get('/Contact.html', (req, res) => {

    res.sendFile("./views/Contact.html", { root: __dirname })

})

app.get('/Register.html', (req, res) => {

    res.sendFile("./views/Register.html", { root: __dirname })

})







mongoose.connect('mongodb+srv://karimamr808:F9TTCB471FRXUxxz@cluster0.89usgfd.mongodb.net/Porsche?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    app.listen(port, () => {
        console.log(`listening to port number ${port}`)
    })
}).catch((err) => {
    console.log(err)
});

app.post("/Register",(req,res)=>{
    const { fname, lname ,dob,mail,password} = req.body; 
    console.log(fname, lname,dob,mail,password); 

    const c = new Customer({ fname, lname,mail,password,dob });
    c.save().then(() => {
        return res.status(401).send("registered successfully")
        res.redirect("Home.html")
    }).catch((err) => {
        console.log(err);
        return res.status(401).send("User not found")
    })

});
app.post("/Login", async (req, res) => {
    const { mail, password } = req.body;
    try {
        const user = await Customer.findOne({ mail });
        console.log(mail);
        console.log(user.password);
        if (!user) {
            return res.status(401).send("User not found");
        }
        
        if (user.password === password) {
            
            res.status(401).send(" Login successfull");
            console.log("Login successful");
        } else {
            
            res.status(401).send("Incorrect email or password");
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal server error");
    }
});



app.get('/Product', async(req,res)=>{

    const result = await Product.find();
    res.send({"Product": result});


});

const productRoutes = require('./api/routes/products');
app.use('/products', productRoutes);





module.exports = app;