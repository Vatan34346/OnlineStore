import { Fragment, PureComponent } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

class BackDrop extends PureComponent {



  render() {
    return (
      <div className={classes.backdrop} onClick={this.props.onClose}></div>
    );
  }
}

class ModalOverlay extends PureComponent {
  render() {
    return (
      <div className={classes.modal}>
        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}

const portalElement = document.getElementById("modal");

class Modal extends PureComponent {

  render() {
    return (
      <Fragment>
        {ReactDOM.createPortal(
          <BackDrop onClose={this.props.onClose} />,
          portalElement
        )}

        {ReactDOM.createPortal(
          <ModalOverlay>{this.props.children}</ModalOverlay>,
          portalElement
        )}
      </Fragment>
    );
  }
}

export default Modal;
