export default function TaskList({task}) {
  const {title, assignee, doneBy} = task;
  return (
    <div className="task-item flex p-4 rounded-lg bg-slate-400 justify-between items-center shadow">
      <button>
        ✔️
      </button>
      <div className="flex flex-col">
        <span className="task-title">{title}</span>
        <div className="assignment-info">
          <p>Assigned to: <strong>{assignee}</strong></p>
          <p>Done by: <strong>{doneBy}</strong></p>
        </div>
      </div>
    </div>
  );
}
