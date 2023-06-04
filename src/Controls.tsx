import {Topping, ToppingsContext} from './App.tsx';
import {Dispatch, SetStateAction, useCallback, useContext, /*useEffect,*/ useRef, useState} from 'react';
// import Sortable from 'sortablejs';
import ToppingsList from './ToppingsList.tsx';

 export interface ControlsProps {
  setToppings: Dispatch<SetStateAction<Topping[]>>;
}

const toppingsOptions = [
  {name: 'bun', description: 'brioche burn', calories: 0},
  {name: 'patty', description: '', calories: 0},
  {name: 'lettuce', description: 'organic lettuce', calories: 0},
  {name: 'tomato', description: 'organic tomato', calories: 0},
  {name: 'bacon', description: '', calories: 0},
  {name: 'cheese', description: '', calories: 0},
  {name: 'bell peppers', description: 'fire-roasted', calories: 0},
  {name: 'mushroom', description: 'sauteed', calories: 0},
];

const reorder = (list: Topping[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  
  return result;
};

export default function Controls(props: ControlsProps) {
  const toppings = useContext(ToppingsContext);
  const sortableToppingsContainer = useRef<HTMLUListElement>(null);
  const addDialog = useRef<HTMLDialogElement>(null);
  const [newTopping, setNewTopping] = useState<Topping>();
  
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleDragEnd = useCallback(({destination, source}) => {
    if (!destination) return;
    // reorder list
    props.setToppings(reorder(toppings, source.index, destination.index));
  }, [props, toppings]);
  
  const handleOpenDialog = useCallback(
    () => {
      if (addDialog.current) {
        addDialog.current.showModal();
      }
    },
    [addDialog],
  );
  
  const handleCloseDialog = useCallback(
    () => {
      if (addDialog.current) {
        addDialog.current.close();
      }
    },
    [addDialog],
  );
  
  const handleSetNewTopping = useCallback(
    (event: any) => {
      event.preventDefault()
      const newTop = toppingsOptions.find(top => top.name === event.target.value);
      const topping = {id: toppings.length.toString(), ...newTop} as Topping
      setNewTopping(topping);
    },
    [toppings],
  );
  
  const handleAddNew = useCallback(
    (event: any) => {
      event.preventDefault()
      // TODO: Add to toppings and add relevant models
      console.log(newTopping);
      handleCloseDialog()
    },
    [handleCloseDialog, newTopping],
  );
  
  return (
    <section className="absolute top-10 left-10 z-20 min-w-[270px]">
      <header className="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Toppings</h2>
          <a onClick={handleOpenDialog}
             className="hover:bg-gray-800 group flex items-center rounded-md bg-gray-950 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
            <svg width="20" height="20" fill="currentColor" className="mr-2" aria-hidden="true">
              <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z"/>
            </svg>
            New
          </a>
        </div>
        <div/>
      </header>
      <ul ref={sortableToppingsContainer}
          className=" flex  flex-col bg-slate-50 p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 gap-2 leading-6 min-h-[410px]">
        <ToppingsList toppings={toppings} onDragEnd={handleDragEnd} setToppings={props.setToppings}/>
        <li className="flex w-[100%]">
        </li>
      </ul>
      <dialog ref={addDialog} className="rounded-2xl  shadow-2xl">
        <div className="p-10 min-w-[300px] relative">
          <svg onClick={handleCloseDialog}
               xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
               stroke="currentColor"
               className="h-6 w-6 absolute right-1 top-1 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl">Add Topping</h3>
            <form onSubmit={handleAddNew}>
              <div>
                <label>
                  <select
                    name={'newTopping'}
                    value={newTopping?.name}
                    onChange={handleSetNewTopping}
                    className="focus:ring-2 focus:ring-gray-950 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
                  >
                    {
                      toppingsOptions.map((topping, index) => <option key={index}> {topping.name} </option>)
                    }
                  </select>
                
                </label>
                <div className="text-red-800" id="todo-error"></div>
              </div>
              <div className="flex justify-end mt-5">
                <button type="submit"
                        className="h-5 px-5 py-4  font-semibold rounded-md bg-black text-white flex items-center cursor-pointer shadow-2xl hover:shadow">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
}
