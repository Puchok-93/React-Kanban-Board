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

			let sourceColumn;
			let targetColumn;

			for (const column of prevColumns) {
				if (
					column.tasks.some(
						(task) => task.id === activeId
					)
				) {
					sourceColumn = column;
				}

				if (
					column.tasks.some(
						(task) => task.id === overId
					)
				) {
					targetColumn = column;
				}

				if (column.id === overId) {
					targetColumn = column;
				}
			}

			if (!sourceColumn || !targetColumn) {
				return prevColumns;
			}

			const task = sourceColumn.tasks.find(
				(task) => task.id === activeId
			);

			if (!task) {
				return prevColumns;
			}

			// перемещение внутри одной колонки
			if (sourceColumn.id === targetColumn.id) {

				const oldIndex =
					sourceColumn.tasks.findIndex(
						(task) => task.id === activeId
					);


				const newIndex =
					sourceColumn.tasks.findIndex(
						(task) => task.id === overId
					);


				if (oldIndex === newIndex) {
					return prevColumns;
				}


				return prevColumns.map((column)=>{

					if(column.id !== sourceColumn.id){
						return column;
					}


					return {
						...column,
						tasks: arrayMove(
							column.tasks,
							oldIndex,
							newIndex
						)
					};

				});
			}

			// перенос между колонками

			return prevColumns.map((column)=>{
				// убираем из старой
				if(column.id === sourceColumn.id){

					return {
						...column,
						tasks: column.tasks.filter(
							(task)=>task.id !== activeId
						)
					};

				}

				// добавляем в новую
				if(column.id === targetColumn.id){

					return {
						...column,
						tasks:[
							...column.tasks,
							task
						]
					};
				}

				return column;
			});
		});
	};

	const clearTrash = () => {
		setColumns((prevColumns) =>
			prevColumns.map((column) =>
				column.id === "trash"
					? {
							...column,
							tasks: [],
					}
					: column
			)
		);
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
					clearTrash= {clearTrash}
				/>
				</div>
			</main>
		</div>
	);
}

export default App;