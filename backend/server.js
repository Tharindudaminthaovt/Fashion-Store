const express = require("express");
const cors = require("cors");
const itemsRoutes = require("./routes/itemroutes");
const WishlistRoutes = require("./routes/wishlistRoutes");
const hashroute = require("./routes/hashgen");
const aboutusRoute = require("./routes/aboutusroute");
const notifroute = require("./routes/statuscoderoute");
const testroutes = require("./routes/testroutes");
const mongoose = require("mongoose");
const Item = require("./models/item");
const Test = require("./models/testt");
const WishListItemRoutes = require("./routes/wishlistItemRoutes");
const connectDB = require("./db");
const tailorroute = require("./routes/tailorRoutes");
const placeOrderRoutes = require("./routes/orderroutes");
const outfitRoutes = require("./routes/outfitroutes");
const authRoutes = require("./routes/auth.user.route");
const Currabus = require("./routes/currentaboutusRoute");
const blogRoutes = require("./routes/blog.route");

console.log("Item model imported:", Item);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')


const http = require("http"); // http module for WebSocket integration
const socketIo = require("socket.io");

// Create an Express app
const app = express();

// Create HTTP server and attach it to the app
const server = http.createServer(app); // This is required to support WebSockets

// Export the app early

// Middleware for JSON and CORS
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000"],
};

app.use(cors(corsOptions));
//add cookie parser middleware

// MongoDB connection setup
const mongoURL =
  process.env.NODE_ENV === "test"
    ? process.env.testDBURL
    : process.env.mongoURL;

connectDB(mongoURL);
console.log("Attempting MongoDB connection...");

mongoose.connect(mongoURL);
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected (Event: connected)");
});

//mongoose.connection.once('open', () => {
//console.log('MongoDB connected (Event: open)');
//});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error (Event: error):", err);
});

// Attach socket.io to the HTTP server
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // React frontend URL
    methods: ["GET", "POST"],
  },
  pingInterval: 25000, // Ping every 25 seconds
  pingTimeout: 20000, // Timeout after 20 seconds if no ping is received
});

// Attach WebSocket instance to all requests
let isWebSocketLogged = false; // Track whether the log message has been printed

app.use((req, res, next) => {
  if (!isWebSocketLogged) {
    console.log("WebSocket instance attached to req.io");
    isWebSocketLogged = true;
  }
  req.io = io;
  next();
});

// Routes
app.get("/", (req, res) => res.send("Server working"));
app.use("/api/items/", itemsRoutes);
app.use("/api/wishlist/", WishlistRoutes);
app.use("/api/wishlistItem/", WishListItemRoutes);
app.use("/h", hashroute);
app.use(notifroute);
app.use(testroutes);
app.use("/api/tailors/", tailorroute);
app.use("/api/currab/", Currabus);
app.use("/api/aboutus/", aboutusRoute);
app.use("/api/placeorder/", placeOrderRoutes);
app.use("/api/outfits/", outfitRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/blog/", blogRoutes);

// Test route
app.get("/create-item", async (req, res) => {
  try {
    console.log("test reached");
    const newtest = new Test({
      test: "Casual Hoodie",
      description: "Comfortable hoodie perfect for casual wear.",
    });

    await newtest.save();
    res.json({ message: "Item created successfully!" });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Export the app (without WebSocket and HTTP server logic)
module.exports = app;

// The WebSocket and HTTP server logic
//if (require.main === module) {
//const http = require("http"); // HTTP module for WebSocket integration
//const socketIo = require("socket.io"); // socket.io for WebSocket support

// Create HTTP server and attach it to the app
//const server = http.createServer(app); // Required to support WebSockets

// Attach socket.io to the HTTP server

// WebSocket event handling
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.emit("server message", "Hello World");

  socket.on("client message", (msg) => {
    console.log("Server received: '" + msg + "'");
  });

  socket.on("request", (msg) => {
    console.log("Received from client:", msg);
    socket.emit("response", "Server received: " + msg);
    socket.broadcast.emit("response", "Message to other clients.");
  });

  // Send a confirmation message to the client when they connect
  socket.emit("confirm connection", "Connected...");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const port = process.env.PORT || 5000;

// Start the HTTP server on port 5000
server.listen(port, "0.0.0.0", () => {
  console.log("Server running on http://localhost:5000");
});
