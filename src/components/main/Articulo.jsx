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

        <div className="flex flex-col items-center md:items-start md:justify-evenly md:flex-row mt-10">
          {dataMostViews.length > 0 && articleType !== VERIFICAR_DATOS && (
            <div className="mb-8 md:mb-0">
              <h4 className="text-blue-dark font-bold mb-2 text-xl">
                Artículos más vistos
              </h4>
              <ol className="text-sm">
                {dataMostViews.slice(0, 5).map((item) => (
                  <li key={item.id} className="text-blue-dark mb-2">
                    ▸
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
                <h4 className="text-blue-dark text-xl font-bold mb-2 ">
                  Artículos relacionados
                </h4>
                <ol className="text-base">
                  {dataArticle?.articleChild?.slice(0, 5).map((item) => (
                    <li key={item.id} className="text-blue-dark mb-2">
                      ▸
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
