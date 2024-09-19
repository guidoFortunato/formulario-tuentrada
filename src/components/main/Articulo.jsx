import { RespuestaLike } from "./like/RespuestaLike";
import { ButtonFormulario } from "./like/ButtonFormulario";
import Link from "next/link";
import { ArticleRows } from "./ArticleRows";
import { ContainerDatosPage } from "../container/ContainerDatosPage";

const VERIFICAR_DATOS = "Verificar Datos";

const Articulo = ({ params, dataArticle = {}, dataMostViews = [] }) => {

  
  const dataArticleForm = dataArticle.form;
  const rows = dataArticle?.rows;
  const articleType = dataArticle?.type;
  const titleCategory = params.categoria.slice(0, 1).toUpperCase() + params.categoria.split("-").join(" ").slice(1).toLowerCase();
  // console.log({dataArticle})

  return (
    <>
      <div className=" container mx-auto bg-main-image bg-no-repeat bg-left-50 pb-10 px-10 md:px-20 flex-1">
        <div className="mb-5">
          <h2 className="text-[1.6rem] text-blue-dark font-bold">
            {dataArticle?.title}
          </h2>
          {/* <ArticleSubtitle titleCategory={titleCategory} /> */}
        </div>

        {rows && rows.map((item) => <ArticleRows key={item.name} item={item} />)}

        {articleType === VERIFICAR_DATOS && (
          <ContainerDatosPage params={params} />
        )}

        {dataArticle?.enableHelpful === 1 &&
          articleType !== VERIFICAR_DATOS && (
            <>
              <hr />
              <div className="flex justify-center items-center flex-col mb-5">
                <h4 className="font-bold text-xl text-center text-blue-dark mt-10 mb-2">
                  {" "}
                  Te sirvió la información?
                </h4>
                <RespuestaLike
                  params={params}
                  dataArticleForm={dataArticleForm}
                />
              </div>
              <hr />
            </>
          )}

        {dataArticle?.enableHelpful === 0 &&
          dataArticleForm &&
          articleType !== VERIFICAR_DATOS && (
            <>
              <div className="flex justify-center items-center flex-col mb-5">
                <h4 className="font-bold text-xl text-center text-blue-dark mt-10 mb-2">
                  {" "}
                  Escribinos tu consulta:
                </h4>
                <ButtonFormulario params={params} />
              </div>
              <hr />
            </>
          )}

<div className="flex justify-around  flex-col lg:flex-row mt-6 bg-slate-50 p-4 sm:p-6 lg:p-12 border border-gray-200 rounded-lg shadow-sm ">
  


  {/* Artículos más vistos */}
  {dataMostViews.length > 0 && articleType !== VERIFICAR_DATOS && (
    <div className="lg:col-span-1 py-2">
      <h4 className="font-bold text-blue-dark text-lg sm:text-xl lg:text-2xl mb-4 ">
        Artículos más vistos
      </h4>
      <ol className="text-sm sm:text-base lg:text-lg list-none pl-0">
        {dataMostViews.slice(0, 5).map((item) => (
          <li key={item.id} className="mb-2">
            <span className="text-md lg:text-lg">▸ </span>
            <Link className="hover:underline text-blue-dark transition-colors duration-300 text-sm" href={`/${item.category.slug}/${item.slug}`}>
              {item.title}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )}

  {/* Artículos Relacionados */}
  {dataArticle?.articleChild?.length > 0 && articleType !== VERIFICAR_DATOS && (
    <div className="lg:col-span-1 py-2">
      <h4 className="font-bold text-blue-dark text-lg sm:text-xl lg:text-2xl mb-4">
        Artículos relacionados
      </h4>
      <ol className="text-sm sm:text-base lg:text-lg list-none pl-0">
        {dataArticle?.articleChild?.slice(0, 5).map((item) => (
          <li key={item.id} className="mb-2">
            <span className="text-md lg:text-lg">▸ </span>
            <Link className="hover:underline text-blue-dark transition-colors duration-300 text-sm" href={item.slug}>
              {item.title}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )}
</div>


      </div>
    </>
  );
};

export default Articulo;
