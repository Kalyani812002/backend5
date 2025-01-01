const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Item = require('./models/Item');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/piechartdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Route to get pie chart data for a selected month (ignore year)
app.post('/api/piechart', async (req, res) => {
  const { month } = req.body;  // Expecting month as a number (1-12)

  try {
    // Get items for the selected month, regardless of the year
    const items = await Item.aggregate([
      {
        $project: {
          category: 1,
          month: { $month: "$date" }
        }
      },
      {
        $match: { month: month }
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }
    ]);

    // Send the result back as JSON
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
