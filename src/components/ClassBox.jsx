import { Box, Input, Text, Button, Flex, Divider, Grid, Image } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { useState } from 'react'; 

export default function ClassBox({ classLabel, updateClasses, index, trainingData, updateTrainingData }) {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState('');
  const [images, setImages] = useState([]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };


  const handleSubmit = () => {
    setEditMode(false);
    console.log(trainingData);
    updateClasses((prevClasses) => {
        return prevClasses.map((classLabel, i) => (i === index ? value : classLabel));
      });
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
        <Flex direction={'row'}>
        <Text >Class Name: {classLabel}</Text>
        {editMode ? (
          <>
          
            <Input
              value={value}
              onChange={(event) => handleChange(event)}
              placeholder="Here is a sample placeholder"
              size="sm"
            />
            <Button size={'sm'} onClick={handleSubmit}>Submit</Button>
            
          </>
        ) : (
          <EditIcon cursor={"grab"} onClick={() => setEditMode(true)}/>
        )}
        </Flex>
        <Divider orientation='horizontal'/>
        {/* Image upload stuff below */}
        <Input type="file" accept="image/*" onChange={(e) => {handleImageUpload(e)}}/>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {trainingData.filter(datapoint => datapoint.classID === index).map((dataPoint, index) => (
            <Image src={dataPoint.imagePath} key={index}/>
          ))}
        </Grid>
          
      </Flex>
    )
}
