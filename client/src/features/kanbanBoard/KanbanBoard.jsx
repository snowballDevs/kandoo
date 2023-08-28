import {useContext, useMemo, useState, useEffect, useRef} from 'react';
import {findContainer, getTaskIds, getNextContainerId} from './dndUtils';
import {handleDragEnd, handleDragOver, handleDragStart} from './dndHandlers';

import {
    DndContext,
    DragOverlay,
    PointerSensor,
    KeyboardSensor,
    TouchSensor,
    useSensor,
    useSensors,
    closestCorners,
} from '@dnd-kit/core';
import {
    SortableContext,
    horizontalListSortingStrategy,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Column from './Column';
import SortableTask from './SortableTask';
import SortableColumn from './SortableColumn';
import TaskCard from './TaskCard';
import {createPortal} from 'react-dom';
import PlaceholderColumn from './PlaceHolderColumn';

const KanbanBoard = ({boardInfo}) => {
    const {columns} = boardInfo;

    const [items, setItems] = useState(columns);
    const [containers, setContainers] = useState(Object.keys(items));
    const [activeId, setActiveId] = useState(null);

    const PLACEHOLDER_ID = 'placeholder';

    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 10,
        },
    });
    const touchSensor = useSensor(TouchSensor);
    const keyboardSensor = useSensor(KeyboardSensor);
    const sensors = useSensors(pointerSensor, touchSensor, keyboardSensor);

    function handleAddColumn() {
        const newContainerId = getNextContainerId(items);
        const column = {
            title: `Column ${newContainerId}`,
            tasks: [],
        };
        setContainers((containers) => [...containers, newContainerId]);
        setItems((items) => [...items, column]);
    }

    function handleRemoveColumn(containerId) {
        setContainers((containers) =>
            containers.filter((id) => id !== containerId)
        );
    }

    function handleAddTask(containerId) {
        console.log(containerId);
        setItems((items) => {
            const taskNumber = items[containerId].tasks.length;

            const random = Math.floor(Math.random() * 5000);

            const newTask = {
                taskName: `${taskNumber + random}`,
                // need to update this to use mongoDB id
                //Each sortable task needs a unique id to work with dnd-kit
                _id: `${taskNumber + random}`,
            };

            const updatedContainer = {
                ...items[containerId],
                tasks: [...items[containerId].tasks, newTask],
            };
            const updatedItems = [...items];
            updatedItems[containerId] = updatedContainer;

            return updatedItems;
        });
    }

    return (
        <div
            className=' bg-tertiaryLight 
            flex
            mx-auto
            py-8
            '
        >
            <DndContext
                sensors={sensors}
                onDragStart={(e) => handleDragStart(e, setActiveId)}
                onDragOver={(e) => handleDragOver(e, items, setItems)}
                onDragEnd={(e) =>
                    handleDragEnd(
                        e,
                        items,
                        setItems,
                        setContainers,
                        setActiveId
                    )
                }
                collisionDetection={closestCorners}
            >
                <SortableContext
                    items={[...containers, PLACEHOLDER_ID]}
                    strategy={horizontalListSortingStrategy}
                >
                    <div
                        className='      
        px-8
        py-8        
        gap-4
        flex
        max-h-kanban
        overflow-x-auto
        items-stretch
        justify-stretch

        '
                    >
                        {containers.map((containerId) => {
                            // Array of tasksIds for each container
                            const taskIds = getTaskIds(items, containerId);

                            return (
                                <SortableColumn
                                    column={items[containerId]}
                                    key={containerId}
                                    containerId={containerId}
                                    id={`${containerId}`}
                                    items={taskIds}
                                    addTask={handleAddTask}
                                    removeColumn={handleRemoveColumn}
                                >
                                    <SortableContext
                                        items={taskIds}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {taskIds.map((task, index) => {
                                            return (
                                                <SortableTask
                                                    id={task}
                                                    task={
                                                        items[containerId]
                                                            .tasks[index]
                                                    }
                                                />
                                            );
                                        })}
                                    </SortableContext>
                                </SortableColumn>
                            );
                        })}
                        <PlaceholderColumn
                            onClick={handleAddColumn}
                            id={PLACEHOLDER_ID}
                            items={[]}
                        />
                    </div>
                </SortableContext>

                {createPortal(
                    <DragOverlay>
                        {activeId
                            ? containers.includes(activeId)
                                ? renderContainerDragOverlay(activeId, items)
                                : renderSortableItemDragOverlay(activeId, items)
                            : null}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
        </div>
    );

    function renderSortableItemDragOverlay(itemId) {
        const containerId = findContainer(itemId, items);
        const activeIndex = items[containerId].tasks.findIndex(
            (t) => t._id === itemId
        );
        const task = items[containerId].tasks[activeIndex];

        return <TaskCard task={task} dragOverlay />;
    }

    function renderContainerDragOverlay(containerId, items) {
        const tasks = getTaskIds(items, containerId);

        return (
            <Column column={items[containerId]} items={tasks} dragOverlay>
                {tasks.map((task, index) => (
                    <SortableTask
                        id={task}
                        task={items[containerId].tasks[index]}
                    />
                ))}
            </Column>
        );
    }
};

export default KanbanBoard;
