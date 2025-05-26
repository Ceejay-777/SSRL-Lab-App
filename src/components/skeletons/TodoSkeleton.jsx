import React from 'react'

const TodoSkeleton = () => {
    return (
        <div className="m-2  animate-pulse flex items-center justify-between rounded-md border border-gray-200 bg-gray-100 px-4 py-3">
            <div className="flex w-full items-center gap-4 px-2">
                <div className="h-5 w-5 rounded bg-gray-200" />
                <div className="h-4 w-3/4 rounded bg-gray-200" />
            </div>
            <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-gray-300" />
                <div className="h-5 w-5 rounded-full bg-gray-300" />
            </div>
        </div>
    )
}

export default TodoSkeleton