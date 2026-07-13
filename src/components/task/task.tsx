import type { TTask } from "../../types/types";
import { useState, useRef, useEffect } from "react";

type TTaskProps = {
	task: TTask;
	columnId: string;
	onEditTask: (
        columnId: string,
        taskId: number,
        newTitle: string
    ) => void;
	editingTaskId: number | null;
    setEditingTaskId: React.Dispatch<React.SetStateAction<number | null>>;
}

function Task({task, columnId, onEditTask, editingTaskId, setEditingTaskId}: TTaskProps) {
	const [value, setValue] = useState(task.title);

	const isEditing = editingTaskId === task.id;
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isEditing) {
		inputRef.current?.focus();
		}
	}, [isEditing]);

	const handleKeyDown =(e: React.KeyboardEvent<HTMLInputElement>) => {
		if(e.key === 'Enter') {
			onEditTask(columnId, task.id, value);
			setEditingTaskId(null);
		}
	}

    return(
		<div className={`taskboard__item task task--${columnId} ${isEditing === true ? 'task--active' : ''}` }>
			<div className="task__body">
				<p className="task__view">{task.title}</p>
				<input className="task__input" type="text" value={value} 
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={handleKeyDown}/>
			</div>
			<button onClick={() => setEditingTaskId(task.id)} className="task__edit" type="button" aria-label="Изменить"></button>
		</div>
    );
}

export default Task;