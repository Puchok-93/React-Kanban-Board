import type { TTask } from "../../types/types";

type TTaskViewProps = {
    task: TTask;
};

function TaskView({task}: TTaskViewProps) {
    return (
        <div className="taskboard__item task">
            <div className="task__body">
                <p className="task__view">
                    {task.title}
                </p>
            </div>
        </div>
    );
}

export default TaskView;