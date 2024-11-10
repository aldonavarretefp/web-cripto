const express = require('express');
const fs = require('fs');
const path = require('path');
var bodyParser = require('body-parser')
const app = express();



app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Serve the ACME challenge file
app.get('/.well-known/acme-challenge/:file', (req, res) => {

  // Cut till the first dot
  try {
    const fileName = req.params.file.split('.')[0];
    // Check if the file is in the directory
    const filePath = path.join(__dirname, '.well-known/acme-challenge', fileName);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send('File not found');
    }
  } catch (error) {
    res.status(500).send('Internal server error');
  }
  
});

app.post('/.well-known/acme-challenge/:file', (req, res) => {
  // Read content from resource in url
 try { 
  const fileContent = req.body.fileContent;

  // Cut till the first dot
  const fileName = req.params.file.split('.')[0];
  console.log({fileName});

  // Write content to file
  const filePath = path.join(__dirname, '.well-known/acme-challenge', fileName);
  fs.writeFileSync(filePath, fileContent);
  res.send('File created successfully');
 } catch (error) {
   res.status(500).send('Internal server error');
 }

})


const PORT = 80; // Use 80 for HTTP
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

