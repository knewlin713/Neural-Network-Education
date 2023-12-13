import { Box, Input, Text, Button, Flex, Divider, Grid, Image, IconButton } from '@chakra-ui/react';
import { EditIcon, AddIcon } from '@chakra-ui/icons';
import { useState, useRef } from 'react'; 
import { Add } from '@tensorflow/tfjs';

export default function ClassBox({ classes, classLabel, updateClasses, index, trainingData, updateTrainingData }) {
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
      setImages([...images, {src: URL.createObjectURL(file), highlighted: 0}]);
      updateTrainingData([...trainingData, {classID: index, imagePath: URL.createObjectURL(file)}]);
      console.log(trainingData);
    }
  } 
    
    return(
        <Flex direction={'column'} borderWidth="1px" borderRadius="lg" backgroundColor="white" width="500px" height="100%" gap={'10px'} margin={'10px   '}>
        <Flex direction={'row'} justifyContent="center" >
        <Text >Class Name: {className}</Text>
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
        <Divider orientation='horizontal'/>
        {/* Image upload stuff below */}
        <Input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={(e) => handleImageUpload(e)}
      />
        {/* <Input type="file" accept="image/*" onChange={(e) => {handleImageUpload(e)}}/> */}
        <Text>Training Images</Text>
        
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {trainingData.filter(datapoint => datapoint.classID === index).map((dataPoint, index) => (
            <Image src={dataPoint.imagePath} key={index} width="100%" height="100%"/>
          ))}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="100%"
          >
            <IconButton
              onClick={() => handleRefClick()}
              cursor="pointer"
              icon={<AddIcon />}
              size={'lg'}
              marginRight={'15px'}
            />
          </Box>
        </Grid>
          
      </Flex>
    )
}
