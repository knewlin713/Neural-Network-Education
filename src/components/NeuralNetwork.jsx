import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Button } from '@chakra-ui/react'
import { useState } from 'react';
import {select} from 'd3'
import {Flex, Center} from '@chakra-ui/react'
import { layer } from '@tensorflow/tfjs-vis/dist/show/model';
import * as tf from '@tensorflow/tfjs'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'



export default function NeuralNetwork({ model, updateModel, activations, classes }) {
  const svgRef = useRef(null);
  const secondRef = useRef(null);
  const [layerSizes, setLayerSizes] = useState([]);
  const [hiddenLayerSizes, setHiddenLayersSize] = useState([]);
  const [connectionsData, setConnectionsData] = useState([]);

  useEffect(() => {
    // Render the graph and detailed view when the component mounts
    const initialize = async () => {
      try {
        await tf.ready(); // Wait for TensorFlow to be ready
        if (!model) {
          console.warn('Model is not available yet.');
          return;
        }

        console.log('Initializing visualization...');
        await visualizeNeuralNetwork();
        await detailedNNViz();
        console.log('Visualization complete.');
      } catch (error) {
        console.error('Error during initialization:', error);
      }
    };
    initialize();
  }, [model]);

  const visualizeNeuralNetwork = async() => {
    const layers = model.layers;
    const inputLayerSize = layers[0].kernel.shape[0];

    // const weights = layers[0].getWeights()[0];
    // const weightMatrix = await weights.array();
    // console.log(weightMatrix);
    // Extract the sizes of hidden layers
    const hiddenLayersSizes = layers.slice(1).map((layer) => layer.kernel.shape[0]);
    setHiddenLayersSize(hiddenLayersSizes);

    // Create an array to represent the layer sizes including input and output layers
    setLayerSizes([inputLayerSize, ...hiddenLayersSizes, classes.length]);

    console.log(layerSizes);
    const svgWidth = (layerSizes.length + 1) * 100;
    const height = (calcPrefixNodes(layerSizes[0], 0) * 2) * 75;
    const svg = d3.select(svgRef.current).attr('width', svgWidth).attr('height', height)
    svg.selectAll('*').remove();

    drawLayer(svg, 100, inputLayerSize, 0, "input layer");
    hiddenLayerSizes.forEach((size, i) => {
      drawLayer(svg, (i + 2) * 100 , size, i + 1, "Hidden layer " + i);
    })
    drawLayer(svg, layerSizes.length * 100 ? layerSizes.length * 100 : 200, classes.length, 1, 'output layer');
    console.log(svg);
  }

  const drawLayer = (svg, x, size, index, layerName) => {
    const svgHeight = parseInt(svg.attr('height'));
    const centerY = svgHeight / 2;
    // const maxNeurons = Math.max(...layerSizes);
    // const svgHeight = 2 * maxNeurons * 25;

    // svg.selectAll('*').remove();
    // const layer = svg.append('g');

    const pre = calcPrefixNodes(size, index);
    console.log(pre);
    
    if (size > 6) {
      const layerNameText = svg.append('g')
      .append('text')
      .attr('x', x)
      .attr('y', centerY - (pre * 50) - 40)
      .text(layerName)
      .attr('text-anchor', 'middle')
      .attr('font-weight', 'bold');
      //solve with line break just like i did with neuron size

      const nodesBefore = svg.append('g')
      .selectAll("circle")
      .data(d3.range(pre))
      .enter()
      .append("circle")
      .attr("cx", x)
      .attr("cy", (data) => centerY - (data + pre / 2) * 50 )
      .attr("r", 15)
      .attr("fill", 'blue')
      .attr('stroke', 'black')

      const elipse = svg.append('g')
      .append('text')
      .attr('x', x)
      .attr('y', centerY)
      .text('...')
      .attr('text-anchor', 'middle')
      .attr('font-weight', 'bold')
      
      const nodesAfter = svg.append('g')
      .selectAll("circle")
      .data(d3.range(pre))
      .enter()
      .append("circle")
      .attr("cx", x)
      .attr("cy", (data) => centerY + (data + pre / 2) * 50 )
      .attr("r", 15)
      .attr("fill", 'blue')
      .attr('stroke', 'black')

      const neuronLabel = svg.append('g')
      .append('text')
      .attr('x', x)
      .attr('y', centerY + (pre * 50) + 50) // Adjust the position based on your preference
      .text(`Neurons:`)
      .attr('text-anchor', 'middle');

      const neuronSize = svg.append('g')
      .append('text')
      .attr('x', x - 15)
      .attr('y', centerY + (pre * 50) + 75)
      .text(`${size}`)

    } else {
      const layerNameText = svg.append('g')
      .append('text')
      .attr('x', x)
      .attr('y', centerY - (size * 25))
      .text(layerName)
      .attr('text-anchor', 'middle')
      .attr('font-weight', 'bold');
      const layer = svg.append('g')
      .selectAll("circle")
      .data(d3.range(size))
      .enter()
      .append("circle")
      .attr("cx", x)
      .attr("cy", (data) => centerY + (data - (size - 1) / 2) * 50)
      .attr("r", 15)
      .attr("fill", 'blue')
      .attr('stroke', 'black')

      const neuronLabel = svg.append('g')
      .append('text')
      .attr('x', x)
      .attr('y', centerY + (size * 25) + 20) // Adjust the position based on your preference
      .text(`Neurons:`)
      .attr('text-anchor', 'middle');

      const neuronSize = svg.append('g')
      .append('text')
      .attr('x', x - 10)
      .attr('y', centerY + (size * 25) + 40)
      .text(`${size}`)
  }

    }
    

  const calcPrefixNodes = (size, index) => {
    if (size - index > 3 && index == 0) {
      return 3;
    }
    if (size - index > 2 && index == 1) {
      return 2;
    }
    if (size - index > 1 && index == 2) {
      return 1;
    }
    return 1;
  }

  const heatMapWeights = async() => {
      // Get the weights of the specified layer
      const layer = model.layers[0];
      const weights = layer.getWeights()[0]; // Assuming it's the first weight (e.g., kernel)

      // Assuming a 2D weight matrix (e.g., for a dense layer)
      const weightMatrix = await weights.array();

      // Determine the dimensions of the weight matrix
      const numRows = weightMatrix.length;
      const numCols = weightMatrix[0].length;

      // Set up SVG
      const svg = d3.select(secondRef.current);
      svg.selectAll('*').remove();

      // Create a color scale for the heatmap
      const colorScale = d3.scaleSequential(d3.interpolateViridis).domain([-1, 1]);

      // Set the size of each cell in the heatmap
      const cellSize = 20;

      // Draw the heatmap
      svg
        .selectAll('circle')
        .data(weightMatrix.flat())
        .enter()
        .append('rect')
        .attr('x', (d, i) => (i % numCols) * cellSize)
        .attr('y', (d, i) => Math.floor(i / numCols) * cellSize)
        .attr('width', cellSize)
        .attr('height', cellSize)
        .attr('fill', (d) => colorScale(d));

      // Add labels (optional)
      svg
        .selectAll('text')
        .data(weightMatrix.flat())
        .enter()
        .append('text')
        .text((d) => d.toFixed(2))
        .attr('x', (d, i) => (i % numCols) * cellSize + cellSize / 2)
        .attr('y', (d, i) => Math.floor(i / numCols) * cellSize + cellSize / 2)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle');
    };

  const detailedNNViz = async() => {
    const layers = model.layers;
    const inputLayerSize = layers[0].kernel.shape[0];

    const weights = layers[0].getWeights()[0];
    const weightMatrix = await weights.array();
    // console.log(weightMatrix[0]);
    // Extract the sizes of hidden layers
    const hiddenLayersSizes = layers.slice(1).map((layer) => layer.kernel.shape[0]);
    setHiddenLayersSize(hiddenLayersSizes);

    // Create an array to represent the layer sizes including input and output layers
    setLayerSizes([inputLayerSize, ...hiddenLayersSizes, classes.length]);

    console.log(layerSizes);
    const svgWidth = (layerSizes.length + 1) * 100;
    const height = (layerSizes[0]) * 50 + 100;
    const container = d3.select(secondRef.current)
      .style('height', height) // Set the height based on your preference
      .style('overflow-y', 'scroll')

    let svg = container.append('svg')
    // .attr('width', svgWidth).attr('height', height);

    if (!svg.empty()) {
      // If the SVG element doesn't exist, create a new one
      container.selectAll('*').remove();
    } 
      // If the SVG element already exists, clear its contents
      svg = container.append('svg').attr('width', svgWidth).attr('height', height);
    // svg.selectAll('*').remove();
    // svg.append('text').attr('x', 100).attr('y', 100).text('hi');
    detailedDraw(svg, 100, inputLayerSize, 0, "input layer");
    hiddenLayerSizes.forEach((size, i) => {
      detailedDraw(svg, (i + 2) * 100 , size, i + 1, "Hidden layer " + i);
    })
    detailedDraw(svg, layerSizes.length * 100 ? layerSizes.length * 100 : 200, classes.length, layerSizes.length, 'output layer');
    // svg.selectAll('*').each(function() {
    //   console.log(this);
    // });
    // console.log(height);


  }

  
  
  const detailedDraw = async(svg, x, size, index, layerName) => {
    const svgHeight = (layerSizes[0]) * 50 + 100;
    const centerY = svgHeight / 2;
    // const maxNeurons = Math.max(...layerSizes);
    // const svgHeight = 2 * maxNeurons * 25;

    // svg.selectAll('*').remove();
    // const layer = svg.append('g');

    ;
    
    
    const layerNameText = svg.append('g')
    .append('text')
    .attr('x', x)
    .attr('y', centerY - (size * 25))
    .text(layerName)
    .attr('text-anchor', 'middle')
    .attr('font-weight', 'bold');

    const layer = svg.append('g')
    .selectAll("circle")
    .data(d3.range(size))
    .enter()
    .append("circle")
    .attr("cx", x)
    .attr("cy", (data) => 100 + data * 50)
    .attr("r", 15)
    .attr("fill", 'blue')
    .attr('stroke', 'black')

      // const layerWeights = weightMatrix[index];
      // console.log(weightMatrix)
      // return;
      

      //lines calculate and render
      if (index != layerSizes.length) {
        const weightsArray = model.layers[index].getWeights();
        console.log(index);
        console.log(weightsArray);
        const weightMatrix = await weightsArray[0].array();
        const sourceX = x;
        for (let sourceNeuronIndex = 0; sourceNeuronIndex < size; sourceNeuronIndex++) {
          for (let targetNeuronIndex = 0; targetNeuronIndex < weightMatrix[sourceNeuronIndex].length; targetNeuronIndex++) {
            // console.log(sourceNeuronIndex, targetNeuronIndex);
            const sourceY = 100 + sourceNeuronIndex * 50;
            const targetY = 100 + targetNeuronIndex * 50;
      
            const weight = Math.abs(weightMatrix[sourceNeuronIndex][targetNeuronIndex]) * 2;
            
            svg.append('line')
              .attr('x1', sourceX)
              .attr('y1', sourceY)
              .attr('x2', x + 100)
              .attr('y2', targetY)
              .attr('stroke', 'gray')
              .attr('stroke-width', weight);
          }
        }
    }
    const neuronLabel = svg.append('g')
    .append('text')
    .attr('x', x)
    .attr('y', centerY + (size * 25) + 30) // Adjust the position based on your preference
    .text(`Neurons:`)
    .attr('text-anchor', 'middle');

    const neuronSize = svg.append('g')
    .append('text')
    .attr('x', x - 10)
    .attr('y', centerY + (size * 25) + 50)
    .text(`${size}`)


  }


  const addLayer = () => {
    console.log('adding');
    const secondToLastIndex = layerSizes.length - 2;
    const newLayer = tf.layers.dense({ units: Math.round(layerSizes[secondToLastIndex] / 2), activation: 'relu', name: 'Hidden layer ' + hiddenLayerSizes.length - 1})
    let newModel = tf.sequential();
    for (let i = 0; i < secondToLastIndex; i++) {
      newModel.add(model.layers[i]);
    }
    newModel.add(newLayer);
    newModel.add(tf.layers.dense({units: classes.length, activation: 'softmax'}));
    updateModel(newModel);
  }

  return (
    // <div>
    //   <Flex>
    //   <Tabs>
    //     <TabList>
    //       <Tab>Overall Structure</Tab>
    //       <Tab>Detailed View</Tab>
    //     </TabList>

    //     <TabPanels>
    //       <TabPanel>
    //         <svg ref={svgRef}/>
    //       </TabPanel>
    //       <TabPanel _loading={'lazy'}>
    //         <div ref={secondRef}/>
    //       </TabPanel>
    //     </TabPanels>
    //   </Tabs>
    //   {/* <svg ref={svgRef} /> */}
      
    //   <Flex gap={'4px'}>
    //   <Button onClick={() => visualizeNeuralNetwork()}>Graph</Button>
    //   <Button onClick={() => detailedNNViz()}>Detailed Draw</Button>
    //   <Button onClick={() => addLayer()}>Add Hidden Layer</Button>
    //   </Flex>
    //   </Flex>

      <div>
    {model ? (
      <Flex>
        <Tabs>
          {/* ... (your existing code) ... */}
          <TabList>
          <Tab>Overall Structure</Tab>
          <Tab>Detailed View</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <svg ref={svgRef}/>
          </TabPanel>
          <TabPanel _loading={'lazy'}>
            <div ref={secondRef}/>
          </TabPanel>
        </TabPanels>
        </Tabs>
        <Flex gap={'4px'}>
          <Button onClick={() => visualizeNeuralNetwork()}>Graph</Button>
          <Button onClick={() => detailedNNViz()}>Detailed Draw</Button>
          <Button onClick={() => addLayer()}>Add Hidden Layer</Button>
        </Flex>
      </Flex>
    ) : (
      <p>Loading or no model available.</p>
    )}
  {/* </div> */}
    </div>
  );
};

