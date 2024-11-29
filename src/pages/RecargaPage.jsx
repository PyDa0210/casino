import React from 'react';
import useRecargaSaldo from '../components/RecargaSaldo';

const RecargaPage = () => {
    const {
        monto,
        metodo,
        error,
        success,
        activeCampos,
        setMonto,
        handleMetodoChange,
        handleSubmit,
    } = useRecargaSaldo();

    return (
        <div>
            <h1>Recargar Saldo</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="monto">Monto a ingresar:</label>
                <input
                    type="number"
                    id="monto"
                    name="monto"
                    min="1"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    required
                />
                <br />
                <br />

                <label htmlFor="metodo">Método de pago:</label>
                <select
                    id="metodo"
                    name="metodo"
                    value={metodo}
                    onChange={handleMetodoChange}
                    required
                >
                    <option value="">Selecciona un método</option>
                    <option value="tarjeta">Tarjeta</option>
                    <option value="cupon">Cupón</option>
                    <option value="pse">PSE</option>
                </select>
                <br />
                <br />

                {activeCampos === 'tarjeta' && (
                    <div>
                        <label htmlFor="numeroTarjeta">Número de Tarjeta:</label>
                        <input type="text" id="numeroTarjeta" name="numeroTarjeta" />
                        <br />
                        <br />
                        <label htmlFor="fechaVencimiento">Fecha de Vencimiento:</label>
                        <input type="text" id="fechaVencimiento" name="fechaVencimiento" />
                        <br />
                        <br />
                        <label htmlFor="cvv">CVV:</label>
                        <input type="text" id="cvv" name="cvv" />
                        <br />
                        <br />
                    </div>
                )}

                {activeCampos === 'cupon' && (
                    <div>
                        <p>
                            Tu código de cupón es: <strong>CUPON12345</strong>
                        </p>
                        <p>Utiliza este código en corresponsales para pagar.</p>
                    </div>
                )}

                {activeCampos === 'pse' && (
                    <div>
                        <label htmlFor="banco">Banco:</label>
                        <input type="text" id="banco" name="banco" />
                        <br />
                        <br />
                        <label htmlFor="documento">Documento de Identidad:</label>
                        <input type="text" id="documento" name="documento" />
                        <br />
                        <br />
                        <label htmlFor="psePassword">Contraseña:</label>
                        <input type="password" id="psePassword" name="psePassword" />
                        <br />
                        <br />
                    </div>
                )}

                <button type="submit">Recargar</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default RecargaPage;
