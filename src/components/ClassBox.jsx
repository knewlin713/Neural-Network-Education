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
    fileInputRef.current.setAttribute('multiple', 'multiple')
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
    updateClasses(newClass);
  };

  /**
   * This function handles file uploads
   * @param {React.ChangeEvent<HTMLInputElement>} e 
   */
  const handleImageUpload = (e) => {
    const files = e.target.files;
  if (files.length > 0) {
    const folderImages = [];
    const folderTrainingData = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageUrl = URL.createObjectURL(file);

      folderImages.push({ src: imageUrl, highlighted: 0 });
      folderTrainingData.push({ classID: index, imagePath: imageUrl });
    }

    setImages([...images, ...folderImages]);
    updateTrainingData([...trainingData, ...folderTrainingData]);
  }
  } 
    
    return(
        <Flex direction={'column'} borderWidth="1px" borderRadius="lg" backgroundColor="#FAF9F6" width="500px" height="100%" gap={'10px'} margin={'10px   '}justifyContent={'center'}>
        <Flex direction={'row'} justify={'center'} align={'center'} justifyContent={'center'}>
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

