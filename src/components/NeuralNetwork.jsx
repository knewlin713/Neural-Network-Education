import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Button } from '@chakra-ui/react'
import { useState } from 'react';
import {select} from 'd3'
import {Flex, Center} from '@chakra-ui/react'
import { layer } from '@tensorflow/tfjs-vis/dist/show/model';
import * as tf from '@tensorflow/tfjs'


export default function NeuralNetwork({ model, updateModel, activations, classes }) {
  const svgRef = useRef(null);
  const [layerSizes, setLayerSizes] = useState([]);
  const [hiddenLayerSizes, setHiddenLayersSize] = useState([]);
  // useEffect(() => {
  //   const svg = select(svgRef.current).attr('height', 400).attr('width', 800);

  // }, [])
  const visualizeNeuralNetwork = () => {
    const layers = model.layers;
    const inputLayerSize = layers[0].kernel.shape[0];

    // Extract the sizes of hidden layers
    const hiddenLayersSizes = layers.slice(1).map((layer) => layer.kernel.shape[0]);
    setHiddenLayersSize(hiddenLayersSizes);

    // Create an array to represent the layer sizes including input and output layers
    setLayerSizes([inputLayerSize, ...hiddenLayersSizes, classes.length]);
    // const maxNeurons = Math.max(...layerSizes);
    // const svgWidth = 100 + layerSizes.length * 150; // Adjust the multiplier based on your preferences
    // const svgHeight = 2 * maxNeurons * 25;
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
    <div>
      {/* <Center> */}
      
      {/* </Center> */}
      <svg ref={svgRef} />
      <Flex gap={'4px'}>
      <Button onClick={() => visualizeNeuralNetwork()}>Graph</Button>
      <Button onClick={() => addLayer()}>Add Hidden Layer</Button>
      </Flex>
    </div>
  );
};
