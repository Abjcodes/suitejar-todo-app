import AddTodo from "./components/AddTodo";

function App() {
  return (
    <div className="App">
      <div className = "MainContainer">
        <div className="leftContainer">
          <AddTodo />
        </div>
        <div className="rightContainer">
          right
        </div>
      </div>
    </div>
  );
}

export default App;
