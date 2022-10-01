const Express = require("express");

const app = Express();
const port = 8080;

function keepAlive() {

app.get("/", (req, res) => {
    res.send("Logging Dms")
});
app.listen(port, () => console.log("Application is listening on port: " + port))

}

module.exports = keepAlive;