const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
const { products } = require("./data");
const app = express();
require("dotenv").config();

//key

const key_id = "rzp_test_qUPrHECnMlJiNj";
const key_secret = "P6BFQtqeg48bpFWC9eci2u4t";

const instance = new Razorpay({
  key_id,
  key_secret,
});

app.use(cors());
app.use(express.json());

app.get("/products", (req, res) => {
  res.status(200).json(products);
});

app.get("/", (req, res) => {
  res.send("App is Running...");
});

app.get("/order/:productId", (req, res) => {
  const { productId } = req.params;
  const product = products.find((product) => product.id == productId);
  //rupees 100 dollar 70
  const amount = product.price * 100 * 70;
  const currency = "INR";
  const receipt = "receipt#123";
  const notes = { desc: product.description };

  instance.orders.create(
    { amount, currency, receipt, notes },
    (error, order) => {
      if (error) {
        return res.status(500).json(error);
      }
      return res.status(200).json(order);
    }
  );
});

app.post(`/verify/signature`, (req, res) => {
  console.log(JSON.stringify(req.body));
  const crypto = require("crypto");
  const sha256 = crypto
    .createHash("HMAC-SHA256", "jaganmohan")
    .update(JSON.stringify(req.body))

    .digest("hex");
  console.log(hash);
  console.log(req.headers["x-razorpay-signature"]);
  if (hash === req.headers["x-razorpay-signature"]) {
    //save payment info in database for future reference
  } else {
    //decline payment
  }
  res.status(200);
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`server running on port` + 8000);
});
