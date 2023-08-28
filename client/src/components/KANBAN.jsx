import {useContext, useMemo, useState, useEffect, useRef} from 'react';
import {
    DndContext,
    DragOverlay,
    PointerSensor,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    closestCenter,
    closestCorners,
} from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    horizontalListSortingStrategy,
    verticalListSortingStrategy,
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import ColumnLane from './ColumnLane';
import colums from './data';
import SortableTask from './SortableTask';
import SortableColumn from './SortableColumn';
import TaskCard from './TaskCard';
import {createPortal} from 'react-dom';
import PlaceholderColumn from './PlaceHolderColumn';

const KANBAN = ({boardInfo}) => {
    const {columns} = boardInfo;

    const [items, setItems] = useState(columns);
    const [containers, setContainers] = useState(Object.keys(items));
    const PLACEHOLDER_ID = 'placeholder';

    console.log(items);

    const [activeId, setActiveId] = useState(null);
    const recentlyMovedToNewContainer = useRef(false);

    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 10,
        },
    });

    const touchSensor = useSensor(TouchSensor);
    const keyboardSensor = useSensor(KeyboardSensor);

    const sensors = useSensors(pointerSensor, touchSensor, keyboardSensor);

    const findContainer = (id) => {
        if (id in items) {
            console.log('find container', id);
            return id;
        }

        for (const [key, value] of Object.entries(items)) {
            for (const task of value.tasks) {
                if (task._id === id) {
                    return key;
                }
            }
        }
    };

    // Fires when drag event is initiated.

    function handleDragStart({active}) {
        setActiveId(active.id);
    }

    // Fires when a draggable item is moved over a droppable container

    function handleDragOver({active, over}) {
        const overId = over?.id;

        if (overId == null || active.id in items) {
            return;
        }

        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(over.id);

        if (!overContainer || !activeContainer) {
            return;
        }

        if (activeContainer !== overContainer) {
            setItems((prev) => {
                const activeItems = prev[activeContainer].tasks;
                const overItems = prev[overContainer].tasks;
                console.log(prev);
                console.log(over.id);
                console.log(activeItems);
                console.log(overItems);

                const activeIndex = activeItems.findIndex(
                    (t) => t._id === active.id
                );
                const overIndex = overItems.findIndex((t) => t._id === over.id);

                let newIndex;
                if (over.id in prev) {
                    console.log(over.id);
                    console.log('Fired true');
                    // We're at the root droppable of a container
                    newIndex = overItems.length + 1;
                } else {
                    const isBelowOverItem =
                        over &&
                        active.rect.current.translated &&
                        active.rect.current.translated.top >
                            over.rect.top + over.rect.height;

                    const modifier = isBelowOverItem ? 1 : 0;

                    newIndex =
                        overIndex >= 0
                            ? overIndex + modifier
                            : overItems.length + 1;
                }

                recentlyMovedToNewContainer.current = true;
                console.log(prev);
                const updatedItems = [...prev];

                console.log('Updated items prevstate', updatedItems);

                const updatedActiveContainerTasks = prev[
                    activeContainer
                ].tasks.filter((item) => item._id !== active.id);

                const updatedOverContainerTasks = [
                    ...prev[overContainer].tasks.slice(0, newIndex),
                    prev[activeContainer].tasks[activeIndex],
                    ...prev[overContainer].tasks.slice(
                        newIndex,
                        prev[overContainer].tasks.length
                    ),
                ];

                updatedItems[activeContainer] = {
                    ...updatedItems[activeContainer],
                    tasks: updatedActiveContainerTasks,
                };

                updatedItems[overContainer] = {
                    ...updatedItems[overContainer],
                    tasks: updatedOverContainerTasks,
                };

                return updatedItems;
            });
        }
    }

    //Fires when a draggable item is dropped

    function handleDragEnd({active, over}) {
        if (active.id in items && over?.id) {
            console.log(active.id);
            console.log(over.id);
            setContainers((containers) => {
                const activeIndex = containers.indexOf(active.id);
                const overIndex = containers.indexOf(over.id);
                console.log(overIndex);
                return arrayMove(containers, activeIndex, overIndex);
            });
        }

        const activeContainer = findContainer(active.id);

        if (!activeContainer) {
            setActiveId(null);
            return;
        }

        const overId = over?.id;

        if (overId == null) {
            setActiveId(null);
            return;
        }

        const overContainer = findContainer(over.id);

        if (overContainer) {
            const activeIndex = items[activeContainer].tasks.findIndex(
                (t) => t._id === active.id
            );
            const overIndex = items[overContainer].tasks.findIndex(
                (t) => t._id === overId
            );

            if (activeIndex !== overIndex) {
                setItems((prevItems) => {
                    const updatedItems = [...prevItems];
                    updatedItems[overContainer].tasks = arrayMove(
                        updatedItems[overContainer].tasks,
                        activeIndex,
                        overIndex
                    );
                    return updatedItems;
                });
            }
        }
        setActiveId(null);
    }

    function getTaskIds(container) {
        return items[container].tasks.map((task) => task._id);
    }

    function handleAddColumn() {
        const newContainerId = getNextContainerId();
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

    function getNextContainerId() {
        const containerIds = Object.keys(items);
        const lastContainerId =
            Number(containerIds[containerIds.length - 1]) + 1;
        return `${lastContainerId}`;
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
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
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
                            const taskIds = getTaskIds(containerId);

                            return (
                                <SortableColumn
                                    column={items[containerId]}
                                    key={containerId}
                                    containerId={containerId}
                                    id={`${containerId}`}
                                    items={taskIds}
                                    addTask={handleAddTask}
                                    handleRemove={handleRemoveColumn}
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
                                ? renderContainerDragOverlay(activeId)
                                : renderSortableItemDragOverlay(activeId)
                            : null}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
        </div>
    );

    function renderSortableItemDragOverlay(itemId) {
        const containerId = findContainer(itemId);
        const activeIndex = items[containerId].tasks.findIndex(
            (t) => t._id === itemId
        );
        const task = items[containerId].tasks[activeIndex];

        return <TaskCard task={task} dragOverlay />;
    }

    function renderContainerDragOverlay(containerId) {
        const tasks = getTaskIds(containerId);

        return (
            <ColumnLane column={items[containerId]} items={tasks} dragOverlay>
                {tasks.map((task, index) => (
                    <SortableTask
                        id={task}
                        task={items[containerId].tasks[index]}
                    />
                ))}
            </ColumnLane>
        );
    }
};

export default KANBAN;
