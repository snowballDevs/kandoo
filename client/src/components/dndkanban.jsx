import {useContext, useMemo, useState, useEffect} from 'react';
import {
    DndContext,
    //   DragEndEvent,
    //   DragOverEvent,
    DragOverlay,
    //   DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {SortableContext, arrayMove} from '@dnd-kit/sortable';
import {createPortal} from 'react-dom';
import {HiPlusCircle} from 'react-icons/hi';
import {ModalContext} from '../contexts/ModalContext/ModalContext';
import Modal from './Modal';
// import { Column, Id, Task } from "../types";
import Column from './dndcolumn';
import TaskCard from './dndtaskcard';
import dataService from '../services/dataService';

const defaultCols = [
    {
        id: 'todo',
        title: 'Todo',
    },
    {
        id: 'doing',
        title: 'Work in progress',
    },
    {
        id: 'done',
        title: 'Done',
    },
];

const defaultTasks = [
    {
        id: '1',
        columnId: 'todo',
        content: 'List admin APIs for dashboard',
    },
    {
        id: '2',
        columnId: 'todo',
        content:
            'Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation',
    },
    {
        id: '3',
        columnId: 'doing',
        content: 'Conduct security testing',
    },
    {
        id: '4',
        columnId: 'doing',
        content: 'Analyze competitors',
    },
    {
        id: '5',
        columnId: 'done',
        content: 'Create UI kit documentation',
    },
    {
        id: '6',
        columnId: 'done',
        content: 'Dev meeting',
    },
    {
        id: '7',
        columnId: 'done',
        content: 'Deliver dashboard prototype',
    },
    {
        id: '8',
        columnId: 'todo',
        content: 'Optimize application performance',
    },
    {
        id: '9',
        columnId: 'todo',
        content: 'Implement data validation',
    },
    {
        id: '10',
        columnId: 'todo',
        content: 'Design database schema',
    },
    {
        id: '11',
        columnId: 'todo',
        content: 'Integrate SSL web certificates into workflow',
    },
    {
        id: '12',
        columnId: 'doing',
        content: 'Implement error logging and monitoring',
    },
    {
        id: '13',
        columnId: 'doing',
        content: 'Design and implement responsive UI',
    },
];

const KanbanBoard = ({boardInfo}) => {
    // KANDOO CODE
    // catagoryStages is an array of Board; Column is the column component
    const {handleModal, isModalOpen, handleClose, handleOpen} =
        useContext(ModalContext);

    // const {setSelectedBoard} = useSelectedBoardContext();

    // const {setCurrentPage} = useRoutingContext();

    const [boards, setBoards] = useState([]);

    // get column
    const getColumns = async () => {
        try {
            console.log('Sending Request');
            const response = await dataService.getColumns();
            console.log(response);
            setColumns(resonse.data.board.column); // find one board ID
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getColumns();
    }, []);

    // delete column
    const onDelete = async (e, id) => {
        e.stopPropagation();
        const deletedColumn = await dataService.deleteColumn(id);
        console.log(deletedColumn);
        await getColumns();
    };

    // Open Task Modal
    //     const navigateToTask = (e) => {
    //       const {id} = e.currentTarget;
    //       const board = boards.find((board) => board._id === id);
    //       console.log(board);
    //       setSelectedBoard(board);
    //   };

    // const { column, tasks } = boardInfo;

    // TUTORIAL
    const [columns, setColumns] = useState(defaultCols);
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
    const [tasks, setTasks] = useState(defaultTasks);
    const [activeColumn, setActiveColumn] = useState(null);
    const [activeTask, setActiveTask] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    // TODO
    function createTask(columnId) {
        const newTask = {
            _id: generateId(),
            columnId,
            content: `Task ${tasks.length + 1}`,
        };

        setTasks([...tasks, newTask]);
    }

    function deleteTask(id) {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
    }

    function updateTask(id, content) {
        const newTasks = tasks.map((task) => {
            if (task.id !== id) return task;
            return {...task, content};
        });

        setTasks(newTasks);
    }

    function createNewColumn() {
        const columnToAdd = {
            id: generateId(),
            title: `Column ${columns.length + 1}`,
        };

        setColumns([...columns, columnToAdd]);
    }

    function deleteColumn(id) {
        const filteredColumns = columns.filter((col) => col.id !== id);
        setColumns(filteredColumns);

        const newTasks = tasks.filter((t) => t.columnId !== id);
        setTasks(newTasks);
    }

    function updateColumn(id, title) {
        const newColumns = columns.map((col) => {
            if (col.id !== id) return col;
            return {...col, title};
        });

        setColumns(newColumns);
    }

    function onDragStart(event) {
        console.log(`Drag start event: ${event.active}`);

        if (event.active.data.current?.type === 'column') {
            setActiveColumn(event.active.data.current.column);
            return;
        }

        if (event.active.data.current?.type === 'Task') {
            setActiveTask(event.active.data.current.task);
        }
    }

    function onDragEnd(event) {
        console.log(`Drag end event: ${event.active}`);
        setActiveColumn(null);
        setActiveTask(null);

        const {active, over} = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        setColumns((columns) => {
            const activeColumnIndex = columns.findIndex(
                (col) => col.id === activeId
            );

            const overColumnIndex = columns.findIndex(
                (col) => col.id === overId
            );

            return arrayMove(columns, activeColumnIndex, overColumnIndex);
        });
    }

    function onDragOver(event) {
        const {active, over} = event;

        console.log(`Drag over event: ${active.id} ${over.id}`);
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveATask = active.data.current?.type === 'Task';
        const isOverATask = over.data.current?.type === 'Task';

        if (!isActiveATask) return;

        if (isActiveATask && isOverATask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                const overIndex = tasks.findIndex((t) => t.id === overId);

                tasks[activeIndex].columnId = tasks[overIndex].columnId;

                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        const isOverAColumn = over.data.current?.type === 'column';

        if (isActiveATask && isOverAColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);

                tasks[activeIndex].columnId = overId;

                return arrayMove(tasks, activeIndex, activeIndex);
            });
        }
    }

    function generateId() {
        return Math.floor(Math.random() * 10001);
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
                onDragStart={(event) =>
                    console.log('External onDragStart:', event)
                }
                onDragEnd={(event) => console.log('External onDragEnd:', event)}
                onDragOver={(event) =>
                    console.log('External onDragOver:', event)
                }
            >
                <div className='m-auto flex gap-4'>
                    <div className='flex gap-4'>
                        <SortableContext items={columnsId}>
                            {columns.map((col) => (
                                <Column
                                    key={col.id}
                                    column={col}
                                    deleteColumn={deleteColumn}
                                    updateColumn={updateColumn}
                                    createTask={createTask}
                                    deleteTask={deleteTask}
                                    updateTask={updateTask}
                                    tasks={tasks.filter(
                                        (task) => task.columnId === col.id
                                    )}
                                />
                            ))}
                        </SortableContext>
                    </div>
                    <button
                        onClick={() => {
                            createNewColumn();
                        }}
                        className='
                                h-[60px]
                                w-[350px]
                                min-w-[350px]
                                cursor-pointer
                                rounded-lg
                                border-2
                                border-columnBackgroundColor
                                p-4
                                ring-pinkLight
                                hover:ring-2
                                flex
                                gap-2
                            '
                    >
                        <HiPlusCircle />
                        Add Column
                    </button>
                </div>

                {createPortal(
                    <DragOverlay>
                        {activeColumn && (
                            <Column
                                column={activeColumn}
                                deleteColumn={deleteColumn}
                                updateColumn={updateColumn}
                                createTask={createTask}
                                deleteTask={deleteTask}
                                updateTask={updateTask}
                                tasks={tasks.filter(
                                    (task) => task.columnId === activeColumn.id
                                )}
                            />
                        )}
                        {activeTask && (
                            <TaskCard
                                task={activeTask}
                                deleteTask={deleteTask}
                                updateTask={updateTask}
                            />
                        )}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
        </div>
    );
};

export default KanbanBoard;
