import { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { 
  LayoutDashboard, 
  Users, 
  CalendarDays, 
  Settings, 
  LogOut, 
  Menu, 
  ChevronLeft,
  Bell,
  Search,
  Star,
  TrendingUp,
  Mail,
  Phone,
  HelpCircle,
  UploadCloud,
  FileVideo,
  Image as ImageIcon,
  Loader2,
  Trash2,
  X,
  Coffee,
  Plus,
  ChefHat
} from "lucide-react";

import CafeAdmin from "@/components/admin/CafeAdmin";
import BanquetMenuAdmin from "@/components/admin/BanquetMenuAdmin";
import { apiGet, apiPost, apiPut, apiDelete, apiCall } from "@/lib/api";
import { getMinioUrl } from "@/lib/minioUrl";

interface AdminData {
  username: string;
}

const ContactSettingsCard = () => {
  const [formData, setFormData] = useState({ address: "", phone: "", email: "", workingHours: "" });
  const [loading, setLoading] = useState(false);
  const { data, refetch } = useQuery({
    queryKey: ['contactSettings'],
    queryFn: async () => {
      const json = await apiGet("/settings/contact");
      return json.data;
    }
  });

  useEffect(() => {
    if (data) {
      setFormData({
        address: data.address || "",
        phone: data.phone || "",
        email: data.email || "",
        workingHours: data.workingHours || ""
      });
    }
  }, [data]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const json = await apiPut("/settings/admin/contact", formData);
      if (json.success) {
        toast.success("Contact settings updated!");
        refetch();
      } else {
        toast.error("Failed to update contact settings");
      }
    } catch {
      toast.error("Network error");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
      <h2 className="text-xl font-bold text-charcoal mb-1">Contact Details</h2>
      <p className="text-sm text-gray-500 mb-6">Update the global contact information displayed across the site.</p>
      
      <div className="space-y-4 flex-1">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Address</label>
          <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl mt-1 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</label>
          <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl mt-1 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</label>
          <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl mt-1 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Working Hours</label>
          <input type="text" value={formData.workingHours} onChange={e => setFormData({...formData, workingHours: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl mt-1 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all" />
        </div>
      </div>
      
      <button onClick={handleSave} disabled={loading} className="w-full mt-6 bg-charcoal text-white py-3 rounded-xl font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2">
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

const InlineTestimonialCard = ({ testimonial, onRefetch }: { testimonial: any, onRefetch: () => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ 
    text: testimonial.text, 
    name: testimonial.name, 
    role: testimonial.role 
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!formData.text || !formData.name || !formData.role) return;
    setLoading(true);
    try {
      await apiPut(`/testimonials/admin/${testimonial._id}`, formData);
      toast.success("Updated!");
      setIsEditing(false);
      onRefetch();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await apiDelete(`/testimonials/admin/${testimonial._id}`);
      toast.success("Deleted");
      onRefetch();
    } catch {}
  };

  if (!isEditing) {
    return (
      <div className="p-6 border border-gray-100 rounded-2xl bg-white hover:border-gold/30 hover:shadow-md transition-all relative group flex flex-col h-full">
        <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => setIsEditing(true)} className="p-2 text-gray-400 hover:text-gold hover:bg-gold/10 rounded-xl transition-colors">
            <Settings className="w-4 h-4" />
          </button>
          <button onClick={handleDelete} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm italic text-gray-600 mb-6 leading-relaxed flex-1">"{testimonial.text}"</p>
        <div className="pt-4 border-t border-gray-50 mt-auto">
          <p className="text-sm font-bold text-charcoal leading-none">{testimonial.name}</p>
          <p className="text-[11px] text-gray-400 mt-1 uppercase font-semibold tracking-wider">{testimonial.role}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 border-2 border-gold/30 rounded-2xl bg-white shadow-xl relative flex flex-col gap-4">
      <div>
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Review Content</label>
        <textarea 
          rows={3}
          value={formData.text} 
          onChange={e => setFormData({...formData, text: e.target.value})}
          className="w-full p-3 border border-gray-100 rounded-xl mt-1 text-sm focus:border-gold outline-none bg-gray-50/50"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Client Name</label>
          <input 
            type="text" 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full p-2.5 border border-gray-100 rounded-xl mt-1 text-sm focus:border-gold outline-none bg-gray-50/50"
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Role/Event</label>
          <input 
            type="text" 
            value={formData.role} 
            onChange={e => setFormData({...formData, role: e.target.value})}
            className="w-full p-2.5 border border-gray-100 rounded-xl mt-1 text-sm focus:border-gold outline-none bg-gray-50/50"
          />
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <button 
          onClick={handleSave} 
          disabled={loading}
          className="flex-1 bg-gold text-charcoal py-2.5 rounded-xl font-bold text-sm hover:shadow-lg transition-all"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
        <button onClick={() => setIsEditing(false)} className="flex-1 bg-gray-50 text-gray-500 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all">
          Cancel
        </button>
      </div>
    </div>
  );
};

const TestimonialsSettingsCard = () => {
  const { data: testimonials, refetch } = useQuery({
    queryKey: ['adminTestimonials'],
    queryFn: async () => {
      const json = await apiGet("/testimonials");
      return json.data;
    }
  });

  const [adding, setAdding] = useState(false);

  const handleAddNew = async () => {
    setAdding(true);
    try {
      await apiPost("/testimonials/admin", { 
        text: "Double click to edit and add your client's wonderful feedback here.", 
        name: "Client Name", 
        role: "Event Type" 
      });
      toast.success("New testimonial placeholder added!");
      refetch();
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full lg:col-span-2">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-xl font-bold text-charcoal mb-1">Client Testimonials</h2>
          <p className="text-sm text-gray-500">Manage all client feedback. Click the gear icon on any card to edit.</p>
        </div>
        <button 
          onClick={handleAddNew}
          disabled={adding}
          className="bg-gold text-charcoal px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:shadow-lg hover:shadow-gold/20 transition-all border border-gold"
        >
          <Plus className="w-4 h-4" /> {adding ? "Creating..." : "Add New Review"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials?.map((t: any) => (
          <InlineTestimonialCard key={t._id} testimonial={t} onRefetch={refetch} />
        ))}
        {testimonials?.length === 0 && !adding && (
          <div className="col-span-full py-16 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
            <p className="text-gray-400 font-medium">No testimonials yet. Add your first client review!</p>
          </div>
        )}
      </div>
    </div>
  );
};

const InlineStatCard = ({ stat, onRefetch }: { stat: any, onRefetch: () => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ value: stat.value, label: stat.label, suffix: stat.suffix || "" });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await apiPut(`/stats/admin/${stat._id}`, { ...formData, value: Number(formData.value) });
      toast.success("Updated!");
      setIsEditing(false);
      onRefetch();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this statistic?")) return;
    try {
      await apiDelete(`/stats/admin/${stat._id}`);
      toast.success("Deleted");
      onRefetch();
    } catch {}
  };

  if (!isEditing) {
    return (
      <div className="p-5 border border-gray-100 rounded-2xl bg-white hover:border-gold/30 hover:shadow-md transition-all relative group text-center flex flex-col justify-center min-h-[120px]">
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => setIsEditing(true)} className="p-1.5 text-gray-400 hover:text-gold hover:bg-gold/10 rounded-lg transition-colors">
            <Settings className="w-3.5 h-3.5" />
          </button>
          <button onClick={handleDelete} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
        <h4 className="text-3xl font-bold text-charcoal leading-none mb-1">{stat.value}{stat.suffix}</h4>
        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-tight px-2">{stat.label}</p>
      </div>
    );
  }

  return (
    <div className="p-5 border-2 border-gold/30 rounded-2xl bg-white shadow-lg relative flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase">Value</label>
          <input 
            type="number" 
            value={formData.value} 
            onChange={e => setFormData({...formData, value: e.target.value})}
            className="w-full p-2 border border-gray-100 rounded-lg text-sm focus:border-gold outline-none"
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase">Suffix</label>
          <input 
            type="text" 
            value={formData.suffix} 
            onChange={e => setFormData({...formData, suffix: e.target.value})}
            className="w-full p-2 border border-gray-100 rounded-lg text-sm focus:border-gold outline-none"
            placeholder="+"
          />
        </div>
      </div>
      <div>
        <label className="text-[10px] font-bold text-gray-400 uppercase">Label</label>
        <input 
          type="text" 
          value={formData.label} 
          onChange={e => setFormData({...formData, label: e.target.value})}
          className="w-full p-2 border border-gray-100 rounded-lg text-sm focus:border-gold outline-none"
        />
      </div>
      <div className="flex gap-2 pt-1">
        <button 
          onClick={handleSave} 
          disabled={loading}
          className="flex-1 bg-gold text-charcoal py-2 rounded-lg font-bold text-xs hover:shadow-md transition-all"
        >
          {loading ? "..." : "Save"}
        </button>
        <button onClick={() => setIsEditing(false)} className="flex-1 bg-gray-50 text-gray-500 py-2 rounded-lg font-bold text-xs hover:bg-gray-100 transition-all">
          Cancel
        </button>
      </div>
    </div>
  );
};

const StatsSettingsCard = () => {
  const { data: stats, refetch } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const json = await apiGet("/stats");
      return json.data;
    }
  });

  const [adding, setAdding] = useState(false);

  const handleAddNew = async () => {
    setAdding(true);
    try {
      await apiPost("/stats/admin", { value: 0, label: "New Statistic", suffix: "" });
      toast.success("New stat added!");
      refetch();
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full lg:col-span-2">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-charcoal mb-1">Company Statistics</h2>
          <p className="text-sm text-gray-500">Edit values and labels directly on the cards below.</p>
        </div>
        <button 
          onClick={handleAddNew}
          disabled={adding}
          className="bg-gold text-charcoal px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:shadow-lg hover:shadow-gold/20 transition-all"
        >
          <Plus className="w-4 h-4" /> {adding ? "Creating..." : "Add New"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats?.map((s: any) => (
          <InlineStatCard key={s._id} stat={s} onRefetch={refetch} />
        ))}
        {stats?.length === 0 && !adding && (
          <div className="col-span-full py-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-400">No statistics found. Click "Add New" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ContactMessagesAdmin = () => {
  const { data: messages, refetch, isLoading } = useQuery({
    queryKey: ['adminMessages'],
    queryFn: async () => {
      const json = await apiGet("/messages/admin");
      return json.data;
    }
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      await apiDelete(`/messages/admin/${id}`);
      toast.success("Message deleted");
      refetch();
    } catch {}
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    try {
      const nextStatus = currentStatus === 'unread' ? 'read' : 'unread';
      await apiPut(`/messages/admin/${id}`, { status: nextStatus });
      refetch();
    } catch {}
  };

  if (isLoading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-gold" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-charcoal">Contact Inquiries</h2>
        <div className="bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm text-sm font-semibold text-gray-500">
          Total: {messages?.length || 0}
        </div>
      </div>

      <div className="grid gap-4">
        {messages?.map((msg: any) => (
          <div key={msg._id} className={`p-6 border rounded-2xl transition-all ${msg.status === 'unread' ? 'bg-white border-gold shadow-md shadow-gold/5' : 'bg-gray-50/50 border-gray-100'}`}>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`w-2 h-2 rounded-full ${msg.status === 'unread' ? 'bg-gold' : 'bg-gray-300'}`} />
                  <h3 className="font-bold text-charcoal">{msg.name}</h3>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-gray-100 text-gray-400 font-bold uppercase tracking-widest">{msg.eventType}</span>
                  <span className="text-[10px] text-gray-400 ml-auto">{new Date(msg.createdAt).toLocaleString()}</span>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Mail className="w-3.5 h-3.5 text-gold" /> {msg.email}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Phone className="w-3.5 h-3.5 text-gold" /> {msg.phone || 'N/A'}
                  </div>
                </div>

                <div className="bg-white/50 p-4 rounded-xl border border-gray-50 text-sm text-gray-600 leading-relaxed italic">
                  "{msg.message}"
                </div>
              </div>

              <div className="flex md:flex-col gap-2 shrink-0">
                <button 
                  onClick={() => handleToggleStatus(msg._id, msg.status)}
                  className={`flex-1 md:w-28 px-4 py-2 rounded-xl text-xs font-bold transition-all ${msg.status === 'unread' ? 'bg-gold text-charcoal' : 'bg-white text-gray-400 border border-gray-100 hover:border-gold hover:text-gold'}`}
                >
                  {msg.status === 'unread' ? 'Mark Read' : 'Unread'}
                </button>
                <button 
                  onClick={() => handleDelete(msg._id)}
                  className="px-4 py-2 bg-white text-red-400 border border-gray-100 rounded-xl text-xs font-bold hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {messages?.length === 0 && (
          <div className="py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <Mail className="w-12 h-12 text-gray-100 mx-auto mb-4" />
            <p className="text-gray-400 font-medium">No contact messages received yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const InlineFAQCard = ({ faq, onRefetch }: { faq: any, onRefetch: () => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ 
    question: faq.question, 
    answer: faq.answer 
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!formData.question || !formData.answer) return;
    setLoading(true);
    try {
      await apiPut(`/faqs/admin/${faq._id}`, formData);
      toast.success("Updated!");
      setIsEditing(false);
      onRefetch();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this FAQ?")) return;
    try {
      await apiDelete(`/faqs/admin/${faq._id}`);
      toast.success("Deleted");
      onRefetch();
    } catch {}
  };

  if (!isEditing) {
    return (
      <div className="p-6 border border-gray-100 rounded-2xl bg-white hover:border-gold/30 hover:shadow-md transition-all relative group flex flex-col">
        <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => setIsEditing(true)} className="p-2 text-gray-400 hover:text-gold hover:bg-gold/10 rounded-xl transition-colors">
            <Settings className="w-4 h-4" />
          </button>
          <button onClick={handleDelete} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <h3 className="font-bold text-charcoal mb-3 pr-10">{faq.question}</h3>
        <p className="text-sm text-gray-500 leading-relaxed italic line-clamp-2">"{faq.answer}"</p>
      </div>
    );
  }

  return (
    <div className="p-6 border-2 border-gold/30 rounded-2xl bg-white shadow-xl relative flex flex-col gap-4">
      <div>
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Question</label>
        <input 
          type="text" 
          value={formData.question} 
          onChange={e => setFormData({...formData, question: e.target.value})}
          className="w-full p-2.5 border border-gray-100 rounded-xl mt-1 text-sm focus:border-gold outline-none bg-gray-50/50"
        />
      </div>
      <div>
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Answer</label>
        <textarea 
          rows={3}
          value={formData.answer} 
          onChange={e => setFormData({...formData, answer: e.target.value})}
          className="w-full p-3 border border-gray-100 rounded-xl mt-1 text-sm focus:border-gold outline-none bg-gray-50/50"
        />
      </div>
      <div className="flex gap-2 pt-2">
        <button 
          onClick={handleSave} 
          disabled={loading}
          className="flex-1 bg-gold text-charcoal py-2.5 rounded-xl font-bold text-sm hover:shadow-lg transition-all"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
        <button onClick={() => setIsEditing(false)} className="flex-1 bg-gray-50 text-gray-500 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all">
          Cancel
        </button>
      </div>
    </div>
  );
};

const FAQsAdmin = () => {
  const { data: faqs, refetch, isLoading } = useQuery({
    queryKey: ['adminFaqs'],
    queryFn: async () => {
      const json = await apiGet("/faqs");
      return json.data;
    }
  });

  const [adding, setAdding] = useState(false);

  const handleAddNew = async () => {
    setAdding(true);
    try {
      await apiPost("/faqs/admin", { 
        question: "New FAQ Question?", 
        answer: "Add your helpful answer here." 
      });
      toast.success("New FAQ placeholder added!");
      refetch();
    } finally {
      setAdding(false);
    }
  };

  if (isLoading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-gold" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-charcoal">Frequently Asked Questions</h2>
          <p className="text-sm text-gray-500 mt-1">Manage the accordion content visible on the contact page.</p>
        </div>
        <button 
          onClick={handleAddNew}
          disabled={adding}
          className="bg-gold text-charcoal px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:shadow-lg hover:shadow-gold/20 transition-all border border-gold"
        >
          <Plus className="w-4 h-4" /> {adding ? "Creating..." : "Add FAQ"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs?.map((f: any) => (
          <InlineFAQCard key={f._id} faq={f} onRefetch={refetch} />
        ))}
        {faqs?.length === 0 && !adding && (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <HelpCircle className="w-12 h-12 text-gray-100 mx-auto mb-4" />
            <p className="text-gray-400 font-medium">No FAQs yet. Add your first helpful answer!</p>
          </div>
        )}
      </div>
    </div>
  );
};

const GalleryAdminCard = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [category, setCategory] = useState("Venues");
  const [prefixTitle, setPrefixTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: images, refetch } = useQuery({
    queryKey: ['adminGalleryImages'],
    queryFn: async () => {
      const json = await apiGet("/gallery");
      return json.data;
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFiles(Array.from(e.target.files));
    }
  };

  const clearFiles = () => {
    setFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!files.length) return toast.error("Please select files first");
    setUploading(true);
    const formData = new FormData();
    files.forEach(file => formData.append("images", file));
    formData.append("category", category);
    formData.append("prefixTitle", prefixTitle || category);

    try {
      const response = await apiCall("/gallery/admin/upload", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (response.ok && data.success) {
        toast.success(data.message);
        clearFiles();
        setPrefixTitle("");
        refetch();
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    try {
      await apiDelete(`/gallery/admin/${id}`);
      toast.success("Image deleted");
      refetch();
    } catch {
      toast.error("Network error");
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-charcoal mb-2">Gallery Management</h1>
        <p className="text-gray-500">Bulk upload and manage images for the public gallery.</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-charcoal mb-4">Bulk Upload Images</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none">
              <option value="Venues">Venues</option>
              <option value="Weddings">Weddings</option>
              <option value="Corporate">Corporate</option>
              <option value="Parties">Parties</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Image Title (Base)</label>
            <input type="text" value={prefixTitle} placeholder="e.g. Dream Wedding (will auto-append 1, 2, 3...)" onChange={e => setPrefixTitle(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none" />
          </div>
        </div>

        <div 
          className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer"
          onClick={() => !files.length && fileInputRef.current?.click()}
        >
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple accept="image/jpeg,image/png,image/webp" />
          {files.length > 0 ? (
            <div className="flex flex-col items-center gap-3">
              <ImageIcon className="h-12 w-12 text-gold" />
              <p className="font-medium text-charcoal">{files.length} file(s) selected</p>
              <button onClick={(e) => { e.stopPropagation(); clearFiles(); }} className="mt-2 text-sm text-red-500 hover:text-red-600 flex items-center gap-1">
                <X className="h-4 w-4" /> Clear Selection
              </button>
            </div>
          ) : (
             <div className="flex flex-col items-center gap-3">
              <UploadCloud className="h-12 w-12 text-gray-300" />
              <p className="font-medium text-charcoal">Click to multi-select images</p>
            </div>
          )}
        </div>

        <button onClick={handleUpload} disabled={!files.length || uploading} className={`w-full mt-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${!files.length ? "bg-gray-100 text-gray-400 cursor-not-allowed" : uploading ? "bg-gold/80 text-charcoal cursor-wait" : "bg-gold text-charcoal hover:shadow-lg hover:shadow-gold/20"}`}>
          {uploading ? "Uploading..." : "Upload Images"}
        </button>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-charcoal mb-4">Current Gallery</h2>
        {!images || images.length === 0 ? (
          <p className="text-gray-500 text-sm">No images in gallery yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img: any) => (
              <div key={img._id} className="relative group rounded-xl overflow-hidden aspect-square border border-gray-200">
                <img src={getMinioUrl(img.url)} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2 text-center">
                  <p className="text-white text-xs font-semibold">{img.title}</p>
                  <span className="text-[10px] bg-gold text-charcoal px-2 py-0.5 rounded-full">{img.category}</span>
                  <button onClick={() => handleDelete(img._id)} className="mt-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  
  // Upload State
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Fetch current banner preview
  const { data: currentBanner, refetch: refetchBanner } = useQuery({
    queryKey: ['currentBanner'],
    queryFn: async () => {
      const json = await apiGet("/banner/current");
      return json.data;
    }
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      try {
        const data = await apiGet("/auth/verify");
        if (data.isValid) {
          setAdmin(data.admin);
        } else {
          localStorage.removeItem("adminToken");
          toast.error("Session expired. Please login again.");
          navigate("/login");
        }
      } catch (err) {
        navigate("/login");
      }
    };

    verifyToken();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Max 50MB check client side
      if (selectedFile.size > 50 * 1024 * 1024) {
        toast.error("File is too large. Max 50MB.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a file first");
    
    setUploading(true);
    const formData = new FormData();
    formData.append("media", file);

    try {
      const response = await apiCall("/banner/admin/upload", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      
      if (response.ok && data.success) {
        toast.success("Landing page banner successfully updated!");
        clearFile();
        refetchBanner();
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch (error) {
      toast.error("Failed to connect to the server for upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteBanner = async () => {
    if (!confirm("Are you sure you want to permanently delete the live hero banner? This action cannot be undone.")) return;
    
    try {
      const data = await apiDelete("/banner/admin");
      if (data.success) {
        toast.success("Banner securely deleted from servers!");
        refetchBanner();
      } else {
        toast.error(data.message || "Failed to delete banner");
      }
    } catch {
      toast.error("Network error");
    }
  };

  if (!admin) {
    return null;
  }

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: ImageIcon, label: "Gallery" },
    { icon: Coffee, label: "Cafe" },
    { icon: ChefHat, label: "Food Menu" },
    { icon: CalendarDays, label: "Bookings" },
    { icon: Mail, label: "Contact Us" },
    { icon: HelpCircle, label: "FAQs" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen flex bg-[#f8f9fa] font-body selection:bg-gold/20">
      {/* Sidebar */}
      <aside 
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } bg-charcoal text-gray-300 transition-all duration-300 ease-in-out flex flex-col relative z-20 shadow-2xl`}
      >
        {/* Brand Area */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
          <div className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'} transition-opacity duration-300`}>
            <Star className="h-6 w-6 text-gold fill-gold/20 flex-shrink-0" />
            <span className="text-lg font-heading font-bold text-white whitespace-nowrap">Star Admin</span>
          </div>
          {isCollapsed && (
             <Star className="h-6 w-6 text-gold fill-gold/20 absolute left-1/2 -translate-x-1/2" />
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeTab === item.label;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(item.label)}
                className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? "bg-gold text-charcoal shadow-md shadow-gold/20" 
                    : "hover:bg-white/5 hover:text-white"
                }`}
                title={item.label}
              >
                <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-charcoal" : "text-gray-400 group-hover:text-gold"} transition-colors`} />
                {!isCollapsed && (
                  <span className={`font-medium whitespace-nowrap ${isActive ? "text-charcoal" : ""}`}>
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Collapse Toggle */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-4 top-24 bg-white border border-gray-100 shadow-sm text-charcoal rounded-full p-1.5 hover:text-gold hover:scale-110 transition-all z-30"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>

        {/* User / Logout */}
        <div className="p-4 border-t border-white/10 shrink-0">
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-colors ${
              isCollapsed ? "justify-center" : "justify-start"
            }`}
            title="Logout"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium whitespace-nowrap">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] flex items-center justify-between px-8 z-30 sticky top-0">
          <div className="flex items-center gap-4 w-96">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search bookings, users..." 
                className="w-full pl-10 pr-4 py-2 bg-[#f8f9fa] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-sm"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:text-charcoal transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-gold rounded-full ring-2 ring-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <div className="h-9 w-9 bg-charcoal rounded-full flex items-center justify-center shadow-inner shrink-0">
                <span className="text-gold font-bold text-sm">{admin.username.charAt(0).toUpperCase()}</span>
              </div>
              <div className="hidden sm:block text-sm">
                <p className="font-semibold text-charcoal leading-none mb-1">{admin.username}</p>
                <p className="text-gray-400 text-xs">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {(() => {
              switch(activeTab) {
                case "Dashboard":
                  return (
                    <>
                      {/* Page Title */}
                      <div>
                        <h1 className="text-3xl font-heading font-bold text-charcoal mb-2">Overview</h1>
                        <p className="text-gray-500">Welcome back, here's what's happening at Star Banquet today.</p>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                          { label: "Total Revenue", value: "$45,231", trend: "+12.5%", color: "text-green-500" },
                          { label: "Active Bookings", value: "32", trend: "+4.2%", color: "text-green-500" },
                          { label: "Pending Inquiries", value: "14", trend: "-2.1%", color: "text-red-500" },
                          { label: "Customer Satisfaction", value: "4.9/5", trend: "+0.1%", color: "text-green-500" },
                        ].map((stat, i) => (
                          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gold/30 transition-all group">
                            <p className="text-sm font-medium text-gray-500 mb-2">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-charcoal mb-3 group-hover:text-gold transition-colors">{stat.value}</h3>
                            <div className="flex items-center gap-2">
                              <TrendingUp className={`h-4 w-4 ${stat.color} bg-${stat.color.split('-')[1]}-50 p-0.5 rounded-full`} />
                              <span className={`text-sm font-semibold ${stat.color}`}>{stat.trend}</span>
                              <span className="text-xs text-gray-400 font-medium ml-1">vs last month</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Main Panels */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Chart / Main Activity */}
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
                          <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-charcoal">Revenue Pipeline</h2>
                            <button className="text-sm py-1.5 px-4 bg-gray-50 text-charcoal font-medium rounded-lg hover:bg-gold hover:text-charcoal transition-colors">View Report</button>
                          </div>
                          <div className="h-72 w-full bg-gray-50/50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center text-gray-400 group hover:bg-gray-50 transition-colors cursor-pointer">
                            <p className="flex items-center gap-2"><TrendingUp className="h-5 w-5 group-hover:text-gold transition-colors" /> Chart Component Area</p>
                          </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                          <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-charcoal">Recent Activity</h2>
                          </div>
                          <div className="space-y-6">
                            {[
                              { user: "Sarah J.", action: "booked the Grand Hall", time: "2 hours ago" },
                              { user: "Michael T.", action: "paid the deposit", time: "5 hours ago" },
                              { user: "Emma W.", action: "cancelled inquiry", time: "1 day ago" },
                              { user: "David L.", action: "requested catering menu", time: "2 days ago" },
                            ].map((act, i) => (
                              <div key={i} className="flex gap-4 group cursor-pointer">
                                <div className="relative">
                                  <div className="h-10 w-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/10 group-hover:border-gold/30 transition-colors z-10 relative">
                                    <Users className="h-4 w-4 text-gray-400 group-hover:text-gold transition-colors" />
                                  </div>
                                  {i !== 3 && <div className="absolute top-10 bottom-[-24px] left-1/2 w-[2px] bg-gray-50 -translate-x-1/2 z-0"></div>}
                                </div>
                                <div className="pt-1">
                                  <p className="text-sm text-gray-600"><span className="font-semibold text-charcoal group-hover:text-gold transition-colors">{act.user}</span> {act.action}</p>
                                  <p className="text-xs text-gray-400 mt-1 font-medium">{act.time}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                case "Gallery":
                  return <GalleryAdminCard />;
                case "Cafe":
                  return <CafeAdmin />;
                case "Food Menu":
                  return <BanquetMenuAdmin />;
                case "Bookings":
                  return <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center"><CalendarDays className="h-16 w-16 text-gray-200 mb-4" /><h2 className="text-xl font-bold text-charcoal mb-2">Bookings Module</h2><p className="text-gray-500 max-w-sm">This module is currently under development.</p></div>;
                case "Contact Us":
                  return <ContactMessagesAdmin />;
                case "FAQs":
                  return <FAQsAdmin />;
                case "Settings":
                  return (
                    <>
                      {/* Page Title */}
                      <div className="mb-6">
                        <h1 className="text-3xl font-heading font-bold text-charcoal mb-2">Platform Settings</h1>
                        <p className="text-gray-500">Manage your landing page assets and main configuration.</p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Banner Upload Card */}
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 relative">
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <h2 className="text-xl font-bold text-charcoal mb-1">Landing Page Banner</h2>
                              <p className="text-sm text-gray-500">Upload a high-quality video or image for the main hero banner. Max size: 50MB.</p>
                            </div>
                            {currentBanner && (
                              <button onClick={handleDeleteBanner} title="Delete live banner" className="flex-shrink-0 text-red-500 hover:bg-red-50 p-2.5 rounded-xl transition-colors border border-red-100 shadow-sm cursor-pointer group">
                                <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                              </button>
                            )}
                          </div>

                          {/* Current Banner Preview */}
                          {currentBanner && (
                            <div className="mb-6 pb-6 border-b border-gray-200">
                              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-3">Currently Live Banner</label>
                              <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-100 border border-gray-200 group">
                                {currentBanner.mediaType === 'video' && currentBanner.useVideoBackground ? (
                                  <video 
                                    src={getMinioUrl(currentBanner.mediaUrl)} 
                                    className="w-full h-full object-cover" 
                                    controls 
                                  />
                                ) : (
                                  <img 
                                    src={getMinioUrl(currentBanner.mediaUrl)} 
                                    alt="Live banner" 
                                    className="w-full h-full object-cover" 
                                  />
                                )}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                  <span className="text-xs bg-gold/90 text-charcoal px-3 py-1 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                    Click upload below to replace
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}

                          <div 
                            className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer group"
                            onClick={() => !file && fileInputRef.current?.click()}
                          >
                            <input 
                              type="file" 
                              ref={fileInputRef} 
                              onChange={handleFileChange} 
                              className="hidden" 
                              accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime"
                            />
                            
                            {file ? (
                              <div className="flex flex-col items-center gap-3">
                                {file.type.startsWith("video") ? (
                                  <FileVideo className="h-12 w-12 text-gold" />
                                ) : (
                                  <ImageIcon className="h-12 w-12 text-gold" />
                                )}
                                <div className="text-center">
                                  <p className="font-medium text-charcoal">{file.name}</p>
                                  <p className="text-xs text-gray-400 mt-1">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                </div>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); clearFile(); }}
                                  className="mt-2 text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
                                >
                                  <X className="h-4 w-4" /> Clear Selection
                                </button>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-3">
                                <UploadCloud className="h-12 w-12 text-gray-300 group-hover:text-gold transition-colors" />
                                <div>
                                  <p className="font-medium text-charcoal">Click to upload banner image/video</p>
                                  <p className="text-xs text-gray-400 mt-1">JPEG, PNG, WEBP, MP4 or MOV</p>
                                </div>
                              </div>
                            )}
                          </div>

                          <button 
                            onClick={handleUpload}
                            disabled={!file || uploading}
                            className={`w-full mt-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                              !file 
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                                : uploading
                                ? "bg-gold/80 text-charcoal cursor-wait"
                                : "bg-gold text-charcoal hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5"
                            }`}
                          >
                            {uploading ? "Uploading..." : "Upload Banner"}
                          </button>
                        </div>
                        
                        <ContactSettingsCard />
                        <TestimonialsSettingsCard />
                        <StatsSettingsCard />
                      </div>
                    </>
                  );
                default:
                  return null;
              }
            })()}

            {/* Empty State for other tabs */}
            {!["Dashboard", "Settings", "Gallery", "Cafe", "Food Menu", "Contact Us", "FAQs", "Bookings"].includes(activeTab) && (
              <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                <LayoutDashboard className="h-16 w-16 text-gray-200 mb-4" />
                <h2 className="text-xl font-bold text-charcoal mb-2">{activeTab} Module</h2>
                <p className="text-gray-500 max-w-sm">This module is currently under development. Check back later for updates!</p>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
