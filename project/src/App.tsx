import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainMenu } from './components/MainMenu';
import { EmailPhishing } from './components/EmailPhishing';
import { PacketAnalysis } from './components/PacketAnalysis';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<MainMenu />}
        />
        <Route path="/email-phishing" element={<EmailPhishing />} />
        <Route path="/packet-analysis" element={<PacketAnalysis />} />
      </Routes>
    </Router>
  );
};
