import React from 'react'
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { formatTimeAgo, getInitials, getRandomSoftHexColor } from "../../../Modules/funcs";


const ReportsCard = ({ report }) => {
    const { _id, created_at, avatar, sender, title } = report;
    return (
        <Link
            className="border-b flex gap-4 items-center hover:bg-zinc-100 fromTop"
            key={_id}
            to={`/home/reports/${_id}`}
            state={{ _id, created_at, avatar, sender, title }}
        >
            <div className="w-12 h-12 rounded-full m-2 mt-4">
                {avatar !== "NIL" ? (
                    <img
                        src={avatar}
                        alt="avatar"
                        className="h-full w-full rounded-full"
                    />
                ) : (
                    <span
                        className={`flex h-full w-full items-center justify-center rounded-full text-xs font-medium text-black border-2`}
                        style={{
                            backgroundColor: `${getRandomSoftHexColor()}50`,
                        }}
                    >
                        {getInitials(sender.name)}
                    </span>
                )}
            </div>
            <div className="flex-grow">
                <p className="truncate font-semibold">{title}</p>
                <p className="text-sm">{sender.name}</p>
            </div>
            <p className="text-xs font-light italic">
                {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
            </p>
        </Link>
    )
}

export default ReportsCard