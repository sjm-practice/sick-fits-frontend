import React, { Component } from "react";
import Meta from "./Meta";
import Header from "./Header";

class Page extends Component {
  render() {
    const { children } = this.props;

    return (
      <div>
        <Meta />
        <Header />
        {children}
      </div>
    );
  }
}

export default Page;
