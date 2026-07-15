type TDropAreaProps = {
    text: string;
}

function DragArea({text}: TDropAreaProps) {
    return (
        <div className="taskboard__item task task--empty">
            <p>{text}</p>
        </div>
    );
}

export default DragArea;