import { useEffect } from "react";
import DetallePost from "../../../componentes/residente/componentes/DetallePost";

const DetalleUanl = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-x-10 gap-y-8 pt-8">
      {/* Columna principal */}
      <div>
        <DetallePost />
      </div>
    </div>
  );
};

export default DetalleUanl;