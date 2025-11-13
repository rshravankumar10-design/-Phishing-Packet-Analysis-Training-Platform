import { useState } from 'react';
import { ArrowLeft, AlertTriangle, CheckCircle, Mail, Flag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AnalysisResult {
  score: number;
  verdict: 'SAFE' | 'SUSPICIOUS' | 'PHISHING';
  reasons: string[];
}

export const EmailPhishing = () => {
  const navigate = useNavigate();
  const [emailContent, setEmailContent] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeEmail = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const suspiciousPatterns = [
        { pattern: /urgent|verify|confirm|update.*account|click.*link|act.*now/i, weight: 15 },
        { pattern: /bit\.ly|tinyurl|short\.link/i, weight: 20 },
        { pattern: /from:.*@.*\.ru|\.cn|\.tk/i, weight: 25 },
        { pattern: /verify.*password|confirm.*identity/i, weight: 30 },
        { pattern: /congratulations.*won|claim.*prize|free.*money/i, weight: 35 },
      ];

      let score = 0;
      const reasons: string[] = [];

      suspiciousPatterns.forEach(({ pattern, weight }) => {
        if (pattern.test(emailContent)) {
          score += weight;
          if (weight === 15) reasons.push('Contains urgency language');
          if (weight === 20) reasons.push('Uses suspicious shortened URLs');
          if (weight === 25) reasons.push('Foreign domain origin detected');
          if (weight === 30) reasons.push('Requests account verification');
          if (weight === 35) reasons.push('Prize/reward claim detected');
        }
      });

      let verdict: 'SAFE' | 'SUSPICIOUS' | 'PHISHING' = 'SAFE';
      if (score >= 60) verdict = 'PHISHING';
      else if (score >= 30) verdict = 'SUSPICIOUS';

      setResult({ score: Math.min(score, 100), verdict, reasons });
      setIsAnalyzing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <button
        onClick={() => navigate('/')}
        className="m-6 flex items-center gap-2 text-blue-400 hover:text-blue-300 transition animate-fade-in"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Menu
      </button>

      <div className="p-8 max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-center gap-3 mb-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Mail className="w-8 h-8 text-blue-400 animate-spin-in animate-pulse-glow" style={{ animationDelay: '0.1s' }} />
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              EMAIL PHISHING ANALYZER
            </h1>
          </div>
          <p className="text-gray-400 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>Paste an email and analyze it for phishing indicators</p>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border-2 border-blue-400/30 rounded-lg p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <label className="block text-sm font-semibold text-gray-300 mb-4">Email Content</label>
          <textarea
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            placeholder="Paste the email content here to analyze..."
            className="w-full h-48 bg-gray-800/50 border border-blue-400/20 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 resize-none"
          />
          <button
            onClick={analyzeEmail}
            disabled={!emailContent.trim() || isAnalyzing}
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Email'}
          </button>
        </div>

        {result && (
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className={`backdrop-blur-xl border-2 rounded-lg p-8 ${
              result.verdict === 'SAFE'
                ? 'bg-green-900/20 border-green-400/50'
                : result.verdict === 'SUSPICIOUS'
                  ? 'bg-yellow-900/20 border-yellow-400/50'
                  : 'bg-red-900/20 border-red-400/50'
            }`}>
              <div className="flex items-center gap-4 mb-4">
                {result.verdict === 'SAFE' ? (
                  <CheckCircle className="w-8 h-8 text-green-400" />
                ) : (
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                )}
                <div>
                  <h2 className={`text-2xl font-bold ${
                    result.verdict === 'SAFE' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {result.verdict}
                  </h2>
                  <p className="text-gray-400">Risk Score: {result.score}%</p>
                </div>
              </div>

              {result.reasons.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-300 mb-2">Detected Issues:</p>
                  <ul className="space-y-2">
                    {result.reasons.map((reason, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-300">
                        <Flag className="w-4 h-4 text-red-400" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
