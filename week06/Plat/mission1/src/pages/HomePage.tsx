import useGetLpList from "../hooks/queries/useGetLpList";

export default function HomePage() {
  const { data, isPending, isError } = useGetLpList({});
  
  return (
    <div className="flex min-h-[calc(100vh-160px)] items-center justify-center px-4 text-white">
      {data?.map((lp) => (
        <h1 key={lp.id}>{lp.title}</h1>
      ))}
    </div>
  );
}