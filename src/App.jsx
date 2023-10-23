import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import { useEffect, useState } from "react";

const initialTodos = JSON.parse(localStorage.getItem('todos')) || [
  { id: 1, text: "Aprender React.js" },
  { id: 2, text: "Aprender Js" },
  { id: 3, text: "Aprender Vue.js" },
]


const App = () => {

  const [todos, setTodos] = useState(initialTodos);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const copyArray = [...todos];
    const [reorderedItem] = copyArray.splice(startIndex, 1);

    copyArray.splice(endIndex, 0, reorderedItem);

    setTodos(copyArray);

  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h1>TODO App</h1>

      <Droppable droppableId='todos'>
        {
          (droppableProvider) => (
            <ul ref={droppableProvider.innerRef}
              {...droppableProvider.droppableProps}
            >
              {
                todos.map((todo, index) => (
                  <Draggable
                    index={index}
                    key={todo.id}
                    draggableId={`${todo.id}`}
                  >
                    {
                      (provided) => {
                        return (
                          <li
                            key={todo.id}
                            index={index}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            {todo.text}
                          </li>
                        );
                      }
                    }
                  </Draggable>
                ))
              }
              {
                droppableProvider.placeholder
              }
            </ul>
          )
        }

      </Droppable>
    </DragDropContext>
  );
};

export default App;
