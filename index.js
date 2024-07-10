const express = require('express')
const cors = require('cors')
const dbConnect = require("./src/routes/dbConnect.js")
const Product = require("./src/models/products.model.js")
const User = require("./src/models/users.model.js")
const Seller = require("./src/models/seller.model.js")
const Cart = require('./src/models/cart.model.js')
// const Order = require('./src/models/order.model.js')
const app = express()

dbConnect()

app.use(cors({
    origin: ["*"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
}))
app.use(express.json())

// PRODUCTS
app.post("/products", async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.get("/products", async (req, res) => {
    try {
        const { limit, search } = req.query;
        const filter = {};

        if (search) {
            const regex = new RegExp(search, 'i');
            filter.$or = [
                { name: regex },
                { category: regex },
                { description: regex }
            ];
        }

        const products = await Product.find(filter).limit(parseInt(limit));
        res.send(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.put("/products/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) {
            return res.status(404).send({ error: "Product not found" });
        }
        // product.id = product._id
        res.send(product);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.delete("/products/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).send({ error: "Product not found" });
        }
        product.id = product._id
        res.send({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }
        res.send(product);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


// USERS
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


app.get('/users/login', async (req, res) => {
    const { email, password } = req.query;
    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


// SELLER
app.post('/seller', async (req, res) => {
    try {
        const seller = new Seller(req.body);
        await seller.save();
        res.status(201).send(seller);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.get('/seller', async (req, res) => {
    try {
        const seller = await Seller.find();
        res.send(seller);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


app.get('/seller/login', async (req, res) => {
    const { email, password } = req.query;
    try {
        const seller = await Seller.findOne({ email, password });
        if (!seller) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(seller);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


// CART

app.post("/cart", async (req, res) => {
    try {
        const cart = new Cart(req.body);
        await cart.save();
        res.status(201).send(cart);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.get("/cart/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const carts = await Cart.find({ userId: userId });
        if (!carts || carts.length === 0) {
            return res.status(404).send({ error: 'Cart not found' });
        }
        res.send(carts);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.put("/cart/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const cart = await Cart.findByIdAndUpdate(id, req.body, { new: true });
        if (!cart) {
            return res.status(404).send({ error: "Item not found" });
        }
        res.send(cart);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.delete("/cart/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const cart = await Cart.findByIdAndDelete(id);
        if (!cart) {
            return res.status(404).send({ error: "Item not found" });
        }
        res.send({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get('/cart/item/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const cart = await Cart.findById(id);
        if (!cart) {
            return res.status(404).send({ error: 'Item not found' });
        }
        res.send(cart);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get("/cart/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const cartItems = await Cart.find({ userId: userId });
        if (!cartItems || cartItems.length === 0) {
            return res.status(404).send({ error: 'No items found in cart' });
        }
        res.send(cartItems);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// ORDERS
const Order = require("./src/models/order.model.js");

// ORDERS
app.post("/orders", async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).send(order);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.get("/orders/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const orders = await Order.find({ userId: userId });
        if (!orders || orders.length === 0) {
            return res.status(404).send({ error: 'No orders found' });
        }
        res.send(orders);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.delete('/orders/:orderId', async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const order = await Order.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(404).send({ error: 'Order not found' });
        }
        res.send({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


app.listen(8080, () => {
    console.log("Server is running on port 8080")
})
