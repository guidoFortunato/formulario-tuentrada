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

        <div className="flex flex-col items-center md:items-start lg:justify-evenly lg:flex-row mt-10 bg-slate-50 p-8 lg:p-20  border border-gray-200" >

        <div className="mb-8 md:mb-0 text-start md:py-2 lg:py-0">
              <h2 className="font-bold text-2xl text-center text-blue-dark mt-10 mb-2 md:text-start">
              Centro de Ayuda y Consultas
              </h2>
              <p className="text-sm text-center md:text-start">Explorá nuestros recursos más útiles y populares. <br />Encontrá respuestas a tus consultas y mejora tu experiencia. <br /> ¡Descubrilos ahora!</p> <br />
           
            </div>
          {dataMostViews.length > 0 && articleType !== VERIFICAR_DATOS && (
            <div className="mb-8 md:mb-0 md:py-2 lg:py-0">
              <h4 className="text-blue-dark font-bold mb-2 text-xl">
                Artículos más vistos
              </h4>
              <ol className="text-sm">
                {dataMostViews.slice(0, 5).map((item) => (
                  <li key={item.id} className="text-blue-dark mb-2">
                    <span style={{fontSize:"20px"}}>▸ </span>
                    <Link
                      className="hover:underline text-base"
                      href={`/${item.category.slug}/${item.slug}`}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {dataArticle?.articleChild?.length > 0 &&
            articleType !== VERIFICAR_DATOS && (
              <div>
                <h4 className="text-blue-dark text-xl font-bold mb-2 md:py-2 lg:py-0">
                  Artículos relacionados
                </h4>
                <ol className="text-base">
                  {dataArticle?.articleChild?.slice(0, 5).map((item) => (
                    <li key={item.id} className="text-blue-dark mb-2">
                      <span style={{fontSize:"20px"}}>▸ </span>
                      <Link
                        className="hover:underline text-base"
                        href={item.slug}
                      >
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
