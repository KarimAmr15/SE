

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
const requireAuthCustomer = require('./middleware/authMiddlewareCustomer')
const requireAuthAdmin = require('./middleware/authMiddlewareAdmin')

const Customer = require("./models/mydataSchema");
const Product = require('./models/productsSchema');
const Order = require('./models/ordersSchema');
const Admin = require("./models/adminSchema");

const createTokenCustomer = (id)=>{
    return jwt.sign({id},'our secret', {expiresIn: 2*60*1000})
}
const createTokenAdmin = (id)=>{
    return jwt.sign({id},'admin secret', {expiresIn: 2*60*1000})
}

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

app.get('/addnewproduct.html', (req, res) => {

    res.sendFile("./views/addnewproduct.html", { root: __dirname })

})







app.post("/Register", async (req, res) => {
    const { fname, lname, dob, mail, password } = req.body;
    

    try{
        const c = await Customer.create({fname, lname, dob, mail, password})
        const token = createTokenCustomer(c._id)
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
        const user = await Customer.login(mail, password)
        if(user!=null){
        const token = createTokenCustomer(user._id)
        res.cookie('jwt',token, {maxAge:2*60*1000})
        res.redirect('./Home.html')}
        else{
            res.send('incorrect email or password')}
        }
     catch (error) {
        console.error("Error:", error);
        
    }
});
app.post("/AdminReg", async (req, res) => {
    const { fname, lname, mail, password } = req.body;
    

    try{
        const admin = await Admin.create({fname, lname, mail, password})
        const token = createTokenAdmin(admin._id)
        res.cookie('jwt', token, {maxAge: 2*60*1000})
        res.redirect('./AdminLogin.html')
    }
    catch(err){
        console.log(err);
        
    }
    

});
app.post("/AdminLogin", async (req, res) => {
    const { mail, password } = req.body;
    try {
        const admin = await Admin.login(mail, password)
        if(admin!=null){
        const token = createTokenAdmin(admin._id)
        res.cookie('jwt',token, {maxAge:2*60*1000})
        res.sendFile("./views/AdminHome.html", { root: __dirname });
    }
        else{
            res.send('incorrect email or password')}
        }
     catch (error) {
        console.error("Error:", error);
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
        horsePower: req.body.horsePower, 
        topSpeed: req.body.topSpeed, 
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


app.get("/products/:productId", (req, res, next) => {

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

app.delete("/products/:productId", async (req, res, next) => {
    const productId = req.params.productId;
    
    try {
        // Find the product by ID and remove it
        const deletedProduct = await Product.deleteOne({ _id: productId });

        if (deletedProduct.deletedCount === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Respond with a success message
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.patch("/products/:productId", async (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, { $set: updateOps }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
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



app.post('/orders', requireAuthCustomer,async (req, res, next) => {
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




app.get("/orders/:orderId", (req, res, next) => {

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

app.delete("/orders/:orderId", async (req, res, next) => {
    const orderId = req.params.orderId;
    
    try {
        // Find the order by ID and remove it
        const deletedOrder = await Order.deleteOne({ _id: orderId });

        if (deletedOrder.deletedCount === 0) {
            return res.status(404).json({ error: "Order not found" });
        }

        // Respond with a success message
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.patch("/orders/:orderId", (req, res, next) => {
    const id = req.params.orderId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Order.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});


app.get('/logout', (req, res)=>{
    res.cookie('jwt', '',{maxAge: 1})
    res.redirect('/')
}) 


app.get('/index', (req, res) => {
    res.redirect('http://localhost:3000');
});

app.get('/index2', (req, res) => {
    res.redirect('http://localhost:3000/adminOrders');
});


app.get('/index3', (req, res) => {
    res.redirect('http://localhost:3000/orders');
});


app.get('/myOrders', (req, res) => {
    res.redirect('http://localhost:3000/myOrders');
});



app.get('/AdminReg.html', (req, res) => {

    res.sendFile("./views/AdminReg.html", { root: __dirname })

});

app.get('/AdminLogin.html', (req, res) => {

    res.sendFile("./views/AdminLogin.html", { root: __dirname })

});



app.get('/AdminHome', requireAuthAdmin, (req, res, next) => {


    res.sendFile("./views/AdminHome.html", { root: __dirname });

});






mongoose.connect('mongodb+srv://karimamr808:F9TTCB471FRXUxxz@cluster0.89usgfd.mongodb.net/Porsche?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    app.listen(port, () => {
        console.log(`listening to port number ${port}`)
    })
}).catch((err) => {
    console.log(err)
});
