import type { TTask } from "../../types/types";
import { useState, useRef, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type TTaskProps = {
	task: TTask;
	columnId: string;
	onEditTask: (
        columnId: string,
        taskId: string,
        newTitle: string
    ) => void;
	editingTaskId: string | null;
    setEditingTaskId: React.Dispatch<React.SetStateAction<string | null>>;
}

function Task({task, columnId, onEditTask, editingTaskId, setEditingTaskId}: TTaskProps) {
	const [value, setValue] = useState(task.title);

	const isEditing = editingTaskId === task.id;
	const inputRef = useRef<HTMLInputElement>(null);

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		} = useSortable({
		id: task.id,
		disabled: isEditing,
		});

		const style = {
			transform: CSS.Transform.toString(transform),
			transition,
		};

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
		<div 
			ref={setNodeRef}
			style={style}
			className={`taskboard__item task task--${columnId} ${
				isEditing ? "task--active" : ""
			}`}
			{...attributes}
		>
			<div className="task__body" {...listeners}>
				{isEditing ? (
            <input
                ref={inputRef}
                className="task__input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        ) : (
            <p className="task__view">
                {task.title}
            </p>
        )}
			</div>
			<button
				onPointerDown={(e) => e.stopPropagation()}
				onClick={() => setEditingTaskId(task.id)}
				className="task__edit"
				type="button"
				aria-label="Изменить"
			/>
		</div>
    );
}

export default Task;