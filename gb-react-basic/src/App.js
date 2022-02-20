import { PersistGate } from 'redux-persist/integration/react';
import {AllRoutes} from "./routes";
import { Provider } from "react-redux";
import { store, persistor } from "./store";

function App() {

  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor} loading={null}> */}
        <AllRoutes />
      {/* </PersistGate> */}
    </Provider>
  );
}

export default App;
