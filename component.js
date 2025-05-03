// 메달 컴포넌트
function Medal({ rank }) {
  const colors = {
    1: 'bg-yellow-500',
    2: 'bg-gray-300',
    3: 'bg-amber-600',
  };
  
  return (
    <div className={`${colors[rank] || 'bg-blue-200'} w-5 h-5 rounded-full flex items-center justify-center text-white font-bold text-xs`}>
      {rank}
    </div>
  );
}

// 말풍선 컴포넌트
function Tooltip({ investor }) {
  if (!investor) return null;
  
  return (
    <div className="absolute -top-48 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 w-64 z-20">
      <div className="text-center mb-2">
        <h4 className="font-bold text-blue-600">{investor.name}의 추천 종목</h4>
      </div>
      <div className="space-y-2">
        {investor.topStocks.map((stock, index) => (
          <div key={stock.symbol} className="flex items-center gap-2">
            <Medal rank={index + 1} />
            <div className="flex-1">
              <div className="font-medium text-sm">{stock.symbol}</div>
              <div className="text-xs text-gray-600">{stock.name}</div>
            </div>
            <div className="text-blue-600 font-bold text-sm">{stock.score.toFixed(1)}</div>
          </div>
        ))}
      </div>
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
    </div>
  );
}

// 투자자 카드 컴포넌트
function InvestorCard({ investor, hoveredInvestor, onMouseEnter, onMouseLeave, onClick }) {
  return (
    <div 
      className="relative group cursor-pointer transition-all hover:shadow-lg bg-white rounded-lg overflow-hidden transform hover:-translate-y-1" 
      onClick={() => onClick(investor)}
      onMouseEnter={() => onMouseEnter(investor)}
      onMouseLeave={onMouseLeave}
      style={{transition: "all 0.3s ease"}}
    >
      {hoveredInvestor && hoveredInvestor.id === investor.id && (
        <Tooltip investor={investor} />
      )}
      
      <div className="relative h-48" style={{background: "linear-gradient(to bottom, #f0f9ff, #e2e8f0)"}}>
        {/* 투자자 이미지 */}
        <img 
          src={investor.image} 
          alt={investor.name} 
          className="absolute w-32 h-32 rounded-full border-4 border-white shadow-lg"
          style={{
            top: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            objectFit: "cover"
          }}
        />
        
        {/* 포트폴리오 링크 */}
        <div className="absolute top-2 right-2 bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
          {investor.portfolioLink}
        </div>
        
        {/* 이름과 철학 */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-800 to-transparent p-3 pt-6">
          <h3 className="text-lg font-bold text-white text-center">{investor.name}</h3>
          <p className="text-xs text-white opacity-90 text-center">{investor.philosophy}</p>
        </div>
      </div>
      
      <div className="p-3">
        <div className="text-xs grid grid-cols-2 gap-x-1 gap-y-0.5 mb-2">
          <div className="flex justify-between">
            <span className="text-gray-500">연령:</span>
            <span>{investor.age}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">자산:</span>
            <span>{investor.assets}</span>
          </div>
          <div className="col-span-2 flex justify-between">
            <span className="text-gray-500">성과:</span>
            <span className="text-right flex-1 pl-1">{investor.performance}</span>
          </div>
          <div className="col-span-2 flex justify-between">
            <span className="text-gray-500">특징:</span>
            <span className="text-right flex-1 pl-1">{investor.characteristics}</span>
          </div>
        </div>
        
        <div className="border-t pt-2 mt-1">
          <div className="text-xs font-medium mb-1">추천 종목</div>
          <div className="space-y-1">
            {investor.topStocks.map((stock, index) => (
              <div key={stock.symbol} className="flex items-center gap-1 text-xs">
                <Medal rank={index + 1} />
                <span className="font-medium">{stock.symbol}</span>
                <span className="text-gray-600 text-xs ml-1">{stock.name}</span>
                <span className="text-blue-600 text-xs ml-auto">{stock.score.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 지표 막대 컴포넌트
function MetricBar({ metric }) {
  return (
    <div className="flex items-center">
      <div className="w-1/2">
        <span className="font-medium">{metric.displayName}:</span>
      </div>
      <div className="w-1/2">
        <div className="flex items-center">
          <div className="h-2 bg-gray-200 rounded-full flex-1 mr-2">
            <div 
              className="h-full bg-blue-600 rounded-full" 
              style={{ width: `${metric.weight * 100}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-600">{Math.round(metric.weight * 100)}%</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {metric.criteria}
        </div>
      </div>
    </div>
  );
}

// 홈페이지 컴포넌트
function HomePage({ investors, hoveredInvestor, onMouseEnter, onMouseLeave, onSelectInvestor }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-1">대가차트</h1>
        <h2 className="text-lg text-gray-600">부자 따라 투자하기</h2>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {investors.map(investor => (
          <InvestorCard 
            key={investor.id} 
            investor={investor}
            hoveredInvestor={hoveredInvestor}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onSelectInvestor}
          />
        ))}
      </div>
    </div>
  );
}

// 상세 페이지 컴포넌트
function DetailPage({ investor, onBack }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <button 
        onClick={onBack}
        className="mb-4 text-blue-600 flex items-center gap-1 hover:underline"
      >
        ← 돌아가기
      </button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="h-56 relative" style={{background: "linear-gradient(to bottom, #f0f9ff, #e2e8f0)"}}>
          {/* 이미지 */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            <img 
              src={investor.image} 
              alt={investor.name} 
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              style={{objectFit: "cover"}}
            />
          </div>
          
          {/* 포트폴리오 링크 */}
          <div className="absolute top-4 right-4">
            <a 
              href="#" 
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:shadow-lg transition-shadow"
            >
              {investor.portfolioLink}
            </a>
          </div>
          
          {/* 투자자 정보 */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800">{investor.name}</h1>
            <p className="text-gray-600">({investor.nameEn})</p>
            <p className="text-lg text-gray-700 mt-1">{investor.philosophy}</p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-blue-800 mb-2">투자자 정보</h3>
              <div className="space-y-2 text-gray-700">
                <div>
                  <span className="font-medium">연령:</span> {investor.age}
                </div>
                <div>
                  <span className="font-medium">자산:</span> {investor.assets}
                </div>
                <div>
                  <span className="font-medium">성과:</span> {investor.performance}
                </div>
                <div>
                  <span className="font-medium">특징:</span> {investor.characteristics}
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-green-800 mb-2">주요 투자 지표</h3>
              <div className="space-y-2">
                {investor.metrics.map((metric) => (
                  <MetricBar key={metric.name} metric={metric} />
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Top 3 추천 종목</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {investor.topStocks.map((stock, index) => (
                <div key={stock.symbol} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-2">
                    <Medal rank={index + 1} />
                    <span className="font-bold ml-2">{stock.symbol}</span>
                    <span className="text-blue-600 font-bold ml-auto">{stock.score.toFixed(1)}</span>
                  </div>
                  <div className="text-sm text-gray-600">{stock.name}</div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      {investor.name}의 중요 지표 기준 {index + 1}위
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* 투자 기준 설명 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{investor.name}의 투자 철학</h3>
        <p className="text-gray-700 mb-4">{investor.philosophy}</p>
        
        <div className="mt-4">
          <h4 className="font-bold text-lg text-gray-800 mb-2">투자 기준</h4>
          <ul className="space-y-2">
            {investor.metrics.map(metric => (
              <li key={metric.name} className="flex">
                <span className="text-blue-600 mr-2">•</span>
                <div>
                  <span className="font-medium">{metric.displayName}:</span> {metric.criteria}
                  <div className="text-xs text-gray-500">
                    가중치: {Math.round(metric.weight * 100)}%
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
