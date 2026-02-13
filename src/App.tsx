import { useState, useEffect } from 'react';
import { CertificateGenerator } from './components/CertificateGenerator';
import { CertificateViewer } from './components/CertificateViewer';

function App() {
  const [isViewer, setIsViewer] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hasData = params.has('data');
    setIsViewer(hasData);
  }, []);

  return isViewer ? <CertificateViewer /> : <CertificateGenerator />;
}

export default App;
