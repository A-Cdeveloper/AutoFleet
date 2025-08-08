import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { vehicleFormSchema, type VehicleFormData } from "@/types/vehicle";
import {
  Button,
  FormErrorMessage,
  Headline,
  Input,
  Spinner,
  ErrorBoundary,
} from "@/ui";
import { useEditVehicle } from "@/features/vehicle/hooks/useEditVehicle";
import useGetVehicle from "@/features/vehicle/hooks/useGetVehicle";

const EditVehicleForm = ({ id }: { id: string }) => {
  const navigate = useNavigate();

  const {
    data: vehicle,
    isLoading: loadingVehicle,
    error: loadError,
  } = useGetVehicle(id || "");
  const {
    editExistingVehicle,
    isPending: editing,
    error: editError,
  } = useEditVehicle();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      marka: "",
      model: "",
      godina: "",
      services: [],
    },
  });

  useEffect(() => {
    if (vehicle) {
      reset({
        marka: vehicle.marka || "",
        model: vehicle.model || "",
        godina: vehicle.godina?.toString() || "",
        services: vehicle.services || [],
      });
    }
  }, [vehicle, reset]);

  const onSubmit = (data: VehicleFormData) => {
    if (!id) return;
    editExistingVehicle(
      {
        id,
        data: {
          ...data,
          godina: Number(data.godina),
          services: data.services || [],
        },
      },
      {
        onSuccess: () => navigate(`/vehicles/${id}`),
      }
    );
  };

  if (loadingVehicle) return <Spinner />;
  if (loadError) return <FormErrorMessage message={loadError} />;

  return (
    <ErrorBoundary>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Headline level={2}>Izmeni vozilo</Headline>

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

        {editError && <FormErrorMessage message={editError} id="form-error" />}

        <div className="flex gap-4 justify-end">
          <Button
            type="submit"
            variation="primary"
            size="medium"
            disabled={isSubmitting || editing}
            aria-label="Sačuvaj izmene vozila"
          >
            {editing ? "Čuvanje..." : "Sačuvaj izmene"}
          </Button>
          <Button
            type="button"
            variation="secondary"
            size="medium"
            onClick={() => navigate(`/vehicles/${id}`)}
            aria-label="Odustani od izmene vozila"
          >
            Odustani
          </Button>
        </div>
      </form>
    </ErrorBoundary>
  );
};

export default EditVehicleForm;
