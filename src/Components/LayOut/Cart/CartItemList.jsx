import { PureComponent } from "react";
import StoreContext from "../../../Context/StoreContext";
import classes from "./CartItemList.module.css";
import CartItem from "../../UI/CartItem/CartItem";

class CartItemList extends PureComponent {
  static contextType = StoreContext;

  constructor() {
    super();
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    let values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      values.push(JSON.parse(localStorage.getItem(keys[i]))[0]);
    }

    console.log(values);
    this.setState({
      items: values,
    });
  }

  render() {
    const CartItems = this.state.items.map((item) => {
      return (
        <CartItem
          key={item.id}
          id={item.id}
          size={item.size}
          prices={item.price}
          pics={item.pics}
          brand={item.brand}
          name={item.name}
          count={item.count}
        />
      );
    });
    return (
      <div className={classes.contaiter}>
        <h1 className={classes.itemTitle}>Cart</h1>
        <div className={classes.listItems}>{CartItems}</div>
      </div>
    );
  }
}

export default CartItemList;
