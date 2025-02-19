const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb+srv://raccoonop0016:Ashish123@cluster0.cn9bt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Database Connected Successfully');
    app.listen(5004, () => {
        console.log('Server running on http://localhost:5004');
    });
})
.catch(err => console.log('Database Connection Error:', err));

app.use(userRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

app.use((req, res) => {
    res.status(404).json({ error: 'Route Not Found' });
});



