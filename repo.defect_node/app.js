const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const defectValidatorRouter = require("./src/javascript/routes/defectValidatorRoutes");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  logger(
    ":date[iso] :method :url :status :response-time ms - :res[content-length]"
  )
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.options("*", cors());

app.use(express.static(path.join(__dirname, "public")));
app.use("/dashboard", defectValidatorRouter);
app.use((req, res, next) => {
  res.status(404).send({ error: "Not found" });
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).send({ error: err });
});

module.exports = app;
