import { Box, Input, Text, Button, Flex } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import ClassBox from './ClassBox.jsx'


export default function ClassManager({classes, updateClasses, trainingData, updateTrainingData }) {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState('');
  const [className, setClassName] = useState('');


  const addClass = () => {
    updateClasses([...classes, "Class " + classes.length]);
  }

  return (
    <Flex direction={'column'}>
        {classes.map((classLabel, index) => (
            <ClassBox classLabel={classLabel} updateClasses={updateClasses} index={index} key={index} trainingData={trainingData} updateTrainingData={updateTrainingData}/>
        ))}
        <AddIcon alignSelf={'center'} backgroundColor={'white'} cursor={'grab'} onClick={() => {addClass(); console.log(classes)}}/>
    </Flex>
  );
}
