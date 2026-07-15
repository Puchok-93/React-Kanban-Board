import { useState } from "react";
import AddTask from "../add-task/add-task";
import Header from "../header/header";
import Taskboard from "../taskboard/taskboard";
import initialColumns from "../../mocks/mocks";
import { arrayMove } from "@dnd-kit/sortable";

function App() {
	const [columns, setColumns] = useState(initialColumns);
	const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

	const addTask = (title: string) => {
		setColumns((prevColumns) =>
			prevColumns.map((column) => {
				if (column.id !== "backlog") {
					return column;
				}

				return {
					...column,
					tasks: [
					...column.tasks,
						{
							id: crypto.randomUUID(),
							title,
						},
					],
				};
			})
		);
	};

	const editTask = (
		columnId: string,
		taskId: string,
		newTitle: string
		) => {
		setColumns((prevColumns) =>
			prevColumns.map((column) => {
				if (column.id !== columnId) {
					return column;
				}

				return {
					...column,
					tasks: column.tasks.map((task) => {
					if (task.id !== taskId) {
						return task;
					}

					return {
						...task,
						title: newTitle,
					};
					}),
				};
			})
		);
	};

	const moveTask = (activeId: string, overId: string) => {
		setColumns((prevColumns) => {

			const sourceColumn = prevColumns.find((column) =>
				column.tasks.some((task) => task.id === activeId)
			);

			if (!sourceColumn) {
				return prevColumns;
			}

			let targetColumn = prevColumns.find((column) =>
				column.tasks.some((task) => task.id === overId)
			);

			if (!targetColumn) {
				targetColumn = prevColumns.find(
					(column) => column.id === overId
				);
			}

			if (!targetColumn) {
				return prevColumns;
			}

			const task = sourceColumn.tasks.find(
				(task) => task.id === activeId
			);


			if (!task) {
				return prevColumns;
			}

			if (sourceColumn.id === targetColumn.id) {

				return prevColumns.map((column) => {

					if (column.id !== sourceColumn.id) {
						return column;
					}

					const oldIndex = column.tasks.findIndex(
						(task) => task.id === activeId
					);

					const newIndex = column.tasks.findIndex(
						(task) => task.id === overId
					);

					if (oldIndex === -1 || newIndex === -1) {
						return column;
					}

					return {
						...column,
						tasks: arrayMove(
							column.tasks,
							oldIndex,
							newIndex
						),
					};
				});
			}

			return prevColumns.map((column) => {

				if (column.id === sourceColumn.id) {

					return {
						...column,
						tasks: column.tasks.filter(
							(task) => task.id !== activeId
						),
					};
				}

				if (column.id === targetColumn.id) {

					const overIndex = column.tasks.findIndex(
						(task) => task.id === overId
					);


					const newTasks = [...column.tasks];

					if (overIndex === -1) {
						newTasks.push(task);

					} else {
						newTasks.splice(
							overIndex,
							0,
							task
						);
					}

					return {
						...column,
						tasks: newTasks,
					};
				}

				return column;
			});
		});
	};

	return (
		<div className="board-app">
			<Header/>
			<main className="board-app__main">
				<div className="board-app__inner">
				<AddTask onAddTask={addTask}/>
				<Taskboard 
					columns={columns} 
					onEditTask={editTask} 
					moveTask={moveTask}
					editingTaskId={editingTaskId}
					setEditingTaskId={setEditingTaskId}
				/>
				</div>
			</main>
		</div>
	);
}

export default App;