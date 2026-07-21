import type { TColumns } from "../../types/types";
import ClearBtn from "../clear-btn/clear-btn";
import Column from "../column/column";
import { DndContext, type DragStartEvent, type DragOverEvent, type DragEndEvent , PointerSensor,
	useSensor,
	useSensors, closestCorners } from "@dnd-kit/core";
import { useState } from "react";
import { DragOverlay } from "@dnd-kit/core";
import TaskView from "../task/task-view";

type TColumnsProps = {
    columns: TColumns;
    onEditTask: (
        columnId: string,
        taskId: string,
        newTitle: string
    ) => void;
    editingTaskId: string | null;
    setEditingTaskId: React.Dispatch<React.SetStateAction<string | null>>;
    moveTask: (activeId: string, overId: string) => void;
    clearTrash: () => void;
}

function Taskboard({columns, onEditTask, editingTaskId, setEditingTaskId, moveTask, clearTrash}: TColumnsProps) {
    const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
    
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        setActiveTaskId(String(event.active.id));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
        setActiveTaskId(null);

        if (!over) {
            return;
        }

        const activeId = String(active.id);
        const overId = String(over.id);

        moveTask(
            activeId,
            overId
        );
    };

    const handleDragCancel = () => {
        setActiveTaskId(null);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;

        if (!over) return;

        const activeId = String(active.id);
        const overId = String(over.id);

        const activeColumn = columns.find(column =>
            column.tasks.some(task => task.id === activeId)
        );

        const overColumn = columns.find(column =>
            column.tasks.some(task => task.id === overId)
            || column.id === overId
        );

        if (!activeColumn || !overColumn) {
            return;
        }

        if (activeColumn.id !== overColumn.id) {
            moveTask(activeId, overId);
        }
    };

    const activeTask = columns
    .flatMap((column) => column.tasks)
    .find((task) => task.id === activeTaskId);

    return (
        <DndContext 
            collisionDetection={closestCorners}
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <section className="taskboard">
                <h2 className="visually-hidden">Ваши задачи:</h2>
                {columns.map((column) => (
                        <Column
                            key={column.id}
                            id={column.id}
                            label={column.label}
                            tasks={column.tasks}
                            onEditTask={onEditTask}
                            editingTaskId={editingTaskId}
                            setEditingTaskId={setEditingTaskId}
                            activeTaskId={activeTaskId}
                        >
                        {column.id === "trash" && (
                            <ClearBtn 
                                onClearTrash={clearTrash}
                                disabled={column.tasks.length === 0} 
                            />
                        )}
                        </Column>
                ))}
            </section>
            <DragOverlay>
                {activeTask && (
                    <TaskView task={activeTask}/>
                )}
            </DragOverlay>
        </DndContext>
    );
}

export default Taskboard;