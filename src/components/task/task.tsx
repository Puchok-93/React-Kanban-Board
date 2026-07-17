import type { TTask } from "../../types/types";
import { useState, useRef, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type TTaskProps = {
	task: TTask;
	columnId: string;
	onEditTask: (columnId: string, taskId: string, title: string) => void;
	editingTaskId: string | null;
	setEditingTaskId: (id: string | null) => void;
	isDragging: boolean;
};

function Task({
	task,
	columnId,
	onEditTask,
	editingTaskId,
	setEditingTaskId,
	isDragging,
}: TTaskProps) {
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
		opacity: isDragging ? 0 : 1,
	};

	useEffect(() => {
		if (isEditing) {
			inputRef.current?.focus();
		}
	}, [isEditing]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			onEditTask(columnId, task.id, value);
			setEditingTaskId(null);
		}
	};

	return (
		<div ref={setNodeRef} style={style} className={`taskboard__item task task--${columnId}`}>
			<div className="task__body" {...listeners} {...attributes}>
				{isEditing ? (
					<input
						ref={inputRef}
						className="task__input"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
				) : (
					<p className="task__view">{task.title}</p>
				)}
			</div>

			<button
				type="button"
				className="task__edit"
				aria-label="Изменить"
				onPointerDown={(e) => e.stopPropagation()}
				onClick={() => setEditingTaskId(task.id)}
			/>
		</div>
	);
}

export default Task;