import PostPrincipal from "../../../componentes/residente/componentes/componentesColumna2/PostPrincipal";

const UanlListado = ({ notasUanl, onCardClick }) => (
  <div className="mt-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-x-10 gap-y-8">
    {/* Columna principal: todas las notas en grande */}
    <div className="flex flex-col gap-12">
      {notasUanl.map(nota => (
        <div id={`nota-${nota.id}`} key={nota.id}>
          <PostPrincipal post={nota} onClick={() => onCardClick(nota.id)} />
        </div>
      ))}
    </div>
  </div>
);

export default UanlListado;