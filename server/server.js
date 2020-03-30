const express = require("express");
const app = express();
const path = require("path");

// for routing to the index.html
app.use(express.static(path.resolve(__dirname, "../client")));

app.get("/", (req, res) => {
  res.sendFile("demo.html");
});
// connecting to our router
app.use("/", routes);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
