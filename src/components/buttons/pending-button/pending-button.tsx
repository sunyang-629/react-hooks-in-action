import { FC, useTransition } from "react";
import Spinner from "../../spinner";

interface IPendingButtonProps {
  children: JSX.Element | string;
  onClick: () => void;
  [key: string]: unknown;
}

const PendingButton: FC<IPendingButtonProps> = ({
  children,
  onClick,
  ...props
}) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(onClick);
  };

  return (
    <button onClick={handleClick} {...props}>
      {isPending && <Spinner />}
      {children}
      {isPending && <Spinner />}
    </button>
  );
};

export default PendingButton;
