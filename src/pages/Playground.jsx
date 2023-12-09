import Header from '../components/header';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Box, Flex, Spacer, Heading, Button, ButtonGroup } from '@chakra-ui/react';
import NeuralNetwork from '../components/NeuralNetwork';
import ImageUploader from '../components/ImageUploader';
import { useState } from 'react';

export default function Playground() {
    const [testImageIndex, setTestImageIndex] = useState(-1);
    const [images, setImages] = useState([]);

    const updateTestImageIndex = (newTestImage, newImages) => {
        setTestImageIndex(newTestImage);
      };

    const updateImages = (newImages) => {
        setImages(newImages);
    }
    
    return(
        <div>
            <Header />
            <Heading color="white">Playground</Heading>
            

            {/* tensorflow attempt */}
            <Box maxWidth="33%" borderWidth='1px' borderRadius='lg' overflow='hidden' maxHeight="50%" backgroundColor="#FAF9F6" height="50%">
                <ImageUploader testImageIndex={testImageIndex} images={images} updateTestImageIndex={updateTestImageIndex} updateImages={updateImages}/> 
            </Box>
            {/* <TensorFlowComponent /> */}
        </div>
    )
}
