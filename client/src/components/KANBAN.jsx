import {useContext, useMemo, useState, useEffect, useRef} from 'react';
import {
    DndContext,
    //   DragEndEvent,
    //   DragOverEvent,
    DragOverlay,
    //   DragStartEvent,
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

const KANBAN = ({boardInfo}) => {
    const {columns} = boardInfo;

    const [items, setItems] = useState(columns);
    const [containers, setContainers] = useState(Object.keys(items));
    console.log(containers);

    const [activeId, setActiveId] = useState(null);
    const recentlyMovedToNewContainer = useRef(false);

    const mouseSensor = useSensor(MouseSensor);
    const touchSensor = useSensor(TouchSensor);
    const keyboardSensor = useSensor(KeyboardSensor);

    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

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

        // return Object.keys(items).find((key) => {
        //     console.log(items[key].tasks.some((task) => task._id === id));
        //     return items[key].tasks.some((task) => task._id === id);
        // });
    };

    // <div>{column}</div>
    //  return (
    //     <ColumnLane
    //         key={column._id}
    //         id={`${i}`}
    //         items={getIds(column)}
    //         column={column}
    //     />
    // );

    function handleDragStart({active}) {
        setActiveId(active.id);
    }

    function handleDragOver({active, over}) {
        const overId = over?.id;

        if (overId == null || active.id in items) {
            return;
        }

        // Find the containers
        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(over.id);

        console.log('Active container', activeContainer);
        console.log('Over container', overContainer);

        console.log('activecontainer ', items[activeContainer]);
        console.log('over/new container: ', items[overContainer]);

        if (!overContainer || !activeContainer) {
            console.log('No active or not over');
            return;
        }

        if (activeContainer !== overContainer) {
            console.log('Active and over not equal');
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

                console.log(activeIndex);

                console.log(overIndex);

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

                // if (activeIndex !== overIndex) {
                //     console.log('Hi');
                //     setItems((prevItems) => {
                //         const updatedItems = [...prevItems]; // Create a shallow copy of the array
                //         updatedItems[overContainer].tasks = arrayMove(
                //             updatedItems[overContainer].tasks,
                //             activeIndex,
                //             overIndex
                //         );
                //         return updatedItems;
                //     });
                // }

                const updatedItems = [...prev];

                console.log('Updated items prevstate', updatedItems);

                const updatedActiveContainerTasks = prev[
                    activeContainer
                ].tasks.filter((item) => item._id !== active.id);

                console.log(
                    'Active container tasks',
                    updatedActiveContainerTasks
                );

                console.log(prev[activeContainer].tasks);
                console.log(prev[activeContainer].tasks[activeIndex]);

                const updatedOverContainerTasks = [
                    ...prev[overContainer].tasks.slice(0, newIndex),
                    prev[activeContainer].tasks[activeIndex],
                    ...prev[overContainer].tasks.slice(
                        newIndex,
                        prev[overContainer].tasks.length
                    ),
                ];

                console.log('Over container tasks', updatedOverContainerTasks);

                updatedItems[activeContainer] = {
                    ...updatedItems[activeContainer],
                    tasks: updatedActiveContainerTasks,
                };

                updatedItems[overContainer] = {
                    ...updatedItems[overContainer],
                    tasks: updatedOverContainerTasks,
                };

                console.log(updatedItems);

                return updatedItems;
            });
        }
    }

    function handleDragEnd({active, over}) {
        if (active.id in items && over?.id) {
            setContainers((containers) => {
                const activeIndex = containers.indexOf(active.id);
                const overIndex = containers.indexOf(over.id);
                return arrayMove(containers, activeIndex, overIndex);
            });
        }

        const activeContainer = findContainer(active.id);

        // console.log('handleDragStart - Set Active Id to: ', activeId);

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
        // const activeIndex = items[activeContainer].indexOf(active.id);
        // const overIndex = items[overContainer].indexOf(overId);

        if (overContainer) {
            const activeIndex = items[activeContainer].tasks.findIndex(
                (t) => t._id === active.id
            );
            const overIndex = items[overContainer].tasks.findIndex(
                (t) => t._id === overId
            );

            if (activeIndex !== overIndex) {
                console.log('Hi');
                setItems((prevItems) => {
                    const updatedItems = [...prevItems]; // Create a shallow copy of the array
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

    function getIds(column) {
        return items[column].tasks.map((task) => task._id);
    }

    return (
        <div
            className='
        m-auto 
        flex 
        min-h-screen 
        w-full 
        items-center 
        overflow-x-auto 
        overflow-y-hidden 
        px-[40px]
        bg-tertiaryLight
        '
        >
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                {/* todo: check later for index */}

                <SortableContext items={containers}>
                    {containers.map((containderId) => {
                        return (
                            <SortableColumn
                                column={items[containderId]}
                                key={containderId}
                                id={containderId}
                                items={getIds(containderId)}
                            >
                                <SortableContext items={getIds(containderId)}>
                                    {getIds(containderId).map((task, index) => {
                                        console.log(getIds(containderId));
                                        console.log(task);
                                        return (
                                            <SortableTask
                                                id={task}
                                                task={
                                                    items[containderId].tasks[
                                                        index
                                                    ]
                                                }
                                            />
                                        );
                                    })}
                                </SortableContext>
                            </SortableColumn>
                        );
                    })}
                </SortableContext>

                <DragOverlay>
                    {activeId
                        ? containers.includes(activeId)
                            ? renderContainerDragOverlay(activeId)
                            : renderSortableItemDragOverlay(activeId)
                        : null}
                </DragOverlay>
            </DndContext>
        </div>
    );

    function renderSortableItemDragOverlay(itemId) {
        console.log(itemId);
        const containerId = findContainer(itemId);
        console.log(containerId);
        const activeIndex = items[containerId].tasks.findIndex(
            (t) => t._id === itemId
        );
        const task = items[containerId].tasks[activeIndex];

        return <TaskCard task={task} dragOverlay />;
    }

    function renderContainerDragOverlay(containerId) {
        console.log(containerId);
        return (
            <ColumnLane
                column={items[containerId]}
                items={getIds(containerId)}
                dragOverlay
            >
                {getIds(containerId).map((task, index) => (
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
