# Face detection web app
A responsive web app I've developed for detecting faces, using image URL's of human faces.

The app implements a sign in page, a registration page, API calls to Clarifai's face recognition service and more.

Feel free to test this app using the following url: https://lironharel.github.io/FaceDetectionWebapp/

<img width="768" alt="image" src="https://user-images.githubusercontent.com/44953386/201520225-30bab543-34d0-44e3-b79b-537a4d26bf9c.png">


## Front End 
The front end of this app was developed with ReactJs, and delpoyed to GitHub pages.

The app was made responsive as seen in the example bellow:


**Login page - Mobile:**

<img width="250" alt="image" src="https://user-images.githubusercontent.com/44953386/201520459-32e63f4b-bc5e-4046-86c6-99c498e928e2.png">

**Login page - Desktop:**

<img width="768" alt="image" src="https://user-images.githubusercontent.com/44953386/201520366-3666d485-21d5-4ab9-9eff-3a6ea1255b2f.png">



## Back End 
The back end of this app was developed with NodeJs, using the Express and Bcrypt libraries for routing and encrypting passwords.
The backend api is hosted by Heroku at: https://frozen-crag-50039.herokuapp.com

(Try the main end point: GET https://frozen-crag-50039.herokuapp.com/)

## Database
A PostgreSQL database was used for storing the user and login information, managed by ElephantSQL's hosting service. 
