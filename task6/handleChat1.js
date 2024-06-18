const products = [
  {
    displayTitle: "iPhone 12",
    embeddingText: "Apple Smartphone",
    price: "999",
  },
  {
    displayTitle: "Samsung Galaxy S21",
    embeddingText: "Samsung Smartphone",
    price: "799",
  },
];

async function searchProducts(query) {
  return products
    .filter(
      (product) =>
        product.displayTitle.includes(query) ||
        product.embeddingText.includes(query)
    )
    .slice(0, 2);
}

// Function to handle the chat query
async function handleChat(query) {
  //this is the first step
  const messages = [
    { role: "system", content: "You are a helpful assistant" },
    { role: "user", content: `This is the user request: ${query}.` },
  ];
  //Here is pupposed to excecute the 2 step and gets the following response.
  const response = JSON.stringify({
    choices: [
      {
        message: {
          tool_calls: [
            {
              function: {
                name: "searchProducts",
                arguments: "smartphone",
              },
            },
          ],
        },
      },
    ],
  });

  //Excecutes the third step
  const toolCall = JSON.parse(response).choices?.message?.tool_calls;
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
  }

  return "No tool executed";
}

handleChat("I am looking for a smartphone").then(console.log);
