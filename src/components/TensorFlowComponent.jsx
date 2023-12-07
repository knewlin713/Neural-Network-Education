import * as tf from '@tensorflow/tfjs'
import { MnistData } from '../assets/data'
import * as tfvis from '@tensorflow/tfjs-vis' 
import { Box } from '@chakra-ui/react'
import * as mobilenetmodule from '@tensorflow-models/mobilenet'
import { useEffect } from 'react'

export default function TensorFlowComponent() {
  //1. Load model
  // const model = mobilenetmodule.load();
  // console.log(model);
  let model = undefined;

  useEffect(() => {
    async function getModel() {
      const imgPath = 'src/assets/dog.webp';
      const img = new Image();
      img.src = imgPath;
      const model = await mobilenetmodule.load();
      const prediction = model.classify(img);
      console.log(model);
      console.log(prediction);
    }
    model = getModel();
  }, []);
  // console.log(model);


  //make a new Javascript image
  
  // tf.browser.fromPixels(img, 'float32');


  const data = [
      { index: 0, value: 50 },
      { index: 1, value: 100 },
      { index: 2, value: 150 },
    ];
    

    return (
    <div>
      Hello world
    </div>
    )
}

