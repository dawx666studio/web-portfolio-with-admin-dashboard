"use client";

import { useState } from "react";
import { FaqItem } from "@/lib/types";
import { createFaq, updateFaq, deleteFaq } from "@/lib/actions/faq";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";

export function FaqManagerClient({ initialFaqs }: { initialFaqs: FaqItem[] }) {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "Shipping" as "Shipping" | "General" | "Materials" | "Returns",
    orderIndex: 0,
  });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question || !formData.answer) return;

    try {
      const res = await createFaq(formData);
      if (res.success) {
        setFaqs([...faqs, { id: `faq-${Date.now()}`, ...formData }]);
        setShowAddForm(false);
        setFormData({ question: "", answer: "", category: "Shipping", orderIndex: 0 });
      }
    } catch {
      alert("Failed to create FAQ item.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ item?")) return;
    try {
      await deleteFaq(id);
      setFaqs(faqs.filter((f) => f.id !== id));
    } catch {
      alert("Failed to delete FAQ item.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New FAQ Trigger */}
      {!showAddForm && (
        <Button
          onClick={() => setShowAddForm(true)}
          variant="default"
          className="flex items-center gap-2 font-bold rounded-full"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ Item</span>
        </Button>
      )}

      {/* Add New FAQ Form */}
      {showAddForm && (
        <form
          onSubmit={handleAdd}
          className="bg-white rounded-3xl border-3 border-black p-6 shadow-retro space-y-4 animate-in fade-in-0"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl text-fructus-dark">New Question</h3>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-muted-foreground hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-black uppercase mb-1">Question *</label>
              <Input
                type="text"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                required
                className="h-10 text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase mb-1">Category *</label>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="h-10 text-xs font-bold"
              >
                <option value="Shipping">Shipping</option>
                <option value="General">General</option>
                <option value="Materials">Materials</option>
                <option value="Returns">Returns</option>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase mb-1">Answer *</label>
            <Textarea
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              required
              rows={3}
              className="text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" size="sm" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="default" size="sm">
              Save FAQ
            </Button>
          </div>
        </form>
      )}

      {/* FAQ Items List */}
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="bg-white rounded-2xl border-2 border-black/80 p-5 shadow-retro-sm space-y-2 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-fructus-pink text-fructus-red text-[11px] font-black uppercase border border-black/20">
                  {faq.category}
                </span>
                <h4 className="font-display text-lg text-fructus-dark mt-1.5">
                  {faq.question}
                </h4>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleDelete(faq.id)}
                  className="p-2 text-muted-foreground hover:text-fructus-red rounded-lg transition-colors"
                  aria-label="Delete FAQ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground font-medium whitespace-pre-line pt-1 border-t border-black/5">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
