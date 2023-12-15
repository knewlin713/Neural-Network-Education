// import Header from '../components/header';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Divider } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Box, Flex, Spacer, Heading, Button, ButtonGroup, IconButton } from '@chakra-ui/react';
import NeuralNetwork from '../components/NeuralNetwork';
import ImageUploader from '../components/ImageUploader';
import ClassManager from '../components/ClassManager';
import { forwardRef, useState, useEffect } from 'react';
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

    useEffect(() => {
        console.log("playgrond rerendered");
      });
      
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
        // setForceRerender((prev) => !prev);
    }
    const updateTestImageIndex = (newTestImage, newImages) => {
        setTestImageIndex(newTestImage);
        // setForceRerender((prev) => !prev);
      };

    const updateImages = (newImages) => {
        setImages(newImages);
        // setForceRerender((prev) => !prev);
    }

    const updateClasses = (newClass) => {
        console.log('Received Updated Classes:', newClass);
        setClasses(newClass);
        // setForceRerender((prev) => !prev);
    }

    const updateModel = (newModel) => {
        setModel(newModel);
        // setForceRerender((prev) => !prev);
    }

    const updateActivations = (newActivation) => {
        setActivations(newActivation);
        // setForceRerender((prev) => !prev);
    }

    const addClass = () => {
        setClasses([...classes, "Class " + classes.length]);
        // setForceRerender((prev) => !prev);
    }
    
    return(
        <div style={{ width: '100%'}}>
            
            <Flex className="center" align="center" direction="column" overflow={'scroll'} width={'100%'} height={'100%'} justifyContent={'center'}>
                <Heading ref={ref} color="white">Playground</Heading>
                <Box display={'flex'} justifyContent={'center'}>
                <ClassBox  align="center" display={'flex'} classLabel={"Class 0"} justifyContent={'center'} updateClasses={updateClasses} index={0} key={0} trainingData={trainingData} updateTrainingData={updateTrainingData} classes={classes}/> 
                </Box>

                <Flex display={'flex'} align={'center'} justifyContent={'center'} width={'110%'} gap={'50px'} height={'100%'}>
                    {/* <Box width={'25%'}> */}
                    <ClassBox classLabel={"Class 1"} updateClasses={updateClasses} index={1} key={1} trainingData={trainingData} updateTrainingData={updateTrainingData} classes={classes}/> 
                    {/* </Box> */}
                    {/* <Spacer /> */}
                    <Flex align={'center'} width={'25%'} direction={'column'} height={'90vh'}>
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
                     <ClassBox  classLabel={"Class 2"} justifyContent={'center'} updateClasses={updateClasses} index={2} key={2} trainingData={trainingData} updateTrainingData={updateTrainingData} classes={classes}/> 
                     : <IconButton icon={<AddIcon />} size={'lg'} onClick={() => addClass()}/>}
                    </Flex>
                </Flex>
                <Flex align={'center'} justify={'center'}>
                {classes[2] ?
                     <ClassBox  classLabel={"Class 3"} updateClasses={updateClasses} index={3} key={3} trainingData={trainingData} updateTrainingData={updateTrainingData} classes={classes}/> 
                     : <IconButton icon={<AddIcon />} size={'lg'} onClick={() => addClass()} marginTop={'100px'} marginBottom={'100px'}/>}
                </Flex>
                <Flex  borderWidth='1px' borderRadius='lg' backgroundColor="#FAF9F6" width={'95%'} maxHeight={'550px'} overflowY="auto">
                    <NeuralNetwork model={model} classes={classes} updateModel={updateModel}/>
      
                </Flex>
                <Text color='white'>
      <strong>How to use the Playground:</strong><br />
      The top section labled "Neural Network" allows you to train your model <br />
      with the 'train model' button and after you upload a file and click on it, you <br />
      can press the 'get predicition' button for the neural network to tell you what it thinks <br />
      the object is. <br /><br /> Using the class boxes surrounding the center neural network box,
      you can add training data <br /> and class (or object) names. We have some images set up for you so that <br />
      class 0 represents dogs and class 1 represents cats. It is important to <br />remember that if you want to train your neural network on a new object,<br />
      you have to have access to a folder containing <strong>hundreds</strong>   <br />of images of that object in order for your model to be fairly accurate. <br />
      <br />
      The section below that area allows you to visualize the virtual  <br /> neurons with the tabs. 
      Press 'Overall Structure' and then 'Graph' in order to get a general  <br />view of your model.
      Press 'Detailed View' and then 'Detailed Draw' to get an image that  <br />represents you entire 
      network, with all of the virtual neurons. It is a big network! It can  <br />really help your 
      perception of your model!  Adding a Hidden layer with the 'Add Hidden Layer' <br /> button can show you 
      how adding more virtual neurons changes the shape of the model. It also  <br />may effect its predictions!<br /> <br /> <br />
      </Text>
            </Flex>

           
            

        </div>
    )
})

export default Playground;
