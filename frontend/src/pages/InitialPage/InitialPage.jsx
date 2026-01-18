import SearchPanel from "../../components/SearchPanel/SearchPanel";
import CadastratePatienteButton from "../../components/CadastratePatienteButton/CadastratePatienteButton";

const InitialPage = () => {
  return (
    <>
      {/* <Header /> */}
      <div className="container mt-4 border-none rounded p-4" style={{ backgroundColor: "rgb(249,249,249)" }}>
        <SearchPanel />
        <CadastratePatienteButton />
      </div>
    </>
  );
};

export default InitialPage;
