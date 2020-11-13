import React, { useState } from 'react';
import './Panel.css';
import UIContext from '../../providers/uiContext.js';

function Panel(props) {
  const [count, setCount] = useState(0);
  const {visibility, setVisibility} = React.useContext(UIContext);

  return (
    <div className={`panel ${visibility}`}>
      {props.children}
      <button onClick={() => setVisibility('hide')}>X</button>
    </div>
  );
}

export default Panel;