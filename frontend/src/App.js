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
            isSignedIn: false,
            user: {
                id: '',
                name: '',
                email: '',
                entries: 0,
                joined: ''
            }
        }
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        })
    }

    onInputChange = (e) => {
        this.setState({input: e.target.value});
    }

    updateBoundingBox = async (imgUrl) => {
        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": imgUrl
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

        return fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(data => this.convertBoxToPixelCoords(data.outputs[0].data.regions[0].region_info.bounding_box))
        .then(pixeledBox => this.setState({pixeledBox: pixeledBox}))
        .catch(error => console.log('Error getting bounding boxes: ', error));
    }

    updateUserEntries = async () => {
        return(
            fetch('http://localhost:3000/image', {
                method: 'put',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({id: this.state.user.id})
            })
            .then(res => res.json())
            .then(data => this.setState({user: Object.assign(this.state.user, {entries: data.entries})}))
            .catch(error => console.log('Error updating user entries:', error))
        )
    }

    onBtnSubmitClick = async () => {
        const imgUrl = this.state.input

        this.setState({imgUrl});
        await this.updateBoundingBox(imgUrl);
        this.updateUserEntries();
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
        const {route, isSignedIn, pixeledBox, imgUrl, user} = this.state;

        return (
            <div className="App">
                <Navigation isSignedIn={isSignedIn} setRoute={this.setRoute} />
                {
                route === "signin" ?
                <Signin loadUser={this.loadUser} setRoute={this.setRoute} /> :
                route === "register" ?
                <Register loadUser={this.loadUser} setRoute={this.setRoute} /> :
                <>
                    <Logo />
                    <Rank name={user.name} entries={user.entries} />
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
