// Simple simulation of OpenAI's chat completions and CSV parsing in JavaScript

// Sample products data (normally loaded from a CSV file)
const products = [
  {
    displayTitle: "iPhone 12",
    embeddingText: "Apple smartphone",
    price: "999",
  },
  {
    displayTitle: "Samsung Galaxy S21",
    embeddingText: "Samsung smartphone",
    price: "799",
  },
];

// Function to search for products based on the query
async function searchProducts(query) {
  return products
    .filter(
      (product) =>
        product.displayTitle.toLowerCase().includes(query.toLowerCase()) ||
        product.embeddingText.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 2);
}

// Function to convert currency
async function convertCurrency(amount, from, to) {
  const rates = { EUR: 0.85, USD: 1 }; // Example exchange rates
  return rates[to] / rates[from];
}

// Function to handle the chat query
async function handleChat(query) {
  const messages = [
    { role: "system", content: "You are a helpful assistant" },
    { role: "user", content: `This is the user request: ${query}.` },
  ];

  const response = {
    choices: [
      {
        message: {
          tool_calls: [
            query.includes("convert")
              ? {
                  function: {
                    name: "convertCurrency",
                    arguments: JSON.stringify({
                      amount: 100,
                      from: "USD",
                      to: "EUR",
                    }),
                  },
                }
              : {
                  function: {
                    name: "searchProducts",
                    arguments: "smartphone",
                  },
                },
          ],
        },
      },
    ],
  };

  const toolCall = response.choices[0]?.message?.tool_calls?.[0];
  const functionName = toolCall?.function.name;
  const args = toolCall?.function.arguments;

  if (functionName === "searchProducts") {
    const products = await searchProducts(args);
    messages.push({
      role: "system",
      content: `You executed the tool ${functionName} and found the following product information: ${JSON.stringify(
        products
      )}.`,
    });
    //Here it should be excecuted the fourth step and gets the following message
    const response2 = `I found the following product that fits your requirements: ${products[0].displayTitle} - $${products[0].price} USD`;
    //The function returns the final response
    return response2;
  } else if (functionName === "convertCurrency") {
    const convertedAmount = await convertCurrency(
      args.amount,
      args.from,
      args.to
    );
    return `Converted ${args.amount} ${args.from} to ${convertedAmount} ${args.to}.`;
  }

  return "No tool executed";
}

// Example usage

handleChat("I am looking for a smartphone").then(console.log);
handleChat("Convert 100 USD to EUR").then(console.log);
