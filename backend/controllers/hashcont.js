const md5 = require("crypto-js/md5");

const merchantId = "1228344";
const merchantSecret =
  "MTcxNjYzOTYzNTMzMDAyOTM1MTcxMTExMjg4NTE5NDEzNzUwMTU2MQ=="; // Keep this secret

const orderId = "Order002";
const amount = "600";
const currency = "LKR";

const generateHash = (req, res) => {
  // const { orderId, amount, currency } = req.body;

  // Format the amount
  const amountFormatted = parseFloat(amount)
    .toLocaleString("en-US", {
      minimumFractionDigits: 2,
    })
    .replaceAll(",", "");

  // Generate the hash using the provided data and the merchant secret
  const hash = md5(
    merchantId + orderId + amountFormatted + currency + merchantSecret
  )
    .toString()
    .toUpperCase();

  // Send the hash back to the frontend
  res.json({ hash });
  console.log("hash doneeeeeeeeeeeee");
  const { order_id } = req.body; // Extract the order_id
  console.log("Received order_id:", order_id);
};

module.exports = {
  generateHash,
};
