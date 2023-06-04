import {createContext, useMemo, useState} from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls, } from '@react-three/drei';
import {Burger} from './Burger';
import Controls from './Controls.tsx';

export interface Topping {
  id: string
  name: string
  description?: string
  calories?: number
}


export const ToppingsContext = createContext<Topping[]>([]);


const App = () => {
  
  const [toppings, setToppings] = useState<Topping[]>([
    {id:'1', name:'bun',description:'brioche burn', calories:0},
    {id:'2', name:'patty',description:'', calories:0},
    {id:'3',name:'lettuce',description:'organic lettuce', calories:0},
    {id:'4' ,name:'bun',description:'brioche burn', calories:0},
  ]);
  
  const layers = useMemo(() => toppings.map(t =>t.name), [toppings]);
  
 
  return (
    <ToppingsContext.Provider value={toppings}>
      <div className="relative">
        <Controls setToppings={setToppings}/>
        <Canvas
          style={{
            height: '100vh',
            width: '100vw',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'skyblue',
          }}
        >
          
          <ambientLight intensity={0.5}/>
          <Burger layers={layers} position={[-0.5, 0, 0]}/>
          <OrbitControls
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 1.9}
            makeDefault
          />
        </Canvas>
      </div>
    </ToppingsContext.Provider>
  );
};

export default App;
