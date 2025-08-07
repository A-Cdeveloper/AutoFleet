import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../../store/authStore";
import { useNavigate } from "react-router-dom";
import Headline from "../../../ui/Headline";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import FormErrorMessage from "../../../ui/FormErrorMessage";
import ErrorBoundary from "../../../ui/ErrorBoundary";
import { loginSchema, type LoginFormData } from "../../../types/auth";

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    const success = login(data.username, data.password);
    if (success) {
      navigate("/");
    } else {
      setError("root", {
        type: "manual",
        message: "Pogrešno korisničko ime ili lozinka",
      });
    }
  };

  return (
    <ErrorBoundary>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg space-y-2"
      >
        <Headline level={2} className="text-center">
          Prijava
        </Headline>

        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              placeholder="Korisničko ime"
              autoFocus
              size="medium"
            />
          )}
        />
        <FormErrorMessage message={errors.username?.message} />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              placeholder="Lozinka"
              size="medium"
            />
          )}
        />
        <FormErrorMessage message={errors.password?.message} />

        <FormErrorMessage message={errors.root?.message} />

        <Button
          type="submit"
          variation="secondary"
          size="small"
          disabled={isSubmitting}
          className="w-full py-[10px]"
        >
          {isSubmitting ? "Prijavljivanje..." : "Prijavi se"}
        </Button>
      </form>
    </ErrorBoundary>
  );
}
