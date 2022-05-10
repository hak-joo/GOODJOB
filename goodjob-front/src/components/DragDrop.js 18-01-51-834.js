import React, {useState} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const DragDrop =({...props}) => {


    

    return (
        <DragDropContext onDragEnd={props.handleChange}>
            <Droppable droppableId="todos">
                {(provided) => (
                    <ul className="todos" {...provided.droppableProps} ref={provided.innerRef}>
                        {props.preferList.map(({ id, title }, index) => (
                            <Draggable key={id} draggableId={id} index={index}>
                                {(provided) => (
                                    <li ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                        {title}
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default DragDrop;