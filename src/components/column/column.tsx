import type { TTasks } from "../../types/types";
import Task from "../task/task";

type TColumnProps = {
	id: string;
	label: string;
	tasks: TTasks;
	children?: React.ReactNode;
	onEditTask: (
        columnId: string,
        taskId: number,
        newTitle: string
    ) => void;
	editingTaskId: number | null;
    setEditingTaskId: React.Dispatch<React.SetStateAction<number | null>>;

}

function Column({id, label, tasks, children, onEditTask, editingTaskId, setEditingTaskId}: TColumnProps) {

    return (
		<article className={`taskboard__group taskboard__group--${id}`}>
			<h3 className={`taskboard__group-heading taskboard__group-heading--${id}`}>{label}</h3>
			<div className="taskboard__list">
				{tasks.map((task) => (
					<Task 
						task={task} 
						columnId={id} 
						onEditTask={onEditTask}
						editingTaskId={editingTaskId}
						setEditingTaskId={setEditingTaskId}/>
				))}
			</div>
			{children}
		</article>
    );
}

export default Column;