const InputErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div className="flex gap-1 items-center">
      <img
        src="/assets/icons/error-icon-validation.gif"
        alt="error"
        width={22}
        height={22}
      />
      <p className="text-red-500 text-sm">{errorMessage}</p>
    </div>
  );
};

export default InputErrorMessage;
