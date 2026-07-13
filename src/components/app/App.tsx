import { useState } from "react";
import AddTask from "../add-task/add-task";
import Header from "../header/header";
import Taskboard from "../taskboard/taskboard";
import initialColumns from "../../mocks/mocks";

function App() {
	const [columns, setColumns] = useState(initialColumns);
	const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

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
							id: Math.random(),
							title,
						},
					],
				};
			})
		);
	};

const editTask = (
	columnId: string,
	taskId: number,
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

	return (
		<div className="board-app">
			<Header />
			<main className="board-app__main">
				<div className="board-app__inner">
				<AddTask onAddTask={addTask}/>
				<Taskboard 
					columns={columns} 
					onEditTask={editTask} 
					editingTaskId={editingTaskId}
					setEditingTaskId={setEditingTaskId}
				/>
				</div>
			</main>
		</div>
	);
}

export default App;