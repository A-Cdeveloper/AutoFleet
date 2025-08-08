import { Toaster } from "react-hot-toast";

const Notifications = () => {
  return (
    <Toaster
      position="bottom-right"
      gutter={3}
      containerStyle={{
        right: 10,
        top: 10,
        zIndex: 999999,
      }}
      toastOptions={{
        className: "toaststyle",
        style: {
          fontSize: "14px",
          fontWeight: "500",
          padding: "12px 16px",
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          color: "#374151",
        },
        success: {
          duration: 3000,
          style: {
            background: "#ffffff",
            color: "#374151",
            border: "2px solid #10B981",
          },
          iconTheme: {
            primary: "#10B981",
            secondary: "#ffffff",
          },
        },
        error: {
          duration: 4000,
          style: {
            background: "#ffffff",
            color: "#374151",
            border: "2px solid #EF4444",
          },
          iconTheme: {
            primary: "#EF4444",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
};

export default Notifications;
