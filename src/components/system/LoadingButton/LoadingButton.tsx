import { Button } from "@/components/ui";
import { ButtonProps } from "@/components/ui/button";
import { Puff } from "react-loader-spinner";

export interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
  disabled?: boolean;
  height?: number;
  width?: number;
  text: string;
}

export default function LoadingButton(props: LoadingButtonProps) {
  const {
    isLoading,
    text,
    disabled = false,
    height = 12,
    width = 12,
    ...rest
  } = props;
  return (
    <Button disabled={disabled || isLoading} {...rest}>
      {isLoading ? (
        <Puff
          visible={true}
          height={height}
          width={width}
          color="#4fa94d"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        text
      )}
    </Button>
  );
}
