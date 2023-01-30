require('dotenv').config()

const express = require('express');
const compression = require('compression')
const mongoose = require("mongoose");
const cors = require("cors")
const userRoutes = require('./routes/user')
const blogRoutes = require('./routes/blogs')
const draftRoutes = require('./routes/drafts')

// express app
const app = express();
app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:4000", "https://techstuf.vercel.app"],
        credentials: true,
    })
);

app.use(compression());
app.use(express.json());

// //connect database
mongoose.connect(process.env.MDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connect to database successfully and listening on port', process.env.PORT);
        })
    })
    .catch((err) => console.log(err));

app.use(express.static('public'))
app.use("/uploads", express.static('./uploads'))

app.get("/", (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname });
});

// // users routes
app.use("/user", userRoutes)

// // blogs routes
app.use("/blogs", blogRoutes)


// // drafts routes
app.use("/blogs/draft", draftRoutes)




