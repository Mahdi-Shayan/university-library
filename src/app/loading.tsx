import Image from "next/image";

function Loading() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-dark-500">
      <Image
        src="/icons/loading-circle.svg"
        alt=""
        width={80}
        height={80}
      />
    </div>
  );
}
export default Loading;
