const { MongoClient } = require("mongodb");
require('dotenv').config()

async function run() {
  const uri =
    process.env.uri;

  const client = new MongoClient(uri);
  await client.connect();

  const dbName = "Users";
  const collectionName = "Admins";

  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  const package = {
    username: process.env.username,
    password: process.env.password,
  };

  try {
    const insertManyResult = await collection.insertOne(package);
    console.log(`${package.username} successfully inserted.\n`);
  } catch (err) {
    console.error(
      `Something went wrong trying to insert the new documents: ${err}\n`
    );
  }

  // Make sure to call close() on your client to perform cleanup operations
  await client.close();
}
run().catch(console.dir);
