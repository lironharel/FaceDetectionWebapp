import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = (props) => {
    const { imgUrl, box } = props;
    return (
        <div className="center ma">
            <div className="absolute mt4">
                {imgUrl.length > 0
                ? <img id="face-image" src={imgUrl} width="500px" height="auto" alt="face" /> 
                : ""}
                <div
                    className="box"
                    style={{
                        top: box.top,
                        right: box.right,
                        bottom: box.bottom,
                        left: box.left,
                    }}
                ></div>
            </div>
        </div>
    );
};

export default FaceRecognition;
