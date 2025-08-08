import { useNavigate } from "react-router-dom";
import type { Vehicle } from "@/types/vehicle";
import Button from "@/ui/Button";
import Headline from "@/ui/Headline";
import { useAuthStore } from "@/store/authStore";

const VehicleItem = ({ vehicle }: { vehicle: Vehicle }) => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className=" bg-white p-2">
      <Headline level={3}>{vehicle.marka}</Headline>

      <p>Model: {vehicle.model}</p>
      <p>Godina: {vehicle.godina}</p>
      {isAuthenticated && (
        <div className="flex justify-end">
          <Button
            size="small"
            variation="secondary"
            className="py-[4px]"
            onClick={() => {
              navigate(`/vehicles/${vehicle.id}`);
            }}
          >
            Detalji
          </Button>
        </div>
      )}
    </div>
  );
};

export default VehicleItem;
