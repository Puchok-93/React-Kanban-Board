import type { TTask } from "../../types/types";

type TTaskProps = {
	task: TTask;
	columnId: string;
}

function Task({task, columnId}: TTaskProps) {
	const {title} = task;
    return(
		<div className={`taskboard__item task task--${columnId}`}>
			<div className="task__body">
				<p className="task__view">{title}</p>
				<input className="task__input" type="text" value="Название первой задачи" />
			</div>
			<button className="task__edit" type="button" aria-label="Изменить"></button>
		</div>
    );
}

export default Task;