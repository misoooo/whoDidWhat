export default function TaskItem(props) {
    return (
        <div className="flex justify-between items-start gap-4 p-4 mt-6 max-w-[700px] w-full mx-4 sm:mx-auto bg-white rounded-xl shadow-md">
            
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    className="w-5 h-5 accent-blue-600"
                    aria-label="task checkbox"
                />
                <span className="text-lg font-medium text-gray-800">
                    {props.title}
                </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <div className="bg-gray-100 rounded-md px-3 py-1 text-sm text-gray-700">
                    <p className="text-xs text-gray-500">Assigned to:</p>
                    <p className="font-medium">{props.assignee}</p>
                </div>
                <div className="bg-gray-100 rounded-md px-3 py-1 text-sm text-gray-700">
                    <p className="text-xs text-gray-500">Done by:</p>
                    <p className="font-medium">{props.doneBy}</p>
                </div>
            </div>
        </div>
    );
}
