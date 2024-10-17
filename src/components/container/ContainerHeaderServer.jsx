import NavBar from "../header/Navbar";
import InputBusqueda2 from "../header/InputBusqueda2";

export const ContainerHeaderServer = async ({ dataSite, token }) => {

  //todo: Por si falla la conexión, debería mover el layout a las páginas internas
  if (!dataSite) {
    return <span></span>
  }

  return (
    <header>
      <NavBar data={dataSite} />
      <InputBusqueda2 data={dataSite} token={token} />
    </header>
  );
};
