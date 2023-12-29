import { cookies } from 'next/headers'
import CardCategoria from "@/components/main/CardCategoria";
import { getDataPrueba, getTokenServer } from "@/helpers/getInfoTest";

export default async function Home() {
  let data = [];
  const cookieStore = cookies();
  const tokenCookies = cookieStore.get("token");
  const tokenExpiresCookies = cookieStore.get("tokenExpires");
  // let expireCookieToken = false;


  if (!tokenCookies) {

    const { token } = await getTokenServer()
   
    const info = await getDataPrueba(
      `https://testapi.tuentrada.com/api/v1/atencion-cliente/categories`,
      token
    );
    data = info?.data?.categories
   
  }

  if (tokenCookies) {
    const currentDate = Date.now(); 
    if (currentDate < tokenExpiresCookies.value) {
      
      const info = await getDataPrueba(
        `https://testapi.tuentrada.com/api/v1/atencion-cliente/categories`,
        tokenCookies.value
      );
      data = info?.data?.categories
    }else{
      //token expiró
      const { token } = await getTokenServer()
     
      const info = await getDataPrueba(
      `https://testapi.tuentrada.com/api/v1/atencion-cliente/categories`,
      token
      );
      data = info?.data?.categories
     
    }
    
  }
 

  // console.log({ info: info.data.categories });
  // console.log({categories: categories.data})
  // console.log({ largo: categories.length });

  const firstCategories = data.slice(0, 2);
  const thirdCategory = data.slice(2, 3);
  const restCategories = data.slice(3);

 
  

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
