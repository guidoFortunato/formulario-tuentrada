import { Loader } from "../loading";

export const ContainerLoader = () => {
  return (
    <div className="container mx-auto bg-main-image bg-no-repeat bg-left-50 pb-10 flex-1">
      <section className="w-[80%] grid grid-cols-1 md:grid-cols-2 justify-items-center gap-4 mx-auto mt-4">
        <Loader />
      </section>
    </div>
  );
};
