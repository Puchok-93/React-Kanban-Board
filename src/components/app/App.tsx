import { useState } from "react";
import AddTask from "../add-task/add-task";
import Header from "../header/header";
import Taskboard from "../taskboard/taskboard";
import initialColumns from "../../mocks/mocks";

function App() {
	const [columns, setColumns] = useState(initialColumns);
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
	return (
		<div className="board-app">
			<Header />
			<main className="board-app__main">
				<div className="board-app__inner">
				<AddTask onAddTask={addTask}/>
				<Taskboard columns={columns}/>
				</div>
			</main>
		</div>
	);
}

export default App;