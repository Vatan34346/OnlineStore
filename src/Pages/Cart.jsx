import { Fragment, PureComponent } from "react";
import NavBar from "../Components/UI/Navigation/Navbar";
import CartItemList from "../Components/LayOut/Cart/CartItemList";

class Cart extends PureComponent {
  render() {
    return (
      <Fragment>
        <header>
          <NavBar />
        </header>
        <main>
          <CartItemList />
        </main>
      </Fragment>
    );
  }
}

export default Cart;
