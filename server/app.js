const { MongoClient } = require("mongodb");

async function run() {
  // TODO:
  // Replace the placeholder connection string below with your
  // Altas cluster specifics. Be sure it includes
  // a valid username and password! Note that in a production environment,
  // you do not want to store your password in plain-text here.
  const uri =
  "mongodb+srv://admin:iOJMzZBrBijeh2LY@cluster0.7bqfwwu.mongodb.net/?retryWrites=true&w=majority";

  // The MongoClient is the object that references the connection to our
  // datastore (Atlas, for example)
  const client = new MongoClient(uri);

  // The connect() method does not attempt a connection; instead it instructs
  // the driver to connect using the settings provided when a connection
  // is required.
  await client.connect();

  // Provide the name of the database and collection you want to use.
  // If the database and/or collection do not exist, the driver and Atlas
  // will create them automatically when you first write data.
  const dbName = "Collector";
  const collectionName = "Packages";

  // Create references to the database and collection in order to run
  // operations on them.
  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  /*
   *  *** INSERT DOCUMENTS ***
   *
   * You can insert individual documents using collection.insert().
   * In this example, we're going to create four documents and then
   * insert them all in one call with collection.insertMany().
   */

  const package = 
    {
      id: "pckg-7500789",
      receiver: "Jan Cox",
      cell: "",
      email: "jeanycox2019@gmail.com",
      sender: "Mark Hendrix",
      from: "New York, USA",
      destination: "Australia",
      deliveryInDays: 35,
      package: "undisclosed",
      category: 'precious',    
    };

  try {
    const insertManyResult = await collection.insertOne(package);
    console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
  } catch (err) {
    console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
  }

  /*
   * *** FIND DOCUMENTS ***
   *
   * Now that we have data in Atlas, we can read it. To retrieve all of
   * the data in a collection, we call Find() with an empty filter.
   * The Builders class is very helpful when building complex
   * filters, and is used here to show its most basic use.
   */



  // We can also find a single document. Let's find the first document
  // that has the string "potato" in the ingredients list.
  const findOneQuery = { receiver: "Jan Cox" };

  try {
    const findOneResult = await collection.findOne(findOneQuery);
    if (findOneResult === null) {
      console.log("Couldn't find any package that contain 'Jan Cox' as an name.\n");
    } else {
      console.log(`Found a recipe with 'potato' as an ingredient:\n${JSON.stringify(findOneResult)}\n`);
    }
  } catch (err) {
    console.error(`Something went wrong trying to find one document: ${err}\n`);
  }

  /*      *** DELETE DOCUMENTS ***
   *
   *      As with other CRUD methods, you can delete a single document
   *      or all documents that match a specified filter. To delete all
   *      of the documents in a collection, pass an empty filter to
   *      the DeleteMany() method. In this example, we'll delete two of
   *      the recipes.
   */


  // const deleteQuery = { receiver: "Jan Cox" };
  // try {
  //   const deleteResult = await collection.deleteOne(deleteQuery);
  //   console.log(`Deleted ${deleteResult.deletedCount} documents\n`);
  // } catch (err) {
  //   console.error(`Something went wrong trying to delete documents: ${err}\n`);
  // }

// Make sure to call close() on your client to perform cleanup operations
   await client.close();
 }
run().catch(console.dir);
