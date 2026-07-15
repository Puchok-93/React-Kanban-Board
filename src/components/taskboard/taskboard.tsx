import type { TColumns } from "../../types/types";
import ClearBtn from "../clear-btn/clear-btn";
import Column from "../column/column";
import { DndContext, type DragEndEvent,  type DragStartEvent, type DragOverEvent } from "@dnd-kit/core";
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
}

function Taskboard({columns, onEditTask, editingTaskId, setEditingTaskId, moveTask}: TColumnsProps) {
    const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
    const [overId, setOverId] = useState<string | null>(null);

    const handleDragStart = (event: DragStartEvent) => {
        setActiveTaskId(String(event.active.id));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        setActiveTaskId(null);
        if (!over) return;


        moveTask(
            String(active.id),
            String(over.id)
        );

        setOverId(null);
    };

    const handleDragCancel = () => {
        setActiveTaskId(null);
        setOverId(null);
    };

    const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;

    if (!over) {
        setOverId(null);
        return;
    }

    setOverId(String(over.id));
};

    const activeTask = columns
    .flatMap((column) => column.tasks)
    .find((task) => task.id === activeTaskId);

    return (
        <DndContext 
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
                            overId={overId}
                        >
                            {column.id === "basket" && <ClearBtn />}
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