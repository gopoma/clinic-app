const compression = require("compression");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const doDBConnection = require("./database");
const express = require("express");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");

const { development, port } = require("./config");
const auth = require("./routes/auth");

// Starting express app
const app = express();
app.enable("trust proxy");
doDBConnection();


// Development logging
if(development) {
    app.use(morgan("dev"));
}


// Implementing CORS
app.use(cors());

// Set security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Demasiadas solicitudes de esta IP, inténtelo de nuevo en una hora",
    legacyHeaders: false
});
app.use(limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use(compression());


app.get("/", (req, res) => {
    return res.json({
        name: "clinic-app",
        version: "1.0.0",
        author: "Gustavo Eduardo Ordoño Poma"
    });
});

// Routes
auth(app);

app.all("*", (req, res) => {
    return res.status(404).json({
        success: false,
        messages: [`No se pudo encontrar ${req.originalUrl} en este servidor!`]
    });
});


app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`Listening on port ${port}`);
});
