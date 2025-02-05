MF to ETF Backend – Project Description
📌 Overview
The MF to ETF Backend is a FastAPI-based system that compares Mutual Funds (MFs) with potential Exchange Traded Fund (ETF) alternatives. It fetches historical price data, sentiment scores, and correlation values to recommend ETFs similar to the input mutual fund. The API is designed to provide accurate, data-driven insights to investors.

🛠️ Features
✅ Historical Price Analysis – Fetches up to 3 years of price data for mutual funds and ETFs.
✅ Correlation Calculation – Finds ETFs with price movements similar to the input MF.
✅ Sentiment Analysis – Uses Natural Language Processing (NLP) to assess market sentiment based on news articles.
✅ Alpha Vantage & Yahoo Finance API – Retrieves real-time financial data.
✅ Ranking Algorithm – ETFs are ranked based on correlation & sentiment alignment.
✅ FastAPI for Performance – Provides a lightweight, high-speed API for ETF comparisons.
✅ CORS Middleware – Allows cross-origin requests, enabling frontend integration.
✅ Ngrok Integration – Exposes the API publicly for testing & deployment.

⚙️ Tech Stack
Backend Framework: FastAPI
Data Sources: Yahoo Finance API, Alpha Vantage API, NewsAPI
Machine Learning/NLP: NLTK (VADER Sentiment Analysis)
Data Processing: Pandas, NumPy
Deployment: Ngrok (for public API access)
🔍 How It Works
1️⃣ User sends a request with a mutual fund ticker (e.g., VTSAX).
2️⃣ System fetches mutual fund price history & calculates sentiment.
3️⃣ ETFs with similar price range are retrieved & ranked based on correlation & sentiment.
4️⃣ Top ETF alternatives are returned as a JSON response.

🚀 API Endpoint
🔹 GET /compare/{mf_ticker} – Returns a list of ETF alternatives sorted by total score.

This backend is designed for high-performance financial data analysis and can be integrated into investment apps, trading bots, or market research tools. 🚀🔥
