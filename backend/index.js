const express = require("express");
const { MongoClient } = require('mongodb');
const app = express();

// Replace the following with your MongoDB connection string
const url = 'mongodb+srv://NaveenAkash:09naveen@cluster0.3n8lzcq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'outpass';  // Replace with your database name
const collectionName = 'passes'; // Replace with your collection name

async function updateExpiredDocumentsWithStatus(update) {
    const client = new MongoClient(url);
  
    try {
      // Connect to MongoDB
      await client.connect();
      console.log('Connected to the database');
  
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
  
      // Get the current date and time
      const currentTime = new Date();
  
      // Find documents where 'expectedIn' is a string but represents a date in the past
      const documents = await collection.find({
        status: 'Used',
        isActive: true
      }).toArray();

      let matchedCount = 0;
      let modifiedCount = 0;

      for (let doc of documents) {
        // Convert 'expectedIn' string to a Date object
        const expectedInDate = new Date(doc.expectedIn);

        if (expectedInDate < currentTime) {
          // Update document if 'expectedIn' is in the past
          const result = await collection.updateOne({ _id: doc._id }, { $set: update });
          matchedCount += result.matchedCount;
          modifiedCount += result.modifiedCount;
        }
      }
  
      console.log(`${matchedCount} document(s) matched the query criteria.`);
      console.log(`${modifiedCount} document(s) were updated.`);
    } catch (err) {
      console.error("Error: ", err);
    } finally {
      await client.close();
    }
}
  
// Example usage
app.get("/update", async (req, res) => {
  // const update = { status: 'Used', entryScanAt:new Date().toISOString(), entryScanBy:"sec_1" }; // Fields to update
  const update = {isActive: false }; // Fields to update

  await updateExpiredDocumentsWithStatus(update);
  res.send("Update operation completed");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
