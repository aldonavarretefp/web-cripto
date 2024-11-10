const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Serve the ACME challenge file
app.get('/.well-known/acme-challenge/:file', (req, res) => {
  const filePath = path.join(__dirname, '.well-known/acme-challenge', req.params.file);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('File not found');
  }
});

app.post('/.well-known/acme-challenge/:file', (req, res) => {
  // Read content from resource in url
  const fileContent = req.body;
  // Write the file to the server
  const filePath = path.join(__dirname, '.well-known/acme-challenge', req.params.file);
  fs.writeFileSync(filePath, fileContent);
  res.send('File saved');
})


const PORT = 80; // Use 80 for HTTP
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

