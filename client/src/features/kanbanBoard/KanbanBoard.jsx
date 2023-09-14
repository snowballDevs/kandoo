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
import TaskCard from './TaskCard';
import PlaceholderColumn from './PlaceHolderColumn';
import {useModalContext} from '../../contexts/ModalContext/ModalContext';
import {useSelectedBoardContext} from '../../contexts/BoardContext/boardContext';
import WorkspaceSlideOver from '../WorkspaceSlideover/WorkspaceSlideOver';
import dataService from '../../services/dataService';

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

    async function handleAddColumn() {
        const boardId = selectedBoard._id;
        const columnTitle = `Column ${items.length + 1}`;
        const response = await dataService.createColumn(boardId, {
            columnTitle,
        });

        console.log(response);
        const column = response.data;

        setSelectedBoard((prev) => ({
            ...prev,
            columns: [...prev.columns, column],
        }));
    }

    async function handleRemoveColumn(id) {
        const boardId = selectedBoard._id;
        const columnId = id;

        const response = await dataService.deleteColumn(boardId, columnId);
        console.log(response);

        setSelectedBoard((prev) => ({
            ...prev,
            columns: prev.columns.filter((col) => col._id !== columnId),
        }));
    }

    async function handleAddTask(containerId) {
        const boardId = selectedBoard._id;
        const columnId = selectedBoard.columns[containerId]._id;

        const taskName = `Task ${items[containerId].tasks.length + 1}`;

        console.log(taskName);
        const response = await dataService.createTask(boardId, columnId, {
            taskName,
        });

        const task = response.data;

        setItems((prevItems) => {
            const updatedContainer = {
                ...prevItems[containerId],
                tasks: [...prevItems[containerId].tasks, task],
            };
            const updatedItems = [...prevItems];
            updatedItems[containerId] = updatedContainer;

            return updatedItems;
        });
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
                                            <button
                                                type='button'
                                                key={task}
                                                onClick={() =>
                                                    handleTaskSlideOver(
                                                        items[containerId]
                                                            .tasks[index]._id,
                                                        items[containerId]._id
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
            <WorkspaceSlideOver key={selectedTaskId} />
        </div>
    );
};

export default KanbanBoard;
