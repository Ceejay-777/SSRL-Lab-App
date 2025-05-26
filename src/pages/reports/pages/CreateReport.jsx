import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Plus } from "lucide-react";
import Toggle from "../../../components/Toggle"
import Activity from "../components/Activity";
import Project from "../components/Project";
import BigGreenButton from "../../../components/BigGreenButton";
import MultipleSelect from "../../../components/MultipleSelect";
import toast from "react-hot-toast";
import CustomLabel from "../../../components/CustomLabel";
import { useRequest } from "../../../Modules/useRequest";
import { Loader } from "lucide-react";

const CreateReport = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeOption, setActiveOption] = useState("activity");
  const handleOptionsChange = (selectedOption) => {
    setActiveOption(selectedOption);
  };

  const [receivers, setReceivers] = useState([]);
  const [receiver, setReceiver] = useState([]);
  // project report
  const [title, settitle] = useState("");
  const [summary, setSummary] = useState("");
  const ToggleItems = ['activity', 'project']

  // activity report
  const [period, setPeriod] = useState("Daily")

  const [completed, setCompleted] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [next, setNext] = useState([]);

  const [submitRequest, submitLoading, setSubmitloading] = useRequest();
  const [membersRequest] = useRequest();

  const getReceivers = async () => {
    const res = await membersRequest(`get_all_members`);
    const data = await res.json();
    if (res.ok) {
      setReceivers(data.members);
    }
  };

  useEffect(() => {
    getReceivers();
  }, []);

  //preview
  const handlePreview = () => {
    if (activeOption === "project") {
      if (!title || !summary) {
        toast.error("Please fill all required fields before previewing.");
        return;
      }
    } else if (activeOption === "activity") {
      if (
        !period ||
        completed.length === 0 ||
        ongoing.length === 0 ||
        next.length === 0
      ) {
        toast.error("Please fill all required fields before previewing.");
        return;
      }
    }

    const reportData = {
      title,
      summary,
      activeOption,
      period,
      completed,
      ongoing,
      next,
    };
    navigate("/home/reports/preview-report", { state: reportData });
    console.log("report data snt:", reportData)
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      report_type: activeOption,
      title,
      receiver,
    };
    let fullBody = {};
    setSubmitloading(true);

    if (activeOption === "activity") {
      fullBody = { ...body, duration: period, completed, ongoing, next };
      console.log(fullBody);
    } else if (activeOption === "project") {
      fullBody = { ...body, summary };
      console.log(fullBody);
    }

    const res = await submitRequest("report/create", "POST", fullBody);
    // const data = await res.json();

    if (res.ok) {
      toast.success("Request sent successfully");
    } else {
      toast.error("Request not sent. Something went wrong");
    }

    setSubmitloading(false);
  };

  // coming back from preview page
  useEffect(() => {
    if (location.state) {
      const { title, summary, activeOption, period, completed, ongoing, next } =
        location.state;
      settitle(title);
      setSummary(summary);
      setActiveOption(activeOption);
      setPeriod(period);
      setCompleted(completed);
      setOngoing(ongoing);
      setNext(next);
    }
  }, [location.state]);

  return (
    <div className="mt-4 min-h-screen overflow-y-auto px-2 md:px-6 fromLeft">
      <div className="mb-2 flex items-center gap-2 text-xl font-medium tracking-wider">
        <span>Create Report</span>
        <div className="rounded-full bg-logo p-[2px]">
          <Plus color="white" />
        </div>
      </div>
      <hr className="mt-1 bg-black" />

      <form
        className="mx-auto my-12 mt-8 flex flex-col gap-4 rounded-xl border px-10 py-8 shadow-lg"
        onSubmit={handleSubmit}
      >
        <Toggle
          ToggleItems={ToggleItems}
          activeOptions={[activeOption, setActiveOption]}
        />

        <CustomLabel
          htmlFor="title"
          labelText="Project Title:"
          inputType="text"
          value={title || ""}
          onChange={(event) => {
            settitle(event.target.value);
          }}
          labelCLassName="'mt-1 font-medium text-lg mb-1 "
          inputClassName="appearance-none relative block w-full  px-3 py-2 border-black border rounded-lg focus:outline-none"
          placeholder="Add request title"
        >
          Report Title
        </CustomLabel>

        {activeOption === "activity" && (
          <Activity
            period={period}
            setPeriod={setPeriod}
            completed={completed}
            setCompleted={setCompleted}
            ongoing={ongoing}
            setOngoing={setOngoing}
            next={next}
            setNext={setNext}
          />
        )}
        {activeOption === "project" && (
          <Project
            summary={summary}
            setSummary={setSummary}
            title={title}
            settitle={settitle}
          />
        )}

        <div className="flex w-fit items-center justify-between gap-4">
          <MultipleSelect
            options={receivers}
            onSelectionChange={setReceiver}
            buttonText={"Receiver"}
            selectedOptions={receiver}
          />
          {receiver && <p>{receiver.name}</p>}
        </div>

        <section className="mt-2 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          {/* submissions do am yourself baby */}
          <div className="flex gap-4">
            <div className="mb-2 flex w-fit items-center justify-start gap-6 rounded-lg border p-2 hover:opacity-70">
              <h3 className="ml-2 font-medium">Docs</h3>
              <div className="w-fit rounded-full bg-logo p-[2px]">
                <Plus color="white" />
              </div>
            </div>
            <div className="mb-2 flex w-fit items-center justify-start gap-6 rounded-lg border p-2 hover:opacity-70">
              <h3 className="ml-2 font-medium">Links</h3>
              <div className="w-fit rounded-full bg-logo p-[2px]">
                <Plus color="white" />
              </div>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-4">
              {submitLoading && <Loader className="animate-spin text-navBg2" />}
              <BigGreenButton action={handlePreview}>Preview</BigGreenButton>
              <div className="flex w-fit gap-4">
                <BigGreenButton type="submit">Submit</BigGreenButton>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default CreateReport;
