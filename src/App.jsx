import React, { useState } from 'react';
import { Plus, User, Building2, DollarSign, Phone, Mail, Calendar, ChevronRight, X, GripVertical, TrendingUp, Users, Target } from 'lucide-react';

const PIPELINE_STAGES = [
  { id: 'contact', name: '첫 접촉', color: 'bg-slate-500' },
  { id: 'meeting', name: '미팅 진행', color: 'bg-blue-500' },
  { id: 'proposal', name: '제안서 발송', color: 'bg-purple-500' },
  { id: 'negotiation', name: '협상 중', color: 'bg-amber-500' },
  { id: 'closed', name: '계약 완료', color: 'bg-green-500' }
];

const INITIAL_LEADS = [
  { id: 1, name: '김영희', company: '테크스타트', email: 'kim@techstart.kr', phone: '010-1234-5678', status: 'new', source: '웹사이트' },
  { id: 2, name: '이철수', company: '그로우업', email: 'lee@growup.co.kr', phone: '010-2345-6789', status: 'contacted', source: '소개' },
  { id: 3, name: '박지민', company: '데이터랩', email: 'park@datalab.io', phone: '010-3456-7890', status: 'qualified', source: '컨퍼런스' },
];

const INITIAL_DEALS = [
  { id: 1, name: '테크스타트 연간 계약', company: '테크스타트', amount: 12000000, stage: 'proposal', contact: '김영희', closeDate: '2024-02-15' },
  { id: 2, name: '그로우업 파일럿', company: '그로우업', amount: 3000000, stage: 'meeting', contact: '이철수', closeDate: '2024-02-28' },
  { id: 3, name: '데이터랩 엔터프라이즈', company: '데이터랩', amount: 50000000, stage: 'negotiation', contact: '박지민', closeDate: '2024-03-10' },
  { id: 4, name: '클라우드원 스타터', company: '클라우드원', amount: 5000000, stage: 'contact', contact: '최수진', closeDate: '2024-03-20' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [deals, setDeals] = useState(INITIAL_DEALS);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showDealModal, setShowDealModal] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', company: '', email: '', phone: '', source: '웹사이트' });
  const [newDeal, setNewDeal] = useState({ name: '', company: '', amount: '', stage: 'contact', contact: '', closeDate: '' });
  const [draggedDeal, setDraggedDeal] = useState(null);

  const formatCurrency = (amount) => new Intl.NumberFormat('ko-KR').format(amount) + '원';

  const totalPipelineValue = deals.reduce((sum, deal) => sum + deal.amount, 0);
  const closedDealsValue = deals.filter(d => d.stage === 'closed').reduce((sum, deal) => sum + deal.amount, 0);

  const handleAddLead = () => {
    if (newLead.name && newLead.company) {
      setLeads([...leads, { ...newLead, id: Date.now(), status: 'new' }]);
      setNewLead({ name: '', company: '', email: '', phone: '', source: '웹사이트' });
      setShowLeadModal(false);
    }
  };

  const handleAddDeal = () => {
    if (newDeal.name && newDeal.company && newDeal.amount) {
      setDeals([...deals, { ...newDeal, id: Date.now(), amount: parseInt(newDeal.amount) }]);
      setNewDeal({ name: '', company: '', amount: '', stage: 'contact', contact: '', closeDate: '' });
      setShowDealModal(false);
    }
  };

  const handleDragStart = (deal) => setDraggedDeal(deal);
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (stageId) => {
    if (draggedDeal) {
      setDeals(deals.map(d => d.id === draggedDeal.id ? { ...d, stage: stageId } : d));
      setDraggedDeal(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-sm">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <Target className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">SalesMap</span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Demo</span>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-44 bg-white border-r border-gray-200 min-h-screen p-3">
          <nav className="space-y-1">
            {[
              { id: 'dashboard', name: '대시보드', icon: TrendingUp },
              { id: 'leads', name: '리드', icon: Users },
              { id: 'deals', name: '딜 파이프라인', icon: Target },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div>
              <h1 className="text-xl font-bold text-gray-900 mb-4">대시보드</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">총 리드</p>
                      <p className="text-lg font-bold text-gray-900 mt-1">{leads.length}</p>
                    </div>
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">진행 중 딜</p>
                      <p className="text-lg font-bold text-gray-900 mt-1">{deals.filter(d => d.stage !== 'closed').length}</p>
                    </div>
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Target className="w-4 h-4 text-purple-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">파이프라인 총액</p>
                      <p className="text-lg font-bold text-gray-900 mt-1">{formatCurrency(totalPipelineValue)}</p>
                    </div>
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-amber-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">계약 완료</p>
                      <p className="text-lg font-bold text-green-600 mt-1">{formatCurrency(closedDealsValue)}</p>
                    </div>
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h2 className="font-semibold text-gray-900 mb-3">파이프라인 현황</h2>
                <div className="space-y-2">
                  {PIPELINE_STAGES.map(stage => {
                    const stageDeals = deals.filter(d => d.stage === stage.id);
                    const stageValue = stageDeals.reduce((sum, d) => sum + d.amount, 0);
                    const pct = totalPipelineValue > 0 ? (stageValue / totalPipelineValue) * 100 : 0;
                    return (
                      <div key={stage.id} className="flex items-center gap-3">
                        <div className="w-20 text-xs text-gray-600">{stage.name}</div>
                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                          <div className={`${stage.color} h-2 rounded-full`} style={{ width: `${pct}%` }} />
                        </div>
                        <div className="w-8 text-xs text-gray-400 text-right">{stageDeals.length}건</div>
                        <div className="w-24 text-xs font-medium text-gray-900 text-right">{formatCurrency(stageValue)}</div>
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
                <h1 className="text-xl font-bold text-gray-900">리드 관리</h1>
                <button onClick={() => setShowLeadModal(true)} className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 text-sm">
                  <Plus className="w-4 h-4" /> 리드 추가
                </button>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      {['이름', '회사', '연락처', '소스', '상태', '액션'].map(h => (
                        <th key={h} className="text-left px-3 py-2 text-xs font-medium text-gray-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {leads.map(lead => (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-700">{lead.name[0]}</div>
                            <span className="font-medium text-gray-900">{lead.name}</span>
                          </div>
                        </td>
                        <td className="px-3 py-2 text-gray-600"><Building2 className="w-3 h-3 inline mr-1" />{lead.company}</td>
                        <td className="px-3 py-2 text-xs text-gray-500">
                          <div><Mail className="w-3 h-3 inline mr-1" />{lead.email}</div>
                          <div><Phone className="w-3 h-3 inline mr-1" />{lead.phone}</div>
                        </td>
                        <td className="px-3 py-2 text-gray-600">{lead.source}</td>
                        <td className="px-3 py-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${lead.status === 'new' ? 'bg-blue-100 text-blue-700' : lead.status === 'contacted' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                            {lead.status === 'new' ? '신규' : lead.status === 'contacted' ? '접촉 완료' : '적격'}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <button onClick={() => { setLeads(leads.filter(l => l.id !== lead.id)); }} className="text-xs text-blue-600 hover:text-blue-800">
                            전환 <ChevronRight className="w-3 h-3 inline" />
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
                <h1 className="text-xl font-bold text-gray-900">딜 파이프라인</h1>
                <button onClick={() => setShowDealModal(true)} className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 text-sm">
                  <Plus className="w-4 h-4" /> 딜 추가
                </button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {PIPELINE_STAGES.map(stage => (
                  <div key={stage.id} className="flex-shrink-0 w-56 bg-gray-100 rounded-xl p-2" onDragOver={handleDragOver} onDrop={() => handleDrop(stage.id)}>
                    <div className="flex items-center gap-2 mb-2 px-1">
                      <div className={`w-2 h-2 rounded-full ${stage.color}`} />
                      <span className="font-medium text-gray-700 text-xs">{stage.name}</span>
                      <span className="text-xs text-gray-400 ml-auto">{deals.filter(d => d.stage === stage.id).length}</span>
                    </div>
                    <div className="space-y-2">
                      {deals.filter(d => d.stage === stage.id).map(deal => (
                        <div key={deal.id} draggable onDragStart={() => handleDragStart(deal)} className="bg-white rounded-lg p-2 border border-gray-200 cursor-grab hover:shadow-md active:cursor-grabbing">
                          <div className="flex items-start justify-between mb-1">
                            <span className="font-medium text-gray-900 text-xs">{deal.name}</span>
                            <GripVertical className="w-3 h-3 text-gray-300" />
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                            <Building2 className="w-3 h-3" />{deal.company}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-blue-600 text-xs">{formatCurrency(deal.amount)}</span>
                            <span className="text-xs text-gray-400"><Calendar className="w-3 h-3 inline mr-1" />{deal.closeDate}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Lead Modal */}
      {showLeadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-5 w-full max-w-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-900">새 리드 추가</h2>
              <button onClick={() => setShowLeadModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="space-y-3">
              <input type="text" value={newLead.name} onChange={e => setNewLead({...newLead, name: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="이름 *" />
              <input type="text" value={newLead.company} onChange={e => setNewLead({...newLead, company: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="회사 *" />
              <input type="email" value={newLead.email} onChange={e => setNewLead({...newLead, email: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="이메일" />
              <input type="tel" value={newLead.phone} onChange={e => setNewLead({...newLead, phone: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="전화번호" />
              <select value={newLead.source} onChange={e => setNewLead({...newLead, source: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
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
          <div className="bg-white rounded-xl p-5 w-full max-w-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-900">새 딜 추가</h2>
              <button onClick={() => setShowDealModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="space-y-3">
              <input type="text" value={newDeal.name} onChange={e => setNewDeal({...newDeal, name: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="딜 이름 *" />
              <input type="text" value={newDeal.company} onChange={e => setNewDeal({...newDeal, company: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="회사 *" />
              <input type="number" value={newDeal.amount} onChange={e => setNewDeal({...newDeal, amount: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="금액 (원) *" />
              <input type="text" value={newDeal.contact} onChange={e => setNewDeal({...newDeal, contact: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="담당자" />
              <input type="date" value={newDeal.closeDate} onChange={e => setNewDeal({...newDeal, closeDate: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button onClick={handleAddDeal} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">추가하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
