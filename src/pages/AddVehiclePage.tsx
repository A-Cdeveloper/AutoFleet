import AddVehicleForm from "../features/vehicle/components/AddVehicleFormular";
import BackButton from "../ui/BackButton";

const AddVehiclePage = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <BackButton to={`/`} />
      <AddVehicleForm />
    </div>
  );
};

export default AddVehiclePage;
