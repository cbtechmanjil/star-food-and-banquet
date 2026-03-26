import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { 
  Loader2, Plus, X, Edit2, Check, Trash2, 
  Salad, ChefHat, Flame, Sparkles, Leaf, Cherry, 
  IceCreamCone, Coffee, Music, CookingPot
} from "lucide-react";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api";

// Icon mapping for Lucide icons
const iconMap: Record<string, any> = {
  Salad, ChefHat, Flame, Sparkles, Leaf, Cherry, 
  IceCreamCone, Coffee, Music, CookingPot
};

const InlineBanquetCategoryCard = ({ category, onUpdate, onDelete }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState({ ...category });
  const [newItem, setNewItem] = useState("");

  const handleSave = () => {
    onUpdate(edited);
    setIsEditing(false);
  };

  const addItem = () => {
    if (!newItem.trim()) return;
    setEdited({ ...edited, items: [...edited.items, newItem.trim()] });
    setNewItem("");
  };

  const removeItem = (index: number) => {
    const newItems = edited.items.filter((_: any, i: number) => i !== index);
    setEdited({ ...edited, items: newItems });
  };

  const Icon = iconMap[category.icon] || ChefHat;

  if (isEditing) {
    return (
      <div className="bg-white border-2 border-gold p-6 rounded-2xl shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Category Name</label>
              <input 
                value={edited.name} 
                onChange={e => setEdited({ ...edited, name: e.target.value })}
                className="w-full p-2 border rounded-lg text-sm font-bold"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Subtitle (e.g. Any 3)</label>
              <input 
                value={edited.subtitle} 
                onChange={e => setEdited({ ...edited, subtitle: e.target.value })}
                className="w-full p-2 border rounded-lg text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Menu Items</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {edited.items.map((item: string, i: number) => (
                <span key={i} className="bg-gray-100 text-charcoal px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 group">
                  {item}
                  <button onClick={() => removeItem(i)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input 
                value={newItem}
                onChange={e => setNewItem(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addItem()}
                placeholder="Add new item..."
                className="flex-1 p-2 border rounded-lg text-sm"
              />
              <button onClick={addItem} className="bg-charcoal text-white px-3 py-2 rounded-lg text-sm">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-2 pt-2 border-t mt-4">
            <button onClick={handleSave} className="flex-1 bg-gold text-charcoal py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
              <Check className="w-4 h-4" /> Done Editing
            </button>
            <button onClick={() => { setEdited({ ...category }); setIsEditing(false); }} className="px-4 bg-gray-100 text-gray-500 py-2.5 rounded-xl text-sm font-bold">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group relative">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gold/10 rounded-xl">
            <Icon className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h4 className="font-bold text-lg text-charcoal">{category.name}</h4>
            <p className="text-xs text-gold font-bold uppercase tracking-wider">{category.subtitle}</p>
          </div>
        </div>
        <div className="flex gap-1.5">
          <button 
            onClick={() => setIsEditing(true)} 
            className="p-2 bg-gray-50 text-gray-400 hover:text-gold hover:bg-gold/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete()} 
            className="p-2 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.items.map((item: string, i: number) => (
          <span key={i} className="text-[11px] font-medium text-gray-600 bg-gray-50 border border-gray-100 px-2 py-1 rounded-md">
            {item}
          </span>
        ))}
        {category.items.length === 0 && <p className="text-xs text-gray-400 italic">No items added yet.</p>}
      </div>
    </div>
  );
};

export default function BanquetMenuAdmin() {
  const [activeTab, setActiveTab] = useState<"Gold" | "Diamond">("Gold");
  const [saving, setSaving] = useState(false);

  const { data: menus, refetch, isLoading } = useQuery({
    queryKey: ['banquetMenus'],
    queryFn: async () => {
      const json = await apiGet("/banquet");
      return json.data;
    }
  });

  const activeMenu = menus?.find((m: any) => m.tab === activeTab);

  const handleUpdateCategory = async (updatedCat: any, index: number) => {
    if (!activeMenu || !activeMenu.categories) return;
    const newCategories = [...activeMenu.categories];
    newCategories[index] = updatedCat;
    saveMenuChanges(newCategories);
  };

  const handleDeleteCategory = (index: number) => {
    if (!activeMenu || !activeMenu.categories) return;
    if (!confirm("Remove this category? All items in it will be lost.")) return;
    const newCategories = activeMenu.categories.filter((_: any, i: number) => i !== index);
    saveMenuChanges(newCategories);
  };

  const handleAddCategory = () => {
    if (!activeMenu) return;
    const newCat = {
      name: "New Category",
      subtitle: "Selection Rule",
      icon: "ChefHat",
      items: []
    };
    saveMenuChanges([...(activeMenu.categories || []), newCat]);
  };

  const saveMenuChanges = async (newCategories: any[]) => {
    setSaving(true);
    try {
      await apiPut(`/banquet/${activeMenu._id}`, { categories: newCategories });
      toast.success(`${activeTab} Menu updated`);
      refetch();
    } catch {
      toast.error("Network error");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-gold" /></div>;

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-charcoal mb-2">Banquet Menus</h1>
          <p className="text-gray-500">Configure the Gold & Diamond event packages.</p>
        </div>
        
        <div className="bg-gray-100 p-1 rounded-2xl flex gap-1">
          {["Gold", "Diamond"].map((tab: any) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab ? "bg-white text-charcoal shadow-sm" : "text-gray-500 hover:text-charcoal"}`}
            >
              {tab} Package
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative">
        {saving && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-3xl">
            <Loader2 className="w-10 h-10 animate-spin text-gold" />
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-bold text-charcoal flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-gold" />
            {activeTab} Menu Categories
          </h3>
          <button 
            onClick={handleAddCategory}
            className="bg-charcoal text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-black transition-all"
          >
            <Plus className="w-4 h-4" /> Add Category
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeMenu?.categories?.map((cat: any, i: number) => (
            <InlineBanquetCategoryCard 
              key={cat._id || i} 
              category={cat} 
              onUpdate={(updated: any) => handleUpdateCategory(updated, i)}
              onDelete={() => handleDeleteCategory(i)}
            />
          ))}
        </div>

        {(!activeMenu?.categories || activeMenu.categories.length === 0) && (
          <div className="py-20 text-center">
            <p className="text-gray-400 font-medium">No categories found in this menu.</p>
          </div>
        )}
      </div>
    </div>
  );
}
