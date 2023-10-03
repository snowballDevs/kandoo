import {useEffect, useState} from 'react';
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
import TaskCard from '../Task/TaskCard';
import PlaceholderColumn from './PlaceHolderColumn';
import {useModalContext} from '../../../contexts/ModalContext/ModalContext';
import {useSelectedBoardContext} from '../../../contexts/BoardContext/boardContext';
import WorkspaceSlideOver from '../components/WorkspaceSlideOver';
import dataService from '../../../services/dataService';

const KanbanBoard = ({boardInfo}) => {
    const {handleSlideOver, isSlideOverOpen, setIsSlideOverOpen} =
        useModalContext();
    const {
        selectedTaskId,
        setSelectedTask,
        selectedColumnId,
        setSelectedColumn,
        selectedBoard,
        setSelectedBoard,
        items,
        setItems,
        containers,
        setContainers,
    } = useSelectedBoardContext();

    const [activeId, setActiveId] = useState(null);
    // console.log(boardInfo)

    console.log(items);

    const PLACEHOLDER_ID = 'placeholder';

    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 10,
        },
    });
    const touchSensor = useSensor(TouchSensor);
    const sensors = useSensors(pointerSensor, touchSensor);

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

    // For keeping db up to date with the ui
    async function handleDND(items) {
        const boardId = selectedBoard._id;

        // Tell DB the updated state of the board
        const response = await dataService.updateBoardItems(boardId, {
            items,
        });

        console.log(response);
    }

    async function handleAddColumn() {
        const boardId = selectedBoard._id;
        const columnTitle = `Column ${items.length + 1}`;

        const response = await dataService.createColumn(boardId, {
            columnTitle,
        });

        const newContainerId = getNextContainerId(items);
        console.log(newContainerId);
        console.log(response);
        const column = response.data;

        setSelectedBoard((prev) => ({
            ...prev,
            columns: [...prev.columns, column],
        }));

        // setContainers((prev) => [...prev, newContainerId]);
        // setItems((prev) => [...prev, column]);
    }

    async function handleRemoveColumn(id, containerId) {
        const boardId = selectedBoard._id;
        const columnId = id;

        console.log(containerId);

        const response = await dataService.deleteColumn(boardId, columnId);
        console.log(response);

        console.log(containers);

        setSelectedBoard((prev) => ({
            ...prev,
            columns: prev.columns.filter((col) => col._id !== columnId),
        }));

        // setContainers((prev) =>
        //     prev.filter((contIdx) => contIdx !== containerId)
        // );

        // setItems((prev) => prev.filter((col) => col._id !== columnId));

        // setItems((prev) => {
        //     const copiedItems = [...prev];

        //     const updatedItems = copiedItems.filter(
        //         (col) => col._id !== columnId
        //     );

        //     console.log(updatedItems);
        //     return updatedItems;
        // });
    }

    async function handleColumnUpdate(id, title) {
        const boardId = selectedBoard._id;
        const columnId = id;

        const response = await dataService.updateColumn(boardId, columnId, {
            title,
        });

        console.log(response);

        const column = response.data;

        setSelectedBoard((prev) => ({
            ...prev,
            columns: prev.columns.map((col) =>
                col._id === columnId ? column : col
            ),
        }));

        // setItems((prev) => {
        //     const copiedItems = [...prev];

        //     const updatedItems = copiedItems.map((col) =>
        //         col._id === column._id ? column : col
        //     );

        //     return updatedItems;
        // });

        console.log(column);
    }

    async function handleAddTask(columnId, containerId) {
        const boardId = selectedBoard._id;
        const taskName = `Task ${items[containerId].tasks.length + 1}`;

        console.log(taskName);
        const response = await dataService.createTask(boardId, columnId, {
            taskName,
        });

        const task = response.data;

        setSelectedBoard((prev) => ({
            ...prev,
            columns: prev.columns.map((col) =>
                col._id === columnId
                    ? {...col, tasks: [...col.tasks, task]}
                    : col
            ),
        }));

        // setItems((prevItems) => {
        //     const updatedContainer = {
        //         ...prevItems[containerId],
        //         tasks: [...prevItems[containerId].tasks, task],
        //     };
        //     const updatedItems = [...prevItems];
        //     updatedItems[containerId] = updatedContainer;

        //     return updatedItems;
        // });
    }

    const handleTaskSlideOver = (task, column) => {
        setSelectedTask(task);
        setSelectedColumn(column);
        setIsSlideOverOpen(true);
    };

    // Debugging what selected task is
    // useEffect(() => {
    //   console.log('clicked on the following task: ',selectedTask)
    //   console.log('column!: ',selectedColumn)
    // },[selectedTask])

    return (
        <div className=' bg-tertiaryLight flex mx-auto p-8  min-h-[700px]'>
            <DndContext
                sensors={sensors}
                onDragStart={(e) => handleDragStart(e, setActiveId)}
                onDragOver={(e) => handleDragOver(e, items, setItems)}
                onDragEnd={(e) =>
                    handleDragEnd(
                        e,
                        items,
                        setItems,
                        containers,
                        setContainers,
                        setActiveId,
                        handleDND
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
                                py-8
                px-4
                                gap-4
                                flex
                                max-h-kanban
                                overflow-x-auto
                                items-stretch
                                justify-stretch'
                    >
                        {containers.map((containerId, index) => {
                            // Array of tasksIds for each container

                            const taskIds = getTaskIds(items, containerId);
                            console.log(containerId);
                            console.log(items[containerId]);
                            console.log(items[containerId]?._id);
                            return (
                                <SortableColumn
                                    column={items[containerId]}
                                    key={items[containerId]?._id}
                                    containerId={`${containerId}`}
                                    id={containerId}
                                    items={taskIds}
                                    addTask={handleAddTask}
                                    removeColumn={handleRemoveColumn}
                                    updateColumn={handleColumnUpdate}
                                >
                                    <SortableContext
                                        items={taskIds}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {getTaskIds(items, containerId).map(
                                            (task, index) => (
                                                <button
                                                    type='button'
                                                    key={task}
                                                    onClick={() =>
                                                        handleTaskSlideOver(
                                                            items[containerId]
                                                                .tasks[index]
                                                                ._id,
                                                            items[containerId]
                                                                ._id
                                                        )
                                                    }
                                                >
                                                    <SortableTask
                                                        id={task}
                                                        key={task}
                                                        task={
                                                            items[containerId]
                                                                .tasks[index]
                                                        }
                                                    />
                                                </button>
                                            )
                                        )}
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
            <WorkspaceSlideOver key={selectedTaskId} />
        </div>
    );
};

export default KanbanBoard;
