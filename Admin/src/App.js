import "./App.css";
import Modal from "./components/common/modal/Modal";
import Toast from "./components/common/toast/Toast";
import AppRouter from "./components/routes/AppRouter";

function App() {
  return (
    <div className="App">
      <AppRouter />
      <Toast />
    </div>
  );
}

export default App;
