import ClearBtn from "../clear-btn/clear-btn";
import Column from "../column/column";

function Taskboard() {
    return (
		<section className="taskboard">
            <h2 className="visually-hidden">Ваши задачи:</h2>
            <Column 
                id="backlog"
                label="Бэклог"
            />
            <Column 
                id="processing"
                label="В процессе"
            />
            <Column 
                id="done"
                label="Готово"
            />
            <Column id="basket" label="Корзина">
                <ClearBtn/>
            </Column>
        </section>
    );
}

export default Taskboard;