const app = require("./src")
require("dotenv").config()

const PORT = process.env.PORT

app.listen(PORT, () =>{
    console.log(`Server running on port http://localhost:${PORT}`);
})