import googleIcon from '../assets/google.png';


export default function Ingreso(){
    return (
        <div className="carousel">
            <form className="row">

            <div className="col-12 text-center mb-3">
                        <button 
                            type="button" 
                            className="btn btn-light border d-flex align-items-center mx-auto"
                            onClick={() => console.log('Google login')}
                        >
                            <img 
                                src={googleIcon} 
                                alt="Google" 
                                style={{ width: '24px', height: '24px', marginRight: '8px' }} 
                            />
                            Continuar con Google
                        </button>
                    </div>

                <div className="input-group mb-3 col-12">
                    <span className="input-group-text">@</span>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInputGroup1" placeholder="Username" />
                        <label htmlFor="floatingInputGroup1">Usuario</label>
                    </div>
                </div>

                <div className="form-floating mb-3 col-12 position-relative">
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        autoComplete="new-password"
                        name="new-password"
                    />
                    <label className="mx-2" htmlFor="floatingPassword">Contraseña</label>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                        Ingresar
                    </button>
                </div>
            </form>
        </div>
    )
}