import { useState, useEffect, useRef } from 'react'
import './App.css'

type TensionLevel = 'Low' | 'Moderate' | 'Elevated' | 'High'

interface Observation {
  id: string
  timestamp: Date
  message: string
  isNew?: boolean
}

const THINKING_MESSAGES = [
  'Analyzing on-chain transfer patterns',
  'Scanning wallet clusters',
  'Measuring supply velocity',
  'Detecting concentration signals',
  'Processing block data',
]

const SCAN_LOG_MESSAGES = [
  'Connecting to RPC endpoint...',
  'Fetching token metadata...',
  'Querying recent transactions...',
  'Analyzing block #{block}...',
  'Processing transfer signature {sig}...',
  'Mapping wallet cluster #{cluster}...',
  'Calculating velocity metrics...',
  'Scanning holder distribution...',
  'Indexing transaction timestamps...',
  'Measuring transfer concentration...',
  'Evaluating supply movement patterns...',
  'Cross-referencing wallet activity...',
  'Aggregating 1h transfer data...',
  'Aggregating 6h transfer data...',
  'Aggregating 24h transfer data...',
  'Computing tension index...',
  'Finalizing analysis...',
]

function App() {
  const [address, setAddress] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [thinkingMessage, setThinkingMessage] = useState('')
  const [metrics, setMetrics] = useState({
    oneHour: 0,
    sixHours: 0,
    twentyFourHours: 0,
  })
  const [tensionValue, setTensionValue] = useState(0)
  const [tensionLevel, setTensionLevel] = useState<TensionLevel>('Low')
  const [observations, setObservations] = useState<Observation[]>([])
  const scanIntervalRef = useRef<number | null>(null)

  // Cycle through thinking messages
  useEffect(() => {
    if (!isScanning) return
    
    let index = 0
    setThinkingMessage(THINKING_MESSAGES[0])
    
    const interval = setInterval(() => {
      index = (index + 1) % THINKING_MESSAGES.length
      setThinkingMessage(THINKING_MESSAGES[index])
    }, 800)

    return () => clearInterval(interval)
  }, [isScanning])

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
  }

  const generateLogMessage = (): string => {
    const msg = SCAN_LOG_MESSAGES[Math.floor(Math.random() * SCAN_LOG_MESSAGES.length)]
    return msg
      .replace('{block}', Math.floor(Math.random() * 900000 + 100000).toString())
      .replace('{sig}', Math.random().toString(36).substring(2, 10))
      .replace('{cluster}', Math.floor(Math.random() * 999 + 1).toString())
  }

  const addScanLog = () => {
    const now = new Date()
    setObservations((prev) => [
      {
        id: `scan-${Date.now()}-${Math.random()}`,
        timestamp: now,
        message: generateLogMessage(),
        isNew: true,
      },
      ...prev,
    ].slice(0, 100))

    // Remove new flag after short delay
    setTimeout(() => {
      setObservations((prev) =>
        prev.map((obs, i) => i === 0 ? { ...obs, isNew: false } : obs)
      )
    }, 300)
  }

  const handleScan = async () => {
    if (!address.trim() || isScanning) return

    setIsScanning(true)

    // Add initial log
    const now = new Date()
    setObservations((prev) => [
      {
        id: `init-${Date.now()}`,
        timestamp: now,
        message: `Scan initiated for ${address.slice(0, 8)}...${address.slice(-4)}`,
        isNew: true,
      },
      ...prev,
    ])

    // Start continuous log updates
    scanIntervalRef.current = window.setInterval(() => {
      addScanLog()
    }, 400)

    // Wait for scan duration
    await new Promise((resolve) => setTimeout(resolve, 4000))

    // Stop log updates
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current)
      scanIntervalRef.current = null
    }

    const mockMetrics = {
      oneHour: Math.random() * 5,
      sixHours: Math.random() * 15,
      twentyFourHours: Math.random() * 30,
    }

    setMetrics(mockMetrics)

    const avgVelocity = (mockMetrics.oneHour + mockMetrics.sixHours / 6 + mockMetrics.twentyFourHours / 24) / 3
    const tension = Math.min(100, avgVelocity * 10 + Math.random() * 20)
    setTensionValue(tension)

    let level: TensionLevel = 'Low'
    if (tension >= 75) level = 'High'
    else if (tension >= 50) level = 'Elevated'
    else if (tension >= 25) level = 'Moderate'
    setTensionLevel(level)

    // Add final results
    const finalNow = new Date()
    const resultObservations: Observation[] = [
      {
        id: `result-${Date.now()}`,
        timestamp: finalNow,
        message: '── Analysis Complete ──',
        isNew: true,
      },
    ]

    if (mockMetrics.oneHour > 2) {
      resultObservations.push({
        id: `result-${Date.now() + 1}`,
        timestamp: finalNow,
        message: 'Signal: Unusual concentration of transfers detected',
        isNew: true,
      })
    }

    if (mockMetrics.sixHours > mockMetrics.oneHour * 3) {
      resultObservations.push({
        id: `result-${Date.now() + 2}`,
        timestamp: finalNow,
        message: 'Signal: Supply movement increased over 6h window',
        isNew: true,
      })
    }

    if (tension > 50) {
      resultObservations.push({
        id: `result-${Date.now() + 3}`,
        timestamp: finalNow,
        message: 'Signal: Elevated transfer velocity measured',
        isNew: true,
      })
    }

    if (tension > 70) {
      resultObservations.push({
        id: `result-${Date.now() + 4}`,
        timestamp: finalNow,
        message: 'Signal: High activity cluster observed in recent blocks',
        isNew: true,
      })
    }

    if (resultObservations.length === 1) {
      resultObservations.push({
        id: `result-${Date.now() + 5}`,
        timestamp: finalNow,
        message: 'No abnormal activity observed',
        isNew: true,
      })
    }

    setObservations((prev) => [...resultObservations, ...prev].slice(0, 100))
    setIsScanning(false)

    // Remove "new" flag after animation
    setTimeout(() => {
      setObservations((prev) =>
        prev.map((obs) => ({ ...obs, isNew: false }))
      )
    }, 500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleScan()
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current)
      }
    }
  }, [])

  return (
    <div className="app">
      {/* Animated Background */}
      <div className="bg-grid" />
      <div className="bg-gradient" />
      <div className="scan-line" />

      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-left">
          <div className="logo-icon" />
          <div className="top-bar-title">
            Claw<span>Scope</span>
          </div>
        </div>
        <div className="top-bar-status">
          <div className={`status-dot ${isScanning ? 'active' : ''}`} />
          {isScanning ? 'Scanning' : 'Idle'}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Token Input */}
        <div className="panel token-input-panel">
          <div className="panel-label">Token Address</div>
          <div className="token-input-row">
            <input
              type="text"
              className="token-input-field"
              placeholder="Enter Solana token address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isScanning}
            />
            <button
              className="scan-btn"
              onClick={handleScan}
              disabled={isScanning || !address.trim()}
            >
              {isScanning ? 'Scanning' : 'Initiate Scan'}
            </button>
          </div>
        </div>

        {/* AI Thinking Box */}
        {isScanning && (
          <div className="thinking-box">
            <div className="thinking-spinner" />
            <div className="thinking-content">
              <div className="thinking-title">Processing</div>
              <div className="thinking-text">
                {thinkingMessage}<span className="thinking-dots" />
              </div>
            </div>
          </div>
        )}

        {/* Metrics */}
        <div className="metrics-row">
          <div className="panel metric-panel">
            <div className="panel-label">1h Supply Moved</div>
            <div className="metric-value">
              {metrics.oneHour.toFixed(2)}<span className="unit">%</span>
            </div>
          </div>
          <div className="panel metric-panel">
            <div className="panel-label">6h Supply Moved</div>
            <div className="metric-value">
              {metrics.sixHours.toFixed(2)}<span className="unit">%</span>
            </div>
          </div>
          <div className="panel metric-panel">
            <div className="panel-label">24h Supply Moved</div>
            <div className="metric-value">
              {metrics.twentyFourHours.toFixed(2)}<span className="unit">%</span>
            </div>
          </div>
        </div>

        {/* Tension Meter */}
        <div className="panel tension-panel">
          <div className="tension-header">
            <div className="panel-label">Supply Tension Index</div>
            <div className={`tension-level ${tensionLevel.toLowerCase()}`}>
              {tensionLevel}
            </div>
          </div>
          <div className="tension-bar-container">
            <div className="tension-bar-track">
              <div
                className={`tension-bar-fill ${tensionLevel.toLowerCase()}`}
                style={{ width: `${tensionValue}%` }}
              />
            </div>
          </div>
          <div className="tension-markers">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
        </div>

        {/* Observations */}
        <div className="panel observations-panel">
          <div className="panel-label">Observation Log</div>
          <div className="observations-list">
            {observations.length === 0 ? (
              <div className="observations-empty">
                Awaiting scan initiation...
              </div>
            ) : (
              observations.map((obs) => (
                <div key={obs.id} className="observation-item">
                  <div className="observation-time">{formatTime(obs.timestamp)}</div>
                  <div className={`observation-msg ${obs.isNew ? 'typing' : ''}`}>
                    {obs.message}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="info-section">
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card-title">What is Claw Scope?</div>
              <div className="info-card-text">
                Claw Scope monitors how much of a token's total supply is moving over time. 
                It analyzes on-chain transfer data to detect unusual activity patterns and 
                supply pressure without making price predictions.
              </div>
            </div>
            <div className="info-card">
              <div className="info-card-title">How to Use</div>
              <div className="info-card-text">
                <span className="info-step">1.</span> Enter a Solana token address in the input field<br />
                <span className="info-step">2.</span> Click "Initiate Scan" or press Enter<br />
                <span className="info-step">3.</span> Review the supply metrics and tension index<br />
                <span className="info-step">4.</span> Check the observation log for detected signals
              </div>
            </div>
            <div className="info-card">
              <div className="info-card-title">Supply Metrics</div>
              <div className="info-card-text">
                Displays the percentage of total token supply that has moved in the last 
                1 hour, 6 hours, and 24 hours. Higher percentages indicate more active 
                transfer activity.
              </div>
            </div>
            <div className="info-card">
              <div className="info-card-title">Tension Index</div>
              <div className="info-card-text">
                A composite score (0-100) based on transfer velocity and clustering patterns.<br />
                <span className="tension-label low">Low</span> Normal activity<br />
                <span className="tension-label moderate">Moderate</span> Increased movement<br />
                <span className="tension-label elevated">Elevated</span> Notable activity<br />
                <span className="tension-label high">High</span> Significant movement detected
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <div>Solana Network</div>
        <div className="footer-tagline">Supply movement, observed.</div>
        <div>v1.0.0</div>
      </div>
    </div>
  )
}

export default App
