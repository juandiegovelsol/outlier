/**
 * Fetches data from the given URL using the Fetch API.
 * @param {string} url - The URL to fetch data from.
 */
function fetchData(url) {
  // Use the Fetch API to send a GET request to the given URL.
  return fetch(url)
    .then((response) => {
      // Check if the response is OK (200-299) and parse the response data as JSON.
      return response.json();
    })
    .then((data) => {
      // Log the parsed data to the console.
      console.log(data);
      return data; // Return the data for further processing.
    })
    .catch((error) => {
      // Log any errors that occur during the fetch process.
      console.error("Error:", error);
    });
}

export default fetchData;
