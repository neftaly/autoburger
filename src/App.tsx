import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Box } from "@react-three/drei";

const types = {
  bun: { color: "yellow", size: [1.2, 0.2, 1.2] },
  patty: { color: "brown", size: [1, 0.2, 1] },
  lettuce: { color: "green", size: [1.1, 0.05, 1.1] },
};

const Slice = ({ color, size, position }) => (
  <Box args={size} material-color={color} position={position} />
);

const Slices = ({ slices }) => {
  const [sliceData, burgerWidth] = slices.reduce(
    ([s, offset], slice) => [[...s, [offset, slice]], offset + slice.size[1]],
    [[], 0]
  );
  return sliceData.map(([offset, slice], key) => (
    <Slice key={key} {...slice} position={[0, offset + slice.size[1] / 2, 0]} />
  ));
};

const App = () => {
  const [slices, setSlices] = useState([
    types.bun,
    types.patty,
    types.lettuce,
    types.bun,
  ]);

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
      <Stage
        intensity={0.5}
        preset="rembrandt"
        adjustCamera={1}
        environment="city"
      >
        <Slices slices={slices} />
      </Stage>

      <OrbitControls
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.9}
        makeDefault
      />
    </Canvas>
  );
};

export default App;
