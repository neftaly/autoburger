import { Box } from "@react-three/drei";
import { Flex, Box as FlexBox } from "@react-three/flex";

export const toppings = {
  bun: { color: "yellow", args: [1.2, 0.2, 1.2] },
  patty: { color: "brown", args: [1, 0.2, 1] },
  lettuce: { color: "green", args: [1.1, 0.05, 1.1] },
};

export const Layer = ({ type }) => {
  const { args, color } = toppings[type];
  return (
    <FlexBox centerAnchor>
      <Box args={args} material-color={color} />
    </FlexBox>
  );
};

// As we're building from the bottom up, reverse the layer order
export const Burger = ({ layers = [] }) => (
  <Flex justifyContent="center" alignItems="center" position={[-0.5, 0, 0]}>
    {layers.map((type, key) => <Layer key={key} type={type} />).reverse()}
  </Flex>
);
