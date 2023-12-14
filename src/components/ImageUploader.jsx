import * as tf from '@tensorflow/tfjs'
import { MnistData } from '../assets/data'
import * as tfvis from '@tensorflow/tfjs-vis' 
import { Box, Input, Image, Grid, Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import './ImageUploader.css'

export default function ImageUploader({ testImageIndex, images, updateTestImageIndex, updateImages }) {
  //1. Load model
  // const model = mobilenetmodule.load();
  // console.log(model);
  let model = undefined;
  const [path, setPath] = useState();
  //List of image objects with required info
  // const [images, setImages] = useState([]);
  //focusedImage: index of the focusedImage
  const [focusedImageIndex, setFocusedImageIndex] = useState(-1);

  //useeffect hook for async funcs
  // useEffect(() => {
  //   //img code  
  //   async function getModel() {
  //     const imgPath = 'src/assets/dog.webp';
  //     const img = new window.Image();
  //     img.src = imgPath;
  //     //nn code
  //     const model = await mobilenetmodule.load(); //load pre-trained model
  //     const prediction = model.classify(img); //classify pre-trained model
  //     //printing the model info and classificaiton answer
  //     console.log(model);
  //     console.log(prediction);
  //   }
  //   model = getModel();
  // }, []);
  // console.log(model);

  //This function changes the displayed image to the most recently uploaded image
  const handleImageUpload = (e) => {
    //get file from event
    const file = e.target.files[0];
    //set image path
    if (file) {
      // setPath(URL.createObjectURL(file));
      console.log(images);
      console.log(path);
      updateImages([...images, {src: URL.createObjectURL(file), highlighted: 0}]);
      console.log(images);
      // console.log(images);
    }
  } 
  const handleImageClick = (clickedImage, index) => {
      console.log(images);
      if (testImageIndex === index) { //if the previously focused image == current (deselecting)
        updateTestImageIndex(-1);
      } else {
        updateTestImageIndex(index);
      }
      updateImages((prevImages) =>
        prevImages.map((image) => {
          
          return {
            ...image,
            //if curr image is the clicked, highlight. Else, dont highlight
            highlighted: image === clickedImage ? !image.highlighted : 0,
          };
        })
      );
    };


    return (
    <div>
      <Flex height='250px' widht='250px' align={'center'} justify={'center'}> 
        {testImageIndex != -1 ? <Image src={images[testImageIndex].src}/> : <Text>Upload image to test <br />your neural network! </Text>}
      </Flex>
      <Input type="file" accept="image/*" onChange={(e) => {handleImageUpload(e)}}/>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      {/* <div className="imageBox"> */}
        {images.map((image, index) => (
          //below code uses ternary operator to see if the image is the correct image type
          <Image src={image.src} alt={image + ' ' + index} boxSize='250px, 250px' objectFit='cover'  key={index}
            onClick={() => handleImageClick(image, index)}
            border={image.highlighted ? '2px solid blue' : '2px solid transparent'}
            // boxShadow={image.highlighted ? '0 0 10px rgba(0, 0, 255, 0.5)' : 'none'}

          />
        ))}
      {/* </div> */}
      </Grid>

    </div>
    )
}

/*
TODO:
1. Create user interface for user image upload
  DONE a. Have array of images populate a div, map the list DONE
  DONE b. for each image we upload, we add to the list DONE
  DONE c. select an image puts it on preview 
    make list view prettier and have selection logic 
      DONE i. needs to highlight current image
      ii. 
      DONE how to keep track of what to highlight and what to not? 
      DONE new field in the Image prop?

2. Get pretrained model prediction from selected image
3. Train model on website
4. Visualize model
*/

//UPDATE:
/*
1. Go basic image upload and preview/selecting! Some changes to refine later:
  DONE a. Create a component for no image selected instead of just an image and use conditional rendering
  to selectively render the two depending on the currselected var
  DONE b. deselecting makes it so we set the currentlyselected var to nothing 
  c. Drag and drop file upload TOO LAZY
  d. refactor components TOO LAZY
*/

