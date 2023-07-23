# Mubiflix API

Esta API fue creada con fines educativos, se usará como la API para la aplicación Mubiflix la cual es construida en FLutter y React Native para poder dar mi opinion como desarrollador sobre las diferencias entre Flutter y RN y plantear unas bases para otros devs que quieran ingresar en algun momento usar estas tecnologías.

**Nota:** Esta API la cree con el fin de procesar más facil la información obtenida de la API de [TMDB](https://www.themoviedb.org/).

## Scripts

- `npm start`: Inicia la API en tu [localhost](http:localhost:3000/).
- `npm run build`: Crea la carpeta dist con todos los archivos a desplegar en el server de tu preferencia.
- `npm run clear`: Elimina todo el contenido de la carpeta dist.
- `npm run cleaninstall`: Elimina todo el contenido contenido de node_modules e instala todas las dependencias.

## Paths

- `/nowplaying/{offset}`
Obtiene una lista de peliculas que actualmente están en cines. El parámetro offset es para saber la cantidad de elementos a retornar, si es valor es ```null``` o ```undefined``` se retorna la lista completa que se obtiene la API de [TMDB](https://www.themoviedb.org/). 
- `/toprated`
Obtiene una lista de peliculas ordenada por su calificación
- `/mostpopular`
Obtiene un listado de peliculas ordenada por popularidad
- `/detail/{id}`
Obtiene el detalle de una pelicula dado su ID.

### Schemas

Esta API tiene definido los siguientes esquemas o estrutura de información. Ver archivo **swagger.yaml**

### Cast
Esquema para definir la estructura que se usará para los protagonistas de una pelicula. Este esquema es usado para complementar la información del esquema **Movie**. Este tiene definido las siguientes propiedades:
- name: string
- character: string
- pathImage: string


#### Movie
Esquema para definir la estructura del object que representa la información de una pelicula. Este tiene definido las siguientes propiedades:
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



