import { cookies } from 'next/headers'
import CardCategoria from "@/components/main/CardCategoria";
import { getDataPrueba } from "@/helpers/getInfoTest";

export default async function Home() {
  const cookieStore= cookies()
  const token = cookieStore.get('token')
  const info = await getDataPrueba( "https://testapi.tuentrada.com/api/v1/atencion-cliente/categories", "12707|5n4wj2vZHLfXa8DcSTqW0dZErhDlZpOU5OeAuqQ4" );
  const { categories } = info.data;
  // console.log({ info: info.data.categories });
  // console.log({categories: categories.data})
  // console.log({ largo: categories.length });

  const firstCategories = categories.slice(0, 2);
  const thirdCategory = categories.slice(2, 3);
  const restCategories = categories.slice(3);

 
  

  return (
    <main>
      <div className="container mx-auto bg-main-image bg-no-repeat bg-left-50 pb-10 flex-1">
        <section className="w-[80%] grid grid-cols-1 md:grid-cols-2 justify-items-center gap-4 mx-auto mt-4">
          {firstCategories.length > 0 &&
            firstCategories.map((item) => (
              <CardCategoria
                color={item.color}
                title={item.name}
                slug={item.slug}
                key={item.id}
                description={item.reference}
                icon={item.svg}
              />
            ))}
        </section>

        <section className="w-[80%] grid grid-cols-1 justify-items-center gap-4 mx-auto mt-4">
          {thirdCategory.length > 0 &&
            thirdCategory.map((item) => (
              <CardCategoria
                color={item.color}
                title={item.name}
                slug={item.slug}
                key={item.id}
                description={item.reference}
                icon={item.svg}
              />
            ))}
        </section>

        <section className="w-[80%] grid grid-cols-1 lg:grid-cols-3 justify-items-center gap-4 mx-auto mt-4">
          {restCategories.length > 0 &&
            restCategories.map((item) => (
              <CardCategoria
                color={item.color}
                title={item.name}
                slug={item.slug}
                key={item.id}
                description={item.reference}
                icon={item.svg}
              />
            ))}
        </section>
      </div>
    </main>
  );
}
