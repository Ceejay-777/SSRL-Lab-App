import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const PreviewRequest = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { title, activeOption, eqpName, quantity, purpose, leaveDates, selectedRecipients } = location.state || {};

    const handleEdit = () => {
        const editData = {
            title,
            activeOption,
            eqpName,
            quantity,
            purpose,
            leaveDates: {
                from: leaveDates?.from || null,
                to: leaveDates?.to || null,
            },
            selectedRecipients,
        };
        navigate("/home/requests/create", { state: editData });
        // console.log("Edit Data:", editData);
    };

    return (
        <div className="mt-2 px-6 py-4 min-h-screen overflow-y-auto">
            <h2 className="text-2xl font-semibold">Preview Request</h2>
            <hr className="bg-black mt-1" />
            <div className="mt-8 mx-auto my-12 flex flex-col gap-4  rounded-xl border px-10 py-8 shadow-lg">
                <h2 className='font-medium text-xl capitalize'>{title}</h2>
                {activeOption === 'equipment' && (
                    <div className="mt-4">
                        <h3 className="text-lg font-medium">Equipment Details</h3>
                        <table className="md:w-1/2 w-full table-auto border-separate border border-gray-500 rounded-md mt-4">
                            <thead>
                                <tr>
                                    <th className="text-left py-2 px-4 border-r border-b border-gray-500 font-medium text-lg">Equipment Name</th>
                                    <th className="text-left py-2 px-4  border-b border-gray-500 font-medium text-lg">Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2 px-4 border-r border-gray-500 text-lg">{eqpName}</td>
                                    <td className="py-2 px-4  text-lg">{quantity}</td>
                                </tr>
                            </tbody>
                        </table>
                        <h2 className="text-lg font-medium mt-2">Purpose</h2>
                        <p className="mt-2 text-gray-700 text-base p-4 border border-gray-300 rounded-md  w-full break-words">
                            {purpose}
                        </p>
                    </div>
                )}
                {activeOption === 'leave' && (
                    <>
                        <div className="mt-4">
                            <h3 className="text-lg font-medium">Leave Details</h3>
                            <table className="w-full md:w-1/2 table-auto border-separate border border-gray-500 rounded-md mt-4">
                                <thead>
                                    <tr>
                                        <th className="text-left py-2 px-4 border-r border-b border-gray-500 font-medium text-lg">From</th>
                                        <th className="text-left py-2 px-4  border-b border-gray-500 font-medium text-lg">to</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-2 px-4 border-r border-gray-500 text-lg">
                                            {leaveDates?.from ? new Date(leaveDates.from).toLocaleDateString() : "N/A"}
                                        </td>
                                        <td className="py-2 px-4 text-lg">
                                            {leaveDates?.to ? new Date(leaveDates.to).toLocaleDateString() : "N/A"}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <h2 className="text-lg font-medium mt-2">Purpose</h2>
                            <p className="mt-2 text-gray-700 text-base p-4 border border-gray-300 rounded-md  w-full break-words">
                                {purpose}
                            </p>
                        </div>
                    </>
                )}
                {(activeOption === 'others') && (
                    <>
                        <h2 className="text-lg font-medium mt-2">Description:</h2>
                        <p className="text-gray-700 text-base p-4 border border-gray-300 rounded-md w-full break-words">
                            {purpose}
                        </p>
                    </>
                )}
                <ul className="list-outside ml-2 space-y-1 pl-2">
                    {selectedRecipients && selectedRecipients.map((recipient) => (
                        <li key={recipient.id} className="break-words capitalize">
                            To: {recipient.name}
                        </li>
                    ))}
                </ul>
                <button onClick={handleEdit} className="bg-logo w-fit capitalize text-white px-4 py-2 rounded-full mt-4 hover:scale-105 flex items-center gap-2"> <ArrowLeft />Back to edit</button>
            </div>
        </div>
    );
};

export default PreviewRequest;