import { AspectRatio, Flex, Card, CardBody, Heading, Text } from "@chakra-ui/react"
import ReactPlayer from 'react-player'
import { forwardRef } from "react"

const Education = forwardRef(({props}, ref) => {
    return(
        <Flex align={'center'} justify={'center'} marginTop={'75px'} direction={'column'} gap={4}>
            <Text color={'white'}>
                Take a look at this short video! It will quickly explain how Object Recognition <br />in computers works and some common
                misconceptions about Artifical Intelligence.
            </Text>
            <Heading color='white' ref={ref}>Education Time</Heading>
            <Flex justify={'space-around'}>
                <ReactPlayer url="https://www.youtube.com/embed/aircAruvnKk?si=50V7Z_lM5pv5k5Yv" controls/>
            </Flex>
            <Text color={'white'}>
        In case you missed that, it is important to remember:<br />
        <strong>Neuron:</strong> In AI, a neuron is like a building block that helps computers <br />
        learn and make decisions by analyzing information and patterns, just like how our brain <br />
        helps us learn and make decisions<br /><br />
        <strong>Neural Network:</strong> virtual neurons that interact similarily to human neurons <br />
        interact to form a network and is able to learn and make decisions.<br /><br />
        <strong>Weights:</strong> tell the computer how important different pieces of information are <br />
        when making decisions, just like how we prioritize different things based on their importance.<br /><br />
        <strong>Decision Boundary:</strong> draws a line that separates different objects based on <br />
        their features, helping the computer decide which category something belongs to.<br /><br />
        And last but not least...<br />
        <strong>Artifical Intelligence is not the same as humans!</strong>
      </Text>
        </Flex>
    )
})

export default Education;
