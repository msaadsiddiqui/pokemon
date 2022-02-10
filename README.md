# pokemon
PokeAPI
# Welcome to PokeAPI

Hello, this is a pokemon fun API, gather the information about your favorite Pokemon in a fun and interesting way.


# Download

Download all the files in a single or clone the repo 


## Configuration

Below is the config.js file, in which IP and Port can be configured
```
IP Address
config.commsAddress = "localhost";
// IP of Core Server
config.commsPort = "4000"
```
Also make sure to edit the EXPOSE port in Dockerfile

## Build

```
docker build -t pokemon .
```

## Run
```
docker run --publish 4000:4000 pokemon
```

## Test

Use any API Caller. I used Postman and Web browser to access the API

```
http://localhost:4000/pokemon/crobat

http://localhost:4000/pokemon/translated/crobat/
```
### Output 1
```
{
  "name": "crobat",
  "description": "It flies so si­\nlently through the\ndark on its four\fwings that it may\nnot be noticed\neven when nearby.",
  "habitat": "cave",
  "isLegendary": false
}
 ```
 ### Output 2
```
{
  "name": "zubat",
  "description": "Forms colonies in\nperpetually dark\nplaces. Uses\fultrasonic waves\nto identify and\napproach targets.",
  "habitat": "cave",
  "isLegendary": false
}
```

## Reference APIs
https://pokeapi.co/

https://funtranslations.com/api/shakespeare

https://funtranslations.com/api/yoda
