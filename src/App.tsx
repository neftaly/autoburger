import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";
import { Burger, toppings } from "./Burger";

const App = () => {
  const [layers, setLayers] = useState(["bun", "patty", "lettuce", "bun"]);
  return (
    <Canvas
      style={{
        height: "100vh",
        width: "100vw",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "skyblue",
      }}
    >
      <ambientLight intensity={0.5} />
      <Burger layers={layers} />
      <OrbitControls
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.9}
        makeDefault
      />
    </Canvas>
  );
};

export default App;
