"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { Plus, Trash2 } from "lucide-react";

export interface MaidProfile {
  id?: string;
  name: string;
  age: number;
  areaOfOrigin: string;
  church: string;
  children: number;
  salaryExpectation: number;
  daysOff: string;
  policeClearance: boolean;
  previousWork: string;
}

export default function MaidsManagement() {
  const [maids, setMaids] = useState<MaidProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  const [newMaid, setNewMaid] = useState<Partial<MaidProfile>>({
    name: "",
    age: 20,
    areaOfOrigin: "",
    church: "",
    children: 0,
    salaryExpectation: 100,
    daysOff: "Weekends",
    policeClearance: false,
    previousWork: "",
  });

  const fetchMaids = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "maids"));
      const snapshot = await getDocs(q);
      const maidsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as MaidProfile[];
      setMaids(maidsData);
    } catch (error) {
      console.error("Error fetching maids:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaids();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "maids"), newMaid);
      setIsAdding(false);
      setNewMaid({
        name: "",
        age: 20,
        areaOfOrigin: "",
        church: "",
        children: 0,
        salaryExpectation: 100,
        daysOff: "Weekends",
        policeClearance: false,
        previousWork: "",
      });
      fetchMaids();
    } catch (error) {
      console.error("Error adding maid:", error);
      alert("Failed to add maid");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this profile?")) return;
    try {
      await deleteDoc(doc(db, "maids", id));
      fetchMaids();
    } catch (error) {
      console.error("Error deleting maid:", error);
      alert("Failed to delete maid");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Manage Maids</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-2 bg-gold text-[#4e2d7b] px-4 py-2 rounded-xl font-semibold text-sm hover:bg-gold-light transition-colors"
        >
          {isAdding ? "Cancel" : <><Plus className="h-4 w-4" /> Add Maid</>}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white rounded-2xl p-6 mb-8 border border-border/50 shadow-sm">
          <h2 className="text-lg font-bold mb-4">Add New Maid Profile</h2>
          <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Name</label>
              <input type="text" required value={newMaid.name} onChange={e => setNewMaid({...newMaid, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Age</label>
              <input type="number" required value={newMaid.age} onChange={e => setNewMaid({...newMaid, age: Number(e.target.value)})} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Area of Origin</label>
              <input type="text" required value={newMaid.areaOfOrigin} onChange={e => setNewMaid({...newMaid, areaOfOrigin: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Church</label>
              <input type="text" required value={newMaid.church} onChange={e => setNewMaid({...newMaid, church: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Children</label>
              <input type="number" required value={newMaid.children} onChange={e => setNewMaid({...newMaid, children: Number(e.target.value)})} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Salary Expectation ($)</label>
              <input type="number" required value={newMaid.salaryExpectation} onChange={e => setNewMaid({...newMaid, salaryExpectation: Number(e.target.value)})} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Days Off</label>
              <input type="text" required value={newMaid.daysOff} onChange={e => setNewMaid({...newMaid, daysOff: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="flex items-center gap-2 mt-6">
              <input type="checkbox" id="police" checked={newMaid.policeClearance} onChange={e => setNewMaid({...newMaid, policeClearance: e.target.checked})} className="rounded border-gray-300" />
              <label htmlFor="police" className="text-sm font-medium">Police Clearance</label>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold mb-1">Previous Work Experience</label>
              <textarea required value={newMaid.previousWork} onChange={e => setNewMaid({...newMaid, previousWork: e.target.value})} className="w-full px-3 py-2 border rounded-lg" rows={2}></textarea>
            </div>
            <div className="sm:col-span-2 flex justify-end mt-2">
              <button type="submit" className="bg-[#4e2d7b] text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-navy-light transition-colors">
                Save Profile
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p>Loading maids...</p>
        ) : maids.length === 0 ? (
          <p className="text-text-secondary">No maids found. Add one above.</p>
        ) : (
          maids.map((maid) => (
            <div key={maid.id} className="bg-white rounded-2xl p-5 border border-border/50 shadow-sm relative group">
              <button 
                onClick={() => handleDelete(maid.id!)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-5 w-5" />
              </button>
              <h3 className="font-bold text-lg">{maid.name} <span className="text-text-secondary font-normal text-sm">({maid.age})</span></h3>
              <div className="mt-3 space-y-1 text-sm text-text-secondary">
                <p><strong>Origin:</strong> {maid.areaOfOrigin}</p>
                <p><strong>Salary:</strong> ${maid.salaryExpectation}</p>
                <p><strong>Clearance:</strong> {maid.policeClearance ? "Yes" : "No"}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
