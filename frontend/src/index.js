import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ChakraProvider} from '@chakra-ui/provider'
import { ColorModeScript } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import {mode} from '@chakra-ui/theme-tools'
import {BrowserRouter} from 'react-router-dom'
import { RecoilRoot } from 'recoil';

const style ={
  global:(props) => ({
    body:{
      color:mode('gray.800','whiteAlpa.900')(props),
      bg:mode('gray.100','#101010')(props),
    }
  })
};

const config ={
  initialColorMode:"dark",
  useSystemColorMode:true
}

const color ={
  gray:{
    light:"#616161",
    dark:"#1e1e1e"
  }
}


const theme = extendTheme({config,style,color})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
    <BrowserRouter>
    <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
    </ChakraProvider>
    </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
