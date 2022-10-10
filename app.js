const express = require("express")
const mongoose = require('mongoose')
const path = require('path');
const Campground = require('./models/campground')

const app = express();

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
})


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.listen(3000, () => {
    console.log("listening on port 3000")
})

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
})

app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/show', { campground })
})

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({title: 'My Backyard', description: 'cheap camping'})
    await camp.save()
    res.send(camp)
})