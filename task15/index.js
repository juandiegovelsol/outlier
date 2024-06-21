import express from "express";
const app = express();
app.use(express.json());

let validData = {};
let orders = [
  { id: 1, productId: "product1", quantity: 2, price: 10.99 },
  { id: 1, productId: "product2", quantity: 1, price: 5.99 },
  { id: 1, productId: "product3", quantity: 3, price: 15.99 },
  { id: 1, productId: "product3", quantity: 3, price: 15.99 },
  { id: 1, productId: "product3", quantity: 3, price: 15.99 },
  { id: 1, productId: "product3", quantity: 3, price: 15.99 },
  { id: 1, productId: "product3", quantity: 3, price: 15.99 },
  { id: 1, productId: "product3", quantity: 3, price: 15.99 },
  { id: 1, productId: "product3", quantity: 3, price: 15.99 },
  { id: 1, productId: "product3", quantity: 3, price: 15.99 },
  { id: 1, productId: "product3", quantity: 3, price: 15.99 },
  { id: 1, productId: "product3", quantity: 3, price: 15.99 },
  { id: 1, productId: "product3", quantity: 3, price: 15.99 },
  { id: 1, productId: "product3", quantity: 3, price: 15.99 },
  { id: 2, productId: "product4", quantity: 2, price: 10.99 },
  { id: 2, productId: "product5", quantity: 1, price: 5.99 },
  { id: 2, productId: "product6", quantity: 3, price: 15.99 },
  { id: 3, productId: "product7", quantity: 2, price: 10.99 },
  { id: 3, productId: "product8", quantity: 1, price: 5.99 },
  { id: 3, productId: "product9", quantity: 3, price: 15.99 },
];

app.post("/process-data", (req, res) => {
  try {
    const datasets = req.body.userData;
    const invalidData = [];

    datasets.forEach((dataset) => {
      if (!dataset.id) {
        console.error('Error: Dataset missing "id" field');
        invalidData.push({
          message: 'Error: Dataset missing "id" field',
        });
        return;
      }
      if (!Array.isArray(dataset.timestamp) || !dataset.value) {
        console.error(
          `Error: Dataset with id ${dataset.id} does not have proper array structures`
        );
        invalidData.push({
          message: `Error: Dataset with id ${dataset.id} does not have proper array structures`,
        });
        return;
      }
      if (validData[dataset.id]) {
        invalidData.push({
          message: `Data with id ${dataset.id} already exists. Please try another one`,
        });
      } else {
        validData[dataset.id] = {
          uid: dataset.id,
          time: dataset.timestamp,
          values: dataset.value,
        };
      }
    });

    console.log("Saving data:", Object.keys(validData).length);
    res.status(200).json({ validData, invalidData });
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/get-data", (req, res) => {
  res.json(validData);
});

app.get("/get-orders/:id", (req, res) => {
  try {
    const id = req.params.id;
    const quantity = req.query.quantity;

    if (!id) {
      res.status(400).json({ error: "User id is required" });
      return;
    }

    let userOrders = orders.filter((order) => order.id == id);

    if (quantity) {
      let qty = parseInt(quantity);
      if (qty < 1) {
        qty = 1;
      } else if (qty > 10) {
        qty = 10;
      }
      userOrders = userOrders.slice(0, qty);
    }

    res.json(userOrders);
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || "3000";
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
