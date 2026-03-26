import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { 
  Loader2, Trash2, Image as ImageIcon, 
  Plus, X, UploadCloud, Flame, Leaf, Hexagon
} from "lucide-react";
import { apiGet, apiPost, apiPut, apiCall, apiDelete } from "@/lib/api";
import { getMinioUrl } from "@/lib/minioUrl";

export default function CafeAdmin() {
  const [uploading, setUploading] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState("banner");

  // Fetch all data
  const { data, refetch, isLoading } = useQuery({
    queryKey: ['cafeData'],
    queryFn: async () => {
      const json = await apiGet("/cafe");
      return json.data;
    }
  });

  if (isLoading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-gold" /></div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-charcoal mb-2">Cafe Management</h1>
        <p className="text-gray-500">Total control over the Our Cafe public page.</p>
      </div>

      {/* Sub Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
        {["banner", "categories", "menu", "signatures", "vibe"].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${activeSubTab === tab ? "bg-gold text-charcoal shadow-sm" : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-200"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
        {activeSubTab === "banner" && <CafeBannerAdmin data={data?.banner} refetch={refetch} uploading={uploading} setUploading={setUploading} />}
        {activeSubTab === "categories" && <CafeCategoryAdmin categories={data?.categories || []} refetch={refetch} />}
        {activeSubTab === "menu" && <CafeMenuAdmin items={data?.menuItems || []} categories={data?.categories || []} refetch={refetch} />}
        {activeSubTab === "signatures" && <CafeSignatureAdmin items={data?.signatures || []} refetch={refetch} uploading={uploading} setUploading={setUploading} />}
        {activeSubTab === "vibe" && <CafeVibeAdmin images={data?.vibeImages || []} refetch={refetch} uploading={uploading} setUploading={setUploading} />}
      </div>
    </div>
  );
}

// =================== BANNER COMPONENT ===================
const CafeBannerAdmin = ({ data, refetch, uploading, setUploading }: any) => {
  const [content, setContent] = useState(data?.bannerContent || "");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    setUploading(true);
    const formData = new FormData();
    if (file) formData.append("media", file);
    formData.append("bannerContent", content);

    try {
      const response = await apiCall("/cafe/admin/banner", {
        method: "PUT",
        body: formData
      });
      if (response.ok) {
        toast.success("Banner updated");
        setFile(null);
        refetch();
      } else {
        toast.error("Failed to update banner");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-xl font-bold text-charcoal">Hero Banner Setup</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Banner Subtitle Text</label>
          <textarea 
            rows={4} 
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/50 outline-none"
          />
          <button onClick={handleSave} disabled={uploading} className="mt-4 bg-charcoal text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-black transition-colors w-full">
            {uploading ? "Saving..." : "Save Banner Configuration"}
          </button>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Background Image</label>
          <div 
            className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative overflow-hidden group"
            onClick={() => fileInputRef.current?.click()}
          >
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            {file ? (
               <div className="flex flex-col items-center gap-2">
                 <ImageIcon className="h-8 w-8 text-gold" />
                 <span className="text-sm font-medium">{file.name}</span>
               </div>
            ) : data?.bannerImage ? (
               <div className="relative h-32 w-full">
                 <img src={getMinioUrl(data.bannerImage)} className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-50 group-hover:opacity-20 transition-opacity" />
                 <div className="absolute inset-0 items-center justify-center flex flex-col z-10">
                   <UploadCloud className="h-8 w-8 text-charcoal mb-2" />
                   <span className="text-sm font-bold text-charcoal">Click to replace image</span>
                 </div>
               </div>
            ) : (
               <div className="flex flex-col items-center gap-2 py-6">
                 <UploadCloud className="h-10 w-10 text-gray-300" />
                 <span className="text-sm font-medium text-gray-500">Upload Image</span>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// =================== CATEGORY COMPONENT ===================
const CafeCategoryAdmin = ({ categories, refetch }: any) => {
  const [newCat, setNewCat] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat.trim()) return;
    setLoading(true);
    try {
      await apiPost("/cafe/admin/categories", { name: newCat });
      toast.success("Category added");
      setNewCat("");
      refetch();
    } finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete category? Items in this category will remain but will be uncategorized.")) return;
    try {
      await apiDelete(`/cafe/admin/categories/${id}`);
      toast.success("Category deleted");
      refetch();
    } catch {}
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-xl font-bold text-charcoal">Menu Categories</h2>
      
      <form onSubmit={handleAdd} className="flex gap-2 max-w-md">
        <input 
          placeholder="New category name..." 
          value={newCat} 
          onChange={e => setNewCat(e.target.value)} 
          className="flex-1 p-2.5 border rounded-lg text-sm" 
          required 
        />
        <button disabled={loading} className="bg-gold text-charcoal px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
          <Plus className="w-4 h-4" /> {loading ? "Adding..." : "Add"}
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {categories.map((cat: any) => (
          <div key={cat._id} className="flex items-center justify-between p-3 border border-gray-100 bg-gray-50 rounded-lg group">
            <span className="text-sm font-medium">{cat.name}</span>
            <button onClick={() => handleDelete(cat._id)} className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// =================== MENU COMPONENT ===================
const InlineMenuItemCard = ({ item, categories, onRefetch }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState({ ...item });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiPut(`/cafe/admin/menu/${item._id}`, edited);
      toast.success("Item updated");
      setIsEditing(false);
      onRefetch();
    } catch (error) {
      toast.error("Failed to save item");
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this menu item?")) return;
    try {
      await apiDelete(`/cafe/admin/menu/${item._id}`);
      toast.success("Deleted");
      onRefetch();
    } catch {
      toast.error("Failed to delete");
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white border-2 border-gold p-4 rounded-xl shadow-lg animate-in fade-in zoom-in duration-200 space-y-3">
        <input 
          value={edited.name} 
          onChange={e => setEdited({ ...edited, name: e.target.value })}
          className="w-full p-2 border rounded-lg text-sm font-bold"
          placeholder="Item Name"
        />
        <input 
          value={edited.price} 
          onChange={e => setEdited({ ...edited, price: e.target.value })}
          className="w-full p-2 border rounded-lg text-sm"
          placeholder="Price (e.g. Rs. 250)"
        />
        <textarea 
          value={edited.desc} 
          onChange={e => setEdited({ ...edited, desc: e.target.value })}
          className="w-full p-2 border rounded-lg text-xs"
          placeholder="Description"
          rows={2}
        />
        <select 
          value={edited.category} 
          onChange={e => setEdited({ ...edited, category: e.target.value })}
          className="w-full p-2 border rounded-lg text-xs"
        >
          {categories.map((cat: any) => (
            <option key={cat._id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        
        <div className="flex flex-wrap gap-3 py-1">
          <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase cursor-pointer">
            <input type="checkbox" checked={edited.bestseller} onChange={e => setEdited({ ...edited, bestseller: e.target.checked })} /> 
            Best <Flame className="w-3 h-3 text-red-500" />
          </label>
          <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase cursor-pointer">
            <input type="checkbox" checked={edited.veg} onChange={e => setEdited({ ...edited, veg: e.target.checked })} /> 
            Veg <Leaf className="w-3 h-3 text-green-500" />
          </label>
          <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase cursor-pointer">
            <input type="checkbox" checked={edited.vegan} onChange={e => setEdited({ ...edited, vegan: e.target.checked })} /> 
            Vegan <Hexagon className="w-3 h-3 text-green-600" />
          </label>
        </div>

        <div className="flex gap-2 pt-2">
          <button onClick={handleSave} disabled={saving} className="flex-1 bg-gold text-charcoal py-2 rounded-lg text-xs font-bold hover:shadow-md transition-all">
            {saving ? "Saving..." : "Save"}
          </button>
          <button onClick={() => setIsEditing(false)} className="px-3 bg-gray-100 text-gray-500 py-2 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md hover:border-gold/30 transition-all group relative">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-bold text-charcoal">{item.name}</h4>
          <span className="text-primary font-bold text-sm">{item.price}</span>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => setIsEditing(true)} className="p-1.5 bg-gray-50 text-gray-400 hover:text-gold hover:bg-gold/10 rounded-lg transition-colors">
            <UploadCloud className="w-4 h-4" />
          </button>
          <button onClick={handleDelete} className="p-1.5 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-500 line-clamp-2 mb-3">{item.desc}</p>
      <div className="flex flex-wrap gap-2">
        <span className="text-[9px] font-black uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded text-gray-400">{item.category}</span>
        {item.bestseller && <span className="text-[9px] font-black uppercase bg-red-50 text-red-500 px-2 py-0.5 rounded flex items-center gap-1">Best <Flame className="w-2.5 h-2.5" /></span>}
        {item.veg && <span className="text-[9px] font-black uppercase bg-green-50 text-green-600 px-2 py-0.5 rounded flex items-center gap-1">Veg <Leaf className="w-2.5 h-2.5" /></span>}
        {item.vegan && <span className="text-[9px] font-black uppercase bg-green-50 text-green-700 px-2 py-0.5 rounded flex items-center gap-1">Vegan <Hexagon className="w-2.5 h-2.5" /></span>}
      </div>
    </div>
  );
};

const CafeMenuAdmin = ({ items, categories, refetch }: any) => {
  const [adding, setAdding] = useState(false);

  const handleAddNew = async () => {
    if (categories.length === 0) return toast.error("Please create a category first");
    setAdding(true);
    try {
      await apiPost("/cafe/admin/menu", { 
        name: "New Menu Item", 
        desc: "Add a delicious description here.",
        price: "Rs. 0",
        category: categories[0].name,
        veg: true
      });
      toast.success("Placeholder added! Click edit to customize.");
      refetch();
    } finally { setAdding(false); }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-charcoal">Menu Items</h2>
          <p className="text-sm text-gray-500">Manage your cafe's offering and prices.</p>
        </div>
        <button 
          onClick={handleAddNew}
          disabled={adding}
          className="bg-gold text-charcoal px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:shadow-lg hover:shadow-gold/20 transition-all border border-gold"
        >
          <Plus className="w-4 h-4" /> {adding ? "Creating..." : "Add New Item"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item: any) => (
          <InlineMenuItemCard key={item._id} item={item} categories={categories} onRefetch={refetch} />
        ))}
        {items.length === 0 && !adding && (
          <div className="col-span-full py-16 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">Your menu is empty. Start adding items!</p>
          </div>
        )}
      </div>
    </div>
  );
};

// =================== SIGNATURE COMPONENT ===================
const CafeSignatureAdmin = ({ items, refetch, uploading, setUploading }: any) => {
  const [form, setForm] = useState({ name: "", desc: "", price: "", showPrice: true });
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return toast.error("Image required");
    setUploading(true);
    const formData = new FormData();
    formData.append("media", file);
    formData.append("name", form.name);
    formData.append("desc", form.desc);
    formData.append("price", form.price);
    formData.append("showPrice", form.showPrice.toString());

    try {
      const response = await apiCall("/cafe/admin/signature", {
        method: "POST",
        body: formData
      });
      if (response.ok) {
        toast.success("Signature item added");
        setForm({ name: "", desc: "", price: "", showPrice: true });
        setFile(null);
        refetch();
      }
    } finally { setUploading(false); }
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Delete signature item?")) return;
    try {
      await apiDelete(`/cafe/admin/signature/${id}`);
      toast.success("Deleted");
      refetch();
    } catch {}
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <h2 className="text-xl font-bold text-charcoal">Chef's Signatures Slider</h2>

      <form onSubmit={handleAdd} className="bg-gray-50 p-6 rounded-xl border border-gray-100 grid md:grid-cols-2 gap-4">
         <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">Recipe Name</label>
          <input required value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="w-full p-2.5 mt-1 border rounded-lg text-sm" />
        </div>
        <div>
          <div className="flex justify-between items-center">
             <label className="text-xs font-semibold text-gray-500 uppercase">Price</label>
             <label className="text-xs font-bold flex items-center gap-1 text-primary cursor-pointer"><input type="checkbox" checked={form.showPrice} onChange={e=>setForm({...form, showPrice: e.target.checked})} /> Show Price</label>
          </div>
          <input required={form.showPrice} value={form.price} onChange={e=>setForm({...form, price: e.target.value})} className="w-full p-2.5 mt-1 border rounded-lg text-sm" placeholder="e.g. Rs. 350" />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-gray-500 uppercase">Recipe Description</label>
          <input required value={form.desc} onChange={e=>setForm({...form, desc: e.target.value})} className="w-full p-2.5 mt-1 border rounded-lg text-sm" />
        </div>
        <div className="md:col-span-2 flex items-center justify-between mt-2">
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          <button type="button" onClick={() => fileInputRef.current?.click()} className="text-sm font-semibold bg-white border border-gray-200 px-4 py-2 rounded-lg flex items-center gap-2">
            <ImageIcon className="w-4 h-4"/> {file ? file.name : "Select Image"}
          </button>
          <button disabled={uploading || !file} className="bg-gold text-charcoal px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2">
           <Plus className="w-4 h-4" /> {uploading ? "Uploading..." : "Add to Slider"}
         </button>
        </div>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item: any) => (
          <div key={item._id} className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-square">
            <img src={getMinioUrl(item.image)} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
               <h4 className="text-white font-bold mb-1 leading-tight">{item.name}</h4>
               {item.showPrice && <span className="text-gold shadow-sm font-bold text-sm mb-2">{item.price}</span>}
               <button onClick={() => handleDelete(item._id)} className="mt-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// =================== VIBE GALLERY COMPONENT ===================
const CafeVibeAdmin = ({ images, refetch, uploading, setUploading }: any) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    if(!files.length) return;
    setUploading(true);
    const formData = new FormData();
    files.forEach(f => formData.append("images", f));
    try {
      const response = await apiCall("/cafe/admin/vibe/upload", {
        method: "POST",
        body: formData
      });
      if(response.ok) {
        toast.success("Images uploaded");
        setFiles([]);
        refetch();
      }
    } finally { setUploading(false); }
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Delete vibe image?")) return;
    try {
      await apiDelete(`/cafe/admin/vibe/${id}`);
      toast.success("Deleted");
      refetch();
    } catch {}
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <h2 className="text-xl font-bold text-charcoal">The Vibe Gallery</h2>

      <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-gray-50 flex flex-col items-center">
         <input type="file" ref={fileInputRef} className="hidden" multiple accept="image/*" onChange={(e) => { if(e.target.files?.length) setFiles(Array.from(e.target.files)) }} />
         {files.length > 0 ? (
           <>
             <p className="font-bold text-lg mb-4">{files.length} files selected</p>
             <div className="flex gap-4">
               <button onClick={() => setFiles([])} className="text-red-500 font-semibold px-4 py-2">Clear</button>
               <button onClick={handleUpload} disabled={uploading} className="bg-gold text-charcoal px-6 py-2 rounded-lg font-bold">{uploading ? "Uploading..." : "Upload Images"}</button>
             </div>
           </>
         ) : (
           <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-2 text-gray-500 hover:text-charcoal transition-colors">
             <UploadCloud className="w-10 h-10 mb-2" />
             <span className="font-semibold text-lg">Click to Multi-select Images</span>
             <span className="text-xs uppercase tracking-wider">Supports JPG, PNG, WEBP</span>
           </button>
         )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
         {images.map((img: any) => (
            <div key={img._id} className="relative group rounded-xl overflow-hidden aspect-square border border-gray-200">
              <img src={getMinioUrl(img.url)} className="w-full h-full object-cover" />
              <button onClick={() => handleDelete(img._id)} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white hover:text-red-500">
                 <Trash2 className="w-6 h-6" />
              </button>
            </div>
         ))}
      </div>
    </div>
  );
};
