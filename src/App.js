import "./App.css";
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <Navbar title="Todos App" />
      <TodoList />
    </>
  );
}

export default App;
