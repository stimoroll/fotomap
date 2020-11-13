import React, { useContext } from 'react';
import { render } from 'react-dom';
import Map from './components/Map';
import Panel from './components/Panel';
import UIContext from './providers/uiContext';

const App = () => {
  const { Provider } = UIContext;
  const [visibility, setVisibility] = React.useState('hide');
  return (
      <Provider
        value={{visibility, setVisibility}}
      >
        <div>
          <Map />
          <Panel />
        </div>
      </Provider>
  );
}

render(<App />, document.getElementById('root'));
