import { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import classes from "./ProductInfo.module.css";
import StoreContext from "../../../Context/StoreContext";

class ProductInfo extends PureComponent {
  static contextType = StoreContext;
  constructor() {
    super();
    this.state = {
      size: [],
      id:'',
      price:[],
      pics:[],
      brand:'',
      name:'',
      count:0
    };
  }

  componentDidMount(){
this.setState({
  id:this.props.location.state.product.data.product.id,
  price:this.props.location.state.product.data.product.prices,
  pics:this.props.location.state.product.data.product.gallery,
  brand:this.props.location.state.product.data.product.brand,
  name:this.props.location.state.product.data.product.name,
  count:1
})
  }

  onSubmitHandler(event) {
    event.preventDefault();

    const newItem = {
      id: this.state.id,
      size: this.state.size,
      price: this.state.price,
      pics: this.state.pics,
      brand:this.state.brand,
      name:this.state.name,
      count: this.state.count,
    };

    const productsInCart = this.context.cartItems;

    const itemInCart = productsInCart.filter((item) => {
      return item.id === newItem.id;
    })[0];

    if (itemInCart === undefined) {
      productsInCart.push(newItem);
    } else {
      itemInCart.count++;

      let itemIndex = productsInCart.indexOf(itemInCart);
      productsInCart[itemIndex] = itemInCart;
    }

    this.context.setCartItems(productsInCart);
    localStorage.setItem(this.state.id,JSON.stringify(productsInCart))
    this.props.history.push({pathname:'/'});

  }

  onClickHandler(event) {
    const size = this.state.size;

    size.push(event.target.dataset.size);

    const distinctArray = (value, index, self) => {
      return self.indexOf(value) === index;
    };

    const unique = size.filter(distinctArray);

    this.setState({
      size: unique,
    });
  }

  render() {
    //data from location for simple usage in jsx
    const product = this.props.location.state.product.data.product;
    const sizes =
      product.brand === "Apple" ? "no size" : product.attributes[0].items;
    //filter currency switcher
    const priceToShow = product.prices.filter(
      (item) => item.currency === this.context.currency
    );

    // delete tags from text
    const toPlainText = (tag) => {
      if (tag === null || tag === " ") {
        return false;
      } else {
        tag.toString();
      }
      return tag.replace(/(<([^>]+)>)/gi, " ");
    };

    return (
      <div className={classes.ProductInfoContainer}>
        <aside className={classes.picsGallary}>
          <img
            src={
              product.brand === "Apple"
                ? product.gallery[0]
                : product.gallery[3]
            }
            alt="pic"
            className={classes.galleryItem}
          />
          <img
            src={
              product.brand === "Apple"
                ? product.gallery[0]
                : product.gallery[2]
            }
            alt="pic"
            className={classes.galleryItem}
          />
          <img
            src={
              product.brand === "Apple"
                ? product.gallery[0]
                : product.gallery[1]
            }
            alt="pic"
            className={classes.galleryItem}
          />
        </aside>
        <img
          src={product.gallery[0]}
          alt="main pic"
          className={classes.picSettings}
        />
        <aside className={classes.productDescriptions}>
          <form onSubmit={this.onSubmitHandler.bind(this)}>
            <p className={classes.formTitle}>{product.brand}</p>
            <p className={classes.formSubTitle}>{product.name}</p>
            {product.brand === "Microsoft" || product.brand === "Sony" ? (
             <p className={classes.sizeCheckBoxName}>color</p>
            ) : (
              <p className={classes.sizeCheckBoxName}>size</p>
            )}
            <section className={classes.sizeSection}>
              {product.brand === "Apple"? (
                <p>No size</p>
              ) : (
                sizes.map((item) => {
                  return (
                    <div
                      onMouseOver={() => {}}
                      id={item.id}
                      data-size={item.value}
                      key={item.id}
                      className={
                        product.brand === "Microsoft" ||
                        product.brand === "Sony"
                          ? ""
                          : classes.sizeBox
                      }
                      onClick={this.onClickHandler.bind(this)}
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
                        backgroundColor:`${item.value}`
                      }}
                    >
                      {<p className={classes.sizeText}>{item.value}</p>}
                    </div>
                  );
                })
              )}
            </section>
            <p className={classes.prizeTitle}>price</p>
            <p
              className={classes.priceValue}
            >{`${priceToShow[0].amount} ${priceToShow[0].currency}`}</p>
            <button className={classes.actions}>
              <p>Add to Cart</p>
            </button>
            <p className={classes.footerText}>
              {toPlainText(product.description)}
            </p>
          </form>
        </aside>
      </div>
    );
  }
}
export default withRouter(ProductInfo);
