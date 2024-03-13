const mongoose = require("mongoose"); // Erase if already required

var countrySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        status : {
            type: Boolean,
            default: "false",
        }
    }
)
module.exports = mongoose.model("Country", countrySchema);