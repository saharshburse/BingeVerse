import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/test')
      .then(res => setMsg(res.data))
      .catch(err => setMsg('API call failed'));
  }, []);

  return (
    <div>
      <h1>React Frontend</h1>
      <p>{msg}</p>
    </div>
  );
}

export default Dashboard;
