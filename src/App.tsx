import React from 'react';
import RouteProvider from './routes/routes';
import FormContextProvider from "./context/FormContext";

function App() {
  return (
    <FormContextProvider>
      <RouteProvider />
    </FormContextProvider>
  );
}

export default App;
