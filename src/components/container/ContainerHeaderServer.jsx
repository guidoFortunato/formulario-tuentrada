import NavBar from "../header/Navbar";
import InputBusqueda2 from "../header/InputBusqueda2";

export const ContainerHeaderServer = async ({ dataSite, token }) => {
  return (
    <header>
      <NavBar data={dataSite} />
      <InputBusqueda2 data={dataSite} token={token} />
    </header>
  );
};
