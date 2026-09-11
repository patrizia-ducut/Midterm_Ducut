import { useState } from "react";
import GuitarForm from "./components/GuitarForm";
import GuitarTable from "./components/GuitarTable";
import DetailCard from "./components/DetailCard";

export default function App() {
  const [guitars, setGuitars] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [view, setView] = useState("form"); // "form" | "registry"

  function handleAddGuitar(newGuitar) {
    setGuitars((prev) => [...prev, newGuitar]);
    setView("registry");
  }

  return (
    <div className="min-h-screen bg-parchment px-4 py-10">
      <header className="mx-auto mb-8 flex max-w-5xl items-center justify-between">
        <div>
          <p className="font-display text-2xl font-semibold">Ledger & String</p>
          <p className="text-sm text-walnut/60">Guitar Store Inventory Manager</p>
        </div>
        <nav className="flex gap-2 text-sm">
          <TabButton active={view === "form"} onClick={() => setView("form")}>
            Register
          </TabButton>
          <TabButton active={view === "registry"} onClick={() => setView("registry")}>
            Registry ({guitars.length})
          </TabButton>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl">
        {view === "form" && <GuitarForm onAddGuitar={handleAddGuitar} />}

        {view === "registry" && (
          <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
            <GuitarTable
              guitars={guitars}
              selectedId={selectedId}
              onSelectRow={setSelectedId}
            />
            <DetailCard guitars={guitars} selectedId={selectedId} />
          </div>
        )}
      </main>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`border px-4 py-1.5 ${
        active
          ? "border-saddle bg-saddle text-parchment"
          : "border-walnut/20 text-walnut/70 hover:border-saddle"
      }`}
    >
      {children}
    </button>
  );
}