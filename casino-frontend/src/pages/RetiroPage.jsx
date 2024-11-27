import React from 'react';
import useRetiroSaldo from '../components/RetiroSaldo'

const RetiroPage = () => {
    const {
        monto,
        metodo,
        error,
        success,
        activeCampos,
        codigoRetiro,
        setMonto,
        handleMetodoChange,
        handleSubmit,
    } = useRetiroSaldo();

    return (
        <div>
            <h1>Retirar Saldo</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="monto">Monto a retirar:</label>
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

                <label htmlFor="metodo">Método de retiro:</label>
                <select
                    id="metodo"
                    name="metodo"
                    value={metodo}
                    onChange={handleMetodoChange}
                    required
                >
                    <option value="">Selecciona un método</option>
                    <option value="banco">Banco</option>
                    <option value="corresponsal">Corresponsal</option>
                </select>
                <br />
                <br />

                {/* Campos dinámicos según el método */}
                {activeCampos === 'banco' && (
                    <div>
                        <label htmlFor="nombreBanco">Nombre del banco:</label>
                        <input type="text" id="nombreBanco" name="nombreBanco" />
                        <br />
                        <br />
                        <label htmlFor="numeroCuenta">Número de cuenta:</label>
                        <input type="text" id="numeroCuenta" name="numeroCuenta" />
                        <br />
                        <br />
                        <label htmlFor="titularCuenta">Nombre del titular:</label>
                        <input type="text" id="titularCuenta" name="titularCuenta" />
                        <br />
                        <br />
                        <label htmlFor="certificadoCuenta">Certificado de cuenta (PDF):</label>
                        <input type="file" id="certificadoCuenta" name="certificadoCuenta" accept="application/pdf" />
                        <br />
                        <br />
                    </div>
                )}

                {activeCampos === 'corresponsal' && (
                    <div>
                        <label htmlFor="corresponsal">Seleccione un corresponsal:</label>
                        <select id="corresponsal" name="corresponsal">
                            <option value="Efecty">Efecty</option>
                            <option value="Western Union">Western Union</option>
                            <option value="Supergiros">Supergiros</option>
                        </select>
                        <br />
                        <br />
                    </div>
                )}

                <button type="submit">Solicitar Retiro</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            {/* Mostrar el código de retiro para corresponsales si se genera */}
            {codigoRetiro && (
                <div id="codigoCorresponsalDiv" style={{ marginTop: '20px' }}>
                    <p>Tu código de retiro es: <strong>{codigoRetiro}</strong></p>
                    <p>Utiliza este código en el corresponsal seleccionado para retirar tu dinero.</p>
                </div>
            )}
        </div>
    );
};

export default RetiroPage;