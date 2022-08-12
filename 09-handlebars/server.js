const express = require('express')
const handlebars = require('express-handlebars')

const app = express()
const port = 4000 || process.env.PORT

app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs', 
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials'
    })
)

app.set('view engine', 'hbs')
app.set('views', './views')

app.use(express.static('public'))

fakeApi=()=>[
    {name:'Katarina', lane:'midlaner'},
    {name:'Jayce', lane:'toplaner'},
    {name:'Heimerdinger', lane:'toplaner'},
    {name:'Jayce', lane:'midlaner'},
    {name:'Azir', lane:'midlaner'}
];

app.get('/', (req, res) => {
    res.render('main', {listExist: true, list: fakeApi()});
})

app.listen(4000, (err) => {
    if (err) throw new Error(`Error on server: ${err}`)
    console.log(`Server is running on port ${port}`)
})