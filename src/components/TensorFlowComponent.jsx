import * as tf from '@tensorflow/tfjs'
import { MnistData } from '../assets/data'
import * as tfvis from '@tensorflow/tfjs-vis' 
import { Box, Input } from '@chakra-ui/react'
import * as mobilenetmodule from '@tensorflow-models/mobilenet'
import { useEffect, useState } from 'react'

export default function TensorFlowComponent() {
  //1. Load model
  // const model = mobilenetmodule.load();
  // console.log(model);
  let model = undefined;
  const [path, setPath] = useState('src/assets/dog.webp');

  //useeffect hook for async funcs
  useEffect(() => {
    //img code  
    async function getModel() {
      const imgPath = 'src/assets/dog.webp';
      const img = new Image();
      img.src = imgPath;
      //nn code
      const model = await mobilenetmodule.load(); //load pre-trained model
      const prediction = model.classify(img); //classify pre-trained model
      //printing the model info and classificaiton answer
      console.log(model);
      console.log(prediction);
    }
    model = getModel();
  }, []);
  // console.log(model);

  //This function changes the displayed image to the most recently uploaded image
  const handleImageUpload = (e) => {
    //get file from event
    const file = e.target.files[0];
    //set image path
    if (file) {
      setPath(URL.createObjectURL(file));
    }

  }
  const data = [
      { index: 0, value: 50 },
      { index: 1, value: 100 },
      { index: 2, value: 150 },
    ];
    

    return (
    <div>
    <Input type="file" accept="image/*" onChange={(e) => {handleImageUpload(e)}}/>
    <img src={path}/>
      Hello world
    </div>
    )
}

/*
TODO:
1. Create user interface for user image upload
  a. Have array of images populate a div, map the list
  b. for each image we upload, we add to the list
  c. select an image puts it on preview

2. Get pretrained model prediction from selected image
3. Train model on website
4. Visualize model
*/
