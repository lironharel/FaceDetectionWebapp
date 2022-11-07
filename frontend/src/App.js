import "./App.css";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import { Component } from "react";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from './components/Signin/SignIn';
import Register from "./components/Register/Register";

const USER_ID = 'c1k4gvoiafxx';
const PAT = '2dc5fc971f4b45c88852bddacb586a69';
const APP_ID = '13c69cbeabc3472f936649b085e6907a';
const MODEL_ID = 'face-detection';

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: "",
            imgUrl: "",
            pixeledBox: {},
            route: "signin",
            isSignedIn: false
        }
    }

    onInputChange = (e) => {
        this.state.input = e.target.value;
    }

    onBtnSubmitClick = () => {
        this.setState({
            imgUrl: this.state.input
        })
        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": this.state.input
                        }
                    }
                }
            ]
        });
        
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + PAT
            },
            body: raw
        };
        fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(data => {console.log(data); return this.convertBoxToPixelCoords(data.outputs[0].data.regions[0].region_info.bounding_box)})
        .then(pixeledBox => {
            this.setState({pixeledBox: pixeledBox}); 
        })
        .catch(error => console.log('error', error));
    }

    convertBoxToPixelCoords = (box) => {
        const img = document.getElementById("face-image")
        const width = img.width;
        const height = img.height;

        return {
            top: height * box.top_row,
            left: width * box.left_col,
            bottom: height * (1 - box.bottom_row),
            right: width * (1 - box.right_col)
        }
    }

    setRoute = (route) => {
        this.setState({route});
        this.updateSignedInFlag(route);
    }

    updateSignedInFlag = (route) => {
        if (route === "home") {
            this.setState({isSignedIn: true});
        } else if (route === "signin" || route ==='register') {
            this.setState({isSignedIn: false});
        }
    }

    render() {
        const {route, isSignedIn, pixeledBox, imgUrl} = this.state;

        return (
            <div className="App">
                <Navigation isSignedIn={isSignedIn} setRoute={this.setRoute} />
                {
                route === "signin" ?
                <Signin setRoute={this.setRoute} /> :
                route === "register" ?
                <Register setRoute={this.setRoute} /> :
                <>
                    <Logo />
                    <Rank />
                    <ImageLinkForm 
                        onBtnSubmitClick={this.onBtnSubmitClick} 
                        onInputChange={this.onInputChange} 
                    />
                    <FaceRecognition box={pixeledBox} imgUrl={imgUrl} />
                </>
                }
            </div>
        );
    }
}

export default App;
