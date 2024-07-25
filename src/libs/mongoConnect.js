import { MongoClient } from "mongodb" // Import MongoClient class

if (!process.env.MONGO_URL) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"') // Ensure the MongoDB URI is provided
}

const uri = process.env.MONGO_URL
const options = {}

let client
let clientPromise

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect() // Store the connection promise globally in development
  }
  clientPromise = global._mongoClientPromise // Reuse the global promise in development
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect() // Create a new connection promise for production
}

export default clientPromise // Export the promise for use in other parts of the app
