interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = "Oops, something went wrong!",
}) => {
  return <div>{message}</div>;
};

export default ErrorMessage;
