
import './App.css'
import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';

import { Droppable } from './components/Droppable';
import { Draggable } from './components/Draggable';

function App() {
  const containers = [
    { id: 'todo', title: 'To-do' },
    { id: 'inprogress', title: 'In-Progress' },
    { id: 'done', title: 'Done' }
  ];
  const [todos, setTodos] = useState([])
  const [item, setItem] = useState('')
  const draggableMarkup = (containerId) => (
    todos
      .filter(todo => todo.parent === containerId) // show only items in this container
      .map(todo => (
        <Draggable key={todo.id} id={todo.id}>
          <p>{todo.text}</p>
        </Draggable>
      ))
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === parseInt(active.id)
          ? { ...todo, parent: over.id }
          : todo
      )
    );
  }
  const handleOnClickAdd = () => {
    setTodos([...todos, { id: todos.length + 1, text: item, parent: "todo" }])
    setItem('')
  }
  console.log(item)
  console.log(todos)
  return (
    <>
      <input id="todos-add" type="text" value={item} onChange={(e) => setItem(e.target.value)} />
      <button onClick={handleOnClickAdd}>Add</button>
      <br />
      <DndContext onDragEnd={handleDragEnd}>


        <div className='droppable-box'>
          {containers.map((container) => (
            <div key={container.id} className="column">
              <h3>{container.title}</h3>
            {/* // We updated the Droppable component so it would accept an `id`
              // prop and pass it to `useDroppable` */}
              <Droppable id={container.id} >
                {draggableMarkup(container.id).length > 0
                  ? draggableMarkup(container.id)
                  : 'Drop here'}
              </Droppable>
            </div>
          ))}
        </div>
      </DndContext>
    </>
  )
}

export default App
