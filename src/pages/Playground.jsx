import Header from '../components/header';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Box, Flex, Spacer, Heading, Button, ButtonGroup } from '@chakra-ui/react';
import NeuralNetwork from '../components/NeuralNetwork';
import TensorFlowComponent from '../components/TensorFlowComponent';

export default function Playground() {
    return(
        <div>
            <Header />
            <Heading color="white">Playground</Heading>

            {/* <Button>Hi</Button> */}
            {/* d3.js neural network chunk */}
            {/* <Box maxWidth="500" borderWidth='1px' borderRadius='lg' overflow='hidden' backgroundColor="#FAF9F6">
                <Heading>Visualization Method: vis.js</Heading>
                <Text>This is the text</Text> 
                <NeuralNetwork />
            </Box> */}

            {/* tensorflow attempt */}
            <Box maxWidth="90%" borderWidth='1px' borderRadius='lg' overflow='hidden' maxHeight="50%" backgroundColor="#FAF9F6">
                <TensorFlowComponent/>
            </Box>
            {/* <TensorFlowComponent /> */}
        </div>
    )
}
