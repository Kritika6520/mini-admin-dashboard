const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
 
    console.log("Connected to:", mongoose.connection.name);
    const existing = await User.findOne({
        email: "admin@test.com"
    });

    if(existing){
        console.log("Admin already exists");
        process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123",10);

    await User.create({
        name:"Admin",
        email:"admin@test.com",
        password:hashedPassword,
        role:"Admin"
    });

    console.log("✅ Admin Created");

    process.exit();

})
.catch(console.log);