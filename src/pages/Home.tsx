
export default function Home() {
  return (
    <div className="container py-5">
      <div className="text-center">
        <h1 className="display-4">Bienvenido al Foro</h1>
        <p className="lead">Un espacio para compartir y discutir temas interesantes</p>
        <hr className="my-4" />
        <p>Únete a nuestra comunidad y comienza a participar en las discusiones.</p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Explorar</button>
          <button type="button" className="btn btn-outline-secondary btn-lg px-4">Registrarse</button>
        </div>
      </div>
    </div>
  );
}