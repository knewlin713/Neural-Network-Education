import * as mobilenetmodule from '@tensorflow-models/mobilenet'
import { Text, Button, Box } from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'

export default function TensorFlowTest( {testImage, classes, trainingData, updateTrainingData} ) {
    //useeffect hook for async funcs
    const [predictions, setPredictions] = useState('No prediction');
    const [model, setModel] = useState();
    const MOBILE_NET_INPUT_WIDTH = 224;
    const MOBILE_NET_INPUT_HEIGHT = 224;
    // classes = ['Class 1', 'Class 2'];
    
    const [trainingDataInputs, setTrainingDataInputs] = useState([]);
    const [trainingDataOutputs, setTrainingDataOutputs] = useState([]);
    const mobilenetRef = useRef(null);
    // const [mobilenetModel, setMobilenetModel] = useState();
    
    useEffect(() => {
        (async() => {
            const URL = 'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/feature_vector/5/default/1';
            try {
            const mobilenet = await tf.loadGraphModel(URL, {fromTFHub: true});
            mobilenetRef.current = mobilenet;
            console.log('Mobile net v3 loaded successfully!');
            console.log(mobilenet);
            } catch {
                console.error("mobile net didnt load")
            }
        })();
    }, [])
    const predict = async () => {
        if (!model || !mobilenetRef.current) {
            if (!model) {
                console.error('Model not loaded yet');
            } else {
                console.error('Mobilenet model not loaded yet')
            }
            return;
        }

        /* old code*/
        // console.log(model);
        const imgPath = testImage.src;
        const img = new Image();

        await new Promise(resolve => {
            img.onload = resolve;
            img.src = imgPath;

          });
        // img.width = 250;
        // img.height = 250;
        // console.log(img);
        // let predictions = await model.classify(img);
        // setPredictions(predictions[0].className)
        // console.log(predictions);

        tf.tidy(function() {
            let imageTensor = tf.browser.fromPixels(img).div(255);
            let resizedTensor = tf.image.resizeBilinear(imageTensor, [MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH], true);
            let imageFeatures = mobilenetRef.current.predict(resizedTensor.expandDims());
            let prediction = model.predict(imageFeatures).squeeze();
            let highestIndex = prediction.argMax().arraySync();
            let predictionArray = prediction.arraySync();

            setPredictions(predictionArray);
        })
    
    }

    const loadModel = async() => {
        // mobilenet = await mobilenetmodule.load();
        // setModel(model);
        // console.log(model);
        // console.log(mobilenetmodule);
        const layerName = 'dense_Dense2/kernel'; // Example layer name, you can change this

        
        // const mobilenet = await tf.loadGraphModel(URL, {fromTFHub: true});
        // setMobilenetModel(mobilenet);
        console.log(mobilenetRef.current)
        // console.log(mobilenetModel);
        tf.tidy(function() {
            let answer = mobilenetRef.current.predict(tf.zeros([1, MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH, 3]));
            console.log(answer.shape);
        });

        let modelHead = tf.sequential();
        modelHead.add(tf.layers.dense({inputShape: [1024], units: 128, activation: 'relu'}));
        modelHead.add(tf.layers.dense({units: classes.length, activation: 'softmax'}));

        modelHead.summary();
        modelHead.compile({
            optimizer: 'adam',
            loss: (classes.length === 2) ? 'binaryCrossentropy': 'categoricalCrossentropy'
        });
        setModel(modelHead);
        gatherData();
    }

    const trainAndPredict = async() => {
        //I will have uploaded images with image uploader. Every image uploaded will be put in a 
        //trainingdata object. It will have classes and each class has images array. Convert each image to tensor and train
        
        //this will train with a preset array
        tf.util.shuffleCombo(trainingDataInputs, trainingDataOutputs);
        let outputsAsTensor = tf.tensor1d(trainingDataOutputs, 'int32');
        let oneHotOutputs = tf.oneHot(outputsAsTensor, CLASS_NAMES.length);
        let inputsAsTensor = tf.stack(trainingDataInputs);

        let results = await model.fit(inputsAsTensor, oneHotOutputs, {shuffle: true, batchSize: 5, epochs: 10, 
        callbacks: {onEpochEnd: logProgress}});
        outputsAsTensor.dispose();
        inputsAsTensor.dispose();
            
        //predict loop

    }   
    
    //if the above training goes correctly, this is where the neural network visualizer occurs
    const logProgress = (epoch, logs) => {
        console.log('Epoch:' + epoch + 'logs: ' + logs);
    }

    const gatherData = async() => {
        const inputs = [];
        const outputs = [];

        //training data is array of objects {classID: number, image: HTMLImageElement}
        for (let i = 0; i < trainingData.length; i++) {
            let currImagePath = trainingData[i].imagePath;
            let image = new Image();
            image.src = currImagePath;
            // image.width = MOBILE_NET_INPUT_WIDTH;
            // image.height = MOBILE_NET_INPUT_HEIGHT;
            
            await new Promise(resolve => {
                image.onload = resolve;
              });
            console.log(image);
            let currClassID = trainingData[i].classID;
            let imageFeatures = tf.tidy(function() {
                let imageTensor = tf.browser.fromPixels(image);
                let resizedTensor = tf.image.resizeBilinear(imageTensor, [MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH], true);
                let normalizedTensor = resizedTensor.div(255);
                return mobilenetRef.current.predict(normalizedTensor.expandDims()).squeeze();
            })
            inputs.push(imageFeatures);
            outputs.push(currClassID);
        }

        setTrainingDataInputs(inputs);
        setTrainingDataOutputs(outputs);
    }
    
    return (
        <div>
            <Button onClick={() => loadModel()}>Load Mobilenet Model</Button>
            <Button onClick={() => predict()}>Get prediction</Button>
            <Text>Prediction: {String(predictions)}</Text>
            {testImage ? testImage.src : "Image not found"}
            <Box id='visualization-nn' width={'250px'} height={'250px'} backgroundColor={'gray'}>
                <Button onClick={() => {console.log(trainingDataInputs); console.log(trainingDataOutputs)}} />
            </Box>
        </div>
    )
}
