import type { TTasks } from "../../types/types";
import Task from "../task/task";
import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import DragArea from "../drag-area/drag-area";
import React from "react";

type TColumnProps = {
	id: string;
	label: string;
	tasks: TTasks;
	children?: React.ReactNode;
	onEditTask: (
        columnId: string,
        taskId: string,
        newTitle: string
    ) => void;
	editingTaskId: string | null;
    setEditingTaskId: React.Dispatch<React.SetStateAction<string | null>>;
	activeTaskId: string | null;
}

function Column({
	id,
	label,
	tasks,
	children,
	onEditTask,
	editingTaskId,
	setEditingTaskId,
	activeTaskId,
}: TColumnProps) {

	const { setNodeRef, isOver } = useDroppable({
		id,
	});


	return (
		<article className={`taskboard__group taskboard__group--${id}`}>
			<h3 className={`taskboard__group-heading taskboard__group-heading--${id}`}>
				{label}
			</h3>
			<SortableContext
				items={tasks.map(task => task.id)}
				strategy={verticalListSortingStrategy}
			>
				<div
					ref={setNodeRef}
					className={`taskboard__list ${
						isOver ? "taskboard__list--over" : ""
					}`}
				>

					{tasks.map((task) => (
						<Task
							key={task.id}
							task={task}
							columnId={id}
							onEditTask={onEditTask}
							editingTaskId={editingTaskId}
							setEditingTaskId={setEditingTaskId}
							isDragging={activeTaskId === task.id}
						/>
					))}

					{tasks.length === 0 && (
						<DragArea
							text={
								id === "trash"
									? "Корзина пуста"
									: "Перетащите карточку"
							}
						/>
					)}
				</div>
			</SortableContext>
			{children}
		</article>
	);
}

export default Column;