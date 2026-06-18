import "dotenv/config";

import app from "./app.js";

const port = Number(process.env.PORT || 3000);

app.listen(port, () => {
  console.log(`Booking API is running on http://localhost:${port}`);
});

