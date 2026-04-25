import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Mail,
  User,
  Zap,
  X,
  RefreshCw,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

import api from "../api/axios";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const LeadTable = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
  });

  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [campaign, setCampaign] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchLeads = async (page = 1) => {
    setLoading(true);

    try {
      const [leadsRes, campaignRes] = await Promise.all([
        api.get(`/campaigns/${id}/leads?page=${page}&limit=10`),
        api.get(`/campaigns/${id}`),
      ]);

      setLeads(leadsRes.data.leads || []);
      setPagination(
        leadsRes.data.pagination || {
          page: 1,
          pages: 1,
          total: 0,
        },
      );
      setCampaign(campaignRes.data);
    } catch (err) {
      console.error(
        "Failed to fetch leads:",
        err.response?.data || err.message,
      );
      alert("Failed to fetch leads.");
    } finally {
      setLoading(false);
    }
  };

  const handleLeadClick = async (lead) => {
    try {
      setSelectedLead(lead);

      const response = await api.get(`/campaigns/${id}/leads/${lead._id}`);

      setSelectedLead(response.data);
    } catch (err) {
      console.error(
        "Failed to fetch latest lead data:",
        err.response?.data || err.message,
      );
    }
  };

  const handleGenerateEmails = async () => {
    setGenerating(true);

    try {
      const res = await api.post(`/campaigns/${id}/generate`);

      const results = Array.isArray(res.data)
        ? res.data
        : res.data.results || [];

      const successCount = results.filter((item) => item.success).length;
      const failedCount = results.filter((item) => !item.success).length;

      if (successCount === 0 && failedCount === 0) {
        alert("No pending leads found to process.");
      } else if (successCount === 0 && failedCount > 0) {
        alert(`Generation failed for ${failedCount} leads. Check console.`);
      } else {
        alert(`Successfully generated ${successCount} AI emails!`);

        // Refresh latest leads from DB so table can show Ready
        await fetchLeads(pagination.page);
      }
    } catch (err) {
      console.error("Generation failed:", err.response?.data || err.message);

      alert(
        "Generation failed: " + (err.response?.data?.message || err.message),
      );
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [id]);

  const filteredLeads = leads.filter((lead) => {
    const term = searchTerm.toLowerCase();

    return (
      lead.name?.toLowerCase().includes(term) ||
      lead.email?.toLowerCase().includes(term) ||
      lead.niche?.toLowerCase().includes(term)
    );
  });

  const hasGeneratedEmail = (lead) => {
    return Boolean(
      lead.generatedEmail &&
      (lead.generatedEmail.body || lead.generatedEmail.subject),
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-slate-600 transition-all shadow-sm"
          >
            <ChevronLeft size={24} />
          </button>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {campaign?.name || "Campaign Leads"}
            </h1>
            <p className="text-slate-500">
              Manage and view your imported leads
            </p>
          </div>
        </div>

        {/* AI Strategy Panel */}
        {campaign?.strategy ? (
          <Card className="mb-8 p-6 bg-linear-to-br from-blue-50 to-indigo-50 border-blue-100 shadow-xl shadow-blue-500/5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-blue-900 flex items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center mr-3">
                  <Zap size={18} fill="currentColor" />
                </div>
                AI Campaign Strategy
              </h2>

              <div className="px-3 py-1 bg-white/50 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600 border border-blue-100">
                Llama 3 Optimized
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-black text-blue-600 uppercase tracking-tighter mb-3">
                    Messaging Pillars
                  </h3>

                  <div className="space-y-2">
                    {campaign.strategy.messaging_pillars?.map(
                      (pillar, index) => (
                        <div
                          key={index}
                          className="flex items-start bg-white/60 p-3 rounded-xl border border-blue-100/50"
                        >
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 mr-3 shrink-0" />
                          <p className="text-slate-700 text-sm leading-snug">
                            {pillar}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-black text-blue-600 uppercase tracking-tighter mb-2">
                    Target Audience ICP
                  </h3>

                  <p className="text-slate-700 text-sm leading-relaxed bg-white/40 p-4 rounded-xl border border-blue-100/30">
                    {campaign.strategy.audience_icp}
                  </p>
                </div>

                <div className="flex gap-8">
                  <div>
                    <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">
                      Brand Voice
                    </h4>
                    <p className="text-sm font-bold text-slate-700">
                      {campaign.strategy.tone_profile}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">
                      Primary Goal
                    </h4>
                    <p className="text-sm font-bold text-slate-700">
                      {campaign.strategy.cta_type}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="mb-8 p-6 bg-slate-50 border-slate-200 border-dashed">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-slate-400 italic">
                <Zap size={18} className="mr-2" />
                No AI Strategy found for this campaign. Try creating a new one!
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate("/create-campaign")}
              >
                Create New Campaign
              </Button>
            </div>
          </Card>
        )}

        {/* Lead Table Card */}
        <Card className="flex flex-col">
          {/* Table Actions */}
          <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 md:justify-between md:items-center bg-white">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="relative w-full sm:w-72">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                />
              </div>

              <Button
                size="sm"
                onClick={handleGenerateEmails}
                disabled={loading || generating}
              >
                {generating ? (
                  <>
                    <RefreshCw size={16} className="mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap size={16} className="mr-2" />
                    Generate AI Emails
                  </>
                )}
              </Button>
            </div>

            <div className="text-sm text-slate-500 font-medium">
              Total Leads:{" "}
              <span className="text-slate-900">{pagination.total}</span>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Domain/Niche</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">AI Draft</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 bg-white">
                {loading ? (
                  Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <tr key={index} className="animate-pulse">
                        <td colSpan="5" className="px-6 py-8">
                          <div className="h-4 bg-slate-100 rounded w-full" />
                        </td>
                      </tr>
                    ))
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-20 text-center text-slate-400"
                    >
                      No leads found in this campaign.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead._id}
                      className={`hover:bg-slate-50 transition-colors group cursor-pointer ${
                        hasGeneratedEmail(lead)
                          ? "border-l-4 border-l-green-500"
                          : ""
                      }`}
                      onClick={() => handleLeadClick(lead)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                            <User size={16} />
                          </div>

                          <span className="font-medium text-slate-900">
                            {lead.name || "—"}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-xs font-medium text-slate-500 uppercase">
                          {lead.niche || "other"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {lead.email || "—"}
                      </td>

                      <td className="px-6 py-4">
                        {hasGeneratedEmail(lead) ? (
                          <div className="flex items-center text-green-600 font-medium">
                            <Zap size={14} className="mr-1" />
                            Ready
                          </div>
                        ) : (
                          <span className="text-slate-400">Pending</span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                            lead.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {lead.status || "pending"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === 1 || loading}
              onClick={() => fetchLeads(pagination.page - 1)}
            >
              <ChevronLeft size={16} className="mr-1" />
              Previous
            </Button>

            <div className="text-xs text-slate-500 font-medium">
              Page {pagination.page} of {pagination.pages}
            </div>

            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === pagination.pages || loading}
              onClick={() => fetchLeads(pagination.page + 1)}
            >
              Next
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Email Preview Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                  <Mail size={20} />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Personalized AI Draft
                  </h3>

                  <p className="text-[10px] text-slate-400 font-mono">
                    ID: {selectedLead._id}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleLeadClick(selectedLead)}
                  className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                  title="Refresh Data"
                >
                  <RefreshCw size={18} />
                </button>

                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-slate-600 transition-all shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest">
                  Subject Line
                </label>

                <p className="text-xl font-bold text-slate-900 leading-tight">
                  {selectedLead.generatedEmail?.subject ||
                    "No Subject Drafted Yet"}
                </p>
              </div>

              <div className="h-px bg-slate-100" />

              <div className="space-y-1">
                <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest">
                  Email Body
                </label>

                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
                  <ReactMarkdown>
                    {selectedLead.generatedEmail?.body ||
                      "The AI is still drafting this email. Please click Generate if you have not already."}
                  </ReactMarkdown>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setSelectedLead(null)}>
                Close Preview
              </Button>

              <Button disabled={!hasGeneratedEmail(selectedLead)}>
                <Zap size={16} className="mr-2" />
                Use This Draft
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadTable;
