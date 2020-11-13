import React from "react";
import ReactLoading from "react-loading";
import './Loader.css';

const Loader = ({type ='spinner', color='#000'}) => (
  <div className="loader">
    <ReactLoading type={type} color={color} />
  </div>
)

export default Loader;