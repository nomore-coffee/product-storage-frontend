import './App.css';
import ProductPage from './page/Product_page/ProductPage';
import { useSelector } from 'react-redux';

function App() {
  const { productData } = useSelector((store) => store.dataReducer);

  return (
    <div>
     <ProductPage />
    </div>
  );
}

export default App;
