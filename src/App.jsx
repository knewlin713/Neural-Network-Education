import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import About from './pages/about'
import Contact from './pages/contact'
import NoPage from './pages/NoPage'
import Playground from './pages/Playground'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import 'typeface-ibm-plex-mono';

function App() {
  const [count, setCount] = useState(0)
  const styles = {
    // backgroundImage: `url(${backgroundImage})`, // Set your background image here
    // backgroundSize: 'cover',
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.90), rgb(63, 61, 61))', // Set your desired background color here
    minHeight: '100vh', // Ensures the background color covers the entire viewport height
  };
  const theme = extendTheme({
    fonts: {
      body: 'IBM Plex Mono',
      heading: 'IBM Plex Mono',
    },
    // colors: {
    //   primary: {
    //     500: "#56007a"
    //   },
    //   secondary: {
    //     500: "#8d53a5"
    //   },
    //   action: {
    //     500: "#5dd39e"
    //   }
    // }
  });
  return (
    <div style={styles}>
      <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
          <Route path="playground" element={<Playground />} />
        </Routes>
      </BrowserRouter>
      </ChakraProvider>
      </div>
  )
}

export default App
