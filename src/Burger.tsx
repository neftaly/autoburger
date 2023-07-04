import { Box, Cylinder } from "@react-three/drei";
import { Flex, Box as FlexBox } from "@react-three/flex";

// eslint-disable-next-line react-refresh/only-export-components
export const toppings = {
  bun: { name: "Wheat Bun" },
  patty: { name: "Beef patty" },
  lettuce: { name: "Iceburg lettuce" },
  tomato: { name: "Roma tomato" },
  cheese: { name: "Cheddar cheese" },
};

export const Bun = () => <Box args={[1.2, 0.2, 1.2]} material-color="khaki" />;

export const Patty = () => <Box args={[1, 0.2, 1]} material-color="brown" />;

export const Cheese = () => (
  <Box args={[1.25, 0.05, 1.25]} material-color="yellow" />
);

export const Lettuce = () => (
  <Box args={[1.1, 0.05, 1.1]} material-color="green" />
);

export const Tomato = () => (
  <group>
    <Cylinder args={[0.45, 0.45, 0.06]} material-color="pink" />
    <Cylinder args={[0.5, 0.5, 0.05]} material-color="red" />
  </group>
);

export const Layer = ({ type }) => {
  return (
    <FlexBox centerAnchor>
      {type === "bun" && <Bun />}
      {type === "patty" && <Patty />}
      {type === "lettuce" && <Lettuce />}
      {type === "tomato" && <Tomato />}
      {type === "cheese" && <Cheese />}
    </FlexBox>
  );
};

// As we're building from the bottom up, reverse the layer order
export const Burger = ({ layers = [] }) => (
  <Flex justifyContent="center" alignItems="center" position={[-0.5, 0, 0]}>
    {layers.map((type, key) => (
      <Layer key={key} type={type} />
    ))}
  </Flex>
);
