import { PureComponent } from "react";
import { Switch, Route } from "react-router-dom";
import StoreContext from "./Context/StoreContext";

// pages
import Catalog from "./Pages/Catalog";
import ProductDetail from "./Pages/ProductDetail";
import Cart from './Pages/Cart';

class App extends PureComponent {
  setCurrency = (currency) => {
    this.setState({ currency: currency });
  };

  setCartItems = (items) => {
    this.setState({ cartItems: items });
  };

setTotalSumm=(price)=>{
  this.setState({totalSumm:price})
}

  state = {
    currency: "USD",
    setCurrency: this.setCurrency,
    cartItems: [],
    setCartItems: this.setCartItems,
  };

  render() {
    return (
      <StoreContext.Provider value={this.state}>
        <Switch>
          <Route path="/" exact>
            <Catalog />
          </Route>

          <Route path="/Product/:id">
            <ProductDetail />
          </Route>
          <Route path="/Cart">
            <Cart/>
          </Route>
        </Switch>
      </StoreContext.Provider>
    );
  }
}

export default App;
