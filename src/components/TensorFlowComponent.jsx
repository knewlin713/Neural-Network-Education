import * as tf from '@tensorflow/tfjs'
import { MnistData } from '../assets/data'
import * as tfvis from '@tensorflow/tfjs-vis' 

export default function TensorFlowComponent() {
    const data = [
        { index: 0, value: 50 },
        { index: 1, value: 100 },
        { index: 2, value: 150 },
      ];
      
    //   // Get a surface
    //   const surface = tfvis.visor().surface({ name: 'Barchart', tab: 'Charts' });
      
    //   // Render a barchart on that surface
    //   tfvis.render.barchart(surface, data, {});
    // let visor=tfvis.visor();
    // visor.isFullscreen = 1  ;
    
      return (
        <div>
          
        </div>
      )
}

