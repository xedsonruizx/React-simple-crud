// client/src/App.js

import React from "react";
import "./App.css";
import SearchComponent from "./components/SearchComponent";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App py-5">
        <SearchComponent/>
    </div>
  );
}

export default App;