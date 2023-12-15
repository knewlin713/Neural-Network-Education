import * as mobilenetmodule from '@tensorflow-models/mobilenet'
import { Text, Button, Box, Flex, Heading } from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'

export default function TensorFlowTest({ testImage, classes, trainingData, model, updateModel, updateActivations }) {
    //useeffect hook for async funcs
    const [predictions, setPredictions] = useState('No prediction');
    const [confidence, setConfidence] = useState("None");
    const MOBILE_NET_INPUT_WIDTH = 224;
    const MOBILE_NET_INPUT_HEIGHT = 224;
    
    const [trainingDataInputs, setTrainingDataInputs] = useState([]);
    const [trainingDataOutputs, setTrainingDataOutputs] = useState([]);
    const mobilenetRef = useRef(null);
    const [modelLoaded, setModelLoaded] = useState(false);
    useEffect(() => {
        console.log("tfjs component rerendered");
      });
      
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

    useEffect(() => {
        const loadAndTrain = async () => {
            if (modelLoaded) {
                await loadModel();
                // Ensure the model is loaded before calling train
                train();
            }
          
        };
        
      
        loadAndTrain();
      }, [modelLoaded]); 


    const getActivations =  (input, model, layer) => {
        const activationModel = tf.model({
          inputs: model.input,
          outputs: layer.output
        });
        return activationModel.predict(input);
      }

    
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

        tf.tidy(function() {
            let imageTensor = tf.browser.fromPixels(img).div(255);
            let resizedTensor = tf.image.resizeBilinear(imageTensor, [MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH], true);

            // let reshapedTensor = imageTensor.reshape([1, MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH, 3]);
            // let resizedTensor = tf.image.resizeBilinear(reshapedTensor, [MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH], true);

            let imageFeatures = mobilenetRef.current.predict(resizedTensor.expandDims());
            let prediction = model.predict(imageFeatures).squeeze();
            let highestIndex = prediction.argMax().arraySync();
            let predictionArray = prediction.arraySync();
            setPredictions(classes[highestIndex]);
            setConfidence(Math.round((predictionArray[highestIndex] * 100)) + '%');

            const layer = model.getLayer('activationLayer');
            const activations = getActivations(imageFeatures, model, layer);
            console.log('Activations: ', activations);
            updateActivations(activations);
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
        modelHead.add(tf.layers.dense({inputShape: [1024], units: 128, activation: 'relu', name: 'activationLayer'}));
        modelHead.add(tf.layers.dense({units: classes.length, activation: 'softmax'}));


        modelHead.compile({
            optimizer: 'adam',
            loss: (classes.length === 2) ? 'binaryCrossentropy': 'categoricalCrossentropy'
        });
        updateModel(modelHead);
        modelHead.summary();
        gatherData();
        if (!modelLoaded) {
            setModelLoaded(prev => !prev);
        }
        const layers = modelHead.layers;
        // train();
        // setModelLoaded(true);

        //if the thing is last layer, kernel.shape[0] for input, [1] for output   
        // const surface = { name: 'Model Architecture', tab: 'Model' };
        // tfvis.show.modelSummary(modelHead, surface);
    }

    const train = async() => {
        //I will have uploaded images with image uploader. Every image uploaded will be put in a 
        //trainingdata object. It will have classes and each class has images array. Convert each image to tensor and train
        
        //this will train with a preset array
        console.log(trainingDataInputs);

        tf.util.shuffleCombo(trainingDataInputs, trainingDataOutputs);
        let outputsAsTensor = tf.tensor1d(trainingDataOutputs, 'int32');
        let oneHotOutputs = tf.oneHot(outputsAsTensor, classes.length);
        let inputsAsTensor = tf.stack(trainingDataInputs);

        let results = await model.fit(inputsAsTensor, oneHotOutputs, {shuffle: true, batchSize: 5, epochs: 10, 
        callbacks: {onEpochEnd: logProgress}});
        outputsAsTensor.dispose();
        inputsAsTensor.dispose();
        console.log(inputsAsTensor);
        //predict loop
        updateModel(model);

    }   
    
    //if the above training goes correctly, this is where the neural network visualizer occurs
    const logProgress = (epoch, logs) => {
        console.log('Epoch:' + epoch + 'logs:' +  logs.loss);
    }

    const gatherData = async() => {
        let inputs = [];
        let outputs = [];

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
            console.log(trainingData);
            let currClassID = trainingData[i].classID;
            let imageFeatures = tf.tidy(function() {
                let imageTensor = tf.browser.fromPixels(image);
                let resizedTensor = tf.image.resizeBilinear(imageTensor, [MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH], true);
                let normalizedTensor = resizedTensor.div(255);
                return mobilenetRef.current.predict(normalizedTensor.expandDims()).squeeze();
            })
            console.log(imageFeatures);
            inputs.push(imageFeatures);
            outputs.push(currClassID);
            setTrainingDataInputs(prevIn => [...prevIn, imageFeatures]);
            setTrainingDataOutputs(prevOut => [...prevOut, currClassID]);
        }

        
    }
    
    return (
        <Flex direction={'column'} justifyContent={'center'} alignItems={'center'}>
            <Heading size={'lg'}>Neural Network</Heading>
            <Text>{modelLoaded ? 'Neural Network loaded!' : 'Neural Network is not loaded'}</Text>
            <Button onClick={() => loadModel()}>Train model</Button>
            
            <Button onClick={() => predict()}>Get prediction</Button>
            <Text>Prediction: {predictions}</Text>
            <Text>Confidence: {confidence}</Text>
            
            {/* {testImage ? testImage.src : "Image not found"} */}
            <div id="activation-container"></div>

        </Flex>
    )
}
