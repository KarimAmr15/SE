

const express = require('express')
const path = require('path');
const app = express()
const cors = require("cors");
app.use(cors());
app.use(express.static('views'))
const port = 5000;
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const cookieParser = require("cookie-parser") 
app.use(cookieParser())

const jwt = require('jsonwebtoken')
const requireAuth = require('./middleware/authMiddleware')

const Customer = require("./models/mydataSchema");
const Product = require('./models/productsSchema');
const Order = require('./models/ordersSchema');

const createToken = (id) => {
    return jwt.sign({ id }, 'your-secret-key', { expiresIn: '2h' });
};

app.get('/set-cookie',(req,res)=>{
    res.cookie('newUser',true)
    res.cookie('isEmployee',false, {maxAge: 1*60*1000})
    res.send('you got a cookie')
})
app.get('/get-cookies',(req, res)=>{
    const cookies = req.cookies
    res.json(cookies)
})


app.get('/views/order-form.html', (req, res) => {

    res.sendFile("./views/order-form.html", { root: __dirname })

})




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









app.post("/Register", async (req, res) => {
    const { fname, lname, dob, mail, password } = req.body;
    

    try{
        const c = await Customer.create({fname, lname, dob, mail, password})
        const token = createToken(c._id)
        res.cookie('jwt', token, {maxAge: 2*60*1000})
        res.redirect('./Login.html')
    }
    catch(err){
        console.log(err);
        
    }
    

});
app.post("/Login", async (req, res) => {
    const { mail, password } = req.body;
    try {
        const user = await Customer.login(mail, password);
        if (user != null) {
            const token = createToken(user._id);
            res.cookie('jwt', token, { maxAge: 2 * 60 * 1000 });
            res.json({ message: 'Login successful', token, customerId: user._id });
        } else {
            res.status(401).send('Incorrect email or password');
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send('An error occurred during login');
    }

});




app.get('/products',(req, res, next) => {

    Product.find().exec().then(docs => {

        console.log(docs);

                res.status(200).json(docs);

    }).catch(err => {

        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

app.post('/products', (req, res, next) => {
    console.log(req.body);
    const product = new Product({
        _id:new mongoose.Types.ObjectId,
        modelName: req.body.modelName,
        price: req.body.price,
        seats: req.body.seats,
        tank: req.body.tank,
        acceleration: req.body.acceleration,
        cylinders: req.body.cylinders,
        horsepower: req.body.horsepower,
        topspeed: req.body.topspeed,
        stock: req.body.stock,
        img: req.body.img
    });
    product.save().then(result => {
        res.status(201).json({
            message: 'handling post requests to /products',
            createdProduct: product
        });
    }).catch(err => console.log(err));

});


app.get("/products/:productId", requireAuth, (req, res, next) => {

    const id = req.params.productId;
    Product.findById(id).exec().then(doc => {
        console.log(doc);
        if (doc) {

            res.status(200).json(doc);
        }
        else {
            res.status(404).json({ message: 'no entry found' })
        }

    }).catch(err => {
        console.log(err)
        res.status(500).json({ error: err });
    });
});


app.delete("/products/:productId", (req, res, next) => {

    const id = req.params.productId
    Product.remove({ _id: id }).exec().then(res =>{

        res.status(200).json(result);
    }).catch(err =>{

        console.log(err);
        res.status(500).json({error: err});
    });
});

app.patch("/products:productId",(req,res,next)=>{
    const id = req.params.productId
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Product.update({_id:id },{$set: {updateOps}}).exec().then(result =>{

        console.log(result);
        res.status(200).json(result);
    }).catch(err =>{

        console.log(err);
        res.status(500).json({error: err})
    });
});



app.get('/orders', (req, res, next) => {



    Order.find().exec().then(docs => {

        console.log(docs);

                res.status(200).json(docs);

    }).catch(err => {

        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});


app.post('/orders', async (req, res, next) => {
    try {
        const { productName, productPrice, email, phone, address, color } = req.body;

        // Find the customer by email
        const customer = await Customer.findOne({ mail: email });

        if (!customer) {
            return res.status(404).json({ error: 'Customer not found with the provided email' });
        }

        // Find the product ID based on the product name
        const product = await Product.findOne({ modelName: productName });
        console.log(productName,productPrice)

        if (!product) {
            return res.status(404).json({ error: 'Product not found with the provided name' });
        }

        // Create the order
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            price: productPrice,
            orderDate: new Date(),
            orderStatus: 'Pending',
            Address: address,
            Color: color,
            product: product._id, // Use the retrieved product ID
            customer: customer._id, // Use the retrieved customer ID
        });

        // Save the order
        const savedOrder = await order.save();

        res.status(201).json({
            message: 'Order placed successfully',
            createdOrder: savedOrder
        });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'An error occurred while placing the order' });
    }
});




app.get("/orders/:orderId", requireAuth, (req, res, next) => {

    const id = req.params.orderId;
    Order.findById(id).exec().then(doc => {
        console.log(doc);
        if (doc) {

            res.status(200).json(doc);
        }
        else {
            res.status(404).json({ message: 'no entry found' })
        }

    }).catch(err => {
        console.log(err)
        res.status(500).json({ error: err });
    });
});


app.delete("/orders/:orderId", (req, res, next) => {

    const id = req.params.orderId
    Order.remove({ _id: id }).exec().then(res =>{

        res.status(200).json(result);
    }).catch(err =>{

        console.log(err);
        res.status(500).json({error: err});
    });
});

app.patch("/orders:orderId",(req,res,next)=>{
    const id = req.params.orderId
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Order.update({_id:id },{$set: {updateOps}}).exec().then(result =>{

        console.log(result);
        res.status(200).json(result);
    }).catch(err =>{

        console.log(err);
        res.status(500).json({error: err})
    });
});

app.get('/logout', (req, res)=>{
    res.cookie('jwt', '',{maxAge: 1})
    res.redirect('/')
}) 


app.get('/index', (req, res) => {
    res.redirect('http://localhost:3000');
});

app.get('/myOrders', (req, res) => {
    res.redirect('http://localhost:3000/myOrders');
});




mongoose.connect('mongodb+srv://karimamr808:F9TTCB471FRXUxxz@cluster0.89usgfd.mongodb.net/Porsche?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    app.listen(port, () => {
        console.log(`listening to port number ${port}`)
    })
}).catch((err) => {
    console.log(err)
});
