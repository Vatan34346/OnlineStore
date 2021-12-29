import { PureComponent } from "react";

import classes from "./ProductList.module.css";
import { endpoint } from "../../../API/endpoint";
import { Schems } from "../../../API/schems";
import {fetchData} from '../../../API/fetch';
import ProductCard from "../../UI/ProductCard/ProductCard";


class ProductsLayOut extends PureComponent {
  constructor() {
    super();

    this.state = {
      productList: [],
      filteredProducts: [],
      searchedCategory: "",
    };
  }

  componentDidMount() {
    fetchData(Schems.PRODUCT_SCHEMA,endpoint.graphQL).then(data=>{
      this.setState({productList: data.data.category.products})
    }).catch(err=>console.log(err));


  }

  componentDidUpdate(prevProp, prevState) {
    if (prevState.searchedCategory !== this.state.searchedCategory) {
      this.setState({
        filteredProducts: this.state.productList.filter((item) =>
          item.category.includes(this.state.searchedCategory)
        ),
      });

      
    }
 

  }

  handleInputChange(event) {
    this.setState({
      searchedCategory: event.target.value,
    });
  }

  render() {

    const allProducts = this.state.productList.map((item) => (
      <ProductCard
        key={item.id}
        id={item.id}
        pic={item.gallery[0]}
        name={item.name}
        prices={item.prices}
      />
    ));

    const foundProducts = this.state.filteredProducts.map((item) => (
      <ProductCard
        key={item.id}
        id={item.id}
        pic={item.gallery[0]}
        name={item.name}
        price={item.prices}
        curency={this.context.currency}
      />
    ));

    const itemTODisplay =
      this.state.searchedCategory.length > 0 ? foundProducts : allProducts;

    return (
      <div className={classes.container}>
        <input
          type="text"
          className={classes.searcH}
          placeholder="Category Name"
          onChange={this.handleInputChange.bind(this)}
        />
        <div className={classes.listItems}>{itemTODisplay}</div>
      </div>
    );
  }
}

export default ProductsLayOut;
