import { useParams } from "react-router-dom";
import BackButton from "../ui/BackButton";
import EditVehicleForm from "../features/vehicle/components/EditVehicleFormular";

const EditVehiclePage = () => {
  const { id } = useParams() as { id: string };
  return (
    <div className="flex flex-col h-full w-full">
      <BackButton to={`/vehicles/${id}`} />
      <EditVehicleForm id={id} />
    </div>
  );
};

export default EditVehiclePage;
