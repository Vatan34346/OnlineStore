import { PureComponent } from "react";
import classes from "./Navbar.module.css";
import centralIcon from "../../../Materials/CentralIcon.svg";
import dollarIcon from "../../../Materials/dollar.png";
import shppingCartIcon from "../../../Materials/shopping-cart.png";
import Modal from "../Modal/Modal";
import Bag from '../../LayOut/Bag/BagItemList';
import CurrencyScroll from "../CurrencyScroll/CurrencyScroll";

class Navbar extends PureComponent {
  constructor() {
    super();

    this.state = {
      modaleIsHidden: false,
      scrollIsHiddenn: true,
    };
  }

  showModal() {
    this.setState({ modaleIsHidden: true });
  }

  hideModal() {
    this.setState({ modaleIsHidden: false });
    window.location.reload(true);
  }


  render() {
    return (
      <nav className={classes.navContainer}>
        <aside className={classes.leftItems}>
          <div className={classes.navItem}>
            <p>WOMEN</p>
          </div>
          <div className={classes.navItem}>
            <p>MEN</p>
          </div>
          <div className={classes.navItem}>
            <p>KIDS</p>
          </div>
        </aside>

        <div className={classes.centralItem}>
          <img
            className={classes.centralIcon}
            src={centralIcon}
            alt="central"
          />
        </div>

        <aside className={classes.rightItems}>
          <div className={classes.rightNavItem}>
            <img
              className={classes.dollarIcon}
              src={dollarIcon}
              alt="dollar"
            />
            <CurrencyScroll />
          </div>
          <div className={classes.navItem}>
            <img
              className={classes.shooingCarIcon}
              src={shppingCartIcon}
              alt="shopping cart"
              onMouseEnter={this.showModal.bind(this)}
            />
            {this.state.modaleIsHidden && (
              <Modal onClose={this.hideModal.bind(this)}>
                <Bag summ={this.context.totalSumm} />
              </Modal>
            )}
          </div>
        </aside>
      </nav>
    );
  }
}

export default Navbar;
