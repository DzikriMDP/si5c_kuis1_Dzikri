require("dotenv").config();

const express = require("express");
const cors = require("cors");

const logger = require("./middlewares/logger");

const {
  notFoundHandler,
  errorHandler
} = require("./middlewares/errorHandler");

const songRoutes = require("./routes/songRoutes");
const cekApiKey = require("./middlewares/cekApiKey");

const app = express();

const PORT = process.env.PORT || 3000;

// ---------- Middleware global ----------

app.use(logger);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);

app.use(express.json());

// ---------- Route dasar ----------

app.get("/", (req, res) => {
  res.json({
    nama: "Dzikri Cahayadi Alamsyah",
    nim: "2428240126",
    topik: 15,
    kategori: "Musik",
    resource: "Lagu",
    endpoints: [
      "GET /songs",
      "GET /songs/:id",
      "GET /songs?artis=Senandung",
      "POST /songs",
      "PUT /songs/:id",
      "DELETE /songs/:id"
    ]
  });
});

// ---------- Route Lagu ----------

app.use(
  "/songs",
  cekApiKey,
  songRoutes
);

// ---------- Handler 404 ----------

app.use(notFoundHandler);

// ---------- Error Handler ----------

app.use(errorHandler);

// ---------- Server ----------

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(
      `Server berjalan di http://localhost:${PORT}`
    );
  });
}

module.exports = app;