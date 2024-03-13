const mongoose = require("mongoose"); // Erase if already required

var citySchema = new mongoose.Schema(
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
        state:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "State",
            },
        status : {
            type: Boolean,
            default: "false",
        }
    }
)
module.exports = mongoose.model("City", citySchema);