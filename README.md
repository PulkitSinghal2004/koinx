Crypto Stats API
Node.js server with MongoDB for fetching and storing cryptocurrency data.

Features:-
Fetches real-time prices from an external API.
Stores data in MongoDB.
Provides API endpoint /stats/:symbol for retrieving data.
Returns data in JSON format.

Setup:-
Clone repo.
npm install
Configure MongoDB connection in server.js.

Run:-
node server.js
Make GET requests to /stats/:symbol (e.g., /stats/btc).

Example Response:-
JSON

{
  "name": "Bitcoin",
  "symbol": "BTC",
  "price": 42345.67, 
  "lastUpdated": "2023-01-10T23:59:00.000Z" 
}
