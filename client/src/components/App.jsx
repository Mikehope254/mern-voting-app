import React, { Component } from "react";
import api from "../services/api";

// function App() {
//   return (
//     <div>
//       <h1>App Works</h1>
//     </div>
//   );
// }

class App extends Component {
  async componentDidMount() {
    const result = await api.call("post", "auth/login", {
      username: "username",
      password: "password",
    });

    console.log(result);
  }

  render() {
    return <div>App works</div>;
  }
}
export default App;
