# Face detection web app
A web app I've developed for detecting faces, using image URL's of human faces.

The app implements a sign in page, a registration page, API calls to Clarifai's face recognition service and more.

Feel free to test this app using the following url: https://lironharel.github.com/FaceDetectionWebapp

<img width="1280" alt="image" src="https://user-images.githubusercontent.com/44953386/201520225-30bab543-34d0-44e3-b79b-537a4d26bf9c.png">


## Front End 
The front end of this app was developed with ReactJs, and delpoyed to GitHub pages.

## Back End 
The back end of this app was developed with NodeJs, using the Express and Bcrypt libraries for routing and encrypting passwords.
The backend api is hosted by Heroku at: https://frozen-crag-50039.herokuapp.com

(Try the main end point: GET https://frozen-crag-50039.herokuapp.com/)

## Database
A PostgreSQL database was used for storing the user and login information, managed by ElephantSQL's hosting service. 
