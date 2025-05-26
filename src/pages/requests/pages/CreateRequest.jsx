import { useState, useEffect } from "react";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import CustomLabel from "../../../components/CustomLabel";
import Toggle from "../../../components/Toggle";
import Equipment from "../component/Equipment";
import MultipleSelect from "../../../components/MultipleSelect";
import BigGreenButton from "../../../components/BigGreenButton";
import DatePicker from "react-datepicker";
import { useRequest } from "../../../Modules/useRequest";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const CreateRequest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const request = location.state;
  const [title, setTitle] = useState("");
  const [activeOption, setActiveOption] = useState("equipment");
  const [leaveDates, setLeaveDates] = useState({ from: null, to: null });
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [eqpName, setEqpName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purpose, setPurpose] = useState("");
  const [recipients, setRecipients] = useState([]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setLeaveDates(prev => ({ ...prev, from: date }));
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setLeaveDates(prev => ({ ...prev, to: date }));
  };

  const [
    createRequest,
    createLoading,
    setCreateLoading,
    createError,
    setCreateError,
  ] = useRequest();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreateLoading(true);

    const base = {
      title,
      type: activeOption,
      receipient: selectedRecipients[0],
    };
    let request_dtls = {};
    if (activeOption === "equipment") {
      request_dtls = {
        name: eqpName,
        quantity,
        from: leaveDates.from,
        to: leaveDates.to,
        purpose,
      };
    } else if (activeOption === "leave") {
      request_dtls = {
        from: leaveDates.from,
        to: leaveDates.to,
        purpose,
      };
    } else if (activeOption === "others") {
      request_dtls = {
        purpose,
      };
    }
    const body = { ...base, request_dtls };

    const res = await createRequest("request/create", "POST", body);
    const data = await res.json();

    if (res.status === 200) {
      toast.success("Request created successfully");
      navigate("/home/requests");
    } else {
      setCreateError({
        status: true,
        msg: data.message,
      });
      toast.error(createError.msg);
    }
    setCreateLoading(false);
    console.log(body);
  };

  const handlePreview = () => {
    if (activeOption === "equipment") {
      if (!title || !eqpName || !quantity || !purpose) {
        toast.error("Please fill all required fields before previewing.");
        return;
      }
    } else if (activeOption === "leave") {
      if (!title || !leaveDates.from || !leaveDates.to || !purpose) {
        toast.error("Please fill all required fields before previewing.");
        return;
      }
    } else if (activeOption === "others") {
      if (!title || !purpose) {
        toast.error("Please fill all required fields before previewing.");
        return;
      }
    }
    const requestData = {
      title,
      activeOption,
      eqpName,
      quantity,
      purpose,
      leaveDates,
      selectedRecipients,
    };
    navigate("/home/requests/preview-request", { state: requestData });
    // console.log("request data:", requestData);
  };

  useEffect(() => {
    // console.log("Request data:", request);
    if (request) {
      console.log("Restoring request state in CreateRequest:", request.title);

      setTitle(request.title)
      setActiveOption(request.activeOption || "equipment");
      setEqpName(request.eqpName || "");
      setQuantity(request.quantity || "");
      setPurpose(request.purpose || "");


      if (request.selectedRecipients && request.selectedRecipients.length > 0) {
        setSelectedRecipients(request.selectedRecipients);
      }


      if (request.leaveDates) {
        const fromDate = request.leaveDates.from ? new Date(request.leaveDates.from) : null;
        const toDate = request.leaveDates.to ? new Date(request.leaveDates.to) : null;

        setLeaveDates({
          from: fromDate,
          to: toDate
        });

        if (fromDate) setStartDate(fromDate);
        if (toDate) setEndDate(toDate);
      }
    }
  }, [request]);

  const [membersRequest] = useRequest();

  const getReceivers = async () => {
    const res = await membersRequest(`get_all_members`);
    const data = await res.json();
    if (res.ok) {
      setRecipients(data.members);
    }
  };

  useEffect(() => {
    getReceivers();
  }, []);

  return (
    <div className="fromLeft mt-4 min-h-screen overflow-y-auto px-2 md:px-6">
      <div className="mb-2 flex items-center gap-2 text-xl font-semibold tracking-wider">
        <span>Create New Request</span>
        <div className="rounded-full bg-logo p-[2px]">
          <Plus color="white" />
        </div>
      </div>
      <hr className="mt-1 bg-black" />

      <form
        className="mx-auto my-12 mt-8 flex flex-col gap-5 rounded-xl border px-10 py-8 shadow-lg"
        onSubmit={handleSubmit}
      >
        <CustomLabel
          htmlFor="title"
          labelText="Title:"
          inputType="text"
          value={title || ""}
          onChange={(event) => setTitle(event.target.value)}
          required={true}
          labelCLassName="text-black inline-block font-medium text-lg  mb-1 "
          inputClassName="appearance-none relative block w-full  px-3 py-2 border border-black rounded-lg focus:outline-none"
          placeholder="Add request title"
        >
          Title
        </CustomLabel>

        <Toggle
          activeOptions={[activeOption, setActiveOption]}
          ToggleItems={["equipment", "leave", "others"]}
          className="sm:mx-auto"
        />

        {activeOption === "equipment" && (
          <Equipment
            eqpName={eqpName}
            setEqpName={setEqpName}
            quantity={quantity}
            setQuantity={setQuantity}
            purpose={purpose}
            setPurpose={setPurpose}
          />
        )}

        {(activeOption === "equipment" || activeOption === "leave") && (
          <div>
            <div className="mt-2 flex flex-col items-center gap-5 sm:flex-row">
              <div>
                <label className="mb-2 block font-medium">From:</label>
                <DatePicker
                  selected={startDate}
                  onChange={handleStartDateChange}
                  placeholderText="Select start date"
                  className="w-full rounded-lg border border-slate-900 px-3 py-2 text-slate-900 opacity-35 focus:text-black focus:opacity-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block font-medium">To:</label>
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  minDate={startDate}
                  placeholderText="Select end date"
                  className="w-full rounded-lg border border-slate-900 px-3 py-2 text-slate-900 opacity-35 focus:text-black focus:opacity-100 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-2">
          <h2 className="mb-1 font-medium">
            {activeOption === "others" ? "Give detailed description" : "Purpose"}
          </h2>
          <textarea
            id="purpose"
            value={purpose || ""}
            onChange={(event) => setPurpose(event.target.value)}
            className="mt-l block h-32 w-full resize-none appearance-none rounded-lg border border-slate-900 px-4 py-3 text-slate-900 opacity-35 focus:text-black focus:opacity-100 focus:outline-none"
            rows={5}
            required
          />
        </div>

        <div className="mt-3">
          <label className="mb-1 block font-medium text-black">
            Recipients:
          </label>
          <MultipleSelect
            options={recipients}
            selectedOptions={selectedRecipients}
            onSelectionChange={setSelectedRecipients}
            buttonText="Select Recipients"
            className="w-full md:w-1/2"
          />
        </div>

        <div className="mt-3 flex items-center justify-end gap-3">
          {createLoading && <Loader className="animate-spin text-navBg2" />}
          <BigGreenButton action={handlePreview}>Preview</BigGreenButton>
          <BigGreenButton type="submit">Submit</BigGreenButton>
        </div>
      </form>
    </div>
  );
};

export default CreateRequest; 