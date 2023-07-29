# Mubiflix API

This API was created for educational purposes and will be used as the API for the Mubiflix application, which is built in Flutter and React Native. The aim is to provide my opinion as a developer on the differences between Flutter and RN and lay down some foundations for other developers who may want to use these technologies in the future.

**Note:** I created this API to process the information obtained from the [TMDB API](https://www.themoviedb.org/) more easily.

[SPANISH README](./README_ES.md)

## Scripts

- `npm start`:  Starts the API on your [localhost](http:localhost:3000/).
- `npm build`: Creates the ```dist``` folder with all the files to deploy on your preferred server.
- `npm clear`: Deletes all content from the ```dist``` folder.
- `npm run cleaninstall`: Deletes all content from the ```node_modules``` folder and install all dependencies.

## Paths

- `/docs`
Get Mubiflix API swagger info.
- `/api/list/nowplaying/{offset}`
Get a list of movies that are currently in theatres. Using offset to handle how many items wants to return. If offset is undefined or null return the original list from [TMDB API](https://www.themoviedb.org/). 
- `/api/list/toprated`
Get a list of movies ordered by rating.
- `/api/list/mostpopular`
Get a list of movies ordered by popularity.
- `/api/detail/{id}`
Get the top level details of a movie by ID.

### Schemas

This API has defined the following schemes or information structure. See **swagger.yaml** file

### Cast
Schema to define the structure to be used for the main characters of a movie. This schema is used to complement the information of the **Movie** schema. It has the following properties defined:
- name: string
- character: string
- pathImage: string


#### Movie
Scheme to represents the information of a movie. It has the following properties defined:
- id: number
- cast?: Cast[]
- genres?: string
- overview: string
- pathBackgroud: string
- posterPath: string
- releaseYear: string
- runtime?: number
- score: string
- title: string

### Env

If you want runt this project on your local, you need to create a dot env with these values

TMDB_API_KEY= #YOu can get api key creating an account on https://www.themoviedb.org/
TMDB_API_URL=https://api.themoviedb.org/3/movie
