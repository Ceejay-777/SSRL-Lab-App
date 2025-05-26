import { useLocation, useNavigate } from 'react-router-dom';
import BigGreenButton from '../../../components/BigGreenButton';
import { ArrowLeft } from 'lucide-react';

export default function PreviewReport() {
    const location = useLocation()
    const navigate = useNavigate()
    const {
        title,
        summary,
        activeOption,
        period,
        completed,
        ongoing,
        next,
    } = location.state || {}

    const handleEdit = () => {
        navigate('/home/reports/create', { state: location.state })
    }

    return (
        <div className="fromRight px-6 py-4 min-h-screen overflow-y-auto">
            <h2 className="text-2xl font-semibold capitalize">{activeOption} Report</h2>
            <hr className="bg-black mt-1" />
            <div className="mt-4 p-2">

                {/* <div className='mt-2'>
                    <p className="flex gap-2">
                        <span className="font-medium">Intern Name:</span>
                        Ogunmepon abraham
                    </p>
                    <p className="flex gap-2">
                        <span className="font-medium">Stack:</span>
                        Web development
                    </p>
                    {activeOption === 'activity' && (
                        <p className="flex gap-2">
                            <span className="font-medium">Duration:</span>
                            {period}
                        </p>
                    )}
                </div> */}


                {activeOption === 'activity' && (
                    <div className="mt-4 flex flex-col gap-8">
                        <p className="flex gap-2">
                            <span className="font-medium">Duration:</span>
                            {period} report
                        </p>

                        <div>
                            <div className="bg-[#347831] rounded-xl p-2 text-white text-lg "  >Completed Tasks</div>
                            <ul className="list-disc list-outside ml-2 space-y-2 px-4 mt-2 marker:text-navBg2">
                                {completed.map((completed, index) => (
                                    <li key={index} className="break-words">
                                        {completed}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <div className="bg-[#347831] rounded-xl p-2 text-white mt-2 text-lg "  >Ongoing Tasks</div>
                            <ul className="list-disc  list-outside ml-2 space-y-2 px-4 mt-2 marker:text-navBg2">
                                {ongoing.map((ongoing, index) => (
                                    <li key={index} className="break-words">
                                        {ongoing}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <div className="bg-[#347831] rounded-xl p-2 text-white mt-2 text-lg "  >Tasks for next duration </div>
                            <ul className="list-disc list-outside ml-2 space-y-2 px-4 mt-2 marker:text-navBg2">
                                {next.map((task, index) => (
                                    <li key={index} className="break-words">
                                        {task}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {activeOption === 'project' && (
                    <div className="my-4">
                        <h2 className="text-2xl font-semibold capitalize">{title} Report</h2>
                        <p className="mt-2 text-gray-700 text-base p-4 border border-gray-300 rounded-md whitespace-normal w-full break-words">
                            {summary}
                        </p>
                    </div>
                )}

                <div className='mt-8'>
                    <BigGreenButton action={handleEdit} className="bg-logo flex items-center gap-2 px-2"> <ArrowLeft /> Go back to edit</BigGreenButton>
                </div>
            </div>
        </div>
    )
}