# National-Obesity-Data-Map
This is the front-end client application for the National Obesity Data Map. 
It utilizes GeoJson data gathered from https://catalog.data.gov/dataset/national-obesity-by-state-d765a and MapBox
GL JS library to create a heat map that shows state obesity data by intensity.

## Screenshots
<img width="1280" alt="Screenshot 2023-10-22 233752" src="https://github.com/fj2412/National-Obesity-Data-Map/assets/60425040/80eb0ef9-30e1-4096-99fa-7b4debaf8730">
<img width="1280" alt="Screenshot 2023-10-22 234037" src="https://github.com/fj2412/National-Obesity-Data-Map/assets/60425040/cf492fda-b0ca-4b44-8bfe-df578be08f5c">

## MapBox GL Access Token
To use this application and render the map, you must create an account with MapBox to acquire an API access token that is used 
by the application. You can do this by:
1. Go to https://www.mapbox.com/ and create an account to get an API access token.
2. Edit the file `src/Components/Map.jsx` and replace the `YOUR_MAPBOX_ACCESS_TOKEN` value in `mapboxgl.accessToken=` with your access token as a string.

## Start Application
Run the following command in the **my-app** directory to start the application.

`npm start`
