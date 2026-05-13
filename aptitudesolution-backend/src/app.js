const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const pinoHttp = require("pino-http");
const swaggerUi = require("swagger-ui-express");

const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./utils/logger");
const swaggerSpec = require("./config/swagger");
const { env, cors: corsCfg } = require("./config/env");

const app = express();

// Logging with Pino
app.use(pinoHttp({ logger }));

// Serve static files
app.use("/public", express.static("public"));

// API Documentation
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use("/api", limiter);

// Security Middlewares
app.use(helmet());
app.use(compression()); // Compress all responses
app.use(hpp());

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// CORS configuration
const corsOptions = {
  origin: corsCfg.origins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Root route
app.get("/", (req, res) => {
  res.send("Express + Prisma API running 🚀");
});

// API Routes
app.use("/api/v1", routes);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;