import { CheckCheckIcon, InfoIcon } from "lucide-react";

export type FormStatusProps = {
  status: "error" | "success";
  message: string | null;
};

export default function FormStatus(props: FormStatusProps) {
  const { status, message } = props;

  const statusStyles =
    status === "error"
      ? "border-red-500 bg-red-100 text-red-500"
      : "border-green-500 bg-green-50 text-green-500";

  if (!message) return null;

  return (
    <div className={`w-full p-2 border-l-2 ${statusStyles}`}>
      <div className="w-full ml-2 text-xs">
        {status === "error" && (
          <div className="flex  items-center">
            <InfoIcon size={12} className="mr-2" />
            <p>{message}</p>
          </div>
        )}
        {status === "success" && (
          <div className="flex  items-center">
            <CheckCheckIcon size={12} className="mr-2" />
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
