import * as mobilenetmodule from '@tensorflow-models/mobilenet'
import { Text, Button } from '@chakra-ui/react'
import { useState, useEffect } from 'react';


export default function TensorFlowTest( {testImage} ) {
    //useeffect hook for async funcs
    const [predictions, setPredictions] = useState('No prediction');
    const [model, setModel] = useState();
    // useEffect(() => {
    //img code  
    // async function getModel() {
    //     // const imgPath = testImage.src;
    //     // const img = new window.Image();
    //     // img.src = imgPath;
    //     //nn code
    //     const model = await mobilenetmodule.load(); //load pre-trained model
    //     // setPredictions = model.classify(img); //classify pre-trained model
    //     //printing the model info and classificaiton answer
    //     console.log(model);
    //     console.log(predictions);
    //     }
    //     setModel(getModel());
    // }, []);

    const predict = async () => {
        if (!model) {
            console.error('Model not loaded yet');
            return;
        }
        console.log(model);
        const imgPath = testImage.src;
        const img = new Image();
        img.src = imgPath;
        img.width = 250;
        img.height = 250;
        console.log(img);
        let predictions = await model.classify(img);
        setPredictions(predictions[0].className)
        console.log(predictions);
    }

    const loadModel = async() => {
        const model = await mobilenetmodule.load();
        setModel(model);
        console.log(model);
    }
    
    return (
        <div>
            <Button onClick={() => loadModel()}>Load Mobilenet Model</Button>
            <Button onClick={() => predict()}>Get prediction</Button>
            <Text>Prediction: {String(predictions)}</Text>
            {testImage ? testImage.src : "Image not found"}
        </div>
    )
}
