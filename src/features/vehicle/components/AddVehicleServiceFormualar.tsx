import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Headline,
  Spinner,
  ErrorMessage,
  FormErrorMessage,
  ErrorBoundary,
  Input,
  Select,
  TextArea,
} from "@/ui";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAddServiceToVehicle } from "@/features/vehicle/hooks/useAddServiceToVehicle";
import {
  serviceFormInputSchema,
  ServiceType,
  type ServiceFormInput,
} from "@/types/service";

const AddVehicleServiceFormular = ({
  setShowAddForm,
  vehicleId,
}: {
  setShowAddForm: (show: boolean) => void;
  vehicleId: string;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ServiceFormInput>({
    resolver: zodResolver(serviceFormInputSchema),
    defaultValues: {
      datum: new Date(Date.now() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      tipServisa: ServiceType.REDOVNI,
      opis: "",
      cena: "",
    },
  });

  const { addNewService, isPending, error } = useAddServiceToVehicle();

  const onSubmit = async (data: ServiceFormInput) => {
    await addNewService(
      {
        vehicleId,
        serviceData: {
          datum: data.datum,
          opis: data.opis,
          cena: Number(data.cena),
          tipServisa: data.tipServisa,
        },
      },
      {
        onSuccess: () => {
          reset();
          setShowAddForm(false);
        },
      }
    );
  };

  if (isPending) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <ErrorBoundary>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-auto-success/10 p-4 rounded-md border my-4 space-y-4"
      >
        <Headline level={2}>Dodaj novi servis</Headline>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Controller
              name="datum"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date) =>
                    field.onChange(date?.toISOString().split("T")[0])
                  }
                  dateFormat="dd.MM.yyyy"
                  minDate={new Date()}
                  placeholderText="Izaberi datum"
                  className="w-full border transition-colors duration-200 font-roboto px-2 py-1 text-xl h-[42px] focus:outline-none focus:ring-1 focus:ring-auto-secondary focus:ring-opacity-50"
                />
              )}
            />
            <FormErrorMessage message={errors.datum?.message} />
          </div>

          <div>
            <Controller
              name="tipServisa"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  size="medium"
                  aria-label="Tip servisa"
                  aria-describedby={
                    errors.tipServisa ? "tipServisa-error" : undefined
                  }
                  aria-invalid={!!errors.tipServisa}
                >
                  <option value={ServiceType.REDOVNI}>Redovni servis</option>
                  <option value={ServiceType.KVAR}>Kvar</option>
                </Select>
              )}
            />
            <FormErrorMessage
              message={errors.tipServisa?.message}
              id="tipServisa-error"
            />
          </div>
        </div>

        <div>
          <Controller
            name="opis"
            control={control}
            render={({ field }) => (
              <TextArea
                {...field}
                rows={3}
                placeholder="Opis servisa..."
                size="medium"
                aria-label="Opis servisa"
                aria-describedby={errors.opis ? "opis-error" : undefined}
                aria-invalid={!!errors.opis}
              />
            )}
          />
          <FormErrorMessage message={errors.opis?.message} id="opis-error" />
        </div>

        <div>
          <Controller
            name="cena"
            control={control}
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Cena:</span>
                <Input
                  {...field}
                  type="number"
                  step="0.01"
                  size="medium"
                  className="!w-40"
                  aria-label="Cena servisa u RSD"
                  aria-describedby={errors.cena ? "cena-error" : undefined}
                  aria-invalid={!!errors.cena}
                />
                <span className="text-gray-500">RSD</span>
              </div>
            )}
          />
          <FormErrorMessage message={errors.cena?.message} id="cena-error" />
        </div>

        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            variation="secondary"
            size="small"
            onClick={() => setShowAddForm(false)}
            aria-label="Odustani od dodavanja servisa"
          >
            Odustani
          </Button>
          <Button
            type="submit"
            variation="primary"
            size="small"
            disabled={isPending}
            aria-label="Sačuvaj novi servis"
          >
            {isPending ? "Dodavanje..." : "Sačuvaj"}
          </Button>
        </div>
      </form>
    </ErrorBoundary>
  );
};

export default AddVehicleServiceFormular;
