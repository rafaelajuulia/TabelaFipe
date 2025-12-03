import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [anos, setAnos] = useState([]);
  const [veiculo, setVeiculo] = useState(null);

  const [marcaSelecionada, setMarcaSelecionada] = useState("");
  const [modeloSelecionado, setModeloSelecionado] = useState("");
  const [anoSelecionado, setAnoSelecionado] = useState("");

  //procurar as marcas
  useEffect(() => {
    fetch("https://parallelum.com.br/fipe/api/v1/carros/marcas")
      .then((res) => res.json())
      .then((data) => setMarcas(data));
  }, []);

  //procurar modelos quando escolher a marca
  useEffect(() => {
    if (marcaSelecionada) {
      fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaSelecionada}/modelos`)
        .then((res) => res.json())
        .then((data) => setModelos(data.modelos));
    }
  }, [marcaSelecionada]);

  //procurar os anos quando escolher o modelo
  useEffect(() => {
    if (modeloSelecionado) {
      fetch(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaSelecionada}/modelos/${modeloSelecionado}/anos`
      )
        .then((res) => res.json())
        .then((data) => setAnos(data));
    }
  }, [modeloSelecionado]);

  //ver o preço final
  const buscarVeiculo = () => {
    fetch(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaSelecionada}/modelos/${modeloSelecionado}/anos/${anoSelecionado}`
    )
      .then((res) => res.json())
      .then((data) => setVeiculo(data));
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Tabela FIPE</h1>

        <div className="selects">
          <div>
            <label>MARCA:</label>
            <select
              value={marcaSelecionada}
              onChange={(e) => setMarcaSelecionada(e.target.value)}
            >
              <option value="">Selecione</option>
              {marcas.map((m) => (
                <option key={m.codigo} value={m.codigo}>
                  {m.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>MODELO:</label>
            <select
              disabled={!marcaSelecionada}
              value={modeloSelecionado}
              onChange={(e) => setModeloSelecionado(e.target.value)}
            >
              <option value="">Selecione</option>
              {modelos.map((md) => (
                <option key={md.codigo} value={md.codigo}>
                  {md.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>ANO:</label>
            <select
              disabled={!modeloSelecionado}
              value={anoSelecionado}
              onChange={(e) => setAnoSelecionado(e.target.value)}
            >
              <option value="">Selecione</option>
              {anos.map((a) => (
                <option key={a.codigo} value={a.codigo}>
                  {a.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button disabled={!anoSelecionado} onClick={buscarVeiculo}>
          Consultar
        </button>

        {veiculo && (
          <div className="resultado">
            <h2>{veiculo.Modelo}</h2>
            <p>
              <strong>Preço:</strong> {veiculo.Valor}
            </p>
            <p>
              <strong>Combustível:</strong> {veiculo.Combustivel}
            </p>
            <p>
              <strong>Mês Referência:</strong> {veiculo.MesReferencia}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;

