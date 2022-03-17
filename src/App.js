import logo from './logo.svg';
import 'antd/dist/antd.css'
import './App.scss';
import { Page } from '../src/components/page'
import { BrowserRouter } from 'react-router-dom';



function App() {
  return (
      <BrowserRouter>
        <Page/>
      </BrowserRouter>
  );
}

export default App;
