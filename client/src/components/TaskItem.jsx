import { useState } from "react";


export default function TaskItem({...props}) {
    const {title, assignedTo, doneBy, id, onDelete} = props;
    return (
        <div className="flex justify-between items-start gap-4 p-4 mt-6 max-w-[700px] w-full  sm:mx-auto bg-white rounded-xl shadow-md">
            
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    className="w-5 h-5 accent-blue-600"
                    aria-label="task checkbox"
                    onClick={() => onDelete(id)}
                />
                <span className="text-lg font-medium text-gray-800">
                    {title}
                </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <div className="bg-gray-100 rounded-md px-3 py-1 text-sm text-gray-700">
                    <p className="text-xs text-gray-500">Assigned to:</p>
                    <p className="font-medium">{assignedTo}</p>
                </div>
                <div className="bg-gray-100 rounded-md px-3 py-1 text-sm text-gray-700">
                    <p className="text-xs text-gray-500">Done by:</p>
                    <p className="font-medium">{doneBy}</p>
                </div>
            </div>
        </div>
    );
}
