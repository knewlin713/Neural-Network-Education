import Header from '../components/header';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Box, Flex, Spacer, Heading, Button, ButtonGroup } from '@chakra-ui/react';
import NeuralNetwork from '../components/NeuralNetwork';
import ImageUploader from '../components/ImageUploader';
import ClassManager from '../components/ClassManager';
import { useState } from 'react';
import TensorFlowTest from '../components/TensorFlowTest';
import { train } from '@tensorflow/tfjs';
import './Playground.css'
import ClassBox from '../components/ClassBox';

export default function Playground() {
    const [testImageIndex, setTestImageIndex] = useState(-1);
    const [images, setImages] = useState([]);
    const [classes, setClasses] = useState(["Class 0", "Class 1"]);
    const [model, setModel] = useState();
    const [activations, setActivations] = useState();
    //testImage: {classID: number, imagePath: string}
    const [trainingData, setTrainingData] = useState([
        {classID: 0 , imagePath: 'src/trainingData/dog1.jpeg'},
        {classID: 0 , imagePath: 'src/trainingData/dog2.jpeg'},
        {classID: 0 , imagePath: 'src/trainingData/dog3.jpeg'},
        {classID: 1 , imagePath: 'src/trainingData/cat2.jpeg'},
        {classID: 1 , imagePath: 'src/trainingData/cat3.jpeg'},
        {classID: 1 , imagePath: 'src/trainingData/cat4.jpeg'},
    ]);

    const updateTrainingData = (newTrainingData) => {
        setTrainingData(newTrainingData);
    }
    const updateTestImageIndex = (newTestImage, newImages) => {
        setTestImageIndex(newTestImage);
      };

    const updateImages = (newImages) => {
        setImages(newImages);
    }

    const updateClasses = (newClass) => {
        setClasses(newClass);
    }

    const updateModel = (newModel) => {
        setModel(newModel);
    }

    const updateActivations = (newActivation) => {
        setActivations(newActivation);
    }
    
    return(
        <div>
            <Header />

            <Heading color="white">Playground</Heading>
            <Flex className="center" alignItems="center" flexDirection="column">
                <ClassBox  classLabel={"Class 0"} updateClasses={updateClasses} index={0} key={0} trainingData={trainingData} updateTrainingData={updateTrainingData}/> 
                <Flex>
                    <ClassBox  classLabel={"Class 1"} updateClasses={updateClasses} index={1} key={1} trainingData={trainingData} updateTrainingData={updateTrainingData}/> 
                    <Box
                    justifySelf="center"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    backgroundColor="#FAF9F6"
                    height="100%"
                    >
                        <ImageUploader testImageIndex={testImageIndex} images={images} updateTestImageIndex={updateTestImageIndex} updateImages={updateImages}/> 
                    </Box>
                    <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    backgroundColor="#FAF9F6"
                    >
                        <TensorFlowTest testImage={images[testImageIndex]} classes={classes} trainingData={trainingData} model={model} updateModel={updateModel} updateActivations={updateActivations}/>
                    </Box>
                    <ClassBox  classLabel={"Class 2"} updateClasses={updateClasses} index={2} key={2} trainingData={trainingData} updateTrainingData={updateTrainingData}/> 
                    
                </Flex>
                <ClassBox  classLabel={"Class 3"} updateClasses={updateClasses} index={3} key={3} trainingData={trainingData} updateTrainingData={updateTrainingData}/> 
                
            </Flex>

            {/* <Flex className="center" alignItems="center">
                <Box justifySelf={'center'} borderWidth='1px' borderRadius='lg' overflow='hidden'  backgroundColor="#FAF9F6" height="100%">
                    <ImageUploader testImageIndex={testImageIndex} images={images} updateTestImageIndex={updateTestImageIndex} updateImages={updateImages}/> 
                </Box>
                <Box borderWidth='1px' borderRadius='lg' overflow='hidden' backgroundColor="#FAF9F6" >
                    <TensorFlowTest testImage={images[testImageIndex]} classes={classes} trainingData={trainingData} model={model} updateModel={updateModel} updateActivations={updateActivations}/>
                </Box>
            </Flex>
            <ClassBox  classLabel={"Class 0"} updateClasses={updateClasses} index={0} key={0} trainingData={trainingData} updateTrainingData={updateTrainingData}/> */}
            
            {/* <ClassManager className="positioned-element " classes={classes} updateClasses={updateClasses} trainingData={trainingData} updateTrainingData={updateTrainingData}/> */}
            {/* <Flex>
                <ClassManager classes={classes} updateClasses={updateClasses} trainingData={trainingData} updateTrainingData={updateTrainingData}/>
                <Box maxWidth="10%" borderWidth='1px' borderRadius='lg' overflow='hidden' maxHeight="50%" backgroundColor="#FAF9F6" height="100%">
                    <ImageUploader testImageIndex={testImageIndex} images={images} updateTestImageIndex={updateTestImageIndex} updateImages={updateImages}/> 
                </Box>
                <Box maxWidth="33%" borderWidth='1px' borderRadius='lg' overflow='hidden' maxHeight="50%" backgroundColor="#FAF9F6" minHeight="100%">
                    <TensorFlowTest testImage={images[testImageIndex]} classes={classes} trainingData={trainingData} model={model} updateModel={updateModel} updateActivations={updateActivations}/>
                </Box>
                
            </Flex>
            <Box direction={'column'} justifyContent={'center'} alignItems={'center'}  borderWidth='1px' borderRadius='lg'   backgroundColor="#FAF9F6">
                <NeuralNetwork model={model} classes={classes} updateModel={updateModel}/>
            </Box> */}
        </div>
    )
}
