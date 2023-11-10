import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Read from './Components/Read';
import Create from './Components/Create';
import Edit from './Components/Edit';

function App() {
  return (
    <div className="App ">
      <header className="App-header">

        

        <BrowserRouter>

          <Routes>

            <Route path='/' element={<Read />} />
            <Route path='/create' element={<Create />} />
            <Route path='/Read/:id' element={<Edit/>}/>


          </Routes>

        </BrowserRouter>


      </header>
    </div>
  );
}

export default App;
