const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 5000;

// middleware

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ykgi9mv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const manuCollection = client.db('bistrodb').collection('manu')
    const reviewCollection = client.db('bistrodb').collection('reveiws')
    const cartsCollection = client.db('bistrodb').collection('cart')
    const UserCollection = client.db('bistrodb').collection('user')


    // jwt related api 
    app.post('/jwt', async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
      res.send({ token })
    })
    // middleware 
    const verifyToken = (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(401).send({ message: 'unauthorized Access ' })
      }
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: 'unauthorized Access ' });
        }
        req.decoded = decoded;
        next();
      })
    }

    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const quary = { email: email }
      const user = await UserCollection.findOne(quary);
      const isAdmin = user?.role === 'admin'
      if (!isAdmin) {
        return res.status(403).send({ message: 'Forbiddan Access' });
      }
      next();
    }

    // User collection

    app.get('/users', verifyToken, verifyAdmin, async (req, res) => {
      const result = await UserCollection.find().toArray();
      res.send(result);
    })

    app.get('/users/admin/:email', verifyToken, verifyAdmin, async (req, res) => {
      const email = req.params?.email;
      if (email !== req.decoded.email) {
        return res.status(403).send({ message: 'Forbiddan Access' });
      }
      const quary = { email: email }
      const user = await UserCollection.findOne(quary);
      let admin = false;
      if (user) {
        admin = user.role === 'admin'
      }
      res.send({ admin });
    });

    app.post('/users', async (req, res) => {
      const user = req.body;
      const quary = { email: user?.email }
      const existingUser = await UserCollection.findOne(quary);
      const result = await UserCollection.insertOne(user);
      res.send(result);
    })
    app.delete('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req?.params?.id;
      if (!id) {
        return res.status(400).send('Id parameter is missing.');
      }
      const query = { _id: new ObjectId(id) };
      const result = await UserCollection.deleteOne(query);
      res.send(result);
    })

    app.patch('/users/admin/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: { role: 'admin' },
      };
      const result = await UserCollection.updateOne(query, updatedDoc);
      res.send(result);

    });

    // manu Collection
    app.get('/manu', async (req, res) => {
      const result = await manuCollection.find().toArray();
      res.send(result);
    })
    app.get('/manu/:id', async (req, res) => {
      const id = req.params.id;
      const quary = { _id: new ObjectId(id) };
      const result = await manuCollection.findOne(quary);
      res.send(result);
    })
    app.patch('/manu/:id', async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: { ...item },
      };
      const result = await manuCollection.updateOne(filter, updatedDoc);
      res.send(result);
    })

    app.post('/manu', verifyToken, verifyAdmin, async (req, res) => {
      const manu = req.body;
      const result = await manuCollection.insertOne(manu);
      res.send(result);
    })
    app.delete('/manu/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      console.log(id)
      const query = { _id: new ObjectId(id) };
      const result = await manuCollection.deleteOne(query);
      console.log(result)
      res.send(result);
    })

    // review Collection
    app.get('/review', async (req, res) => {
      const result = await reviewCollection.find().toArray();
      res.send(result);
    })
    // Cart Collection
    app.post('/carts', async (req, res) => {
      const cartItem = req.body;
      const result = await cartsCollection.insertOne(cartItem);
      res.send(result);
    })
    app.get('/arr', async (req, res) => {
      const result = await cartsCollection.find().toArray();
      res.send(result);
    })
    app.get('/carts', async (req, res) => {
      const email = req?.query?.email;
      if (!email) {
        return res.status(400).send('Email parameter is missing.');
      }
      const query = { email: email };
      const result = await cartsCollection.find(query).toArray();
      res.send(result);
    })
    app.delete('/carts/:id', async (req, res) => {
      const id = req?.params?.id;
      console.log(id)
      if (!id) {
        return res.status(400).send('Id parameter is missing.');
      }
      const query = { _id: new ObjectId(id) };
      const result = await cartsCollection.deleteOne(query);
      res.send(result);
    })
    // Payment PaymentIntent 
    app.post("/create-payment-intent", async (req, res) => {
      const {price } = req.body;
      const amount = parseInt(price * 100);
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.status(201).send({
        clientSecret: paymentIntent.client_secret,
      });
    })
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      // await client.close();
    }
  }
run().catch(console.dir);

  app.get('/', (req, res) => {
    res.send('boss is sitings');
  })

  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  })