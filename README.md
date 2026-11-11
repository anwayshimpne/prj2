# Dealer Evaluation final project

A small, integrated product and dealer evaluation app matching the course assignment:

- **Product Details** — Python/Flask API (`product-details/`)
- **Dealer Pricing** — Node.js/Express API (`dealer-pricing/`)
- **Dealer Evaluation** — static frontend (`frontend/`)

The three services are independently containerized and listen on port `8080`, making them suitable for deployment as separate IBM Cloud Code Engine applications.

## Run locally

Run each service in a separate terminal:

```bash
cd product-details
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

```bash
cd dealer-pricing
npm install
npm start
```

Serve the frontend with any static web server, for example:

```bash
cd frontend
python -m http.server 8080
```

The frontend starts with API URL placeholders. After deploying the two APIs, replace `PRODUCT_DETAILS_API_URL` and `DEALER_PRICING_API_URL` in `frontend/index.html` with their public Code Engine URLs (origin only, without an API path), then deploy/redeploy the frontend. The browser must be able to reach both APIs over HTTPS.

## API routes

- Product service: `GET /api/products`, `GET /api/products/<product_id>`, `GET /health`
- Dealer service: `GET /api/dealers?product_id=<product_id>`, `GET /health`

Both services include CORS support for browser requests. The sample catalog and dealer offers are in-memory demo data; they are not connected to a database.

## Deploy on Code Engine

Create/select a Code Engine project and deploy each service as its own application from its directory using the included `Dockerfile`. Configure the application to listen on port `8080` and expose it publicly. Deploy `product-details/` and `dealer-pricing/` first; copy their generated public URLs into the frontend constants; then build and deploy `frontend/` as a public application. Confirm the APIs are reachable at their `/health` and `/api/...` routes and test the frontend using its generated URL.

The assignment asks for screenshots of deployments and UI states. Those screenshots must be captured from your own Code Engine project after deployment; they are not included here.
