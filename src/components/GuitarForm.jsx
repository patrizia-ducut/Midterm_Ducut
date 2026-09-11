import { useState } from "react";

const BODY_TYPES = ["Electric", "Acoustic", "Bass", "Classical"];

const emptyForm = {
  guitarModel: "",
  bodyType: "",
  brandName: "",
  stockQuantity: "",
  manufacturerName: "",
  userRole: "",
};

export default function GuitarForm({ onAddGuitar }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate(values) {
    const next = {};

    if (!values.guitarModel.trim()) {
      next.guitarModel = "Guitar model is required.";
    } else if (values.guitarModel.trim().length < 3) {
      next.guitarModel = "Guitar model must be at least 3 characters.";
    }

    if (!values.bodyType) {
      next.bodyType = "Select a body type.";
    }

    if (!values.brandName.trim()) {
      next.brandName = "Brand name is required.";
    } else if (values.brandName.trim().length < 3) {
      next.brandName = "Brand name must be at least 3 characters.";
    }

    if (values.stockQuantity === "") {
      next.stockQuantity = "Stock quantity is required.";
    } else {
      const num = Number(values.stockQuantity);
      if (Number.isNaN(num) || num < 1 || num > 100) {
        next.stockQuantity = "Stock quantity must be a number between 1 and 100.";
      }
    }

    if (!values.manufacturerName.trim()) {
      next.manufacturerName = "Manufacturer name is required.";
    }

    if (!values.userRole) {
      next.userRole = "Select a user role.";
    }

    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onAddGuitar({
        id: crypto.randomUUID(),
        ...form,
        stockQuantity: Number(form.stockQuantity),
      });
      setForm(emptyForm);
      setErrors({});
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl border border-brass/40 bg-white/60 p-8"
    >
      <h1 className="font-display text-3xl font-semibold text-walnut">
        Register a Guitar
      </h1>
      <p className="mt-1 text-sm text-walnut/70">
        Ledger & String — Inventory Intake Form
      </p>

      <div className="mt-6 h-px bg-brass/40" />

      <div className="mt-6 space-y-5">
        <Field label="Guitar Model" error={errors.guitarModel}>
          <input
            name="guitarModel"
            value={form.guitarModel}
            onChange={handleChange}
            placeholder="e.g. Stratocaster HSS"
            className={inputClass(errors.guitarModel)}
          />
        </Field>

        <Field label="Body Type" error={errors.bodyType}>
          <select
            name="bodyType"
            value={form.bodyType}
            onChange={handleChange}
            className={inputClass(errors.bodyType)}
          >
            <option value="">Select body type…</option>
            {BODY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Brand Name" error={errors.brandName}>
          <input
            name="brandName"
            value={form.brandName}
            onChange={handleChange}
            placeholder="e.g. Fender"
            className={inputClass(errors.brandName)}
          />
        </Field>

        <Field label="Stock Quantity (1–100)" error={errors.stockQuantity}>
          <input
            type="number"
            name="stockQuantity"
            value={form.stockQuantity}
            onChange={handleChange}
            placeholder="e.g. 24"
            className={inputClass(errors.stockQuantity)}
          />
        </Field>

        <Field label="Manufacturer Name" error={errors.manufacturerName}>
          <input
            name="manufacturerName"
            value={form.manufacturerName}
            onChange={handleChange}
            placeholder="e.g. Fender Musical Instruments Corp."
            className={inputClass(errors.manufacturerName)}
          />
        </Field>

        <fieldset>
          <legend className="text-sm font-medium text-walnut">User Role</legend>
          <div className="mt-2 flex gap-6">
            {["Merchant", "Consumer"].map((role) => (
              <label key={role} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="userRole"
                  value={role}
                  checked={form.userRole === role}
                  onChange={handleChange}
                  className="accent-saddle"
                />
                {role}
              </label>
            ))}
          </div>
          {errors.userRole && (
            <p className="mt-1 text-sm text-rust">{errors.userRole}</p>
          )}
        </fieldset>
      </div>

      <button
        type="submit"
        className="mt-8 w-full bg-saddle py-3 font-medium text-parchment transition hover:bg-walnut"
      >
        Add to registry
      </button>
    </form>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="text-sm font-medium text-walnut">{label}</label>
      <div className="mt-1">{children}</div>
      {error && <p className="mt-1 text-sm text-rust">{error}</p>}
    </div>
  );
}

function inputClass(error) {
  return `w-full border bg-white px-3 py-2 text-sm outline-none focus:border-saddle ${
    error ? "border-rust" : "border-walnut/20"
  }`;
}