const express = require("express");
const app= express();
const PORT = process.env.port || 3000;

app.get("/", (req,res) => {
    res.send("Selam Bebek");
});

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
})