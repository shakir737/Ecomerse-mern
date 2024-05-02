const mongoose = require("mongoose"); // Erase if already required

var stateSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        country:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Country",
            },
        
        status : {
            type: Boolean,
            default: "false",
        }
    }
)
module.exports = mongoose.model("State", stateSchema);