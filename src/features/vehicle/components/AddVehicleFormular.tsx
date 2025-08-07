import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../../ui/Button";
import FormErrorMessage from "../../../ui/FormErrorMessage";
import Headline from "../../../ui/Headline";
import Input from "../../../ui/Input";
import ErrorBoundary from "../../../ui/ErrorBoundary";
import { useAddVehicle } from "../hooks/useAddVehicle";
import {
  vehicleFormSchema,
  type VehicleFormData,
} from "../../../types/vehicle";
import Spinner from "../../../ui/Spinner";
import ErrorMessage from "../../../ui/ErrorMessage";

const AddVehicleForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      marka: "",
      model: "",
      godina: new Date().getFullYear().toString(),
    },
  });

  const navigate = useNavigate();
  const { addNewVehicle, isPending, error } = useAddVehicle();

  if (isPending) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  const onSubmit = (data: VehicleFormData) => {
    addNewVehicle(
      { ...data, godina: Number(data.godina), services: [] },
      {
        onSuccess: () => navigate("/"),
      }
    );
  };

  return (
    <ErrorBoundary>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Headline level={2}>Dodaj novo vozilo</Headline>

        <div>
          <Controller
            name="marka"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="Marka vozila"
                size="medium"
              />
            )}
          />
          <FormErrorMessage message={errors.marka?.message} />
        </div>

        <div>
          <Controller
            name="model"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="Model vozila"
                size="medium"
              />
            )}
          />
          <FormErrorMessage message={errors.model?.message} />
        </div>

        <div>
          <Controller
            name="godina"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                placeholder="Godina proizvodnje"
                size="medium"
              />
            )}
          />
          <FormErrorMessage message={errors.godina?.message} />
        </div>

        <div className="flex gap-4 justify-end">
          <Button
            type="submit"
            variation="primary"
            size="medium"
            disabled={isSubmitting}
          >
            Dodaj vozilo
          </Button>
          <Button
            type="button"
            variation="secondary"
            size="medium"
            onClick={() => navigate("/")}
          >
            Odustani
          </Button>
        </div>
      </form>
    </ErrorBoundary>
  );
};

export default AddVehicleForm;
