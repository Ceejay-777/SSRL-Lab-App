import React from 'react'
import { formatDistanceToNow } from "date-fns";
import { getInitials, getRandomSoftHexColor } from "../../../Modules/funcs";
import { Link } from "react-router-dom";

const RequestCard = ({ request }) => {
    const { created_at, avatar, sender, title, _id } = request;
    return (
        <Link
            className="fromTop flex items-center gap-4 border-b hover:bg-zinc-100"
            key={created_at}
            to={`/home/requests/${_id}`}
            state={request}
        >
            <div className="m-2 mt-4 h-12 w-12 rounded-full">
                {avatar !== "NIL" ? (
                    <img
                        src={avatar}
                        alt=""
                        className="h-full w-full rounded-full"
                    />
                ) : (
                    <span
                        className={`flex h-full w-full items-center justify-center rounded-full border-2 text-xs font-medium text-black`}
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
                {formatDistanceToNow(created_at, { addSuffix: true })}
            </p>
        </Link>
    )
}

export default RequestCard