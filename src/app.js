const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();


app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

app.listen(app.get('port'), function() {
    console.log('listening on port http://localhost:' + app.get('port'))
})

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({extended: true}))

app.get('/', function (req,res) {
   fetch('https://the-cocktail-db.p.rapidapi.com/popular.php', {
       method: 'GET',
       headers: {
           'Content-type': 'application/json'
       }
   })
   .then(res => res.json())
   .then(data => {
       res.render('index', { 
           data: data
       })})
   .catch(err => res.send(err));
})