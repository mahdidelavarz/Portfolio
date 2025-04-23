import "./App.css";
import Particle from "./components/Particle";
import Slider from "./components/VerticalSlider";
function App() {
  return (
    <div
      className="w-screen h-[100dvh] bg-no-repeat bg-center bg-cover  bg-[url('/whale.jpg')]"
    >
      <Particle />
      <Slider />
    </div>
  );
}

export default App;
