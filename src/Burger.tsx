import { Box } from "@react-three/drei";
import { Flex, Box as FlexBox } from "@react-three/flex";

export const toppings = {
  bun: { color: "yellow", size: [1.2, 0.2, 1.2] },
  patty: { color: "brown", size: [1, 0.2, 1] },
  lettuce: { color: "green", size: [1.1, 0.05, 1.1] },
};

export const Layer = ({ type }) => (
  <FlexBox centerAnchor>
    <Box args={toppings[type].size} material-color={toppings[type].color} />
  </FlexBox>
);

export const Burger = ({ layers }) => (
  <Flex justifyContent="center" alignItems="center">
    {layers.map((type, key) => (
      <Layer key={key} type={type} />
    ))}
  </Flex>
);
