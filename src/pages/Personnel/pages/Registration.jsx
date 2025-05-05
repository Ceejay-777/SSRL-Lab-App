import React from "react";
import { useState } from "react";
import CustomLabel from "../../../components/CustomLabel";
import { useLocation, useNavigate } from "react-router-dom";
import DatePickerComp from "../../../components/DatePickerComp";
import BigGreenButton from "../../../components/BigGreenButton";
import { useRequest } from "../../../Modules/useRequest";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRef } from "react";
import { Plus } from "lucide-react";
import { Asterisk } from "lucide-react";
import Spinner from "../../../components/Spinner";

const Edit = () => {
  const location = useLocation();
  const userRole = location.state.role;
  const [selectedDate, setSelectedDate] = useState(null);
  const [user, setUser] = useState(() => ({
    firstname: "",
    lastname: "",
    email: "",
    phone_num: "",
    stack: "",
    niche: "",
    bio: "",
    role: userRole,
  }));

  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [createRequest, createLoading, setCreateLoading] = useRequest();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleCreate = async () => {
    console.log({ ...user, bday: selectedDate });
    setCreateLoading(true);
    const formData = new FormData();

    formData.append("info", JSON.stringify({...user, bday: selectedDate}));
    if (selectedImage) {
      formData.append("avatar", selectedImage);
    }

    const res = await createRequest(
      `personnel/admin_create_user`,
      "POST",
      formData,
    );
    const data = await res.json();

    if (res.ok) {
      toast.success(data.message);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } else {
      toast.error(data.message);
    }
    console.log(data);

    setCreateLoading(false);
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
    console.log(URL.createObjectURL(file));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleCreate();
  };

  return (
    <div>
      <div className="container">
        <div className="mt-4">
          <div className="text-2xl font-medium">Create new personnel</div>
          <hr className="bg-black" />

          <div>
            <form
              className="mx-auto my-12 flex flex-col gap-2 rounded-xl border px-10 py-8 shadow-lg"
              onSubmit={handleFormSubmit}
            >
              <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
                <div
                  className="border-1 relative mx-auto mb-6 flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border-black bg-navBg2 hover:scale-105 md:ml-12"
                  onClick={handleFileClick}
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="avatar"
                      className="m-5 rounded-full object-cover"
                    />
                  ) : (
                    <span className={`text-2xl font-medium text-white`}>
                      {"Add DP"} <Plus className="mx-auto" color={"white"} />
                    </span>
                  )}

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                <div className="flex flex-col justify-center gap-2">
                  <p className="flex items-center">
                    Create a new user and add an optional profile picture
                  </p>
                  <p className="flex gap-2">
                    <Asterisk color={"red"} /> -- Required field
                  </p>
                </div>

                <CustomLabel
                  htmlFor="firstname"
                  labelText="First name"
                  value={user.firstname}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  required={true}
                >
                  First name <Asterisk color={"red"} size={16} />
                </CustomLabel>

                <CustomLabel
                  htmlFor="lastname"
                  labelText="Last name"
                  value={user.surname}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  required={true}
                >
                  Last name <Asterisk color={"red"} size={16} />
                </CustomLabel>

                <CustomLabel
                  htmlFor="email"
                  labelText="Email"
                  inputType="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Enter email "
                  required={true}
                >
                  Email <Asterisk color={"red"} size={16} />
                </CustomLabel>

                <CustomLabel
                  htmlFor="phone_num"
                  labelText="Phone number"
                  inputType="tel"
                  value={user.phone_num}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required={true}
                >
                  Phone number <Asterisk color={"red"} size={16} />
                </CustomLabel>

                <div>
                  <label htmlFor="stack" className="flex items-center gap-2">
                    Stack
                    <Asterisk color={"red"} size={16} />
                  </label>
                  <select
                    name="stack"
                    value={user.stack}
                    onChange={handleChange}
                    className="h-10 w-full rounded-lg border border-slate-900 px-3 py-1 text-[#111111] opacity-35 focus:text-black focus:opacity-100 focus:outline-none"
                    required
                  >
                    <option value="" disabled>
                      Select Stack
                    </option>
                    <option value="Software">Software</option>
                    <option value="Hardware">Hardware</option>
                  </select>
                </div>

                <CustomLabel
                  htmlFor="niche"
                  labelText="Niche"
                  value={user.niche}
                  onChange={handleChange}
                  placeholder="Enter niche"
                >
                  Niche <Asterisk color={"red"} size={16} />
                </CustomLabel>

                <div>
                  <label htmlFor="role">Role</label>
                  <select
                    name="role"
                    value={userRole}
                    defaultValue={userRole}
                    onChange={handleChange}
                    className="h-10 w-full rounded-lg border border-slate-900 px-3 py-1 text-[#111111] opacity-35 focus:text-black focus:opacity-100 focus:outline-none"
                    disabled
                  >
                    <option>Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Lead">Lead</option>
                    <option value="Intern">Intern</option>
                  </select>
                </div>

                <DatePickerComp
                  label="Date of Birth"
                  placeholder="  Select your date of birth"
                  selected={selectedDate}
                  change={setSelectedDate}
                />

                <div className="col-span-2">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    value={user.bio}
                    className="h-36 w-full appearance-none rounded-lg border border-slate-900 p-3 opacity-35 focus:opacity-100 focus:outline-none md:col-span-2"
                    onChange={handleChange}
                    name="bio"
                  ></textarea>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <BigGreenButton type="submit">Create User</BigGreenButton>
                {createLoading && (
                  <Spinner />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
