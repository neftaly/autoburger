import { Box } from "@react-three/drei";

export const toppings = {
  bun: { color: "yellow", size: [1.2, 0.2, 1.2] },
  patty: { color: "brown", size: [1, 0.2, 1] },
  lettuce: { color: "green", size: [1.1, 0.05, 1.1] },
};

export const Layer = ({ color, size, position }) => (
  <Box args={size} material-color={color} position={position} />
);

export const Burger = ({ layers }) => {
  const [sliceData, burgerWidth] = layers.reduce(
    ([s, offset], slice) => [[...s, [offset, slice]], offset + slice.size[1]],
    [[], 0]
  );
  return sliceData.map(([offset, slice], key) => (
    <Layer key={key} {...slice} position={[0, offset + slice.size[1] / 2, 0]} />
  ));
};
