import { useState } from 'react';
import { ArrowLeft, AlertTriangle, CheckCircle, Network, Flag, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PacketAnalysisResult {
  score: number;
  verdict: 'NORMAL' | 'SUSPICIOUS' | 'INTRUSION';
  detections: string[];
  trafficPattern: string;
}

interface WiresharkPacket {
  number: number;
  timestamp: string;
  source: string;
  destination: string;
  protocol: string;
  length: number;
  info: string;
  threat: 'SAFE' | 'WARNING' | 'CRITICAL';
}

export const PacketAnalysis = () => {
  const navigate = useNavigate();
  const [pcapData, setPcapData] = useState('');
  const [result, setResult] = useState<PacketAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [wiresharkPackets, setWiresharkPackets] = useState<WiresharkPacket[]>([]);

  const parseWiresharkPackets = (data: string): WiresharkPacket[] => {
    // Simulate Wireshark packet extraction
    const packets: WiresharkPacket[] = [];
    const lines = data.split('\n').filter(line => line.trim());
    
    lines.forEach((line, index) => {
      // Detect IP addresses and connections
      const ipRegex = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g;
      const ips = line.match(ipRegex) || [];
      
      if (ips.length >= 2) {
        const isCritical = /malware|trojan|backdoor|exploit/i.test(line);
        const isSuspicious = /syn|udp|dns|http|tcp/i.test(line);
        
        packets.push({
          number: index + 1,
          timestamp: `00:00:${String(index).padStart(2, '0')}`,
          source: ips[0] || '192.168.1.100',
          destination: ips[1] || '8.8.8.8',
          protocol: isCritical ? 'MALWARE' : isSuspicious ? 'TCP/UDP' : 'HTTP',
          length: Math.floor(Math.random() * 1500) + 64,
          info: line.substring(0, 50),
          threat: isCritical ? 'CRITICAL' : isSuspicious ? 'WARNING' : 'SAFE'
        });
      }
    });
    
    return packets.slice(0, 10); // Return first 10 packets
  };

  const analyzePackets = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      // Parse Wireshark packets
      const packets = parseWiresharkPackets(pcapData);
      setWiresharkPackets(packets);

      const intrusionPatterns = [
        { pattern: /syn flood|dos|ddos|direct.*connection/i, weight: 40, label: 'DoS/DDoS Attack Signature' },
        { pattern: /port scan|nmap|masscan|direct.*port/i, weight: 35, label: 'Port Scanning Activity' },
        { pattern: /malware|trojan|backdoor|direct.*access/i, weight: 50, label: 'Malware Signature Detected' },
        { pattern: /sql injection|xss|rce|direct.*exec/i, weight: 45, label: 'Web Exploit Detected' },
        { pattern: /brute force|password attack|failed.*auth|direct.*auth/i, weight: 30, label: 'Brute Force Attempt' },
        { pattern: /dns exfiltration|dns tunneling|direct.*dns/i, weight: 40, label: 'DNS Tunneling Detected' },
        { pattern: /unusual.*traffic|anomaly|suspicious.*protocol|direct.*communication/i, weight: 25, label: 'Anomalous Traffic Pattern' },
      ];

      let score = 0;
      const detections: string[] = [];
      let trafficPattern = 'NORMAL';

      intrusionPatterns.forEach(({ pattern, weight, label }) => {
        if (pattern.test(pcapData)) {
          score += weight;
          detections.push(label);
        }
      });

      // Check for direct connections in packets
      const directConnectionCount = packets.filter(p => p.threat !== 'SAFE').length;
      if (directConnectionCount > 0) {
        score += directConnectionCount * 15;
        detections.push(`${directConnectionCount} Direct Connection(s) Detected`);
      }

      let verdict: 'NORMAL' | 'SUSPICIOUS' | 'INTRUSION' = 'NORMAL';
      if (score >= 70) {
        verdict = 'INTRUSION';
        trafficPattern = 'MALICIOUS - IMMEDIATE ACTION REQUIRED';
      } else if (score >= 40) {
        verdict = 'SUSPICIOUS';
        trafficPattern = 'SUSPICIOUS - REQUIRES INVESTIGATION';
      } else {
        trafficPattern = 'CLEAN - NO THREATS DETECTED';
      }

      setResult({
        score: Math.min(score, 100),
        verdict,
        detections,
        trafficPattern,
      });
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <button
        onClick={() => navigate('/')}
        className="m-6 flex items-center gap-2 text-green-400 hover:text-green-300 transition animate-fade-in"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Menu
      </button>

      <div className="p-8 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Network className="w-8 h-8 text-green-400 animate-spin-in-no-bounce" style={{ animationDelay: '0.1s' }} />
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              PACKET ANALYSIS ENGINE
            </h1>
          </div>
          <p className="text-gray-400 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>Analyze network traffic for intrusion detection</p>
        </div>

        <div className="glass-highlight rounded-lg p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <label className="block text-sm font-semibold text-gray-300 mb-4">PCAP Data / Packet Dump</label>
          <textarea
            value={pcapData}
            onChange={(e) => setPcapData(e.target.value)}
            placeholder="Paste tcpdump output, Wireshark data, or packet hex dump here..."
            className="w-full h-48 bg-gray-800/50 border border-green-400/20 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 resize-none font-mono text-sm"
          />
          <button
            onClick={analyzePackets}
            disabled={!pcapData.trim() || isAnalyzing}
            className="mt-6 w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
          >
            {isAnalyzing ? 'Scanning Network...' : 'Analyze Packets'}
          </button>
        </div>

        {result && (
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className={`glass rounded-lg p-8 border-2 ${
              result.verdict === 'NORMAL'
                ? 'glass-success border-green-400/50'
                : result.verdict === 'SUSPICIOUS'
                  ? 'glass-warning border-yellow-400/50'
                  : 'glass-danger border-red-400/50'
            }`}>
              <div className="flex items-center gap-4 mb-4">
                {result.verdict === 'NORMAL' ? (
                  <CheckCircle className="w-8 h-8 text-green-400" />
                ) : (
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                )}
                <div>
                  <h2 className={`text-2xl font-bold ${
                    result.verdict === 'NORMAL' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {result.verdict}
                  </h2>
                  <p className="text-gray-400">Threat Level: {result.score}%</p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-black/30 rounded-lg border border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Activity className="w-4 h-4 text-green-400" />
                  <span className="font-mono">{result.trafficPattern}</span>
                </div>
              </div>

              {result.detections.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-300 mb-2">Threats Detected:</p>
                  <ul className="space-y-2">
                    {result.detections.map((detection, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-300">
                        <Flag className="w-4 h-4 text-red-400" />
                        {detection}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {wiresharkPackets.length > 0 && (
              <div className="glass rounded-lg p-6 border-2 border-green-400/30 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-2 mb-4">
                  <Network className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-semibold text-green-400">Wireshark Packet Capture</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-gray-300 font-mono">
                    <thead className="border-b border-green-400/30">
                      <tr>
                        <th className="text-left py-2 px-2 text-green-400">#</th>
                        <th className="text-left py-2 px-2 text-green-400">Time</th>
                        <th className="text-left py-2 px-2 text-green-400">Source</th>
                        <th className="text-left py-2 px-2 text-green-400">Destination</th>
                        <th className="text-left py-2 px-2 text-green-400">Protocol</th>
                        <th className="text-left py-2 px-2 text-green-400">Length</th>
                        <th className="text-left py-2 px-2 text-green-400">Threat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wiresharkPackets.map((packet) => (
                        <tr key={packet.number} className={`border-b border-gray-700/30 hover:bg-green-400/5 transition ${
                          packet.threat === 'CRITICAL' ? 'bg-red-900/10' : 
                          packet.threat === 'WARNING' ? 'bg-yellow-900/10' : 
                          'bg-transparent'
                        }`}>
                          <td className="py-2 px-2 text-gray-400">{packet.number}</td>
                          <td className="py-2 px-2 text-gray-400">{packet.timestamp}</td>
                          <td className="py-2 px-2 text-blue-300">{packet.source}</td>
                          <td className="py-2 px-2 text-blue-300">{packet.destination}</td>
                          <td className="py-2 px-2 text-green-400">{packet.protocol}</td>
                          <td className="py-2 px-2 text-gray-400">{packet.length}</td>
                          <td className="py-2 px-2">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              packet.threat === 'CRITICAL' ? 'bg-red-600 text-white' :
                              packet.threat === 'WARNING' ? 'bg-yellow-600 text-white' :
                              'bg-green-600 text-white'
                            }`}>
                              {packet.threat}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
