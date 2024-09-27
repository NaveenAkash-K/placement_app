const app = require("express")();

let counter = 0;
app.get("/performance/evaluation", (req, res) => {
    console.log("Request " + (counter++) + " successful");
    res.send()
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})