import CardCategoria from "./CardCategoria";

export const SectionMain = ({ firstCategories, thirdCategory, restCategories }) => {
  
  return (
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
  );
};
