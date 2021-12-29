import { PureComponent } from "react";
import { endpoint } from "../../../API/endpoint";
import { Schems } from "../../../API/schems";
import { fetchData } from "../../../API/fetch";
import classes from "./CurrencyScrol.module.css";
import StoreContext from "../../../Context/StoreContext";

class CurrencyScroll extends PureComponent {
  static contextType = StoreContext;
  constructor() {
    super();

    this.state = {

      currencies: [],
    };
  }


  componentDidMount() {
    fetchData(Schems.CURRENCIES, endpoint.graphQL)
      .then((data) => {
        this.setState({ currencies: data.data.currencies });
      })
      .catch((err) => console.log(err));
  }
  setCurrency(event){
    this.context.setCurrency(event.target.value);  }

  render() {

    console.log(this.context.currency)
    const scroll = this.state.currencies.map((item) => (
      <option
        key={`${Math.random()}`}
        className={classes.optionsView}
      >
        {item}
      </option>
    ));

    return <select value={this.context.currency} onChange={this.setCurrency.bind(this)} className={classes.selectView}>{scroll}</select>;
  }
}

export default CurrencyScroll;
