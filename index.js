const express= require('express')
const app = express()
const axios = require('axios');
var config = require('./config');
const IP = config.commsAddress;
const port = config.commsPort;


app.listen(port, () => {
  console.log(`Pokemon app listening at http://${IP}:${port}`)
});
//Basic Information API Endpoint
app.get('/pokemon/:name', function (req, res) {
  
  axios.get(`https://pokeapi.co/api/v2/pokemon-species/${req.params.name}`)
  .then(function (response) {
    var habitatName;
    
    if (response.data.habitat)
    { 
      habitatName = response.data.habitat.name;
    }
    else
    {
      habitatName = response.data.habitat;
    }
    let basicInfoJSON = 
    {
      'name':response.data.name,
      'description':response.data.flavor_text_entries[0].flavor_text,
      'habitat':habitatName,
      'isLegendary':response.data.is_legendary

    }
    res.status(200).send(basicInfoJSON);
  })
  .catch(function (error) {
      res.status(404).send({"error": "pokemon data not found"});
  })
  .then(function () {
    // nothing to do here for now
  });
});


//Pokemon, translation API. 
app.get('/pokemon/translated/:name', function (req, res) {
  
  axios.get(`https://pokeapi.co/api/v2/pokemon-species/${req.params.name}`)
  .then(function (response) {
    let pokemonDesc = response.data.flavor_text_entries[0].flavor_text;
    var habitatName;
    var translatedText;
    var pokemonResponse = response;
    if (response.data.habitat)
    {
      habitatName = response.data.habitat.name;
    }
    else
    {
      habitatName = response.data.habitat;
    }
    //translation starts from here
    var translationURL;
    if(habitatName === 'cave' || response.data.is_legendary === true)
    {
      translationURL = 'https://api.funtranslations.com/translate/yoda.json'
    }
    else
    {
      translationURL = 'https://api.funtranslations.com/translate/shakespeare.json'
    }
        axios.post(translationURL, {
          text: pokemonDesc
        })
        .then(function (response) {
        
          translatedText = response.data.contents.translated;
          let funInfoJSON = 
          {
            'name':pokemonResponse.data.name,
            'description':translatedText,
            'habitat':habitatName,
            'isLegendary':pokemonResponse.data.is_legendary
          } 
          res.status(200).send(funInfoJSON)
        })
        .catch(function (error) {
          let funInfoJSON = 
          {
            'name':pokemonResponse.data.name,
            'description':pokemonResponse.data.flavor_text_entries[0].flavor_text,
            'habitat':habitatName,
            'isLegendary':pokemonResponse.data.is_legendary
          }
          res.status(200).send(funInfoJSON);
        });
  })
  .catch(function (error) {
    res.status(404).send({"error": "pokemon data not found"});
    
  })
  .then(function () {
    // always executed
  });
});

app.use(express.urlencoded({
  extended: true
}));
