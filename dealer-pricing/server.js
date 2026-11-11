const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const OFFERS = [
  { id: 'd1', name: 'Central Electronics', location: 'Chicago, IL', products: { '1': 879.00, '2': 779.00, '4': 329.99 } },
  { id: 'd2', name: 'Best Tech Supply', location: 'Austin, TX', products: { '1': 889.50, '2': 789.99, '3': 579.00 } },
  { id: 'd3', name: 'Citywide Devices', location: 'New York, NY', products: { '1': 865.99, '3': 589.99, '4': 339.00 } },
  { id: 'd4', name: 'Universal Gadgets', location: 'Seattle, WA', products: { '2': 769.00, '3': 565.00, '4': 319.50 } },
];

app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'dealer-pricing' }));
app.get('/api/dealers', (req, res) => {
  const productId = String(req.query.product_id || '');
  if (!productId) return res.status(400).json({ error: 'product_id query parameter is required' });
  const dealers = OFFERS.filter(dealer => Object.hasOwn(dealer.products, productId))
    .map(({ products, ...dealer }) => ({ ...dealer, product_id: productId, price: products[productId] }));
  return res.json(dealers);
});

const port = Number(process.env.PORT || 8080);
app.listen(port, '0.0.0.0', () => console.log(`Dealer pricing service listening on ${port}`));
