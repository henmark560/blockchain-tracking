const { MongoClient } = require("mongodb");


async function login(username, password) {
    const uri ="mongodb+srv://admin:iOJMzZBrBijeh2LY@cluster0.7bqfwwu.mongodb.net/?retryWrites=true&w=majority";
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
        console.log(findOneResult)
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

async function main(){
    console.log(await login('rt', '@iamroo'))
}
main()