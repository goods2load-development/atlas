import clsx from 'clsx';

const Spinner = ({ className }: { className?: string }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={clsx(
          'w-4 h-4 border-4 border-orange-500 border-t-transparent border-solid rounded-full animate-spin',
          className,
        )}
      ></div>
    </div>
  );
};

export default Spinner;
