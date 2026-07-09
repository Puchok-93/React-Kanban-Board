import AddTask from "../add-task/add-task";
import Header from "../header/header";
import Taskboard from "../taskboard/taskboard";

function App() {
	return (
		<div className="board-app">
			<Header />
			<main className="board-app__main">
				<div className="board-app__inner">
				<AddTask />
				<Taskboard />
				</div>
			</main>
		</div>
	);
}

export default App;