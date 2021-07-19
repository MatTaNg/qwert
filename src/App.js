import ImageUploader from './imageUploader/ImageUploader';
import React from 'react';

function App() {
  return <div style={
    { display: 'grid',
      gridTemplateRows: '100vh',
      gridTemplateColumns:' 100vw'
    }}>
    <ImageUploader/>
    </div>
}

export default App;
