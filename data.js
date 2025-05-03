// 투자자 데이터
const investors = [
  {
    id: 'warren-buffett',
    name: '워렌 버핏',
    nameEn: 'Warren Buffett',
    image: 'https://via.placeholder.com/200',
    philosophy: '가치투자의 대가, 장기적 관점으로 훌륭한 기업에 투자',
    age: '94세',
    performance: '연 20%대 복리(1965~2021)',
    assets: '$1660억',
    characteristics: '버크셔 해서웨이 회장',
    portfolioLink: '최근 포트폴리오 보기',
    topStocks: [
      { symbol: 'BRK.A', name: 'Berkshire Hathaway', score: 95.34, rank: 1 },
      { symbol: 'PG', name: 'Procter & Gamble', score: 91.20, rank: 2 },
      { symbol: 'COST', name: 'Costco', score: 89.53, rank: 3 }
    ],
    metrics: [
      { name: 'economicMoat', displayName: '경제적 해자', weight: 0.25, criteria: '브랜드, 특허 등 장기 경쟁우위' },
      { name: 'roe', displayName: 'ROE', weight: 0.20, criteria: '15% 이상, 10년간 일관성' },
      { name: 'debtToEquity', displayName: '부채비율', weight: 0.15, criteria: '0.5x 이하' },
      { name: 'pe', displayName: 'P/E', weight: 0.10, criteria: '업종 평균 대비 낮을수록 좋음' },
      { name: 'freeCashFlow', displayName: '현금흐름', weight: 0.10, criteria: '예측 가능한 현금창출' }
    ]
  },
  // 나머지 투자자 데이터...
];
