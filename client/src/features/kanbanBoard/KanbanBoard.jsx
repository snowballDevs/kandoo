import {useState} from 'react';
import {createPortal} from 'react-dom';
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

import {findContainer, getTaskIds, getNextContainerId} from './dndUtils';
import {handleDragEnd, handleDragOver, handleDragStart} from './dndHandlers';

import Column from './Column';
import SortableTask from './SortableTask';
import SortableColumn from './SortableColumn';
import TaskCard from './TaskCard';
import PlaceholderColumn from './PlaceHolderColumn';

const KanbanBoard = ({boardInfo}) => {
    const {columns} = boardInfo;

    const [items, setItems] = useState(columns);
    const [containers, setContainers] = useState(Object.keys(items));
    const [activeId, setActiveId] = useState(null);
    console.log(boardInfo)

    const PLACEHOLDER_ID = 'placeholder';

    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 10,
        },
    });
    const touchSensor = useSensor(TouchSensor);
    const keyboardSensor = useSensor(KeyboardSensor);
    const sensors = useSensors(pointerSensor, touchSensor, keyboardSensor);

    function renderSortableItemDragOverlay(itemId) {
        const containerId = findContainer(itemId, items);
        const activeIndex = items[containerId].tasks.findIndex(
            (t) => t._id === itemId
        );
        const task = items[containerId].tasks[activeIndex];
        return <TaskCard task={task} dragOverlay />;
    }

    function renderContainerDragOverlay(containerId) {
        const tasks = getTaskIds(items, containerId);

        return (
            <Column column={items[containerId]} items={tasks} dragOverlay>
                {tasks.map((task, index) => (
                    <SortableTask
                        id={task}
                        key={task}
                        task={items[containerId].tasks[index]}
                    />
                ))}
            </Column>
        );
    }

    function handleAddColumn() {
        const newContainerId = getNextContainerId(items);
        const column = {
            title: `Column ${newContainerId}`,
            tasks: [],
        };
        setContainers((prevContainers) => [...prevContainers, newContainerId]);
        setItems((prevItems) => [...prevItems, column]);
    }

    function handleRemoveColumn(containerId) {
        setContainers((prevContainers) =>
            prevContainers.filter((id) => id !== containerId)
        );
    }

    function handleAddTask(containerId) {
        setItems((prevItems) => {
            const taskNumber = prevItems[containerId].tasks.length;

            const random = Math.floor(Math.random() * 5000);

            const newTask = {
                taskName: `${taskNumber + random}`,
                // need to update this to use mongoDB id
                // Each sortable task needs a unique id to work with dnd-kit
                _id: `${taskNumber + random}`,
            };

            const updatedContainer = {
                ...prevItems[containerId],
                tasks: [...prevItems[containerId].tasks, newTask],
            };
            const updatedItems = [...prevItems];
            updatedItems[containerId] = updatedContainer;

            return updatedItems;
        });
    }

    return (
        <div className=' bg-tertiaryLight flex mx-auto py-8'>
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
                                justify-stretch'
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
                                        {taskIds.map((task, index) => (
                                            <SortableTask
                                                id={task}
                                                key={task}
                                                task={
                                                    items[containerId].tasks[
                                                        index
                                                    ]
                                                }
                                                taskName={items[containerId].tasks[index].taskName}
                                                taskComments={items[containerId].tasks[index].comments}
                                                tags={items[containerId].tasks[index].tags}
                                                assignedUserIds={items[containerId].tasks[index].assignedUserIds}
                                                columnName={items[containerId].title}
                                                createdAt={items[containerId].tasks[index].created_at}
                                                boardId={boardInfo._id}
                                                columnId={items[containerId]._id}
                                                priority={items[containerId].tasks[index].priority}
                                            />
                                        ))}
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
                        {activeId &&
                            (containers.includes(activeId)
                                ? renderContainerDragOverlay(activeId)
                                : renderSortableItemDragOverlay(activeId))}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
        </div>
    );
};

export default KanbanBoard;
