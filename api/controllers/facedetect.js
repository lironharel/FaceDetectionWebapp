// Clarifai config vars
const USER_ID = 'c1k4gvoiafxx';
const PAT = process.env.CLARIFAI_PAT;
const APP_ID = '13c69cbeabc3472f936649b085e6907a';
const MODEL_ID = 'face-detection';


export const handleFaceDetect = (req, res) => {
    console.log(req.body)
    const {imgUrl} = req.body
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
    .then(data => res.json(data))
    .catch(err =>  {
        console.log("handleFaceDetect error:", err)
        res.status(400).json("face detect error")
    })
}
