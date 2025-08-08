import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormErrorMessage,
  Headline,
  Input,
  ErrorBoundary,
  Spinner,
  ErrorMessage,
} from "@/ui";
import { useAddVehicle } from "@/features/vehicle/hooks/useAddVehicle";
import { vehicleFormSchema, type VehicleFormData } from "@/types/vehicle";

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
                aria-label="Marka vozila"
                aria-describedby={errors.marka ? "marka-error" : undefined}
                aria-invalid={!!errors.marka}
              />
            )}
          />
          <FormErrorMessage message={errors.marka?.message} id="marka-error" />
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
                aria-label="Model vozila"
                aria-describedby={errors.model ? "model-error" : undefined}
                aria-invalid={!!errors.model}
              />
            )}
          />
          <FormErrorMessage message={errors.model?.message} id="model-error" />
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
                aria-label="Godina proizvodnje"
                aria-describedby={errors.godina ? "godina-error" : undefined}
                aria-invalid={!!errors.godina}
              />
            )}
          />
          <FormErrorMessage
            message={errors.godina?.message}
            id="godina-error"
          />
        </div>

        <div className="flex gap-4 justify-end">
          <Button
            type="submit"
            variation="primary"
            size="medium"
            disabled={isSubmitting}
            aria-label="Dodaj novo vozilo"
          >
            Dodaj vozilo
          </Button>
          <Button
            type="button"
            variation="secondary"
            size="medium"
            onClick={() => navigate("/")}
            aria-label="Odustani od dodavanja vozila"
          >
            Odustani
          </Button>
        </div>
      </form>
    </ErrorBoundary>
  );
};

export default AddVehicleForm;
