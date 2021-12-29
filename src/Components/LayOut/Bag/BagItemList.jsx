import { PureComponent } from "react";
import classes from "./BagItemList.module.css";
import BagItem from "../../UI/BagItem/BagItem";
import StoreContext from "../../../Context/StoreContext";


class BagItemList extends PureComponent {

  static contextType =StoreContext;
  constructor() {
    super();

    this.state = {
      items: [],
      isEmpty: true,
      summ:0
    };

    this.increaseSumm=this.increaseSumm.bind(this)
  }

  componentDidMount() {
    let values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      values.push(JSON.parse(localStorage.getItem(keys[i]))[0]);
    }

    if (values.length > 0) {
      this.setState({ isEmpty: false });
    }

    this.setState({
      items: values,
    });
 
 
 
  }




  increaseSumm(price){
        
    let addedPrice = this.state.summ;
    addedPrice=price;

    this.setState({summ:addedPrice})
  }

  render() {
    const BagItems =
      !this.state.isEmpty &&
      this.state.items.map((item) => {
        return (
          <BagItem
            key={item.id}
            id={item.id}
            size={item.size}
            prices={item.price}
            pics={item.pics}
            brand={item.brand}
            name={item.name}
            count={item.count}
            increase={this.increaseSumm}
          />
        );
      });



    return (
      <div className={classes.contaiter}>
        <h1 className={classes.itemTitle}>My Bag</h1>
        <div className={classes.listItems}>{BagItems}</div>
        <div
          className={classes.listItems}
        >{`Total ${this.state.summ} ${this.context.currency}`}</div>
        <div className={classes.actionsSection}>
          <button className={classes.actions}>View bag</button>
          <button className={classes.actions}>Check Out</button>
        </div>
      </div>
    );
  }
}

export default BagItemList;
