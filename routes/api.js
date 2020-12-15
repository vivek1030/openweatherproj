const router = require('express').Router();
const fetch = require('node-fetch');
require('dotenv').config()

router.get('/', async (req, res) => {
  
  try {
    await fetch('http://ip-api.com/json')
      .then(res => res.json())
      .then(data => {
        const city = data.city;
        const nDate = new Date().toLocaleString('en-US', {
          timeZone: data.timezone,
          year: 'numeric', month: 'long', day: 'numeric'
        });
        let url_api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
        fetch(url_api)
        .then(res => res.json())
        .then(data => {
           res.render('index', {
             weatherdata:data,
             ndate:nDate
            });
        });

      });

  } catch (err) { }


});

router.post('/', async (req, res) => {
  const city = req.body.city;
  let url_api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
  try {
    await fetch(url_api)
      .then(res => res.json())
      .then(data => {
        if(data.cod == '404'){
          res.render('404');
        }
        else{
          const nDate = new Date().toLocaleString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          });
          res.render('index', {
            weatherdata:data,
            ndate:nDate
           });
        }
     

      });

  } catch (err) { }


});

function isPrime(n) 
{ 
    // Corner case 
    if (n <= 1) 
        return false; 
  
    // Check from 2 to n-1 
    for (let i = 2; i < n; i++) 
        if (n % i == 0) 
            return false; 
  
    return true; 
} 

router.get('/api/:city', async (req, res) => {
    var d = new Date().getDate();
    if(!isPrime(d)){
      res.json({"message":"Date is not prime so no date"});
    }
    else{
      const city = req.params.city;
      const url_api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
      try {
          await fetch(url_api)
            .then(res => res.json())
            .then(data => {
              if (data.message === 'city not found') {
                res.json(data);
              } else {
                  res.json(data);
              }
            });
      
        } catch (err) {
          res.json({"error":"something went wrong"});
        }
    }
    
});

module.exports = router;