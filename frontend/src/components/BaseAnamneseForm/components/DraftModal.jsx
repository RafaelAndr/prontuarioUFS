function DraftModal({ onContinue, onDiscard }) {
  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-body text-center p-5">
            <div className="mb-4">
              <div
                className="rounded-circle bg-warning d-inline-flex align-items-center justify-content-center"
                style={{ width: "80px", height: "80px" }}
              >
                <svg
                  width="48"
                  height="48"
                  fill="white"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                </svg>
              </div>
            </div>

            <h4 className="text-dark fw-bold mb-3">
              Rascunho Encontrado
            </h4>
            <p className="text-muted mb-4">
              Encontramos um rascunho salvo anteriormente. 
              Deseja continuar de onde parou ou começar do zero?
            </p>

            <div className="d-flex gap-3 justify-content-center">
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={onDiscard}
              >
                Começar do Zero
              </button>
              <button
                type="button"
                className="btn btn-primary px-4"
                onClick={onContinue}
              >
                Continuar Rascunho
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DraftModal;
