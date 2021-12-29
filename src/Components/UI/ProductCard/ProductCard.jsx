import { PureComponent } from "react";
import { Link } from "react-router-dom";
import { endpoint } from "../../../API/endpoint";
import { Schems } from "../../../API/schems";
import { fetchData } from "../../../API/fetch";

import classes from "./ProductCard.module.css";
import StoreContext from "../../../Context/StoreContext";

class ProductCard extends PureComponent {
  static contextType = StoreContext;

  constructor() {
    super();

    this.state = {
      product: {},
    };
  }

  componentDidMount() {
    fetchData(Schems.PRODUCT(this.props.id), endpoint.graphQL)
      .then((data) => {
        this.setState({ product: data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const prices = this.props.prices.filter(
      (item) => item.currency === this.context.currency
    );
    return (
      <Link
      
        className={classes.Link}
        to={{
          pathname: `/Product/${this.props.id}`,
          state: { product: this.state.product },
        }}
      >
        <div className={classes.productCard}>
          <img src={this.props.pic} alt="cart" className={classes.productPic} />
          <p className={classes.cardTitle}> {this.props.name}</p>
          <p
            className={classes.cardPrice}
          >{`${prices[0].amount} ${prices[0].currency}`}</p>
        </div>
      </Link>
    );
  }
}

export default ProductCard;
