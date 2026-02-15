import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function CodePlayground() {
  const navigate = useNavigate()
  const iframeRef = useRef(null)
  const [activeTab, setActiveTab] = useState('html')
  const [html, setHtml] = useState(`<h1>Hello World!</h1>
<p>Edit this code and tap "Run" to see results.</p>
<button onclick="sayHello()">Click Me</button>`)
  const [css, setCss] = useState(`body {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f5f5f5;
}

h1 {
  color: #6366f1;
}

button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background: #4f46e5;
}`)
  const [js, setJs] = useState(`function sayHello() {
  alert('Hello from JavaScript!');
}

console.log('JavaScript is running!');`)
  
  const [output, setOutput] = useState('')
  const [consoleOutput, setConsoleOutput] = useState([])
  const [showConsole, setShowConsole] = useState(false)

  const runCode = () => {
    setConsoleOutput([])
    
    // Extract body content from user's HTML
    let bodyContent = html
    // Remove doctype, html, head tags, and extract body content
    bodyContent = bodyContent.replace(/<!DOCTYPE[^>]*>/gi, '')
    bodyContent = bodyContent.replace(/<html[^>]*>|<\/html>/gi, '')
    bodyContent = bodyContent.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '')
    bodyContent = bodyContent.replace(/<body[^>]*>|<\/body>/gi, '')
    
    const fullCode = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>${css}</style>
</head>
<body>
  ${bodyContent}
  <script>
    // Override console.log to capture output
    const originalLog = console.log;
    console.log = function(...args) {
      window.parent.postMessage({ type: 'console', data: args.map(a => String(a)).join(' ') }, '*');
      originalLog.apply(console, args);
    };
    
    try {
      ${js}
    } catch(e) {
      window.parent.postMessage({ type: 'error', data: e.message }, '*');
    }
  </script>
</body>
</html>`
    setOutput(fullCode)
  }

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'console') {
        setConsoleOutput(prev => [...prev, { type: 'log', message: event.data.data }])
      } else if (event.data.type === 'error') {
        setConsoleOutput(prev => [...prev, { type: 'error', message: event.data.data }])
      }
    }
    
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  useEffect(() => {
    if (iframeRef.current && output) {
      const doc = iframeRef.current.contentDocument
      if (doc) {
        doc.open()
        doc.write(output)
        doc.close()
      }
    }
  }, [output, showConsole])

  const tabs = [
    { id: 'html', label: 'HTML', icon: '📄' },
    { id: 'css', label: 'CSS', icon: '🎨' },
    { id: 'js', label: 'JS', icon: '⚡' },
  ]

  const getCurrentValue = () => {
    switch (activeTab) {
      case 'html': return html
      case 'css': return css
      case 'js': return js
      default: return ''
    }
  }

  const setCurrentValue = (value) => {
    switch (activeTab) {
      case 'html': setHtml(value); break
      case 'css': setCss(value); break
      case 'js': setJs(value); break
    }
  }

  return (
    <div className="px-4 py-4 space-y-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/profile')}
          className="flex items-center text-gray-600"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <h1 className="text-lg font-bold text-gray-800">Code Playground</h1>
        <button
          onClick={runCode}
          className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold text-sm"
        >
          ▶ Run
        </button>
      </div>

      {/* Tab Bar */}
      <div className="flex space-x-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm flex items-center justify-center space-x-1 ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Code Editor */}
      <div className="flex-1 min-h-0">
        <textarea
          value={getCurrentValue()}
          onChange={(e) => setCurrentValue(e.target.value)}
          className="w-full h-full p-3 bg-gray-900 text-green-400 font-mono text-sm rounded-xl border-0 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder={`Write your ${activeTab.toUpperCase()} code here...`}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
        />
      </div>

      {/* Output Preview */}
      <div className="h-48 bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 bg-gray-100 border-b border-gray-200">
          <span className="text-sm font-medium text-gray-600">Output Preview</span>
          <button
            onClick={() => setShowConsole(!showConsole)}
            className={`text-xs px-2 py-1 rounded ${showConsole ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}
          >
            Console {consoleOutput.length > 0 && `(${consoleOutput.length})`}
          </button>
        </div>
        
        {showConsole ? (
          <div className="h-[calc(100%-40px)] overflow-y-auto p-2 bg-gray-900">
            {consoleOutput.length === 0 ? (
              <p className="text-gray-500 text-sm">Console output will appear here...</p>
            ) : (
              consoleOutput.map((log, i) => (
                <div key={i} className={`text-sm font-mono ${log.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                  {log.type === 'error' ? '❌ ' : '› '}{log.message}
                </div>
              ))
            )}
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            title="output"
            className="w-full h-[calc(100%-40px)] bg-white"
            sandbox="allow-scripts"
          />
        )}
      </div>

      {/* Quick Tips */}
      <div className="bg-indigo-50 rounded-xl p-3 border border-indigo-100">
        <p className="text-xs text-indigo-600">
          💡 <strong>Tip:</strong> Write HTML, CSS, and JS in their tabs, then tap "Run" to see the result!
        </p>
      </div>
    </div>
  )
}

export default CodePlayground
