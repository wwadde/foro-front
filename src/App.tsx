import { useState } from 'react';
import Alert from './components/Alert';
import Button from './components/Button';
import ListGroup from './components/ListGroup';

function App() {

  const [alertVisible, setAlertVisibility] = useState(false);

  // let items = [
  //   'Ibagué',
  //   'Cali',
  //   'Bogotá',
  //   'Medellín',
  //   'Cartagena',
  //   'Barranquilla',
  //   'Santa Marta',
  // ];

  // const handleSelectItem = (item: string) => {
  //   console.log(item);
  // };

  // return <div><ListGroup items={items} titulo='Ciudades' onSelectItem={handleSelectItem} /></div>;
  return (
    <div>
      { alertVisible && <Alert onClose={() => setAlertVisibility(false)}>Alerta</Alert>}
      <Button color="secondary" onClick={() => setAlertVisibility(true)}>William</Button>
    </div>
  )
}


export default App;