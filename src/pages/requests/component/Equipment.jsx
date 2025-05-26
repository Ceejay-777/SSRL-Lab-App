import CustomLabel from "../../../components/CustomLabel";

const Equipment = ({
  eqpName,
  setEqpName,
  quantity,
  setQuantity
}) => {

  return (
    <>
      <div className="flex flex-col md:flex-row items-start gap-10 ">
        <div className="w-24">
          <CustomLabel
            htmlFor="quantity"
            labelText="Quantity"
            inputType="number"
            value={quantity || ""}
            onChange={(event) => setQuantity(event.target.value)}
            //   onBlur={() => {}}=[#
            required={true}
            labelCLassName="text-black inline-block font-medium text-lg  mb-1 "
            inputClassName="appearance-none relative block w-20 px-3 py-2 border border-gray-400 rounded-lg focus:outline-none text-center"
            placeholder="Num"
          >Quantity</CustomLabel>
        </div>

        <div className="md:w-1/2 w-full">
          <CustomLabel
            htmlFor="eqpName"
            labelText="Equipment Name:"
            inputType="text"
            value={eqpName || ""}
            onChange={(event) => setEqpName(event.target.value)}
            //   onBlur={() => {}}
            required={true}
            labelCLassName="text-black inline-block font-medium text-lg  mb-1"
            inputClassName="appearance-none w-full relative block px-3 py-2 border border-gray-400 rounded-lg focus:outline-none grow"
          >Equipment Name:</CustomLabel>
        </div>
      </div>
    </>
  );
};

export default Equipment;
