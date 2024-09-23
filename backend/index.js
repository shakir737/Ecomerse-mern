const bodyParser = require("body-parser");
const express = require("express");
const compression = require("compression");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 6000;
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const blogRouter = require("./routes/blogRoute");
const categoryRouter = require("./routes/prodcategoryRoute");
const blogcategoryRouter = require("./routes/blogCatRoute");
const brandRouter = require("./routes/brandRoute");
const StatesRouter = require("./routes/statesRoute");
const CitiesRouter = require("./routes/citiesRoute");
const CountriesRouter = require("./routes/countriesRoute");
const productcategoryRouter = require("./routes/prodcategoryRoute");
const colorRouter = require("./routes/colorRoute");
const enqRouter = require("./routes/enqRoute");
const couponRouter = require("./routes/couponRoute");
const orderRouter = require("./routes/orderRoute");
const uploadRouter = require("./routes/uploadRoute");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const { authMiddleware } = require("./middlewares/authMiddleware");
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
cloudinary.config({
  cloud_name: "ds89lej3j",
  api_key: "377267562544887",
  api_secret: "2ajdov-hm1YUh2R5EypgM2Jf1_Y",
});
const whitelist = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
];
app.options(cors());
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

// app.use(cors({
//   origin: "http://localhost:3001"
// }) );
app.use(morgan("dev"));
dbConnect();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(
  compression({
    level: 6,
    threshold: 0,
  })
);
app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blogcategory", blogcategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/color", colorRouter);
app.use("/api/enquiry", enqRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/category", productcategoryRouter);
app.use("/api/States", StatesRouter);
app.use("/api/Countries", CountriesRouter);
app.use("/api/Cities", CitiesRouter);
app.use("/api/orders", orderRouter);
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;

  // console.log(amount);

  // Create a PaymentIntent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running  at PORT ${PORT}`);
});
