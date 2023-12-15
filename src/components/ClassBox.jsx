import { Box, Input, Text, Button, Flex, Divider, Grid, Image, IconButton } from '@chakra-ui/react';
import { EditIcon, AddIcon } from '@chakra-ui/icons';
import { useState, useRef, useEffect } from 'react'; 
import { Add } from '@tensorflow/tfjs';


export default function ClassBox({ classes, classLabel, updateClasses, index, trainingData, updateTrainingData }) {
  useEffect(() => {
    console.log("class box rerendered");
  });
  
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState('');
  const [images, setImages] = useState([]);
  const [className, setClassName] = useState(classLabel)
  const fileInputRef = useRef(null);


  const handleRefClick = () => {
    fileInputRef.current.click();
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };
//code academy

  const handleSubmit = () => {
    setEditMode(false);
    setClassName(value);
    console.log('New Value:', value);
    const newClass = classes.map((classLabel, i) => (i === index ? value : classLabel));
    console.log('Updated Classes:', newClass);
    updateClasses(newClass);
  };

  /**
   * This function handles file uploads
   * @param {React.ChangeEvent<HTMLInputElement>} e 
   */
  const handleImageUpload = (e) => {
    //get file from event
    const file = e.target.files[0];
    //set image path
    if (file) {
      setImages(prevImages => [...prevImages, {src: URL.createObjectURL(file), highlighted: 0}]);
      updateTrainingData(prevData => [...prevData, {classID: index, imagePath: URL.createObjectURL(file)}]);
      console.log(trainingData);
    }
  } 
    
    return(
        <Flex direction={'column'} borderWidth="1px" borderRadius="lg" backgroundColor="white" width="500px" height="100%" gap={'10px'} margin={'10px   '}>
        <Flex direction={'row'} justify={'center'} align={'center'} >
        <Text  as='b'>{className}</Text>
        {editMode ? (
          <>
          
            <Input
              value={value}
              onChange={(event) => handleChange(event)}
              placeholder="Here is a sample placeholder"
              size="sm"
            />
            <Button size={'sm'} onClick={() => handleSubmit()}>Submit</Button>
            
          </>
        ) : (
          <EditIcon justifySelf={'center'} alignSelf={'center'} marginLeft={'10px'} cursor={"grab"} onClick={() => setEditMode(true)}/>
        )}
        </Flex>
        <Divider orientation='horizontal' borderColor="black"  marginTop={'-5px'} marginBottom={'-5px'}/>
        {/* Image upload stuff below */}
        <Input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={(e) => handleImageUpload(e)}
      />
        {/* <Input type="file" accept="image/*" onChange={(e) => {handleImageUpload(e)}}/> */}
        <Text paddingLeft={'1em'}>Training Images</Text>
        
        <Flex gap={1} overflowX={'scroll'} width={'500'} height={'100'} margin={'10px'}>
        
            <IconButton
              onClick={() => handleRefClick()}
              cursor="pointer"
              icon={<AddIcon />}
              size={'lg'}
              width={'20%'}
              height={'100%'}
            />
            <Flex overflowX={'scroll'} >
          {trainingData.filter(datapoint => datapoint.classID === index).map((dataPoint, index) => (
            <Image src={dataPoint.imagePath} key={index} width="100%" height="100%" objectFit="cover" padding={'1'} borderRadius={'10px'} aspectRatio={'1'} />
          ))}
          </Flex>
          
        </Flex>
      </Flex>
    )
}

