import React, { useState, useEffect } from 'react';
import { Plus, User, Building2, DollarSign, Phone, Mail, Calendar, ChevronRight, X, GripVertical, TrendingUp, Users, Target, BrainCircuit, Briefcase, Link, MapPin, Send, Loader, CheckCircle, FileText, Bot, MessageSquare, StickyNote, Settings, Settings2, HardHat, HeartHandshake, Clock, ChevronLeft, Link2, Type, Hash, CalendarDays, ChevronDown, Trash2 } from 'lucide-react';

const PIPELINE_STAGES = [
  { id: 'contact', name: '첫 접촉', color: 'bg-slate-500' },
  { id: 'meeting', name: '미팅 진행', color: 'bg-blue-500' },
  { id: 'proposal', name: '제안서 발송', color: 'bg-purple-500' },
  { id: 'negotiation', name: '협상 중', color: 'bg-amber-500' },
  { id: 'closed', name: '계약 완료', color: 'bg-green-500' }
];

const INITIAL_LEADS = [
  { id: 1, name: '김영희', company: '테크스타트', email: 'kim@techstart.kr', phone: '010-1234-5678', status: 'new', source: '웹사이트', score: 65, industry: 'IT/소프트웨어', website: 'https://techstart.kr', address: '서울시 강남구' },
  { id: 2, name: '이철수', company: '그로우업', email: 'lee@growup.co.kr', phone: '010-2345-6789', status: 'contacted', source: '소개', score: 95, industry: '마케팅', website: 'https://growup.co.kr', address: '서울시 서초구' },
  { id: 3, name: '박지민', company: '데이터랩', email: 'park@datalab.io', phone: '010-3456-7890', status: 'qualified', source: '컨퍼런스', score: 80, industry: '데이터 분석', website: 'https://datalab.io', address: '경기도 판교' },
  { id: 4, name: '최수영', company: '넥스트스텝', email: 'choi@nextstep.com', phone: '010-4567-8901', status: 'new', source: '광고', score: 55, industry: '교육', website: 'https://nextstep.com', address: '서울시 마포구' },
  { id: 5, name: '정다혜', company: '헬스케어+', email: 'jung@healthcare.plus', phone: '010-5678-9012', status: 'new', source: '콜드콜', score: 45, industry: '헬스케어', website: 'https://healthcare.plus', address: '인천시 연수구' },
  { id: 6, name: '윤태현', company: '스마트팩토리', email: 'yoon@smartfactory.ai', phone: '010-6789-0123', status: 'contacted', source: '소개', score: 90, industry: '제조업', website: 'https://smartfactory.ai', address: '경기도 수원시' },
  { id: 7, name: '강민준', company: '핀테크솔루션', email: 'kang@fintech.sol', phone: '010-7890-1234', status: 'new', source: '웹사이트', score: 70, industry: '금융', website: 'https://fintech.sol', address: '서울시 영등포구' },
  { id: 8, name: '송지아', company: '플레이게임즈', email: 'song@playgames.io', phone: '010-8901-2345', status: 'qualified', source: '컨퍼런스', score: 85, industry: '게임', website: 'https://playgames.io', address: '경기도 성남시' },
  { id: 9, name: '한서준', company: '리테일테크', email: 'han@retail.tech', phone: '010-9012-3456', status: 'new', source: '광고', score: 60, industry: '유통', website: 'https://retail.tech', address: '서울시 중구' },
  { id: 10, name: '임나영', company: '에듀플랫폼', email: 'lim@eduplatform.kr', phone: '010-0123-4567', status: 'contacted', source: '소개', score: 92, industry: '교육', website: 'https://eduplatform.kr', address: '대전시 유성구' },
];

const INITIAL_DEALS = [
  { id: 1, name: '테크스타트 연간 계약', company: '테크스타트', amount: 12000000, stage: 'proposal', contact: '김영희', closeDate: '2024-02-15', industry: 'IT/소프트웨어', website: 'https://techstart.kr', address: '서울시 강남구' },
  { id: 2, name: '그로우업 파일럿', company: '그로우업', amount: 3000000, stage: 'meeting', contact: '이철수', closeDate: '2024-02-28', industry: '마케팅', website: 'https://growup.co.kr', address: '서울시 서초구' },
  { id: 3, name: '데이터랩 엔터프라이즈', company: '데이터랩', amount: 50000000, stage: 'negotiation', contact: '박지민', closeDate: '2024-03-10', industry: '데이터 분석', website: 'https://datalab.io', address: '경기도 판교' },
  { id: 4, name: '클라우드원 스타터', company: '클라우드원', amount: 5000000, stage: 'contact', contact: '최수진', closeDate: '2024-03-20', industry: '클라우드 서비스', website: 'https://cloudone.io', address: '부산시 해운대구' },
  { id: 5, name: '모빌리티플랫폼 정기 구독', company: '모빌리티플랫폼', amount: 25000000, stage: 'contact', contact: '홍길동', closeDate: '2024-03-25', industry: '모빌리티', website: 'https://mobility.platform', address: '서울시 강남구' },
  { id: 6, name: '푸드테크 솔루션 도입', company: '푸드테크', amount: 8000000, stage: 'meeting', contact: '이몽룡', closeDate: '2024-04-05', industry: '식음료', website: 'https://food.tech', address: '서울시 송파구' },
  { id: 7, name: '에코에너지 시스템 구축', company: '에코에너지', amount: 75000000, stage: 'proposal', contact: '성춘향', closeDate: '2024-04-12', industry: '에너지', website: 'https://eco.energy', address: '울산시 남구' },
  { id: 8, 'name': '뷰티인사이드 마케팅 캠페인', 'company': '뷰티인사이드', 'amount': 15000000, 'stage': 'negotiation', 'contact': '변학도', 'closeDate': '2024-04-20', 'industry': '뷰티', 'website': 'https://beauty.inside', 'address': '서울시 강남구' },
  { id: 9, 'name': '트래블이지 API 연동', 'company': '트래블이지', 'amount': 4000000, 'stage': 'closed', 'contact': '방자', 'closeDate': '2024-01-30', 'industry': '여행', 'website': 'https://travel.easy', 'address': '제주도 제주시' },
  { id: 10, 'name': '스페이스공유 플랫폼 입점', 'company': '스페이스공유', 'amount': 2000000, 'stage': 'meeting', 'contact': '향단', 'closeDate': '2024-04-18', 'industry': '부동산', 'website': 'https://space.share', 'address': '경기도 성남시' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [deals, setDeals] = useState(INITIAL_DEALS);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showDealModal, setShowDealModal] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', company: '', email: '', phone: '', source: '웹사이트', industry: '', website: '', address: '' });
  const [newDeal, setNewDeal] = useState({ name: '', company: '', amount: '', stage: 'contact', contact: '', closeDate: '', industry: '', website: '', address: '' });
  const [draggedDeal, setDraggedDeal] = useState(null);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [selectedInsightCustomer, setSelectedInsightCustomer] = useState(null);
  const [insight, setInsight] = useState({
    date: '2026-01-07',
    industry: '반도체 제조업',
    news: [
      { 
        id: 1, 
        title: 'LNG·LPG 동절기 무관세…이차전지·반도체 핵심원료 관세 인하 확대', 
        url: '#',
        source: '연합뉴스',
        publishedAt: '3시간 전',
        snippet: '정부가 동절기 LNG·LPG에 대한 무관세 조치를 연장하고, 이차전지와 반도체 산업의 핵심 원료에 대한 관세 인하를 확대하기로 했습니다. 이는 관련 기업의 원가 부담을 줄여줄 것으로 기대됩니다.',
        imageUrl: `data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 24 24' fill='none' stroke='%238B9BFF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-factory'%3e%3cpath d='M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z'/%3e%3cpath d='M17 18h1'/%3e%3cpath d='M12 18h1'/%3e%3cpath d='M7 18h1'/%3e%3c/svg%3e`
      },
      { 
        id: 2, 
        title: 'SK에코플랜트, 반도체 소재 자회사 편입 완료…지속가능 성장 확보', 
        url: '#',
        source: '전자신문',
        publishedAt: '8시간 전',
        snippet: 'SK에코플랜트가 반도체 소재 전문 자회사 SK테트론을 공식 편입하며 사업 포트폴리오를 강화했습니다. 이를 통해 반도체 소재 시장에서의 경쟁력을 높이고 지속 가능한 성장을 도모할 계획입니다.',
        imageUrl: `data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 24 24' fill='none' stroke='%2334D399' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-trending-up'%3e%3cpolyline points='22 7 13.5 15.5 8.5 10.5 2 17'/%3e%3cpolyline points='16 7 22 7 22 13'/%3e%3c/svg%3e`
      }
    ],
    recommendedCompanies: [
      { name: '삼성전자', industry: '반도체 제조업' },
      { name: 'SK 하이닉스', industry: '반도체 제조업' },
      { name: '엔비디아', industry: '반도체 제조업' },
      { name: 'AMD', industry: '반도체 제조업' },
      { name: '인텔', industry: '반도체 제조업' },
    ]
  });
  const [selectedLead, setSelectedLead] = useState(null);
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [leadToConvert, setLeadToConvert] = useState(null);
  const [conversionDealDetails, setConversionDealDetails] = useState({ name: '', amount: '', stage: 'contact' });
  const [emailData, setEmailData] = useState({ to: '', subject: '', body: '' });
  
  const [knowledgeLink, setKnowledgeLink] = useState('https://my-company-docs.com');
  const [techStackAnalysisCompany, setTechStackAnalysisCompany] = useState('스마트팩토리');
  const [techStackData, setTechStackData] = useState([]);
  const [techStackVisibleCount, setTechStackVisibleCount] = useState(5);
  const [showTechStackSuggestion, setShowTechStackSuggestion] = useState(false);
  const [activeMeeting, setActiveMeeting] = useState(null);
  const [meetingStep, setMeetingStep] = useState('details'); // details, recording, analysis
  const [meetingTranscript, setMeetingTranscript] = useState('');
  const [suggestedFields, setSuggestedFields] = useState({});
  const [meetingSummary, setMeetingSummary] = useState('');
  const [nextActions, setNextActions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState([]);


  const DUMMY_TECH_STACKS = {
    '스마트팩토리': [
      { category: '클라우드 인프라', tools: 'AWS (EC2, S3, RDS)', insight: '클라우드 비용 최적화 또는 멀티 클라우드 전략 제안 가능성이 있습니다.' },
      { category: 'CRM', tools: 'Salesforce', insight: '자사 CRM과의 연동 또는 마이그레이션 기회를 탐색할 수 있습니다.' },
      { category: '프로젝트 관리', tools: 'Atlassian Jira', insight: '개발팀과의 협업 효율을 높이는 솔루션 제안이 유효합니다.' },
      { category: '데이터베이스', tools: 'MySQL, PostgreSQL', insight: '데이터베이스 마이그레이션 또는 고성능 DB 솔루션 도입 기회가 있습니다.' },
      { category: 'CI/CD', tools: 'Jenkins, Docker', insight: 'DevOps 파이프라인 자동화 및 컨테이너 오케스트레이션 솔루션 제안이 가능합니다.' },
      { category: '모니터링', tools: 'Datadog, New Relic', insight: '통합 모니터링 대시보드 구축 또는 비용 절감형 대체 솔루션을 제안할 수 있습니다.' },
      { category: '보안', tools: 'Okta', insight: '통합 인증(SSO) 및 계정 관리 고도화 관련 영업 기회가 있습니다.' },
      { category: '프론트엔드', tools: 'React, Vue.js', insight: '웹 성능 최적화 또는 최신 프레임워크 기반의 UI/UX 컨설팅을 제안할 수 있습니다.' },
      { category: '백엔드', tools: 'Java (Spring), Python (Django)', insight: '마이크로서비스 아키텍처(MSA) 전환 또는 서버리스 도입을 제안할 수 있습니다.' },
      { category: '커뮤니케이션', tools: 'Slack', insight: '업무용 메신저와 CRM 데이터 연동을 통한 업무 자동화 기회가 있습니다.' },
    ],
    '테크스타트': [
      { category: '클라우드 인프라', tools: 'Google Cloud Platform', insight: 'GCP 기반의 AI/ML 솔루션 도입을 제안해볼 수 있습니다.' },
      { category: '데이터베이스', tools: 'PostgreSQL, Redis', insight: '고성능 데이터베이스 관리 및 모니터링 솔루션이 필요할 수 있습니다.' },
      { category: '협업 툴', tools: 'Slack, Notion', insight: '전사적 협업 및 지식 관리 시스템 통합을 제안할 수 있습니다.' },
    ],
    '데이터랩': [
      { category: '데이터 분석', tools: 'Tableau, Airflow', insight: '데이터 파이프라인 고도화 및 시각화 대시보드 개선 기회가 있습니다.' },
      { category: '클라우드 인프라', tools: 'Azure', insight: 'Azure 환경에 최적화된 보안 및 비용 관리 솔루션이 유효합니다.' },
      { category: 'CRM', tools: 'HubSpot', insight: '마케팅 자동화와 CRM 데이터 통합 관련하여 접점을 찾을 수 있습니다.' },
    ],
    '그로우업': [
      { category: '마케팅 자동화', tools: 'Marketo', insight: '리드 너처링 캠페인 고도화 및 SalesMap CRM과의 연동을 제안할 수 있습니다.' },
      { category: '콘텐츠 관리', tools: 'WordPress', insight: '헤드리스 CMS 전환 또는 콘텐츠 개인화 솔루션 도입 기회가 있습니다.' },
      { category: '데이터 분석', tools: 'Google Analytics', insight: 'GA4 데이터 기반의 고객 행동 분석 및 예측 모델링을 제안할 수 있습니다.' },
    ],
    '핀테크솔루션': [
      { category: '백엔드', tools: 'Kotlin, Go', insight: '고성능 금융 거래 시스템을 위한 MSA 아키텍처 컨설팅 기회가 있습니다.' },
      { category: '클라우드 인프라', tools: 'AWS, Kubernetes', insight: '클라우드 네이티브 환경의 보안 및 규제 준수(Compliance) 솔루션이 유효합니다.' },
      { category: '보안', tools: 'HashiCorp Vault', insight: '민감 데이터 관리를 위한 통합 보안 및 키 관리 시스템 고도화를 제안할 수 있습니다.' },
    ],
  };
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncComplete, setSyncComplete] = useState(false);
  const [syncedData, setSyncedData] = useState([]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [meetings, setMeetings] = useState([
    { id: 1, date: '2025-12-15', time: '10:00', title: '테크스타트 주간 미팅', attendees: '김영희, 이철수', relatedToType: 'deal', relatedToId: 1, relatedToName: '테크스타트 연간 계약' },
    { id: 2, date: '2025-12-18', time: '14:30', title: '데이터랩 제안서 논의', attendees: '박지민', relatedToType: 'deal', relatedToId: 3, relatedToName: '데이터랩 엔터프라이즈' },
  ]);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [newMeeting, setNewMeeting] = useState({ title: '', time: '09:00', attendees: '', relatedToType: 'none', relatedToId: null });
  const [selectedDate, setSelectedDate] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const [settingsSubTab, setSettingsSubTab] = useState('leads');
  const [dataFields, setDataFields] = useState({
    leads: [
      { id: 1, label: '이름', type: 'text', removable: false },
      { id: 2, label: '회사', type: 'text', removable: false },
      { id: 3, label: '이메일', type: 'text', removable: false },
      { id: 4, label: '전화번호', type: 'text', removable: false },
      { id: 5, label: '소스', type: 'select', removable: false },
      { id: 6, label: '산업군', type: 'text', removable: true },
      { id: 7, label: '웹사이트', type: 'text', removable: true },
      { id: 8, label: '주소', type: 'text', removable: true },
    ],
    deals: [
      { id: 1, label: '딜 이름', type: 'text', removable: false },
      { id: 2, label: '회사', type: 'text', removable: false },
      { id: 3, label: '금액', type: 'number', removable: false },
      { id: 4, label: '담당자', type: 'text', removable: false },
      { id: 5, label: '예상 마감일', type: 'date', removable: false },
    ],
    customers: [
      { id: 1, label: '회사명', type: 'text', removable: false },
      { id: 2, label: '담당자', type: 'text', removable: false },
      { id: 3, label: '계약 시작일', type: 'date', removable: true },
    ],
  });
  const [showNewFieldForm, setShowNewFieldForm] = useState(false);
  const [newFieldDetails, setNewFieldDetails] = useState({ label: '', type: 'text' });

  const menuItems = {
    main: [
      { id: 'dashboard', name: '대시보드', icon: TrendingUp },
      { id: 'customers', name: '고객', icon: HeartHandshake },
      { id: 'leads', name: '리드', icon: Users },
      { id: 'deals', name: '딜', icon: Target },
      { id: 'automation', name: '자동화', icon: Bot },
      { id: 'email', name: '이메일', icon: Mail },
      { id: 'sms', name: '문자 메시지', icon: MessageSquare },
      { id: 'calendar', name: '일정관리', icon: Calendar },
      { id: 'notes', name: '노트', icon: StickyNote },
    ],
    communication: [
      { id: 'personal-settings', name: '개인설정', icon: Settings2 },
      { id: 'company-settings', name: '회사설정', icon: Settings },
    ],
    settings: []
  };

  useEffect(() => {
    // Simulate fetching tech stack data when the selected company changes
    setIsLoading(true);
    setTechStackData([]);
    setTimeout(() => {
      const fullData = DUMMY_TECH_STACKS[techStackAnalysisCompany] || [
        { category: '분석 데이터 없음', tools: '정보 수집 필요', insight: '해당 고객사에 대한 공개된 기술 스택 정보가 부족합니다. 추가적인 리서치가 필요합니다.' }
      ];
      setTechStackData(fullData.slice(0, techStackVisibleCount));
      setIsLoading(false);
    }, 2000);
  }, [techStackAnalysisCompany, techStackVisibleCount]);
  
  useEffect(() => {
    setTechStackVisibleCount(5); // Reset visible count when company changes
  }, [techStackAnalysisCompany]);

  const DUMMY_SYNC_DATA = [
    { id: 1, title: '제품 A 기술 명세서', url: 'https://my-company-docs.com/product-a-spec', snippet: '제품 A의 주요 기능, 시스템 요구사항, API 엔드포인트에 대한 상세 설명입니다...' },
    { id: 2, title: '가격 정책 (2025년 4분기)', url: 'https://my-company-docs.com/pricing-q4-2025', snippet: '스타터, 프로, 엔터프라이즈 플랜의 최신 가격 정보와 포함된 기능을 안내합니다...' },
    { id: 3, title: '자주 묻는 질문 (FAQ)', url: 'https://my-company-docs.com/faq', snippet: '계정 설정, 결제, 문제 해결 등 고객들이 자주 묻는 질문에 대한 답변 모음입니다...' },
    { id: 4, title: '설치 가이드', url: 'https://my-company-docs.com/installation-guide', snippet: '운영체제별 설치 방법과 초기 설정 과정을 단계별로 안내합니다...' },
    { id: 5, title: 'API 연동 가이드', url: 'https://my-company-docs.com/api-integration', snippet: 'RESTful API를 사용하여 서비스를 연동하는 방법에 대한 개발자 가이드입니다...' },
  ];

  const formatCurrency = (amount) => new Intl.NumberFormat('ko-KR').format(amount) + '원';

  const totalPipelineValue = deals.reduce((sum, deal) => sum + deal.amount, 0);
  const closedDealsValue = deals.filter(d => d.stage === 'closed').reduce((sum, deal) => sum + deal.amount, 0);

  // AI 시뮬레이션: 리드 스코어링 함수
  const getAILeadScore = (lead) => {
    let score = 50; // 기본 점수
    // 소스에 따른 가중치
    const sourceWeights = { '소개': 30, '컨퍼런스': 20, '웹사이트': 10, '광고': 5, '콜드콜': 0 };
    score += sourceWeights[lead.source] || 0;

    // 이메일, 전화번호 유무에 따른 가중치
    if (lead.email) score += 5;
    if (lead.phone) score += 5;

    // 100점을 넘지 않도록 조정
    return Math.min(score, 100);
  };

  const handleAddLead = () => {
    if (newLead.name && newLead.company) {
      const leadToAdd = { ...newLead, id: Date.now(), status: 'new' };
      const score = getAILeadScore(leadToAdd);
      setLeads([...leads, { ...leadToAdd, score }].sort((a, b) => b.score - a.score));
      setNewLead({ name: '', company: '', email: '', phone: '', source: '웹사이트', industry: '', website: '', address: '' });
      setShowLeadModal(false);
    }
  };

  const handleAddDeal = () => {
    if (newDeal.name && newDeal.company && newDeal.amount) {
      setDeals([...deals, { ...newDeal, id: Date.now(), amount: parseInt(newDeal.amount) }]);
      setNewDeal({ name: '', company: '', amount: '', stage: 'contact', contact: '', closeDate: '', industry: '', website: '', address: '' });
      setShowDealModal(false);
    }
  };

  const handleOpenConvertModal = (lead) => {
    setLeadToConvert(lead);
    setConversionDealDetails({
      name: `${lead.company} 신규 계약`,
      amount: '',
      stage: 'contact',
    });
    setShowConvertModal(true);
  };

  const handleConfirmConversion = () => {
    if (!leadToConvert || !conversionDealDetails.name) return;

    const newDealFromLead = {
      id: Date.now(),
      ...conversionDealDetails,
      amount: parseInt(conversionDealDetails.amount) || 0,
      company: leadToConvert.company,
      contact: leadToConvert.name,
      industry: leadToConvert.industry,
      website: leadToConvert.website,
      address: leadToConvert.address,
      closeDate: '',
    };
    setDeals(prevDeals => [...prevDeals, newDealFromLead]);
    setLeads(prevLeads => prevLeads.filter(l => l.id !== leadToConvert.id));
    setShowConvertModal(false);
    setLeadToConvert(null);
  };

  const handleDragStart = (deal) => setDraggedDeal(deal);
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (stageId) => {
    if (draggedDeal) {
      setDeals(deals.map(d => d.id === draggedDeal.id ? { ...d, stage: stageId } : d));
      setDraggedDeal(null);
    }
  };

  const handleCreateDealFromRecommendation = (companyName, industry) => {
    setNewDeal({
      name: `${companyName} 신규 딜`,
      company: companyName,
      amount: '',
      stage: 'contact',
      industry: industry,
    });
    setShowDealModal(true);
  };

  const handleDealClick = (deal) => {
    setSelectedDeal(deal);
  };

  const handleInsightCustomerClick = (deal) => {
    setSelectedInsightCustomer(deal);
  };

  const handleLeadClick = (lead) => {
    setSelectedLead(lead);
  };

  const handleDraftEmailFromInsight = (customer) => {
    const newsTitle = insight.news[0].title;
    // A simple way to generate a dummy email address.
    const customerEmail = `${customer.contact.replace(/\s/g, '.')}@${customer.company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;

    const draftBody = `안녕하세요, ${customer.company}의 ${customer.contact}님.

최근 발표된 "${newsTitle}" 관련 소식을 접했습니다.
이번 관세 인하 조치가 귀사의 원가 경쟁력 강화에 긍정적인 영향을 미칠 것으로 예상됩니다.

이 좋은 기회를 활용하여 귀사의 생산 효율성을 더욱 높일 수 있는 저희의 새로운 솔루션(예: 고효율 생산 라인, 스마트 팩토리 업그레이드)에 대해 소개해드리고 싶습니다.

잠시 시간을 내어주시어 관련 논의를 진행할 수 있기를 바랍니다.

감사합니다.
`;

    setEmailData({ to: customerEmail, subject: `[SalesMap] ${customer.company}의 새로운 기회: 관세 인하 관련 솔루션 제안`, body: draftBody });
    setSelectedInsightCustomer(null);
    setActiveTab('email');
  };

  const handleDraftEmailFromTechStack = () => {
    const customer = leads.find(l => l.company === techStackAnalysisCompany) || deals.find(d => d.company === techStackAnalysisCompany) || { company: techStackAnalysisCompany, contact: '담당자' };
    const customerEmail = customer.email || `${customer.contact.replace(/\s/g, '.').toLowerCase()}@${customer.company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;

    const insights = techStackData.map(stack => `- ${stack.category} (${stack.tools}): ${stack.insight}`).join('\n');

    const draftBody = `안녕하세요, ${customer.company}의 ${customer.contact}님.

귀사의 기술 스택을 검토한 결과, 몇 가지 협력 기회를 발견하여 연락드렸습니다.

저희 분석에 따르면 귀사에서는 현재 아래와 같은 기술들을 활용하고 계신 것으로 파악됩니다.
${insights}

이와 관련하여 저희 SalesMap의 솔루션이 귀사의 비즈니스 성장에 어떻게 기여할 수 있는지 구체적인 제안을 드리고 싶습니다.

감사합니다.
`;
    setEmailData({ to: customerEmail, subject: `[SalesMap] ${customer.company} 맞춤형 솔루션 제안`, body: draftBody });
    setShowTechStackSuggestion(false);
    setActiveTab('email');
  };

  const handleSyncKnowledge = () => {
    if (!knowledgeLink) return;
    setIsSyncing(true);
    setSyncComplete(false);
    setSyncedData([]);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncComplete(true);
      setSyncedData(DUMMY_SYNC_DATA);
      setTimeout(() => setSyncComplete(false), 5000); // 5초 후 완료 메시지 숨김
    }, 5000);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleOpenMeetingModal = (date) => {
    setSelectedDate(date);
    setNewMeeting({ title: '', time: '09:00', attendees: '', relatedToType: 'none', relatedToId: null });
    setShowMeetingModal(true);
  };

  const handleAddMeeting = () => {
    if (!newMeeting.title || !selectedDate) return;
    const meetingDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    
    let relatedToName = '';
    if (newMeeting.relatedToType === 'lead' && newMeeting.relatedToId) {
      const lead = leads.find(l => l.id === parseInt(newMeeting.relatedToId));
      if (lead) relatedToName = `${lead.name} (${lead.company})`;
    } else if (newMeeting.relatedToType === 'deal' && newMeeting.relatedToId) {
      const deal = deals.find(d => d.id === parseInt(newMeeting.relatedToId));
      if (deal) relatedToName = deal.name;
    }

    setMeetings([...meetings, { 
      ...newMeeting, 
      id: Date.now(), 
      date: meetingDate,
      relatedToId: newMeeting.relatedToId ? parseInt(newMeeting.relatedToId) : null,
      relatedToName
    }]);
    setShowMeetingModal(false);
  };

  const handleRelatedItemChange = (type, id) => {
    let title = newMeeting.title;
    let attendees = newMeeting.attendees;
    if (type === 'lead') {
      const lead = leads.find(l => l.id === parseInt(id));
      if(lead) {
        title = `${lead.company} 미팅`;
        attendees = lead.name;
      }
    } else if (type === 'deal') {
      const deal = deals.find(d => d.id === parseInt(id));
      if(deal) {
        title = `${deal.name} 논의`;
        attendees = deal.contact;
      }
    }
    setNewMeeting({ ...newMeeting, relatedToType: type, relatedToId: id, title, attendees });
  };

  const handleAddNewField = () => {
    if (!newFieldDetails.label) return;
    setDataFields(prev => ({
      ...prev,
      [settingsSubTab]: [...prev[settingsSubTab], { ...newFieldDetails, id: Date.now(), removable: true }]
    }));
    setShowNewFieldForm(false);
    setNewFieldDetails({ label: '', type: 'text' });
  };

  const handleDeleteField = (fieldId) => {
    setDataFields(prev => ({
      ...prev,
      [settingsSubTab]: prev[settingsSubTab].filter(f => f.id !== fieldId)
    }));
  };

  const handleMeetingClick = (meeting) => {
    setActiveMeeting(meeting);
    setMeetingStep('details');
    setMeetingTranscript('');
    setSuggestedFields({});
    setMeetingSummary('');
    setNextActions([]);
    setIsRecording(false);
  };

  const startRecording = () => {
    setIsRecording(true);
    setMeetingStep('recording');
  };

  const stopRecording = () => {
    setIsRecording(false);
    setMeetingStep('analysis');
    setIsLoading(true);

    // Simulate transcription and AI analysis
    setTimeout(() => {
      const DUMMY_TRANSCRIPT = `
        ...네, 저희 스마트팩토리는 주로 제조업 분야의 자동화 솔루션을 개발하고 있습니다. 
        최근에는 반도체 장비 제어 시스템에 집중하고 있고요. 
        자세한 내용은 저희 웹사이트 smartfactory.ai 에서 확인하실 수 있습니다. 
        이번 프로젝트의 예상 예산은 약 3천만원 정도로 생각하고 있습니다...
      `;
      setMeetingTranscript(DUMMY_TRANSCRIPT);

      // Simulate AI field matching
      const extractedFields = {
        industry: '제조업',
        website: 'https://smartfactory.ai',
        amount: '30000000'
      };
      setSuggestedFields(extractedFields);
      setIsLoading(false);
    }, 3000);
  };

  const handleAnalyzeMeeting = () => {
    setIsLoading(true);
    setTimeout(() => {
      setMeetingSummary('고객(스마트팩토리)은 제조업 분야 자동화 솔루션, 특히 반도체 장비 제어 시스템에 관심이 많음. 웹사이트(smartfactory.ai)를 운영 중이며, 프로젝트 초기 예산으로 약 3,000만원을 고려하고 있음.');
      setNextActions([
        { id: 1, text: '반도체 장비 제어 시스템 관련 맞춤형 제안서 준비 및 발송' },
        { id: 2, text: '예산 기반의 1차 견적서 작성 및 전달' },
        { id: 3, text: '후속 미팅 일정 조율 (기술 담당자 포함)' },
      ]);
      setIsLoading(false);
    }, 2000);
  };
  const handleSaveMeetingFields = () => {
    if (!activeMeeting) return;

    if (activeMeeting.relatedToType === 'deal') {
      setDeals(deals.map(d => {
        if (d.id === activeMeeting.relatedToId) {
          const updatedDeal = { ...d };
          if (suggestedFields.industry) updatedDeal.industry = suggestedFields.industry;
          if (suggestedFields.website) updatedDeal.website = suggestedFields.website;
          if (suggestedFields.amount) updatedDeal.amount = parseInt(suggestedFields.amount);
          return updatedDeal;
        }
        return d;
      }));
    } else if (activeMeeting.relatedToType === 'lead') {
      setLeads(leads.map(l => {
        if (l.id === activeMeeting.relatedToId) {
          return { ...l, ...suggestedFields };
        }
        return l;
      }));
    }
    setActiveMeeting(null);
  };

  const handleSaveNoteFromMeeting = () => {
    if (!activeMeeting || !meetingSummary) return;

    const newNote = {
      id: Date.now(),
      title: `${activeMeeting.title} 요약`,
      content: meetingSummary,
      date: new Date().toISOString().split('T')[0],
      relatedToType: activeMeeting.relatedToType,
      relatedToId: activeMeeting.relatedToId,
      relatedToName: activeMeeting.relatedToName,
    };
    setNotes(prev => [newNote, ...prev]);
    setActiveMeeting(null);
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="border border-gray-200"></div>);
    }

    for (let i = 1; i <= lastDate; i++) {
      const date = new Date(year, month, i);
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const dayMeetings = meetings.filter(m => m.date === dateString);

      days.push(
        <div key={i} className="border border-gray-200 p-2 flex flex-col h-32">
          <span className="font-medium">{i}</span>
          <div className="mt-1 space-y-1 overflow-y-auto">
            {dayMeetings.map(meeting => (
              <div key={meeting.id} onClick={() => handleMeetingClick(meeting)} className="bg-blue-100 text-blue-800 text-xs p-1 rounded-md cursor-pointer hover:bg-blue-200">
                <p className="font-semibold truncate">{meeting.title}</p>
                {meeting.relatedToName && (
                  <p className="truncate text-blue-600">{meeting.relatedToName}</p>
                )}
              </div>
            ))}
          </div>
          <button onClick={() => handleOpenMeetingModal(date)} className="mt-auto text-center text-gray-400 hover:text-blue-500">
            <Plus className="w-4 h-4 mx-auto"/>
          </button>
        </div>
      );
    }
    return days;
  };

  const ComingSoonPlaceholder = ({ tabName }) => {
    const currentTab = [...menuItems.main, ...menuItems.communication, ...menuItems.settings].find(item => item.id === tabName);
    const Icon = currentTab ? currentTab.icon : HardHat;
    const name = currentTab ? currentTab.name : "페이지";

    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="bg-white rounded-xl border border-gray-200 p-16 shadow-sm text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <Icon className="w-10 h-10 text-gray-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{name}</h1>
          <p className="text-lg font-semibold text-gray-600">준비 중인 기능입니다.</p>
          <p className="mt-2 text-gray-500 max-w-sm">현재 페이지는 개발 중에 있으며, 곧 멋진 기능으로 찾아뵙겠습니다. <br/>많은 기대 부탁드립니다!</p>
        </div>
      </div>
    );
  };

  const FieldTypeIcon = ({ type }) => {
    const icons = {
      text: <Type className="w-4 h-4 text-gray-500" />,
      number: <Hash className="w-4 h-4 text-gray-500" />,
      date: <CalendarDays className="w-4 h-4 text-gray-500" />,
      select: <ChevronDown className="w-4 h-4 text-gray-500" />,
    };
    return icons[type] || <Type className="w-4 h-4 text-gray-500" />;
  };

  const fieldTypeNames = { text: '텍스트', number: '숫자', date: '날짜', select: '선택' };


  return (
    <div className="min-h-screen bg-gray-50 text-base flex">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-8 px-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">SalesMap</span>
          </div>
        <nav className="flex flex-col h-full">
          <div className="space-y-1">
              {menuItems.main.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                    activeTab === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </button>
              ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-1">
            {menuItems.communication.map(item => (
                <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${ activeTab === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100' }`} >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </button>
            ))}
          </div>
          <div className="mt-auto pt-4 border-t border-gray-200 space-y-1">
            {menuItems.settings.map(item => (
                <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${ activeTab === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100' }`} >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </button>
            ))}
          </div>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white/60 backdrop-blur-sm border-b border-gray-200 px-8 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-end">
            <span className="text-sm bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-medium">Demo Version</span>
          </div>
        </header>
        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Industry Insight Section */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500">{insight.date}</p>
                    <h2 className="text-xl font-bold text-gray-900">오늘의 산업 인사이트: <span className="text-blue-600">{insight.industry}</span></h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* News */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800 text-lg">관련 뉴스 브리핑</h3>
                    {insight.news.map(item => (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" key={item.id} className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                        <img src={item.imageUrl} alt="뉴스 이미지" className="w-24 h-24 rounded-md object-cover" />
                        <div className="flex flex-col">
                          <p className="font-bold text-gray-800 mb-1">{item.title}</p>
                          <p className="text-sm text-gray-500 mb-2 flex-grow">{item.snippet}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-400 mt-auto">
                            <span>{item.source}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span>{item.publishedAt}</span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>

                  <div className="space-y-6 bg-gray-50/70 p-4 rounded-lg">
                    {/* Related Customers */}
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3 text-lg">📈 긍정적 영향 예상 고객</h3>
                      <div className="space-y-2">
                        {deals.filter(d => d.industry === '제조업' || d.industry === 'IT/소프트웨어').slice(0, 2).map(deal => (
                          <div key={deal.id} onClick={() => handleInsightCustomerClick(deal)} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100">
                            <div className="font-medium text-blue-800">{deal.company}</div>
                            <ChevronRight className="w-5 h-5 text-blue-600" />
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* New Opportunities */}
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3 text-lg">✨ 새로운 기회 <span className="text-sm font-normal text-gray-500">(콜드메일/콜 추천)</span></h3>
                      <div className="space-y-2">
                        {insight.recommendedCompanies.map(company => (
                          <div key={company.name} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                            <div className="font-medium text-green-800">{company.name}</div>
                            <button onClick={() => handleCreateDealFromRecommendation(company.name, company.industry)} className="text-sm font-semibold text-green-700 hover:text-green-900">딜 생성</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">총 리드</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">{leads.length}</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">진행 중 딜</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">{deals.filter(d => d.stage !== 'closed').length}</p>
                    </div>
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">파이프라인 총액</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">{formatCurrency(totalPipelineValue)}</p>
                    </div>
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-amber-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">계약 완료</p>
                      <p className="text-2xl font-bold text-green-600 mt-2">{formatCurrency(closedDealsValue)}</p>
                    </div>
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Tech Stack Matching Widget */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Bot className="w-6 h-6 text-purple-600" />
                      AI 기술 스택 분석
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">AI가 고객사 웹사이트/채용 공고/DART 전자공시 등의 사이트를 조회하여 사용 중인 솔루션을 탐색합니다.</p>
                  </div>
                  <div className="w-full sm:w-auto">
                    <select 
                      value={techStackAnalysisCompany} 
                      onChange={e => { setTechStackAnalysisCompany(e.target.value); }}
                      className="w-full sm:w-64 border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      {Object.keys(DUMMY_TECH_STACKS).map(company => (
                        <option key={company} value={company}>{company}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="bg-gray-50/70 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3 text-lg">🔍 <span className="text-purple-600 font-bold">{techStackAnalysisCompany}</span>의 기술 스택</h3>
                  {isLoading && techStackData.length === 0 ? (
                    <div className="flex items-center justify-center h-40">
                      <Loader className="w-8 h-8 animate-spin text-purple-600" />
                      <p className="ml-3 text-gray-600">AI가 기술 스택을 분석 중입니다...</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                      {techStackData.map((stack, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg border">
                          <p className="font-semibold text-gray-800">{stack.category}</p>
                          <p className="text-sm text-gray-600 mt-1 flex-grow">{stack.insight}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 flex justify-between items-center">
                    { (DUMMY_TECH_STACKS[techStackAnalysisCompany]?.length || 0) > techStackVisibleCount && (
                      <button 
                        onClick={() => setTechStackVisibleCount(prev => prev + 5)} 
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        +5개 더 보기
                      </button>
                    )}
                    <button onClick={() => setShowTechStackSuggestion(true)} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 font-medium flex items-center gap-2 ml-auto disabled:bg-gray-400" disabled={techStackData.some(s => s.category === '분석 데이터 없음')}>
                      <BrainCircuit className="w-5 h-5" /> 맞춤형 솔루션 제안 보기
                    </button>
                  </div>
                </div>
              </div>

              {/* My Deals Widget */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">나의 딜 목록 (진행 중)</h2>
                    <button onClick={() => setActiveTab('deals')} className="text-sm font-medium text-blue-600 hover:text-blue-800">전체 보기</button>
                </div>
                <div className="divide-y divide-gray-200">
                  {deals.filter(d => d.stage !== 'closed').slice(0, 5).map(deal => (
                    <div key={deal.id} onClick={() => handleDealClick(deal)} className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{deal.name}</p>
                        <p className="text-sm text-gray-500">{deal.company}</p>
                      </div>
                      <div className="w-48 text-right">
                        <p className="font-semibold text-gray-800">{formatCurrency(deal.amount)}</p>
                        <div className="flex items-center justify-end gap-2 mt-1">
                           <span className={`w-2 h-2 rounded-full ${PIPELINE_STAGES.find(s => s.id === deal.stage)?.color}`}></span>
                           <span className="text-sm text-gray-500">{PIPELINE_STAGES.find(s => s.id === deal.stage)?.name}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 ml-4" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">파이프라인 현황</h2>
                <div className="flex justify-around items-end h-48 pt-4 border-t border-gray-100">
                  {PIPELINE_STAGES.map(stage => {
                    const stageDeals = deals.filter(d => d.stage === stage.id);
                    const stageValue = stageDeals.reduce((sum, d) => sum + d.amount, 0);
                    const maxStageValue = Math.max(...PIPELINE_STAGES.map(s => deals.filter(d => d.stage === s.id).reduce((sum, d) => sum + d.amount, 0)));
                    const barHeight = maxStageValue > 0 ? (stageValue / maxStageValue) * 100 : 0;
                    return (
                      <div key={stage.id} className="flex flex-col items-center w-1/5">
                        <div className="text-sm font-medium text-gray-900">{formatCurrency(stageValue)}</div>
                        <div className="text-sm text-gray-400 mb-2">{stageDeals.length}건</div>
                        <div className={`w-8 rounded-t-lg ${stage.color}`} style={{ height: `${barHeight}%` }}>
                        </div>
                        <div className="text-sm text-gray-600 mt-2">{stage.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Leads */}
          {activeTab === 'leads' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">리드 관리</h1>
                <button onClick={() => setShowLeadModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">
                  <Plus className="w-5 h-5" /> 리드 추가
                </button>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden overflow-x-auto shadow-sm">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      {['이름', '예상 점수', '회사', '연락처', '소스', '상태', '액션'].map(h => (
                        <th key={h} className={`text-left px-4 py-3 font-medium text-gray-500 uppercase tracking-wider ${h === '예상 점수' ? 'text-center' : ''}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {leads.map(lead => (
                      <tr key={lead.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleLeadClick(lead)}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-medium text-blue-700">{lead.name[0]}</div>
                            <span className="font-medium text-gray-900">{lead.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <BrainCircuit className={`w-4 h-4 ${lead.score > 80 ? 'text-green-500' : lead.score > 60 ? 'text-amber-500' : 'text-gray-400'}`} />
                            <span className={`font-bold ${lead.score > 80 ? 'text-green-600' : lead.score > 60 ? 'text-amber-600' : 'text-gray-600'}`}>
                              {lead.score}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600"><Building2 className="w-4 h-4 inline mr-1.5" />{lead.company}</td>
                        <td className="px-4 py-3 text-gray-500">
                          <div className="flex items-center gap-1.5"><Mail className="w-4 h-4" />{lead.email}</div>
                          <div className="flex items-center gap-1.5 mt-1"><Phone className="w-4 h-4" />{lead.phone}</div>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{lead.source}</td>
                        <td className="px-4 py-3">
                          <span className={`text-sm px-2.5 py-1 rounded-full font-medium ${lead.status === 'new' ? 'bg-blue-100 text-blue-700' : lead.status === 'contacted' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                            {lead.status === 'new' ? '신규' : lead.status === 'contacted' ? '접촉 완료' : '적격'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={(e) => { e.stopPropagation(); handleOpenConvertModal(lead); }} className="font-medium text-blue-600 hover:text-blue-800 flex items-center">
                            전환 <ChevronRight className="w-4 h-4 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Deals Pipeline */}
          {activeTab === 'deals' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">딜 파이프라인</h1>
                <button onClick={() => setShowDealModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">
                  <Plus className="w-5 h-5" /> 딜 추가
                </button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 min-w-full">
                {PIPELINE_STAGES.map(stage => (
                  <div key={stage.id} className="flex-shrink-0 w-72 bg-gray-100 rounded-xl p-3" onDragOver={handleDragOver} onDrop={() => handleDrop(stage.id)}>
                    <div className="flex items-center justify-between mb-3 px-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${stage.color}`} />
                        <span className="font-bold text-gray-800">{stage.name}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-500">{deals.filter(d => d.stage === stage.id).length}</span>
                    </div>
                    <div className="space-y-3 h-full">
                      {deals.filter(d => d.stage === stage.id).map(deal => (
                        <div key={deal.id} draggable onDragStart={() => handleDragStart(deal)} onClick={() => handleDealClick(deal)} className="bg-white rounded-lg p-3 border border-gray-200 cursor-pointer hover:shadow-lg active:cursor-grabbing shadow-sm">
                          <div className="flex items-start justify-between mb-2">
                            <span className="font-semibold text-gray-900">{deal.name}</span>
                            <GripVertical className="w-4 h-4 text-gray-400" />
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-2">
                            <Building2 className="w-4 h-4" />{deal.company}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-blue-600">{formatCurrency(deal.amount)}</span>
                            <span className="text-sm text-gray-400 flex items-center gap-1"><Calendar className="w-4 h-4" />{deal.closeDate}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Calendar */}
          {activeTab === 'calendar' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">일정 관리</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-100"><ChevronLeft className="w-5 h-5" /></button>
                    <span className="text-xl font-semibold w-32 text-center">{`${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`}</span>
                    <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-100"><ChevronRight className="w-5 h-5" /></button>
                  </div>
                  <button onClick={() => handleOpenMeetingModal(new Date())} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">
                    <Plus className="w-5 h-5" /> 미팅 추가
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="grid grid-cols-7 text-center font-medium text-gray-500 border-b">
                  {['일', '월', '화', '수', '목', '금', '토'].map(day => <div key={day} className="py-3">{day}</div>)}
                </div>
                <div className="grid grid-cols-7">
                  {renderCalendar()}
                </div>
              </div>
            </div>
          )}
          {/* Coming Soon Pages */}
          {['customers', 'automation', 'sms', 'personal-settings'].includes(activeTab) && (
            <ComingSoonPlaceholder tabName={activeTab} />
          )}

          {/* Notes Tab */}
          {activeTab === 'notes' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">노트</h1>
              </div>
              {notes.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                  <StickyNote className="w-12 h-12 mx-auto text-gray-300" />
                  <h3 className="mt-4 text-lg font-semibold text-gray-800">저장된 노트가 없습니다.</h3>
                  <p className="mt-1 text-gray-500">'일정 관리' 탭의 AI 미팅 어시스턴트에서 미팅 요약을 저장해보세요.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {notes.map(note => (
                    <div key={note.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col">
                      <h3 className="font-bold text-gray-800">{note.title}</h3>
                      <p className="text-xs text-gray-400 mt-1 mb-3">{note.date}</p>
                      <p className="text-sm text-gray-600 flex-grow">{note.content.substring(0, 150)}{note.content.length > 150 ? '...' : ''}</p>
                      {note.relatedToName && (
                        <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
                          <p>연관 항목: <span className="font-medium text-blue-600">{note.relatedToName}</span></p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Email Tab */}
          {activeTab === 'email' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">이메일 작성</h1>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">받는 사람</label>
                    <input type="email" value={emailData.to} onChange={e => setEmailData({...emailData, to: e.target.value})} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">제목</label>
                    <input type="text" value={emailData.subject} onChange={e => setEmailData({...emailData, subject: e.target.value})} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">내용</label>
                    <textarea value={emailData.body} onChange={e => setEmailData({...emailData, body: e.target.value})} rows="12" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"></textarea>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center gap-2"><Send className="w-4 h-4" /> 보내기</button>
                </div>
              </div>
            </div>
          )}

          {/* Company Settings */}
          {activeTab === 'company-settings' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">회사 설정</h1>
              <p className="text-gray-600 mb-6">CRM에서 사용할 데이터 필드를 관리합니다.</p>

              <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex gap-6">
                  {[{id: 'leads', name: '데이터 필드'}, {id: 'knowledge', name: '지식 베이스'}].map(tab => (
                    <button key={tab.id} onClick={() => { setSettingsSubTab(tab.id); setShowNewFieldForm(false); }}
                      className={`py-3 px-1 text-sm font-medium ${settingsSubTab === tab.id || (settingsSubTab !== 'knowledge' && tab.id === 'fields') ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              {['leads', 'deals', 'customers', 'fields'].includes(settingsSubTab) && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">데이터 필드 설정</h2>
                    <div className="border-b border-gray-200">
                      <nav className="-mb-px flex gap-6">
                        {[{id: 'leads', name: '리드'}, {id: 'deals', name: '딜'}, {id: 'customers', name: '고객'}].map(tab => (
                          <button key={tab.id} onClick={() => { setSettingsSubTab(tab.id); setShowNewFieldForm(false); }}
                            className={`py-3 px-1 text-sm font-medium ${settingsSubTab === tab.id ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                            {tab.name}
                          </button>
                        ))}
                      </nav>
                    </div>
                  </div>

                  <div className="p-6">
                    <ul className="space-y-3">
                      {dataFields[settingsSubTab].map(field => (
                        <li key={field.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <FieldTypeIcon type={field.type} />
                            <span className="font-medium text-gray-800">{field.label}</span>
                            <span className="text-sm text-gray-500">{fieldTypeNames[field.type]}</span>
                          </div>
                          {field.removable ? (
                            <button onClick={() => handleDeleteField(field.id)} className="text-gray-400 hover:text-red-500">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          ) : (
                            <span className="text-xs text-gray-400 font-medium bg-gray-200 px-2 py-0.5 rounded-full">기본 필드</span>
                          )}
                        </li>
                      ))}
                    </ul>

                    {showNewFieldForm && (
                      <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <h3 className="font-semibold mb-3">새 필드 추가</h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <input type="text" value={newFieldDetails.label} onChange={e => setNewFieldDetails({...newFieldDetails, label: e.target.value})}
                            className="flex-grow border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="필드 이름" />
                          <select value={newFieldDetails.type} onChange={e => setNewFieldDetails({...newFieldDetails, type: e.target.value})}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="text">텍스트</option>
                            <option value="number">숫자</option>
                            <option value="date">날짜</option>
                            <option value="select">선택</option>
                          </select>
                          <button onClick={handleAddNewField} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">저장</button>
                          <button onClick={() => setShowNewFieldForm(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium">취소</button>
                        </div>
                      </div>
                    )}

                    {!showNewFieldForm && <button onClick={() => setShowNewFieldForm(true)} className="mt-4 flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800"><Plus className="w-4 h-4" /> 새 필드 추가</button>}
                  </div>
                </div>
              )}

              {settingsSubTab === 'knowledge' && (
                <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">데이터 소스 연결</h2>
                  <p className="text-gray-500 mb-6">자사 웹사이트, 기술 명세서 등의 링크를 등록하여 AI가 학습할 데이터 소스로 활용하세요.</p>
                  
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={knowledgeLink} 
                        onChange={e => setKnowledgeLink(e.target.value)}
                        className="flex-grow border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="https://..." 
                        disabled={isSyncing}
                      />
                      <button 
                        onClick={handleSyncKnowledge} 
                        disabled={isSyncing || !knowledgeLink}
                        className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed w-40"
                      >
                        {isSyncing ? <><Loader className="w-5 h-5 animate-spin" /> 동기화 중...</> : '동기화 시작'}
                      </button>
                    </div>
                    {syncComplete && (
                      <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                        <CheckCircle className="w-5 h-5" />
                        <p className="font-medium">동기화가 성공적으로 완료되었습니다. AI가 {syncedData.length}개의 새로운 정보를 학습했습니다.</p>
                      </div>
                    )}

                    {syncedData.length > 0 && (
                      <div className="border-t border-gray-200 pt-6 mt-6">
                        <h3 className="text-md font-semibold text-gray-800 mb-4">학습된 데이터 ({syncedData.length}개)</h3>
                        <div className="space-y-3">
                          {syncedData.map(item => (
                            <div key={item.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-gray-500" />
                                <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline text-sm">{item.title}</a>
                              </div>
                              <p className="text-gray-500 text-sm mt-1 pl-6">{item.snippet}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Lead Modal */}
      {showLeadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">새 리드 추가</h2>
              <button onClick={() => setShowLeadModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              <input type="text" value={newLead.name} onChange={e => setNewLead({...newLead, name: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="이름 *" />
              <input type="text" value={newLead.company} onChange={e => setNewLead({...newLead, company: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="회사 *" />
              <input type="email" value={newLead.email} onChange={e => setNewLead({...newLead, email: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="이메일" />
              <input type="text" value={newLead.industry} onChange={e => setNewLead({...newLead, industry: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="산업군" />
              <input type="text" value={newLead.website} onChange={e => setNewLead({...newLead, website: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="웹사이트" />
              <input type="text" value={newLead.address} onChange={e => setNewLead({...newLead, address: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="주소" />
              <input type="tel" value={newLead.phone} onChange={e => setNewLead({...newLead, phone: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="전화번호" />
              <select value={newLead.source} onChange={e => setNewLead({...newLead, source: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {['웹사이트', '소개', '컨퍼런스', '콜드콜', '광고'].map(s => <option key={s}>{s}</option>)}
              </select>
              <button onClick={handleAddLead} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">추가하기</button>
            </div>
          </div>
        </div>
      )}

      {/* Deal Modal */}
      {showDealModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">새 딜 추가</h2>
              <button onClick={() => setShowDealModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              <input type="text" value={newDeal.name} onChange={e => setNewDeal({...newDeal, name: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="딜 이름 *" />
              <input type="text" value={newDeal.company} onChange={e => setNewDeal({...newDeal, company: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="회사 *" />
              <input type="number" value={newDeal.amount} onChange={e => setNewDeal({...newDeal, amount: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="금액 (원) *" />
              <input type="text" value={newDeal.contact} onChange={e => setNewDeal({...newDeal, contact: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="담당자" />
              <input type="text" value={newDeal.industry} onChange={e => setNewDeal({...newDeal, industry: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="산업군" />
              <input type="text" value={newDeal.website} onChange={e => setNewDeal({...newDeal, website: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="웹사이트" />
              <input type="text" value={newDeal.address} onChange={e => setNewDeal({...newDeal, address: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="주소" />
              <input type="date" value={newDeal.closeDate} onChange={e => setNewDeal({...newDeal, closeDate: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button onClick={handleAddDeal} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">추가하기</button>
            </div>
          </div>
        </div>
      )}

      {/* Deal Detail Modal */}
      {selectedDeal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">딜 상세 정보</h2>
              <button onClick={() => setSelectedDeal(null)}><X className="w-5 h-5 text-gray-400 hover:text-gray-600" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">딜 이름</div>
                <p className="font-semibold text-gray-800 mt-1">{selectedDeal.name}</p>
              </div>
              <div className="border-t pt-3">
                <div className="text-sm text-gray-500">회사</div>
                <p className="text-gray-800 flex items-center gap-2 mt-1"><Building2 className="w-4 h-4 text-gray-400" /> {selectedDeal.company}</p>
              </div>
              <div className="border-t pt-3">
                <div className="text-sm text-gray-500">산업군</div>
                <p className="text-gray-800 flex items-center gap-2 mt-1"><Briefcase className="w-4 h-4 text-gray-400" /> {selectedDeal.industry || '미입력'}</p>
              </div>
              <div className="border-t pt-3">
                <div className="text-sm text-gray-500">웹사이트</div>
                <a href={selectedDeal.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-2 mt-1"><Link className="w-4 h-4 text-gray-400" /> {selectedDeal.website || '미입력'}</a>
              </div>
              <div className="border-t pt-3">
                <div className="text-sm text-gray-500">주소</div>
                <p className="text-gray-800 flex items-center gap-2 mt-1"><MapPin className="w-4 h-4 text-gray-400" /> {selectedDeal.address || '미입력'}</p>
              </div>
              <div className="border-t pt-3">
                <div className="text-sm text-gray-500">금액</div>
                <p className="text-gray-800 flex items-center gap-2 mt-1"><DollarSign className="w-4 h-4 text-gray-400" /> {formatCurrency(selectedDeal.amount)}</p>
              </div>
              <div className="border-t pt-3">
                <div className="text-sm text-gray-500">담당자</div>
                <p className="text-gray-800 flex items-center gap-2 mt-1"><User className="w-4 h-4 text-gray-400" /> {selectedDeal.contact || '미지정'}</p>
              </div>
              <div className="border-t pt-3">
                <div className="text-sm text-gray-500">예상 마감일</div>
                <p className="text-gray-800 flex items-center gap-2 mt-1"><Calendar className="w-4 h-4 text-gray-400" /> {selectedDeal.closeDate}</p>
              </div>
              <div className="border-t pt-3">
                <div className="text-sm text-gray-500">현재 단계</div>
                <p className="text-gray-800 flex items-center gap-2 mt-1">
                  <span className={`w-3 h-3 rounded-full ${PIPELINE_STAGES.find(s => s.id === selectedDeal.stage)?.color}`}></span>
                  {PIPELINE_STAGES.find(s => s.id === selectedDeal.stage)?.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">리드 상세 정보</h2>
              <button onClick={() => setSelectedLead(null)}><X className="w-5 h-5 text-gray-400 hover:text-gray-600" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">이름</div>
                <p className="font-semibold text-gray-800 mt-1">{selectedLead.name}</p>
              </div>
              <div className="border-t pt-3">
                <div className="text-sm text-gray-500">AI 예상 점수</div>
                <div className="flex items-center gap-2 mt-1">
                  <BrainCircuit className={`w-5 h-5 ${selectedLead.score > 80 ? 'text-green-500' : selectedLead.score > 60 ? 'text-amber-500' : 'text-gray-400'}`} />
                  <p className={`font-bold text-lg ${selectedLead.score > 80 ? 'text-green-600' : selectedLead.score > 60 ? 'text-amber-600' : 'text-gray-600'}`}>
                    {selectedLead.score}점
                  </p>
                </div>
              </div>
              <div className="border-t pt-3">
                <div className="text-sm text-gray-500">회사</div>
                <p className="text-gray-800 flex items-center gap-2 mt-1"><Building2 className="w-4 h-4 text-gray-400" /> {selectedLead.company}</p>
              </div>
              <div className="border-t pt-3">
                <div className="text-sm text-gray-500">산업군</div>
                <p className="text-gray-800 flex items-center gap-2 mt-1"><Briefcase className="w-4 h-4 text-gray-400" /> {selectedLead.industry || '미입력'}</p>
              </div>
              <div className="border-t pt-3">
                <div className="text-sm text-gray-500">웹사이트</div>
                <a href={selectedLead.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-2 mt-1"><Link className="w-4 h-4 text-gray-400" /> {selectedLead.website || '미입력'}</a>
              </div>
              <div className="border-t pt-3">
                <div className="text-sm text-gray-500">주소</div>
                <p className="text-gray-800 flex items-center gap-2 mt-1"><MapPin className="w-4 h-4 text-gray-400" /> {selectedLead.address || '미입력'}</p>
              </div>
              <div className="border-t pt-3">
                <div className="text-sm text-gray-500">연락처</div>
                <div className="text-gray-800 space-y-1 mt-1 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" /> {selectedLead.email || '미입력'}</p>
                  </div>
                  {selectedLead.email && (
                    <a href={`mailto:${selectedLead.email}`} className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-100 font-medium text-sm">
                      <Send className="w-4 h-4" /> 이메일 보내기
                    </a>
                  )}
                  <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" /> {selectedLead.phone || '미입력'}</p>
                </div>
              </div>
              <div className="border-t pt-3">
                <div className="text-sm text-gray-500">소스</div>
                <p className="text-gray-800 mt-1">{selectedLead.source}</p>
              </div>
              <div className="border-t pt-3">
                <div className="text-sm text-gray-500">상태</div>
                <p className="mt-1">
                  <span className={`text-sm px-2.5 py-1 rounded-full font-medium ${selectedLead.status === 'new' ? 'bg-blue-100 text-blue-700' : selectedLead.status === 'contacted' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                    {selectedLead.status === 'new' ? '신규' : selectedLead.status === 'contacted' ? '접촉 완료' : '적격'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Insight Customer Modal */}
      {selectedInsightCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <BrainCircuit className="w-6 h-6 text-blue-600" />
                AI 인사이트: {selectedInsightCustomer.company}
              </h2>
              <button onClick={() => setSelectedInsightCustomer(null)}><X className="w-5 h-5 text-gray-400 hover:text-gray-600" /></button>
            </div>
            <div className="space-y-5">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-gray-600 mb-1">관련 뉴스</p>
                <p className="text-gray-800">"LNG·LPG 동절기 무관세…이차전지·반도체 핵심원료 관세 인하 확대"</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">💡 왜 긍정적인가요?</h3>
                <p className="text-gray-600 bg-green-50 p-3 rounded-md border border-green-200">
                  해당 고객은 <span className="font-bold text-green-800">{selectedInsightCustomer.industry}</span> 업체로, 반도체 핵심 원료에 대한 관세 인하 혜택을 통해 원가 경쟁력을 높일 수 있습니다. 이는 신규 투자나 생산량 증대로 이어질 수 있는 긍정적인 신호입니다.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">🚀 다음 행동 추천</h3>
                <div className="space-y-2">
                  <div className="p-3 rounded-md bg-blue-50 border border-blue-200">
                    <p className="font-medium text-blue-800">솔루션 제안</p>
                    <p className="text-sm text-blue-700">원가 절감 효과를 기반으로 한 새로운 솔루션 (예: 고효율 생산 라인, 스마트 팩토리 업그레이드)을 제안하는 이메일을 보내보세요.</p>
                  </div>
                  <div className="p-3 rounded-md bg-blue-50 border border-blue-200">
                    <p className="font-medium text-blue-800">관계 형성</p>
                    <p className="text-sm text-blue-700">관련 내용을 언급하며 안부차 연락하여 고객의 현재 상황과 향후 계획을 파악해보세요.</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button onClick={() => { setSelectedInsightCustomer(null); handleDealClick(selectedInsightCustomer); }} className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 font-medium">상세 정보 보기</button>
                <button onClick={() => handleDraftEmailFromInsight(selectedInsightCustomer)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"><Send className="w-4 h-4" /> 이메일 보내기</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Tech Stack Suggestion Modal */}
      {showTechStackSuggestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <BrainCircuit className="w-6 h-6 text-purple-600" />
                AI 솔루션 제안: {techStackAnalysisCompany}
              </h2>
              <button onClick={() => setShowTechStackSuggestion(false)}><X className="w-5 h-5 text-gray-400 hover:text-gray-600" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2 text-lg">💡 영업 기회</h3>
                <div className="space-y-3">
                  {techStackData.map((stack, index) => (
                    <div key={index} className="bg-green-50 p-3 rounded-md border border-green-200">
                      <p className="font-semibold text-green-800">{stack.category}</p>
                      <p className="text-sm text-green-700">{stack.insight}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2 text-lg">🚀 다음 행동 추천</h3>
                <div className="space-y-3">
                   <div className="p-3 rounded-md bg-blue-50 border border-blue-200">
                    <p className="font-medium text-blue-800">맞춤형 제안서 발송</p>
                    <p className="text-sm text-blue-700">분석된 기술 스택 기반으로, 경쟁사 솔루션 대비 강점 또는 상호 보완 가능한 점을 강조한 제안서 작성 및 발송</p>
                  </div>
                  <div className="p-3 rounded-md bg-blue-50 border border-blue-200">
                    <p className="font-medium text-blue-800">기술 컨설팅 미팅 주선</p>
                    <p className="text-sm text-blue-700">고객사의 현재 기술적 과제를 해결할 수 있는 구체적인 방안을 논의하기 위한 기술 컨설팅 미팅 제안</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button onClick={handleDraftEmailFromTechStack} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"><Send className="w-4 h-4" /> 이메일 초안 작성</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lead to Deal Conversion Modal */}
      {showConvertModal && leadToConvert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">리드를 딜로 전환</h2>
              <button onClick={() => setShowConvertModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">{leadToConvert.name}</span> ({leadToConvert.company}) 리드를 새로운 딜로 전환합니다.
            </p>
            <div className="space-y-4">
              <input type="text" value={conversionDealDetails.name} 
                onChange={e => setConversionDealDetails({...conversionDealDetails, name: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="딜 이름 *" />
              
              <input type="number" value={conversionDealDetails.amount} 
                onChange={e => setConversionDealDetails({...conversionDealDetails, amount: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="금액 (원)" />

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">파이프라인 단계</label>
                <select value={conversionDealDetails.stage} 
                  onChange={e => setConversionDealDetails({...conversionDealDetails, stage: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {PIPELINE_STAGES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              <button onClick={handleConfirmConversion} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">전환하기</button>
            </div>
          </div>
        </div>
      )}

      {/* Meeting Modal */}
      {showMeetingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">새 미팅 추가</h2>
              <button onClick={() => setShowMeetingModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              {selectedDate && <p className="font-medium bg-gray-100 p-2 rounded-md text-center">{`${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`}</p>}
              <input type="text" value={newMeeting.title} onChange={e => setNewMeeting({...newMeeting, title: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="미팅 제목 *" />
              
              <div className="border-t pt-4">
                <label className="text-sm font-medium text-gray-700 mb-1 block">연관 항목</label>
                <div className="flex gap-2">
                  <select value={newMeeting.relatedToType} onChange={e => handleRelatedItemChange(e.target.value, null)}
                    className="w-1/3 border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="none">없음</option>
                    <option value="lead">리드</option>
                    <option value="deal">딜</option>
                  </select>
                  {newMeeting.relatedToType === 'lead' && (
                    <select value={newMeeting.relatedToId || ''} onChange={e => handleRelatedItemChange('lead', e.target.value)}
                      className="w-2/3 border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">리드 선택...</option>
                      {leads.map(l => <option key={l.id} value={l.id}>{l.name} ({l.company})</option>)}
                    </select>
                  )}
                  {newMeeting.relatedToType === 'deal' && (
                    <select value={newMeeting.relatedToId || ''} onChange={e => handleRelatedItemChange('deal', e.target.value)}
                      className="w-2/3 border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">딜 선택...</option>
                      {deals.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <input type="time" value={newMeeting.time} onChange={e => setNewMeeting({...newMeeting, time: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-400" />
                <input type="text" value={newMeeting.attendees} onChange={e => setNewMeeting({...newMeeting, attendees: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="참석자 (쉼표로 구분)" />
              </div>
              <button onClick={handleAddMeeting} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">저장하기</button>
            </div>
          </div>
        </div>
      )}

      {/* AI Meeting Assistant Modal */}
      {activeMeeting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <BrainCircuit className="w-6 h-6 text-blue-600" />
                AI 미팅 어시스턴트
              </h2>
              <button onClick={() => setActiveMeeting(null)}><X className="w-5 h-5 text-gray-400 hover:text-gray-600" /></button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left: Meeting Info & Actions */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800">{activeMeeting.title}</h3>
                  <p className="text-sm text-gray-500">{activeMeeting.date} {activeMeeting.time}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">🤔 필드 완성을 위한 추천 질문</h4>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    <li>어떤 산업 분야에서 사업을 운영하고 계신가요? (산업군)</li>
                    <li>참고할 만한 회사 웹사이트가 있으신가요? (웹사이트)</li>
                    <li>이번 프로젝트의 예상 예산 규모는 어느 정도로 생각하시나요? (금액)</li>
                  </ul>
                </div>

                <div className="text-center pt-4">
                  {!isRecording && meetingStep !== 'analysis' && (
                    <button onClick={startRecording} className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 font-bold flex items-center gap-2 mx-auto">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div> 녹음 시작
                    </button>
                  )}
                  {isRecording && (
                     <button onClick={stopRecording} className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 font-bold flex items-center gap-2 mx-auto">
                      <div className="w-3 h-3 bg-red-500 rounded-sm"></div> 녹음 종료
                    </button>
                  )}
                </div>
              </div>

              {/* Middle: Transcript & Field Matching */}
              <div className="bg-gray-50/70 p-4 rounded-lg space-y-4 md:col-span-1">
                {isLoading && meetingStep === 'analysis' && (
                  <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                    <Loader className="w-8 h-8 animate-spin text-blue-600" />
                    <p className="mt-3">AI가 미팅 내용을 분석 중입니다...</p>
                  </div>
                )}

                {!isLoading && meetingStep !== 'analysis' && (
                   <div className="flex items-center justify-center h-full text-center text-gray-500">
                    <p>{isRecording ? '미팅 내용이 녹음되고 있습니다...' : '녹음 시작 시 스크립트 및 분석 결과가 표시됩니다.'}</p>
                  </div>
                )}


                {meetingStep === 'analysis' && !isLoading && (
                  <>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">📄 미팅 기록 (스크립트)</h4>
                      <div className="text-sm text-gray-600 bg-white p-3 rounded-md max-h-32 overflow-y-auto border">
                        {meetingTranscript}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">🤖 AI 필드 자동 매칭</h4>
                      <div className="space-y-2">
                        {Object.entries(suggestedFields).map(([key, value]) => (
                          <div key={key}>
                            <label className="text-xs font-medium text-gray-500 capitalize">{key}</label>
                            <input 
                              type="text" 
                              value={value}
                              onChange={(e) => setSuggestedFields(prev => ({...prev, [key]: e.target.value}))}
                              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-end gap-3 mt-4">
                        <button onClick={() => setActiveMeeting(null)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 font-medium">취소</button>
                        <button onClick={handleSaveMeetingFields} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" /> 필드 저장
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Right: Summary & Next Actions */}
              <div className="bg-gray-50/70 p-4 rounded-lg space-y-4 md:col-span-1">
                <h4 className="font-semibold text-gray-700 mb-2">📝 AI 요약 및 할 일 추천</h4>
                {meetingStep !== 'analysis' || isLoading && !meetingSummary ? (
                  <div className="flex items-center justify-center h-full text-center text-gray-500">
                    <p>미팅 분석 완료 후 AI 요약이 표시됩니다.</p>
                  </div>
                ) : (
                  <>
                    {!meetingSummary && !isLoading && (
                      <div className="text-center py-10">
                        <button onClick={handleAnalyzeMeeting} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 font-medium flex items-center gap-2 mx-auto">
                          <BrainCircuit className="w-5 h-5" /> 요약 및 할 일 추천받기
                        </button>
                      </div>
                    )}
                    {isLoading && !meetingSummary && (
                       <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                        <Loader className="w-8 h-8 animate-spin text-purple-600" />
                        <p className="mt-3">AI가 요약 및 할 일을 생성 중입니다...</p>
                      </div>
                    )}
                    {meetingSummary && (
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-semibold text-gray-600 text-sm mb-1">미팅 요약 (편집 가능)</h5>
                          <textarea 
                            value={meetingSummary}
                            onChange={(e) => setMeetingSummary(e.target.value)}
                            rows="6"
                            className="w-full text-sm bg-white p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>
                        <div><h5 className="font-semibold text-gray-600 text-sm mb-1">다음 할 일 (Next Actions)</h5><ul className="text-sm list-disc list-inside space-y-1 bg-white p-3 rounded-md border">{nextActions.map(action => <li key={action.id}>{action.text}</li>)}</ul></div>
                        <div className="text-right">
                          <button onClick={handleSaveNoteFromMeeting} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-medium flex items-center gap-2 ml-auto">
                            <StickyNote className="w-4 h-4" /> 노트에 저장
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
