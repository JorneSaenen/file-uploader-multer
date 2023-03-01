import express from 'express';
import multer from 'multer';
const app = express();
import path from 'path';

//
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));
app.use(express.json());

// Geef gegevens mee aan multer om de file op te slaan
const storage = multer.diskStorage({
  // relatief ten opzichte van de root van het project
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  // Geef de file een unieke naam
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);

    cb(null, name + '-' + Date.now() + ext);
  },
});

// Geef de storage mee aan multer
const upload = multer({ storage: storage });

// Maak een middleware aan om de file te uploaden ( single = 1 file, array = meerdere files )
const middlewareUpload = upload.single('image');

// Render de index.ejs
app.get('/', (req, res) => {
  res.render('index', { pageTitle: 'Upload' });
});

// Upload de file post route
app.post('/upload', middlewareUpload, (req, res) => {
  try {
    res.json({ file: req.file });
  } catch (error) {
    console.error(error);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
