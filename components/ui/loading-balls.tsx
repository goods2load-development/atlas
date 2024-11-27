const LoadingBalls = () => {
  return (
    <div className="relative w-full h-10 flex justify-center items-center overflow-hidden">
      <div
        className="ball bg-gray-500 rounded-full w-5 h-5 absolute opacity-0 animate-ball-animation"
        style={{ animationDelay: '0s', left: 'calc(50% + 30px)' }}
      ></div>
      <div
        className="ball bg-gray-500 rounded-full w-5 h-5 absolute opacity-0 animate-ball-animation"
        style={{ animationDelay: '0.2s', left: '50%' }}
      ></div>
      <div
        className="ball bg-gray-500 rounded-full w-5 h-5 absolute opacity-0 animate-ball-animation"
        style={{ animationDelay: '0.4s', left: 'calc(50% - 30px)' }}
      ></div>
      <div
        className="ball bg-gray-500 rounded-full w-5 h-5 absolute opacity-0 animate-ball-animation"
        style={{ animationDelay: '0.6s', left: 'calc(50% - 60px)' }}
      ></div>
    </div>
  );
};

export default LoadingBalls;
