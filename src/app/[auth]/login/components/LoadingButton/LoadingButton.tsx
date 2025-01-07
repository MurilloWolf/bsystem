import { Button } from "@/components/ui";

import { TailSpin } from "react-loader-spinner";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  size?: "sm" | "md" | "lg";
  variant?:
    | "outline"
    | "ghost"
    | "default"
    | "destructive"
    | "secondary"
    | "link"
    | null
    | undefined;
}

export default function LoadingButton({
  loading,
  size,
  children,
  ...props
}: Props) {
  const buttonSize = {
    sm: 24,
    md: 32,
    lg: 48,
    default: 32,
  };

  return (
    <Button {...props} disabled={props.disabled || loading}>
      {loading ? (
        <TailSpin
          visible={true}
          height={buttonSize[size || "default"]}
          width={buttonSize[size || "default"]}
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        children
      )}
    </Button>
  );
}
