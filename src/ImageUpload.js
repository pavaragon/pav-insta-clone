import React, {useState} from 'react'
import { Button } from "@material-ui/core";
import { storage, db } from "./firebase";
import firebase from "firebase";
import './ImageUpload.css';


function ImageUpload( {username} ) {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progress function...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                // error function ...
                console.log(error);
                alert(error.message);
            },
            () => {
                // complete function ...
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // post image inside db
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        });

                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    });
            }
        )
    }


    return (
        <div className="imageupload">
            <div className="imageupload_bar">
                <progress className="imageupload_progress" value={progress} max="100" ></progress>
            </div>
            <div className="imageupload_caption">
                <p>Caption:</p>
                <input type="text" palceholder="Enter a caption..." onChange={event => setCaption(event.target.value)} />
            </div>
            <div className="imageupload_submit">
                <input type="file" onChange={handleChange}/>
                <Button classname="imageupload_button" onClick={handleUpload} >
                    Upload
                </Button>
            </div>
        </div>
    )
}

export default ImageUpload