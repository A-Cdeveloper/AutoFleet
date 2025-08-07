import AppRouter from "./routes";
import ErrorBoundary from "./ui/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  );
}

export default App;
