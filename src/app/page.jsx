import CardCategoria from "@/components/main/CardCategoria";
import { getData } from "@/utils/getData";
import { notFound, redirect } from "next/navigation";

export default async function HomePage() {
  const { status, res } = await getData(
    `https://${process.env.ENDPOINT_API}/api/v1/atencion-cliente/categories`
  );

  if (!status) {
    // Redirige a una página 404 si no se encuentra la información
    notFound()
    // redirect("/error");
  }

  const categories = res?.data?.categories;

  const infoCategories = (categories) =>
    categories.length > 0 &&
    categories.map((item) => (
      <CardCategoria
        color={item.color}
        title={item.name}
        slug={item.slug}
        key={item.id}
        description={item.reference}
        icon={item.svg}
      />
    ));
  const firstCategories = categories.slice(0, 2);
  const thirdCategory = categories.slice(2, 3);
  const restCategories = categories.slice(3, 6);
  const twoCategories = categories.slice(6);

  return (
    <main>
      <div className="container mx-auto bg-main-image bg-no-repeat bg-left-50 pb-10 flex-1">
        <section className="w-[80%] grid grid-cols-1 md:grid-cols-2 justify-items-center gap-4 mx-auto mt-4">
          {infoCategories(firstCategories)}
        </section>

        <section className="w-[80%] grid grid-cols-1 justify-items-center gap-4 mx-auto mt-4">
          {infoCategories(thirdCategory)}
        </section>

        <section className="w-[80%] grid grid-cols-1 lg:grid-cols-3 justify-items-center gap-4 mx-auto mt-4">
          {infoCategories(restCategories)}
        </section>

        <section className="w-[80%] grid grid-cols-1 md:grid-cols-2 justify-items-center gap-4 mx-auto mt-4">
          {infoCategories(twoCategories)}
        </section>
      </div>
    </main>
);
{/* <h1 className="text-black">Home page</h1> */}
}
