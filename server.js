const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public')); // put your files in a folder named "public"

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
