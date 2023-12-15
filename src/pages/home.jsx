import Header from '../components/header';
import { Flex, Heading, Text } from "@chakra-ui/react"
import backgroundImage from '../assets/spider.jpg';
import Playground from './Playground';
import Landing from '../components/Landing';
import AboutUs from '../components/AboutUs'
import Education from '../components/Education'
import { useRef, forwardRef, createRef } from 'react';

export default function Home(){
  
    const educationRef = createRef();
    const playgroundRef = createRef();
    const aboutusRef = createRef();
    const landingRef = createRef();

    
    return(
        <div>
        <Header educationRef={educationRef} playgroundRef={playgroundRef} aboutusRef={aboutusRef} landingRef={landingRef}/>
        <div style={{ height: '70vh' }}>
            <Landing ref={landingRef} playgroundRef={playgroundRef}/>
        </div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
      <p style={{ textAlign: 'center', color:'white' }}>
        Take a look at this short video! It will quickly explain how Object Recognition <br />in computers works and some common
        misconceptions about Artifical Intelligence.
      </p>
    </div>
        <div style={{ height: '40vh' }}>
            <Education ref={educationRef}/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
      <p style={{ textAlign: 'center', color:'white' }}>
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
      </p> 
    </div>
        <div style={{ height: '180vh' }}>ref={}
            <Playground ref={playgroundRef}/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '45vh' }}>
      <p style={{ textAlign: 'center', color:'white' }}>
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
      </p>
    </div>
        <div style={{ height: '40vh' }}>
            <AboutUs ref={aboutusRef}/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '40vh' }}>
        <Heading color="white">Our Mission</Heading> 
      <p style={{ textAlign: 'center', color:'white' }}>
        Sometimes it is difficult to conceptulize artificial intelligence in object <br />
        recognition due to its complexity. We want to make sure that people who want <br />
        to learn about it, especially children, are able to. In addition, we hope to <br />
        see a world where misconceptions about AI are limited. With one step at a time,<br />
        we hope to bring AI education to youth. 

      </p>
    </div>
        </div>
    )
}
//maybe remove about us an descibe nueural networks a bit with a blurb and such
