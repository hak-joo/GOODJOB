import React, {useState} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const DragDrop = ({...props}) => {
    
    const preferList = [
        { id: '1', title: '문화' },
        { id: '2', title: '급여' },
        { id: '3', title: '복지' },
        { id: '4', title: '업무강도' },
        { id: '5', title: '출퇴근' },
    ];

    return (
        <DragDropContext>
            <Droppable droppableId="preferList">
                {(provided) => (
                    <ul className="preferList" {...provided.droppableProps} ref={provided.innerRef}>
                        {preferList.map(({ id, title }, index) => (
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
