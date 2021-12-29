import { PureComponent } from "react";
import classes from "./CartItem.module.css";
import StoreContext from "../../../Context/StoreContext";

class CartItem extends PureComponent {
  static contextType = StoreContext;

  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }
  componentDidMount() {
    this.setState({ count: this.props.count });
  }
  increaseHandler() {
    const productsInTheCart = JSON.parse(localStorage.getItem(this.props.id));

    console.log(productsInTheCart);
    const itemInCart = productsInTheCart.filter((item) => {
      return item.id === this.props.id;
    })[0];
    itemInCart.count++;
    let index = productsInTheCart.indexOf(itemInCart);

    productsInTheCart[index] = itemInCart;
    this.setState({ count: itemInCart.count });
    localStorage.setItem(this.props.id, JSON.stringify(productsInTheCart));
  }

  decreseHandler() {
    const productsInTheCart = JSON.parse(localStorage.getItem(this.props.id));

    if (productsInTheCart === undefined || productsInTheCart === null) {
      this.setState({ count: 0 });
      return;
    }

    const itemInCart = productsInTheCart.filter((item) => {
      return item.id === this.props.id;
    })[0];

    itemInCart.count--;

    let index = productsInTheCart.indexOf(itemInCart);

    productsInTheCart[index] = itemInCart;
    this.setState({ count: productsInTheCart[index].count });
    if (productsInTheCart[index].count < 1) {
      const newItems = productsInTheCart.filter((item) => {
        return item.id !== this.props.id;
      });
      localStorage.removeItem(this.props.id);
      console.log(newItems);
    } else {
      localStorage.setItem(this.props.id, JSON.stringify(productsInTheCart));
    }
  }
  render() {
    const priceToShow = this.props.prices.filter(
      (item) => item.currency === this.context.currency
    );

    return (
      <div
        className={
          this.state.count >= 1 ? classes.cartItemContainer : classes.hide
        }
      >
        <div className={classes.cartItemInfo}>
          <p className={classes.itemBrand}>{this.props.brand}</p>
          <p className={classes.itemName}>{this.props.name}</p>
          <p
            className={classes.itemPrize}
          >{`${priceToShow[0].amount} ${priceToShow[0].currency}`}</p>

          {this.props.brand === "Microsoft" || this.props.brand === "Sony" ? (
            <p className={classes.sizeCheckBoxName}>color</p>
          ) : (
            <p className={classes.sizeCheckBoxName}>size</p>
          )}
          <section className={classes.sizeSection}>

            {this.props.brand === "Apple"? (
                <p>No size</p>
              ) : (
                this.props.size.map((item) => {
                  return (
                    <div

                      id={Math.random()}
                      key={Math.random()}
                      className={
                        this.props.brand === "Microsoft" ||
                        this.props.brand === "Sony"
                          ? ""
                          : classes.sizeBox
                      }
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid black",
                        width: "2rem",
                        height: "2rem",
                        boxSizing: "content-box",
                        margin: "0.8%",
                        padding: "0",
                        backgroundColor:`${item}`
                      }}
                    >
                      {<p className={classes.sizeText}>{ this.props.brand === "Microsoft" ||
                        this.props.brand === "Sony"?"":item}</p>}
                    </div>
                  );
                })
              )}
          </section>
        </div>

        <div className={classes.cartFunctionality}>
          <button
            onClick={this.increaseHandler.bind(this)}
            className={classes.actions}
          >
            <p>+</p>
          </button>
          <p className={classes.itemCount}>{this.state.count}</p>
          <button
            onClick={this.decreseHandler.bind(this)}
            className={classes.actions}
          >
            <p>-</p>
          </button>
        </div>

        <img
          className={classes.picSetting}
          src={this.props.pics[0]}
          alt="test pic"
        />
      </div>
    );
  }
}

export default CartItem;
