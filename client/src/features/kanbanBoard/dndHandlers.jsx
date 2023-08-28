import {arrayMove} from '@dnd-kit/sortable';
import {findContainer} from './dndUtils';
// Fires when drag event is initiated.

function handleDragStart({active}, setActiveId) {
    setActiveId(active.id);
}

// Fires when a draggable item is moved over a droppable container

function handleDragOver({active, over}, items, setItems) {
    const overId = over?.id;

    if (overId == null || active.id in items) {
        return;
    }

    const activeContainer = findContainer(active.id, items);
    const overContainer = findContainer(over.id, items);

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

function handleDragEnd(
    {active, over},
    items,
    setItems,
    setContainers,
    setActiveId
) {
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

    const activeContainer = findContainer(active.id, items);

    if (!activeContainer) {
        setActiveId(null);
        return;
    }

    const overId = over?.id;

    if (overId == null) {
        setActiveId(null);
        return;
    }

    const overContainer = findContainer(over.id, items);

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

export {handleDragStart, handleDragOver, handleDragEnd};
