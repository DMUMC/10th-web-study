import "./App.css";
import List from "./components/List";

function App() {
  const nickname = 'semi'
  const sweetPotato = '고구마'
  const array = ['REACT', 'NEXT', 'VUE', 'SVELTE', 'ANGULAR', 'REACT-NATIVE']
  return (
    <>
      <strong className="school">동양미래대학교</strong>
      <p style={{ color: 'purple', fontWeight: 'bold', fontSize: '3rem' }}>
        {nickname}/임세미
      </p>
      <h1>{`${nickname}는 ${sweetPotato} 아이스크림을 좋아합니다.`}</h1>
      <ul>
        {array.map((yaho, idx) => (
          // <li key={idx}>{yaho}</li>
          <List tech={yaho} />
        ))}
      </ul>
    </>
  )
}

export default App;
