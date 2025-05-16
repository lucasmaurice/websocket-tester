var path = require("path");
var express = require("express");

var app = express();

var PORT = 8080;

app.use(express.static(path.join(__dirname, "dist")));

// Add a route that always return 200 for pod health check
app.get("/-/health", function (req, res) {
  res.status(200).send("OK");
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.listen(PORT, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  }
});
