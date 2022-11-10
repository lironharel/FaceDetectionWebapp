import "./App.css";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import { Component } from "react";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from './components/Signin/SignIn';
import Register from "./components/Register/Register";

const initialState = {
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

class App extends Component {
    constructor() {
        super();
        this.state = initialState;
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
        fetch("http://localhost:3000/facedetect", {
        method: 'POST',
        headers: {'content-type' : 'application/json'},
        body: JSON.stringify({imgUrl: imgUrl})
        })
        .then(response => response.json())
        .then(data => this.convertBoxToPixelCoords(data.outputs[0].data.regions[0].region_info.bounding_box))
        .then(pixeledBox => this.setState({pixeledBox: pixeledBox}))
        .catch(error => console.log('Error getting bounding boxes: ', error))
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
        if (route === 'home') {
            this.setState({isSignedIn: true});
        }
        else {
            this.state = initialState;
        }

        this.setState({route});
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
