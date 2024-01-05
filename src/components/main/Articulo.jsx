import { RespuestaLike } from "./like/RespuestaLike";
import { ButtonFormulario } from "./like/ButtonFormulario";
import Link from "next/link";
import { ArticleRows } from "./ArticleRows";

const Articulo = ({ params, dataArticle = {}, dataMostViews = [] }) => {
  const dataArticleForm = dataArticle.form;

  const rows = dataArticle.rows;
  
  const titleCategory =
    params.categoria.slice(0, 1).toUpperCase() +
    params.categoria.split("-").join(" ").slice(1).toLowerCase();

  const data = {
    comentario: "a",
    dni: "37417530",
    email: "gfortunato@tuentrada.com",
    emailConfirm: "gfortunato@tuentrada.com",
    fecha_de_compra: "2023-11-30T17:17",
    lastname: "Fortunato",
    name: "Guido",
    número_de_expediente: "",
    seleccione_la_tarjeta: "VISA",
    subir_archivo: { length: 0 }, // Asumí que subir_archivo es un objeto FileList, ajusta según tus necesidades
  };

  const excludedKeys = "emailConfirm";
  const keys = Object.keys(data).filter((key) => key !== excludedKeys);
  const prueba = keys?.map((item, index) => (
    <tr key={index}>
      <th
        style={{
          border: "1px solid #ddd",
          padding: "10px",
          backgroundColor: "#f2f2f2",
        }}
      >
        {item.slice(0, 1).toUpperCase() +
          item.split("_").join(" ").toLowerCase().slice(1)}
      </th>
      <td style={{ border: "1px solid #ddd", padding: "10px" }}>
        {data[item]}
      </td>
    </tr>
  ));

  return (
    <>
      <div className=" container mx-auto bg-main-image bg-no-repeat bg-left-50 pb-10 px-10 md:px-20 flex-1">
        <div className="mb-5">
          <h2 className="text-2xl text-blue-dark font-semibold">
            {dataArticle?.title}
          </h2>
          {/* <ArticleSubtitle titleCategory={titleCategory} /> */}
        </div>

        {rows &&
          rows.map((item) => <ArticleRows key={item.name} item={item} />)}

        <hr />
        {dataArticle?.enableHelpful === 1 && (
          <>
            <div className="flex justify-center items-center flex-col mb-5">
              <h4 className="font-semibold text-center text-blue-dark mt-10 mb-2">
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

        {dataArticle?.enableHelpful === 0 && dataArticleForm && (
          <>
            <div className="flex justify-center items-center flex-col mb-5">
              <h4 className="font-semibold text-center text-blue-dark mt-10 mb-2">
                {" "}
                Escribinos tu consulta:
              </h4>
              <ButtonFormulario params={params} />
            </div>
            <hr />
          </>
        )}

        <div className="flex flex-col items-center md:items-start md:justify-evenly md:flex-row mt-10">
          {dataMostViews.length > 0 && (
            <div className="mb-8 md:mb-0">
              <h4 className="text-blue-dark font-semibold mb-2 text-xl">
                Artículos más vistos
              </h4>
              <ol className="text-sm">
                {dataMostViews.slice(0, 5).map((item) => (
                  <li key={item.id} className="text-blue-dark mb-2">
                    ▸
                    <Link
                      className="hover:underline text-base lg:text-sm"
                      href={`/${item.category.slug}/${item.slug}`}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {dataArticle?.articleChild?.length > 0 && (
            <div>
              <h4 className="text-blue-dark text-xl font-semibold mb-2 ">
                Artículos relacionados
              </h4>
              <ol className="text-sm">
                {dataArticle?.articleChild?.slice(0, 5).map((item) => (
                  <li key={item.id} className="text-blue-dark mb-2">
                    ▸
                    <Link className="hover:underline text-base lg:text-sm" href={item.slug}>
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
