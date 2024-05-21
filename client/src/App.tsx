import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ShopContextProvider } from "./context/shop-context";
import AuthPage from "./pages/Auth/Index";
import ShopPage from "./pages/shop/Index";
import CheckoutPage from "./pages/checkout/Index";
import PerchasePage from "./pages/perchased-items/Index";

function App() {
  return (
    <div className="App">
      <Router>
        <ShopContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<ShopPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/purchased-items" element={<PerchasePage />} />
          </Routes>
        </ShopContextProvider>
      </Router>
    </div>
  );
}

export default App;
