import "./App.css";
import Particle from "./components/particle";
function App() {
  return (
    <div className="w-screen h-[100dvh] bg-no-repeat bg-center bg-cover  bg-[url('/whale.jpg')]">
      <div className="w-screen h-screen absolute top-0 bg-gray-900 opacity-40"></div>
      <Particle/>
    </div>
  );
}

export default App;
