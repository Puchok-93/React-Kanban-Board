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
	overId: string | null;

}

function Column({id, label, tasks, children, onEditTask, editingTaskId, setEditingTaskId, overId}: TColumnProps) {
	const { setNodeRef, isOver } = useDroppable({
		id,
	});
    return (
		<SortableContext
			items={tasks.map(task => task.id)}
			strategy={verticalListSortingStrategy}
		>
		<article className={`taskboard__group taskboard__group--${id}`}>
			<h3 className={`taskboard__group-heading taskboard__group-heading--${id}`}>{label}</h3>
			<div ref={setNodeRef} className={`taskboard__list ${isOver ? "taskboard__list--over" : ""}`}>
				{tasks.map((task) => (
					<React.Fragment key={task.id}>
						{overId === task.id && (
							<div className="task-placeholder"></div>
						)}

						<Task
							task={task}
							columnId={id}
							onEditTask={onEditTask}
							editingTaskId={editingTaskId}
							setEditingTaskId={setEditingTaskId}
						/>
					</React.Fragment>
				))}
				{tasks.length === 0 && (
					<DragArea
						text={id === "basket" ? "Корзина пуста" : "Перетащите карточку"}
					/>
				)}
			</div>
			{children}
		</article>
		</SortableContext>
    );
}

export default Column;