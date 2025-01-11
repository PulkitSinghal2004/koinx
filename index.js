const express = require('express');
const app = express();
const port = process.env.PORT || 3001
const dotenv = require("dotenv")
dotenv.config();

const axios = require('axios');
const cron = require('node-cron');

const connection = require("./db/conn");
const Crypto = require("./model/crypto.model");

// Fetch and store cryptocurrency data using Axios and Cron
async function fetchData(coin) {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}`);
        const data = response.data;

        const cryptoData = {
            coin,
            price: data.market_data.current_price.usd,
            marketCap: data.market_data.market_cap.usd,
            '24hChange': data.market_data.price_change_percentage_24h,
        };

        // Save data to MongoDB
        const newCrypto = new Crypto(cryptoData);
        await newCrypto.save();

        console.log(`Data for ${coin} updated successfully.`);
    } catch (error) {
        console.error(`Error fetching data for ${coin}:`, error);
    }
}

// Schedule data fetching for each coin every minute
cron.schedule('*/1 * * * *', () => {
    fetchData('bitcoin'); 
    fetchData('ethereum'); 
    fetchData('dogecoin'); 
});

// API endpoint to get latest stats
app.get('/stats', async (req, res) => {
    try {
        const coin = req.query.coin;
        if (!coin) {
            return res.status(400).json({ error: 'Missing coin parameter' });
        }

        const latestData = await Crypto.findOne({ coin }).sort({ timestamp: -1 }).lean(); 

        if (!latestData) {
            return res.status(404).json({ error: `No data found for ${coin}` });
        }

        res.json(latestData);
    } catch (error) {
        console.error('Error getting stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});