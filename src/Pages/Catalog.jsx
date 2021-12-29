import NavBar from "../Components/UI/Navigation/Navbar";
import ProductList from "../Components/LayOut/ProductsLayOut/ProductList";
import { Fragment, PureComponent } from "react";

class Catalog extends PureComponent {
  render() {
    return (
      <Fragment>
        <header>
          <NavBar />
        </header>
        <main>
          <ProductList />
        </main>
      </Fragment>
    );
  }
}

export default Catalog;
