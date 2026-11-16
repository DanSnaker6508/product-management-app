const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(
    express.static(
        path.join(__dirname, "public")
    )
);

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
    res.redirect("/login.html");
});

module.exports = app;