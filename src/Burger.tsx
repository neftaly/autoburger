import { Box } from "@react-three/drei";
import { Flex, Box as FlexBox } from "@react-three/flex";
import { Vector3} from '@react-three/fiber';



export const toppings = {
  bun: { color: "yellow", args: [1.2, 0.2, 1.2] },
  patty: { color: "brown", args: [1, 0.2, 1] },
  lettuce: { color: "green", args: [1.1, 0.05, 1.1] },
};

export const Layer = ({ type }: { type: string }) => {
  
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { args, color } = toppings[type];
  return (
    <FlexBox centerAnchor>
      <Box args={args} material-color={color} />
    </FlexBox>
  );
};

// As we're building from the bottom up, reverse the layer order
export const Burger = ({ position, layers }:{ position: Vector3, layers: string[]}) => (
  <Flex justifyContent="center" alignItems="center" position={position}>
    {layers.map((type: string, key: number) => (
      <Layer key={key} type={type} />
    ))}
  </Flex>
);
