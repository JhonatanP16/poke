import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Header from './Components/Header/Header';
import Details from './Pages/Details';
import Evolutions from './Pages/Evolutions';

function App() {
  return (
    <>
     <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/'>
            <Route index element={<Home/>}/>
            <Route path='details/:pokemon' element={<Details/>}/>
            <Route path='evolution/:id' element={<Evolutions/>}/>
          </Route>
          <Route path='*' element={<Navigate to='/'/>}/>
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
