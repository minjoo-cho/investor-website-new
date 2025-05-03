// 메인 앱 컴포넌트
function App() {
  const [selectedInvestor, setSelectedInvestor] = React.useState(null);
  const [hoveredInvestor, setHoveredInvestor] = React.useState(null);
  
  const handleSelectInvestor = (investor) => {
    setSelectedInvestor(investor);
    setHoveredInvestor(null);
  };
  
  const handleBack = () => {
    setSelectedInvestor(null);
  };

  const handleMouseEnter = (investor) => {
    setHoveredInvestor(investor);
  };

  const handleMouseLeave = () => {
    setHoveredInvestor(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div 
            className="font-bold text-xl cursor-pointer" 
            onClick={handleBack}
          >
            부자따라 부자되기
          </div>
          {selectedInvestor && (
            <div className="text-sm text-gray-600">
              {selectedInvestor.name}의 투자 전략
            </div>
          )}
        </div>
      </nav>
      
      {selectedInvestor ? (
        <DetailPage 
          investor={selectedInvestor} 
          onBack={handleBack} 
        />
      ) : (
        <HomePage 
          investors={investors} 
          hoveredInvestor={hoveredInvestor}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onSelectInvestor={handleSelectInvestor}
        />
      )}
      
      <footer className="bg-gray-800 text-white p-4 text-center text-sm mt-auto">
        <p>© 2025 부자따라 부자되기. 모든 권리 보유.</p>
      </footer>
    </div>
  );
}

// 앱 렌더링
ReactDOM.render(<App />, document.getElementById('root'));
