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
import SortableColumn from './SortableColumn';
import SortableTask from './SortableTask';

const defaultAnnouncements = {
    onDragStart(id) {
        console.log(`Picked up draggable item ${id}.`);
    },
    onDragOver(id, overId) {
        if (overId) {
            console.log(
                `Draggable item ${id} was moved over droppable area ${overId}.`
            );
            return;
        }

        console.log(`Draggable item ${id} is no longer over a droppable area.`);
    },
    onDragEnd(id, overId) {
        if (overId) {
            console.log(
                `Draggable item ${id} was dropped over droppable area ${overId}`
            );
            return;
        }

        console.log(`Draggable item ${id} was dropped.`);
    },
    onDragCancel(id) {
        console.log(
            `Dragging was cancelled. Draggable item ${id} was dropped.`
        );
    },
};

const KANBAN = () => {
    const [items, setItems] = useState(colums);
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const findContainer = (id) => {
        if (id in items) {
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

    function handleDragStart(event) {
        const {active} = event;
        const {id} = active;

        setActiveId(id);
    }

    function handleDragOver(event) {
        const {active, over, draggingRect} = event;
        const {id} = active;
        const {id: overId} = over;

        // Find the containers
        const activeContainer = findContainer(id);
        const overContainer = findContainer(overId);

        console.log('old container: ', items[activeContainer]);
        console.log('over/new container: ', items[overContainer]);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer === overContainer
        ) {
            return;
        }

        setItems((prev) => {
            const activeItems = prev[activeContainer].tasks;
            const overItems = prev[overContainer].tasks;

            console.log(activeItems);
            console.log(overItems);

            const activeIndex = prev[activeContainer].tasks.findIndex(
                (t) => t._id === active.id
            );
            const overIndex = prev[overContainer].tasks.findIndex(
                (t) => t._id === overId
            );

            let newIndex;
            if (overId in prev) {
                // We're at the root droppable of a container
                newIndex = overItems.length + 1;
            } else {
                const isBelowLastItem =
                    over &&
                    overIndex === overItems.length - 1 &&
                    draggingRect.offsetTop >
                        over.rect.offsetTop + over.rect.height;

                const modifier = isBelowLastItem ? 1 : 0;

                newIndex =
                    overIndex >= 0
                        ? overIndex + modifier
                        : overItems.length + 1;
            }

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

            const activeContainerArray = updatedItems[
                activeContainer
            ].tasks.filter((task) => task._id !== active.id);

            const overContainerArray = [
                updatedItems[overContainer].tasks.slice(0, newIndex),
                items[activeContainer].tasks[activeIndex],
                updatedItems.slice(newIndex, prev[overContainer].tasks.length),
            ];

            console.log(overContainer);
            console.log('updatedItems: ', ...updatedItems);
            console.log('activeContainer: ', ...activeContainerArray);
            console.log('overContainer: ', ...overContainerArray);

            return [
                ...updatedItems,
                ...activeContainerArray,
                ...overContainerArray,
            ];

            // return {
            //     ...prev,
            //     [activeContainer]: [
            //         ...prev[activeContainer].filter(
            //             (item) => item !== active.id
            //         ),
            //     ],
            //     [overContainer]: [
            //         ...prev[overContainer].slice(0, newIndex),
            //         items[activeContainer][activeIndex],
            //         ...prev[overContainer].slice(
            //             newIndex,
            //             prev[overContainer].length
            //         ),
            //     ],
            // };
        });
    }

    function handleDragEnd(event) {
        const {active, over} = event;
        const {id} = active;
        const {id: overId} = over;

        const activeContainer = findContainer(id);
        const overContainer = findContainer(overId);
        // console.log('handleDragStart - Set Active Id to: ', activeId);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer !== overContainer
        ) {
            console.log('returned');
            return;
        }

        // const activeIndex = items[activeContainer].indexOf(active.id);
        // const overIndex = items[overContainer].indexOf(overId);

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

        // if (activeIndex !== overIndex) {
        //     console.log('Hi');
        //     setItems((items) => ({
        //         ...items,
        //         items[overContainer]: arrayMove(
        //             items[overContainer].tasks,
        //             activeIndex,
        //             overIndex
        //         ),
        //     }));
        //     console.log(items);
        // }
        console.log(items);
        setActiveId(null);
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
                announcements={defaultAnnouncements}
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                {/* todo: check later for index */}
                <div className='m-auto flex gap-4'>
                    <div className='flex gap-4'>
                        {items.map((column, i) => {
                            // <div>{column}</div>
                            return (
                                <ColumnLane
                                    key={i}
                                    id={i}
                                    items={column.tasks}
                                    column={column}
                                />
                            );
                        })}
                    </div>
                </div>
                <DragOverlay>
                    {activeId ? renderSortableItemDragOverlay(activeId) : null}
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

        return <SortableTask task={task} dragOverlay />;
    }
};

export default KANBAN;
