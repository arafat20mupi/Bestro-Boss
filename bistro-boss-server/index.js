const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

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

    // User collection
    app.post('/users' , async( req , res ) => {
      const user = req.body;

      const quary = {email: user?.email}
      const existingUser = await UserCollection.findOne(quary);
      if (existingUser) {
        return res.status(400).send('User already exists');
      }

      const result = await UserCollection.insertOne(user);
      res.send(result);
    })
    app.get('/users', async (req, res) => {
      const result = await UserCollection.find().toArray();
      res.send(result);
    })

    // manu Collection
    app.get('/manu', async (req, res) => {
      const result = await manuCollection.find().toArray();
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
    app.delete( '/carts/:id' , async ( req , res ) => {
      const id = req?.params?.id;
      if (!id) {
        return res.status(400).send('Id parameter is missing.');
      }
      const query = { _id: new ObjectId (id) };
      const result = await cartsCollection.deleteOne(query);
      res.send(result);
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