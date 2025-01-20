
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Shop from '../src/pages/Shop'
import ShopCategory from '../src/pages/ShopCategory'
import Product from '../src/pages/Product'
import Cart from '../src/pages/Cart'
import LoginSignup from '../src/pages/LoginSignup'
import Footer from './components/footer/Footer';
import men_banner from './assets/asset/banner_mens.png'
import womens_banner from './assets/asset/banner_women.png'
import kids_banner from './assets/asset/banner_kids.png'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/mens' element={<ShopCategory banner={men_banner} category='men'/>}/>
        <Route path='/womens' element={<ShopCategory banner={womens_banner} category='women'/>}/>
        <Route path='/kids' element={<ShopCategory banner={kids_banner} category='kid'/>}/>
        <Route path='/product' element={<Product/>}>
          <Route path='/product/:productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}>

        </Route>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
