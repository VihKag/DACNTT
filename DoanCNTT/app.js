const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const config = require("config");
const expressLayouts = require('express-ejs-layouts');

const appController = require("./controllers/appController");
const isAuth = require("./middleware/is-auth");
const connectDB = require("./config/db");
const mongoURI = config.get("mongoURI");

const app = express();
connectDB();

const store = new MongoDBStore({
  uri: mongoURI,
  collection: "mySessions",
  collection: "Book",
});

app.use(expressLayouts);

app.set("view engine", "ejs");
app.set('views', 'views');
app.set('layout', 'master');
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

//=================== Routes
app.use(express.static(__dirname +'/public'));


// Landing Page
app.get("/",appController.landing_page);

// Login Page
app.get("/login", appController.login_get);
app.post("/login", appController.login_post);

// Register Page
app.get("/register", appController.register_get);
app.post("/register", appController.register_post);

// Dashboard Page
app.get("/dashboard", isAuth, appController.dashboard_get);

// Colections page
app.get("/collections", appController.collections_get);
app.get("/collections/khoagiao", appController.collections_getKG);
app.get("/collections/truyen", appController.collections_getTT);
app.get("/collections/vanhoc", appController.collections_getVH);
app.get("/collections/kinhte", appController.collections_getKT);
app.get("/collections/nxbhn", appController.collections_gethn);
app.get("/collections/nxbkd", appController.collections_getkd);
app.get("/collections/nxbtn", appController.collections_gettn);
app.get("/collections/nxbtr", appController.collections_gettr);

// product page
app.get("/collections/product", appController.product_get);

// cart page
app.get("/cart", appController.cart_get);

// order page
app.get("/order", appController.order_get);

app.post("/logout", appController.logout_post);

app.listen(3000, console.log("App Running on http://localhost:3000"));
