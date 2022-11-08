let express = require('express');
const multer  = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
let cors = require('cors');
require('dotenv').config()

let app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) return res.json({Error: "Please select a file to upload."});
  const { originalname, mimetype, size } = req.file;
  res.json({name: originalname, type: mimetype, size: size});
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
