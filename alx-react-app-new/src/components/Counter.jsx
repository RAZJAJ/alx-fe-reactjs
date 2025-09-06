import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // state starts at 0

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <p style={{ fontSize: '20px' }}>Current Count: {count}</p>
      
      <button 
        onClick={() => setCount(count + 1)} 
        style={{ margin: '5px', padding: '10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Increment
      </button>

      <button 
        onClick={() => setCount(count - 1)} 
        style={{ margin: '5px', padding: '10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Decrement
      </button>

      <button 
        onClick={() => setCount(0)} 
        style={{ margin: '5px', padding: '10px', backgroundColor: 'gray', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Reset
      </button>
    </div>
  );
}

export default Counter;
