import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Canvas from "./components/Canvas";

function App() {
  return (
    <div className="App">
      {/* <TransformWrapper>
        <TransformComponent> */}
          <Canvas />
        {/* </TransformComponent>
      </TransformWrapper> */}
    </div>
  );
}

export default App;
