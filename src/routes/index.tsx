import QueryRoute from "./query";
import MainRouter from "./routes";

const AppRouter = () => {
  return (
    <QueryRoute>
      <MainRouter />
    </QueryRoute>
  );
};

export default AppRouter;
