import type { TColumns } from "../../types/types";
import ClearBtn from "../clear-btn/clear-btn";
import Column from "../column/column";

type TColumnsProps = {
    columns: TColumns;
    onEditTask: (
        columnId: string,
        taskId: number,
        newTitle: string
    ) => void;
    editingTaskId: number | null;
    setEditingTaskId: React.Dispatch<React.SetStateAction<number | null>>;
}

function Taskboard({columns, onEditTask, editingTaskId, setEditingTaskId}: TColumnsProps) {
    return (
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
            >
                {column.id === "basket" && <ClearBtn />}
            </Column>
            ))}
        </section>
    );
}

export default Taskboard;