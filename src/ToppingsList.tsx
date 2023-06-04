import {Topping} from './App.tsx';
import {DragDropContext, Draggable, OnDragEndResponder} from 'react-beautiful-dnd';
import {StrictModeDroppable} from './StrictModeDroppable.tsx';
import {useCallback, useRef, useState} from 'react';
import {ControlsProps} from './Controls.tsx';

 export interface ToppingListProps extends ControlsProps {
   toppings: Topping[],
   onDragEnd:  OnDragEndResponder
 }
  const ToppingsList = ({ toppings, onDragEnd, setToppings}: ToppingListProps) => {
    const removeDialog = useRef<HTMLDialogElement>(null);
    const [toppingToRemove, setToppingToRemove] =  useState<Topping>();
    
    const handleOpenDialog = useCallback(
      (topping: Topping) => {
        if (removeDialog.current) {
          setToppingToRemove(topping)
          removeDialog.current.showModal();
        }
      },
      [removeDialog],
    );
    
    const handleCloseDialog = useCallback(
      () => {
        if (removeDialog.current) {
          removeDialog.current.close();
        }
      },
      [removeDialog],
    );
    const confirmRemove = useCallback(
      () => {
        if (toppingToRemove) {
          const leftToppings = toppings.filter(topping => topping.id !== toppingToRemove.id);
          setToppings(leftToppings)
          handleCloseDialog();
        }
      },
      [toppingToRemove, toppings, setToppings, handleCloseDialog],
    );
    
    
    
    
    return (<>
      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId="droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {
                toppings.map((topping, index) => (
                  <Draggable
                    key={topping.id}
                    index={index}
                    draggableId={topping.id}
                  >
                    {
                      (provided, /*snapshot*/) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex w-[100%] min-h-[80px] item relative mt-2"
                        >
                          <svg className="my-handle absolute top-2 right-2 w-6 h-6 cursor-grab" xmlns="http://www.w3.org/2000/svg"
                               fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"/>
                          </svg>
                          <svg onClick={() => handleOpenDialog(topping)}
                            className="my-handle absolute bottom-2 right-2 w-6 h-6 cursor-pointer"
                               xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                               stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                          </svg>
                          
                          <a
                            className="hover:bg-blue-500  w-[100%] hover:ring-blue-500 hover:shadow-md group rounded-md p-3 bg-white ring-1 ring-slate-200 shadow-sm">
                            <dl className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center text-xs">
                              <div>
                                <dt className="sr-only">Title</dt>
                                <span className={'font-semibold'}>{topping.name}</span>
                              </div>
                              <div>
                                <dt className="sr-only">Category</dt>
                                <span className={'text-caption'}>{topping.description}</span>
                              </div>
                              <div className="col-start-2 row-start-1 row-end-3 sm:mt-4 lg:mt-0 xl:mt-4">
                                <dt className="sr-only">Calories</dt>
                                {topping.calories} calories
                              </div>
                            </dl>
                          </a>
                          
                        </div>
                      )
                    }
                  </Draggable>
                ))
              }
            </div>
          )}
        </StrictModeDroppable>
      
      </DragDropContext>
        <dialog ref={removeDialog} className="rounded-2xl shadow-2xl">
          <div className="p-10 min-w-[300px] relative">
            <svg onClick={handleCloseDialog}
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="currentColor"
                 className="h-6 w-6 absolute right-1 top-1 cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl">Are you sure about removing this {toppingToRemove?.name} ?</h3>
            </div>
            <div className="flex justify-end mt-5">
              <button
                onClick={confirmRemove}
                type="button"
                className="h-5 px-5 py-4  font-semibold rounded-md bg-black text-white flex items-center cursor-pointer shadow-2xl hover:shadow">
                Sure Delete
              </button>
            </div>
          </div>
        </dialog>
      </>
    )
  };

export  default ToppingsList
