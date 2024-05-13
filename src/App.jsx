import { useState } from "react";
import NavBar from "../components/NavBar"
import NewsList from "../components/NewsList"

const App = () => {
  const [navApi,setNavApi] = useState("GuardiansApi");

  return (
    <div>
      <NavBar navApi={navApi} setNavApi={setNavApi} />
      <NewsList navApi={navApi} />
    </div>
  )
}

export default App
