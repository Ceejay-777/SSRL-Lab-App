import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ChevronDown, Plus, ChevronUp, Edit, Trash2 } from "lucide-react";
import BigGreenButton from "../../../components/BigGreenButton";
import DatePickerComp from "../../../components/DatePickerComp";
import MultipleSelect from "../../../components/MultipleSelect"

const EditProject = () => {
  const location = useLocation();
  const projectData = location.state;
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [objectives, setObjectives] = useState([]);
  const [currentObjective, setCurrentObjective] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState([]);

  // const [showMembersDropdown, setShowMembersDropdown] = useState(false);
  // const [showLeadsDropdown, setShowLeadsDropdown] = useState(false);
  // const toggleMembersDropdown = () =>
  //   setShowMembersDropdown(!showMembersDropdown);
  // const toggleLeadsDropdown = () => setShowLeadsDropdown(!showLeadsDropdown);

  useEffect(() => {
    if (projectData) {
      setProjectTitle(projectData.name || "");
      setProjectDescription(projectData.description || "");
      setObjectives(projectData.objectives || []);
      setSelectedDate(new Date(projectData.deadline));
      setSelectedMembers(projectData.team_members || []);
      setSelectedLeads(projectData.leads || []);
    }
  }, [projectData]);

  const handleMemberChange = (newSelectedMembers) => {
    setSelectedMembers(newSelectedMembers)

    setSelectedLeads(prev =>
      prev.filter(lead =>
        newSelectedMembers.some(member => member.id === lead.id)
      )
    )
  }
  const handleAddOrUpdateObjective = () => {
    if (currentObjective.trim() !== "") {
      if (editingIndex !== null) {
        // Update selected objective
        const updatedObjectives = [...objectives];
        updatedObjectives[editingIndex] = currentObjective;
        setObjectives(updatedObjectives);
        setEditingIndex(null);
      } else {
        setObjectives([...objectives, currentObjective]);
      }
      setCurrentObjective("");
    }
  };

  const handleEditObjective = (index) => {
    setCurrentObjective(objectives[index]);
    setEditingIndex(index);
  };
  const handleDeleteObjective = (index) => {
    const updatedObjectives = objectives.filter((_, i) => i !== index);
    setObjectives(updatedObjectives);
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  return (
    <div className="mt-4 min-h-screen overflow-y-auto px-6 py-4">
      <button className="mb-2 flex items-center gap-2 text-xl font-semibold tracking-wider">
        <span>Edit</span>{" "}
        <span className="text-navBg2">{projectData.name}</span>
      </button>
      <hr className="mt-1 bg-black" />

      <form className='mt-8 mx-auto my-12 flex flex-col gap-5 rounded-xl border px-10 py-8 shadow-lg'>
        <div className="mt-4 space-y-6">
          {/* Project Title */}
          <div>
            <label
              htmlFor="projectTitle"
              className="mb-1 inline-block font-medium text-black"
            >
              Project Name
            </label>
            <input
              type="text"
              id="projectTitle"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="relative mb-2 block w-full appearance-none rounded-lg border border-gray-400 px-3 py-2 focus:outline-none"
            />
          </div>

          {/* Project Description */}
          <div>
            <label
              htmlFor="projectDescription"
              className="mb-1 inline-block font-medium text-black"
            >
              Project Description
            </label>
            <textarea
              id="projectDescription"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              className="block h-32 w-full resize-none appearance-none rounded-lg border border-gray-400 px-4 py-3 focus:outline-none"
            />
          </div>

          {/* Objectives */}
          <div>
            <label className="font-medium">Objectives</label>
            <div className="mt-1 flex gap-2">
              <input
                type="text"
                value={currentObjective}
                onChange={(e) => setCurrentObjective(e.target.value)}
                placeholder={
                  editingIndex !== null ? "Edit Objective" : "Add Objective"
                }
                className="w-full rounded-lg border border-gray-400 px-3 py-2 focus:outline-black"
              />
              <button
                type="button"
                onClick={handleAddOrUpdateObjective}
                className="rounded-lg bg-navBg2 px-4 py-2 text-white"
              >
                {editingIndex !== null ? "Update" : "Add"}
              </button>
            </div>
            <ul className="mt-2 flex w-3/4 max-w-[560px] list-outside list-decimal flex-col gap-2 text-sm">
              {objectives.map((objective, index) => (
                <li
                  key={index}
                  className="mb-1 flex items-center justify-between gap-2 rounded-md border-2 p-2 hover:border-black"
                >
                  <span className="truncate">{objective}</span>
                  <div className="flex w-fit items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleEditObjective(index)}
                      className="hover:scale-105"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteObjective(index)}
                      className="hover:scale-105"
                    >
                      <Trash2 size={20} color="red" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex w-fit items-center gap-4">
            <DatePickerComp
              selected={selectedDate}
              change={(date) => {
                console.log(date);
                setSelectedDate(date);
              }}
              label="Deadline"
              className="w-full rounded-lg border border-gray-400 px-3 py-2 focus:outline-none"
            />
          </div>


          <div className="mt-8 flex flex-col gap-8 md:flex-row">
            <MultipleSelect
              options={selectedMembers}
              selectedOptions={selectedMembers}
              onSelectionChange={handleMemberChange}
              buttonText="Add Team Members"
              className="w-full md:w-1/2"
            />

            {/* Select Leads */}
            <MultipleSelect
              options={selectedLeads}
              selectedOptions={selectedLeads}
              onSelectionChange={setSelectedLeads}
              buttonText="Add Team leads"
              className="w-full md:w-1/2"
              disabled={selectedMembers.length === 0}
            />

          </div>
          {/* Submit Button */}
          <BigGreenButton type="submit">Save Changes</BigGreenButton>
        </div>
      </form>
    </div>
  );
};

export default EditProject;
