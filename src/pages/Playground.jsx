import Header from '../components/header';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Divider } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Box, Flex, Spacer, Heading, Button, ButtonGroup, IconButton } from '@chakra-ui/react';
import NeuralNetwork from '../components/NeuralNetwork';
import ImageUploader from '../components/ImageUploader';
import ClassManager from '../components/ClassManager';
import { forwardRef, useState } from 'react';
import TensorFlowTest from '../components/TensorFlowTest';
import { train } from '@tensorflow/tfjs';
import './Playground.css'
import ClassBox from '../components/ClassBox';
import { AddIcon } from '@chakra-ui/icons';

 const Playground = forwardRef(({props}, ref) => {
    const [testImageIndex, setTestImageIndex] = useState(-1);
    const [images, setImages] = useState([]);
    const [classes, setClasses] = useState(["Class 0", "Class 1"]);
    const [model, setModel] = useState();
    const [activations, setActivations] = useState();
    //testImage: {classID: number, imagePath: string}
    const [forceRerender, setForceRerender] = useState(false);

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
        console.log('Received Updated Classes:', newClass);
        setClasses(newClass);
    }

    const updateModel = (newModel) => {
        setModel(newModel);
    }

    const updateActivations = (newActivation) => {
        setActivations(newActivation);
    }

    const addClass = () => {
        setClasses([...classes, "Class " + classes.length]);
        setForceRerender((prev) => !prev);
    }
    
    return(
        <div style={{ width: '100%'}}>
            
            <Flex className="center" align="center" direction="column" overflow={'scroll'} width={'100%'} height={'100%'}>
                <Heading ref={ref} color="white">Playground</Heading>
                <Box>
                <ClassBox classLabel={"Class 0"} updateClasses={updateClasses} index={0} key={0} trainingData={trainingData} updateTrainingData={updateTrainingData} classes={classes}/> 
                </Box>

                <Flex align={'center'} justify={'flex-start'} width={'100%'} gap={'50px'} height={'100%'} >
                    {/* <Box width={'25%'}> */}
                    <ClassBox classLabel={"Class 1"} updateClasses={updateClasses} index={1} key={1} trainingData={trainingData} updateTrainingData={updateTrainingData} classes={classes}/> 
                    {/* </Box> */}
                    {/* <Spacer /> */}
                    <Flex width={'25%'} direction={'column'}>
                        <Box
                        justifySelf="center"
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        backgroundColor="#FAF9F6"
                        height="100%"
                        width={'100%'}
                        >
                            <TensorFlowTest testImage={images[testImageIndex]} classes={classes} trainingData={trainingData} model={model} updateModel={updateModel} updateActivations={updateActivations}/>
                            <Divider borderColor={'black'} padding={'2'}/>
                            {/* <ImageUploader testImageIndex={testImageIndex} images={images} updateTestImageIndex={updateTestImageIndex} updateImages={updateImages}/>  */}
                        {/* </Box>
                        <Box
                        justifySelf="center"
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        backgroundColor="#FAF9F6"
                        height="100%"
                        width={'100%'}
                        > */}
                            <ImageUploader testImageIndex={testImageIndex} images={images} updateTestImageIndex={updateTestImageIndex} updateImages={updateImages}/> 
                        </Box>
                    
                        {/* <Box
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        backgroundColor="#FAF9F6"
                        width={'50%'}
                        >
                            
                            TENSORFLOWTEST WAS HERE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                        </Box> */}
                    </Flex>
                    {/* <Spacer /> */}
                    <Flex width='25%' justify={'center'}> 
                    {classes[3] ?
                     <ClassBox  classLabel={"Class 2"} updateClasses={updateClasses} index={2} key={2} trainingData={trainingData} updateTrainingData={updateTrainingData} classes={classes}/> 
                     : <IconButton icon={<AddIcon />} size={'lg'} onClick={() => addClass()}/>}
                    </Flex>
                </Flex>
                <Flex align={'center'} justify={'center'}>
                {classes[2] ?
                     <ClassBox  classLabel={"Class 3"} updateClasses={updateClasses} index={3} key={3} trainingData={trainingData} updateTrainingData={updateTrainingData} classes={classes}/> 
                     : <IconButton icon={<AddIcon />} size={'lg'} onClick={() => addClass()} marginTop={'100px'} marginBottom={'100px'}/>}
                </Flex>
                <Flex  borderWidth='1px' borderRadius='lg' backgroundColor="#FAF9F6" width={'95%'} height={'550px'} overflowY="auto">
                    <NeuralNetwork model={model} classes={classes} updateModel={updateModel}/>
                </Flex>
            </Flex>

           
            

        </div>
    )
})

export default Playground;
