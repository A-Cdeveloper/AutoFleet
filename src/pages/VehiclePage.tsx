import { useParams } from "react-router-dom";
import VehicleDetails from "@/features/vehicle/components/VehicleDetails";
import BackButton from "@/ui/BackButton";

const VehiclePage = () => {
  const { id } = useParams() as { id: string };
  return (
    <div className="flex flex-col h-full w-full">
      <BackButton />
      <VehicleDetails id={id} />
    </div>
  );
};

export default VehiclePage;
