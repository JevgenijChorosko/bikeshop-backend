const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
require("dotenv").config();

const { PORT, DB_URI } = process.env;

const connectDb = new MongoClient(DB_URI);

app.use(express.json());
app.use(cors());

app.get("/bikes", async (req, res) => {
    try {
        await connectDb.connect();
        const data = await connectDb.db("bikeshop").collection("bikes").find().toArray();
        res.send(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/categories", async (req, res) => {
    try {
        await connectDb.connect();
        const data = await connectDb.db("bikeshop").collection("categories").find().toArray();
        res.send(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/aboutus", async (req, res) => {
    try {
        await connectDb.connect();
        const data = await connectDb.db("bikeshop").collection("aboutus").find().toArray();
        res.send(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/orders", async (req, res) => {
    try {
        await connectDb.connect();
        const data = await connectDb.db("bikeshop").collection("orders").find().toArray();
        res.send(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/orders", async (req, res) => {
    const { bikeId } = req.body;
    try {
        const id = new ObjectId(bikeId);
        const bike = await connectDb.db("bikeshop").collection("bikes").findOne({ _id: id });
        if (!bike) {
            res.status(404).send("Not Found");
            return;
        }

        const isInCart = await connectDb.db("bikeshop").collection("orders").findOne({ _id: id });

        if (isInCart) {
            await connectDb.connect();
            await connectDb
                .db("bikeshop")
                .collection("orders")
                .findOneAndUpdate({ _id: id }, { $inc: { quantity: 1 } }, { returnOriginal: false });
        } else {
            await connectDb.connect();
            await connectDb
                .db("bikeshop")
                .collection("orders")
                .insertOne({
                    ...bike,
                    quantity: 1,
                });
        }

        const allOrders = await connectDb.db("bikeshop").collection("orders").find().toArray();

        res.send(allOrders);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.put("/orders/:bikeId", async (req, res) => {
    const { bikeId } = req.params;
    try {
        const id = new ObjectId(bikeId);
        const bike = await connectDb.db("bikeshop").collection("bikes").findOne({ _id: id });
        if (!bike) {
            res.status(404).send("Not Found");
            return;
        }

        const isInCart = await connectDb.db("bikeshop").collection("orders").findOne({ _id: id });

        if (!isInCart) {
            res.status(404).send("Not Found");
            return;
        }

        if (isInCart.quantity > 1) {
            await connectDb.connect();
            await connectDb
                .db("bikeshop")
                .collection("orders")
                .findOneAndUpdate({ _id: id }, { $inc: { quantity: -1 } }, { returnOriginal: false });
        } else {
            await connectDb.connect();
            await connectDb.db("bikeshop").collection("orders").deleteOne({ _id: id });
        }

        const allOrders = await connectDb.db("bikeshop").collection("orders").find().toArray();

        res.send(allOrders);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT || 3001);
