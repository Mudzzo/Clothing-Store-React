import { Routes, Route} from 'react-router-dom';
import NavigationBar from './components/routes/NavigationBar/NavigationBar.component';
import Home from './components/routes/home/home.component';
import Authentication from './components/routes/authentication/authentication.component';
import Shop from './components/routes/shop/shop.components';
import CheckOut from './components/routes/checkout/check-out.component';


const App = () => {

  return (
    <Routes>
      <Route path='/' element={<NavigationBar/>}>
        <Route  index element={<Home/>} />
        <Route path='shop' element={<Shop/>} />
        <Route path='auth' element={<Authentication/>} />
        <Route path='check-out' element={<CheckOut/>}/>
      </Route>

    </Routes>
  )
       
}

export default App;
