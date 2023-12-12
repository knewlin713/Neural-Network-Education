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

export default function Playground() {
    const [testImageIndex, setTestImageIndex] = useState(-1);
    const [images, setImages] = useState([]);
    const [classes, setClasses] = useState([]);
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
    
    return(
        <div>
            <Header />

            <Heading color="white">Playground</Heading>

            <Flex>
                <ClassManager classes={classes} updateClasses={updateClasses} trainingData={trainingData} updateTrainingData={updateTrainingData}/>
                <Box maxWidth="33%" borderWidth='1px' borderRadius='lg' overflow='hidden' maxHeight="50%" backgroundColor="#FAF9F6" height="50%">
                    <ImageUploader testImageIndex={testImageIndex} images={images} updateTestImageIndex={updateTestImageIndex} updateImages={updateImages}/> 
                </Box>
                <Box maxWidth="33%" borderWidth='1px' borderRadius='lg' overflow='hidden' maxHeight="50%" backgroundColor="#FAF9F6" height="50%">
                    <TensorFlowTest testImage={images[testImageIndex]} classes={classes} trainingData={trainingData} updateTrainingData={updateTrainingData}/>
                </Box>
            </Flex>
        </div>
    )
}
