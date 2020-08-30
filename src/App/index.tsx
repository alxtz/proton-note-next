import React from "react";
import { Provider } from "react-redux";

import store from "~/store/store";

import GlobalStyles from "./GlobalStyles";
import ProtonNote from "./ProtonNote";

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
