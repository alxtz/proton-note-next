import React from "react";
import { Provider } from "react-redux";

import store from "~/store/store";

import ProtonNote from "./ProtonNote";
import GlobalStyles from "./GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyles />
      <Provider store={store}>
        <ProtonNote />
      </Provider>
    </>
  );
}

export default App;
