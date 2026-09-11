import { useEffect, useState } from "react";

export default function DetailCard({ guitars, selectedId }) {
  const [activeGuitar, setActiveGuitar] = useState(null);

  useEffect(() => {
    const found = guitars.find((g) => g.id === selectedId) || null;
    setActiveGuitar(found);
  }, [selectedId, guitars]);

  if (!activeGuitar) {
    return (
      <div className="border border-dashed border-brass/40 bg-white/40 p-6 text-sm text-walnut/60">
        Select a row in the registry to see its full profile here.
      </div>
    );
  }

  return (
    <div className="border border-brass/40 bg-fretboard p-6 text-parchment">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold">
          {activeGuitar.guitarModel}
        </h2>
        <span className="border border-brass px-2 py-0.5 text-xs uppercase tracking-wide text-brass">
          {activeGuitar.userRole}
        </span>
      </div>

      <dl className="mt-4 space-y-2 text-sm">
        <Row label="Body Type" value={activeGuitar.bodyType} />
        <Row label="Brand" value={activeGuitar.brandName} />
        <Row label="Stock Quantity" value={activeGuitar.stockQuantity} />
        <Row label="Manufacturer" value={activeGuitar.manufacturerName} />
      </dl>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b border-parchment/10 pb-2">
      <dt className="text-parchment/60">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}