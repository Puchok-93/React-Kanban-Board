import type { TColumns } from "../../types/types";
import ClearBtn from "../clear-btn/clear-btn";
import Column from "../column/column";

type TColumnsProps = {
    columns: TColumns;
}

function Taskboard({columns}: TColumnsProps) {
    return (
		<section className="taskboard">
            <h2 className="visually-hidden">Ваши задачи:</h2>
            {columns.map((column) => (
            <Column
                key={column.id}
                id={column.id}
                label={column.label}
                tasks={column.tasks}
            >
                {column.id === "basket" && <ClearBtn />}
            </Column>
            ))}
        </section>
    );
}

export default Taskboard;