const express = require('express');
const cors =  require('cors'); 
const { MongoClient } = require("mongodb");
const bodyParser = require('body-parser');
require('dotenv').config()



const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

async function getPackage(_id){
    const uri = process.env.uri;
    
  const client = new MongoClient(uri);
  await client.connect();
  const dbName = "Collector";
  const collectionName = "Packages";

  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  const findOneQuery = { id: _id };

  try {
    const findOneResult = await collection.findOne(findOneQuery);
    if (findOneResult === null) {
      console.log(
        `Couldn't find any package that contain ${_id} as an name.\n`
      );
    } else {
      console.log(`Found a recipe with 'potato' as an ingredient:\n${JSON.stringify(findOneResult) }\n`)
      return(JSON.stringify(findOneResult))
      ;
    }
  } catch (err) {
    console.error(`Something went wrong trying to find one document: ${err}\n`);
  }
  // Make sure to call close() on your client to perform cleanup operations
  await client.close(); 
}   

async function login(username,password) {
  const uri = process.env.uri;
  const client = new MongoClient(uri);
  await client.connect();
  const dbName = "Users";
  const collectionName = "Admins";
  const database = client.db(dbName);
  const collection = database.collection(collectionName);
  const findOneQuery = { username: username };

  try {
    const findOneResult = await collection.findOne(findOneQuery);
    if (findOneResult !== null) {
      if (findOneResult.password === password) {
        await client.close();
        return true;

      } else {
        await client.close();
        return false;
      }
    } else {
      await client.close();
      return false;
      
    }
  } catch (err) {
    console.error(`Something went wrong trying to find one document: ${err}\n`);
  }
  // Make sure to call close() on your client to perform cleanup operations
  await client.close();
}


async function insertPackage(_id, _receiver, _cell, _email, _sender, _from,
  _destination, _datelisted, _deliverydate,_item,_category) {
  const uri =
    process.env.uri;
  
  const client = new MongoClient(uri);  
  await client.connect();
  const dbName = "Collector";
  const collectionName = "Packages";
  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  const package = {
    id: _id,
    receiver: _receiver,
    cell: _cell,
    email: _email,
    sender: _sender,
    from: _from,
    destination: _destination,
    datelisted: _datelisted,
    deliverydate: _deliverydate,
    item: _item,
    category: _category,
  };

  try {
    const insertManyResult = await collection.insertOne(package);
    console.log(`${package.id} successfully inserted.\n`);
    await client.close();
    return true;
  } catch (err) {
    console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
  }
  await client.close();

}

app.get('/package/:id', (req,res)=>{
    async function getMyPackage(){
        const { id } = req.params;
        const data = await getPackage(id);
        res.send({data:data})
    }getMyPackage()
})

app.post('/append',(req,res)=>{
  async function insertpackage() {
      console.log(req.body)
    const { id, receiver, cell, email, sender, from, destination, datelisted, deliverydate, item, category } = req.body;
    console.log(id)
      const success = await insertPackage(id,receiver,cell,email,sender,from,destination,datelisted,deliverydate,item,category);
    if (success) {
        res.send(success)
    }else{
      res.status(400).send("unable to save to database");
      }
  } insertpackage()
})
app.post("/login", (req, res) => {
  async function approve() {
    const { username, password } = req.body;
    const response = await login(username, password)
    res.send(response);
  }approve()
})


const port = 8000
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}!.`)
})
