import { Fragment, PureComponent } from "react";
import Navbar from "../Components/UI/Navigation/Navbar";
import ProductInfo from "../Components/UI/ProductInfo/ProductInfo";

class ProductDetail extends PureComponent {
  render() {
    return (
      <Fragment>
        <header>
          <Navbar />
        </header>
        <main>
          <ProductInfo />
        </main>
      </Fragment>
    );
  }
}

export default ProductDetail