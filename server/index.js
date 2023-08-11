const express = require('express');
const cors =  require('cors'); 
const { MongoClient } = require("mongodb");


const app = express()
app.use(cors())
app.use(express.json())


async function getPackage(_id){
    const uri =
        "mongodb+srv://admin:iOJMzZBrBijeh2LY@cluster0.7bqfwwu.mongodb.net/?retryWrites=true&w=majority";
    
  const client = new MongoClient(uri);
  await client.connect();
  const dbName = "Collector";
  const collectionName = "Packages";

  // Create references to the database and collection in order to run
  // operations on them.
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


app.get('/package/:id', (req,res)=>{
    async function getMyPackage(){
        const { id } = req.params;
        const data = await getPackage(id);
        res.send({data:data})
    }getMyPackage()
})


const port = 8000
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}!.`)
})
