import { Input } from "@/components/ui";
import { Puff } from "react-loader-spinner";

interface InputLoadingProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isLoading: boolean;
  height?: number;
  width?: number;
}

export default function InputLoading(props: InputLoadingProps) {
  const { isLoading, height = 12, width = 12, ...rest } = props;

  return (
    <>
      {isLoading && (
        <Puff
          visible={true}
          height={height}
          width={width}
          color="#4fa94d"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}
      <Input {...rest} />
    </>
  );
}
