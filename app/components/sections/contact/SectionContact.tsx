import { useState } from "react"
import type { SectionHeroContact, FormField } from "~/types/sanity"
import { Button } from "../../ui/Button"
import { MediaItem } from "~/components/ui/MediaItem"
import { Section } from "~/components/ui/Section"
import { FadeIn, FadeInGroup } from "~/components/ui/FadeIn"
import { cn } from "~/lib/cn"

const inputCls =
  "w-full border border-surface bg-surface rounded-xl px-4 py-3 text-primary placeholder:color-primary-muted focus:outline-none focus:border-primary-muted transition-colors ease-linear type-base"

function FormFieldInput({ field, value, onChange }: { field: FormField; value: string; onChange: (v: string) => void }) {
  const placeholder = field.placeholder ?? field.label
  const name = field._key

  if (field.fieldType === "select") {
    return (
      <>
        <label htmlFor={name} className="sr-only">
          {field.label}
        </label>
        <select
          id={name}
          name={name}
          required={field.required ?? false}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </>
    )
  }

  if (field.fieldType === "textarea") {
    return (
      <>
        <label htmlFor={name} className="sr-only">
          {field.label}
        </label>
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          required={field.required ?? false}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(inputCls, "resize-none")}
        />
      </>
    )
  }

  return (
    <>
      <label htmlFor={name} className="sr-only">
        {field.label}
      </label>
      <input
        id={name}
        name={name}
        type={field.fieldType}
        placeholder={placeholder}
        required={field.required ?? false}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      />
    </>
  )
}

function ContactForm({ formFields }: Pick<SectionHeroContact, "formFields">) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  function setValue(label: string, value: string) {
    setValues((prev) => ({ ...prev, [label]: value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields: values }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Something went wrong")
      setStatus("success")
    } catch (err) {
      setStatus("error")
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong")
    }
  }

  if (status === "success") {
    return (
      <div className="py-8 mt-4 border-l-4 border-surface pl-6">
        <p className="type-xl text-primary">Success.</p>
        <p className="type-base-plus pt-3">We've received your enquiry and will come back to you soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {formFields?.map((field) => (
        <FormFieldInput
          key={field._key}
          field={field}
          value={values[field.label] ?? ""}
          onChange={(v) => setValue(field.label, v)}
        />
      ))}

      {status === "error" && <p className="type-sm text-red-500">{errorMessage}</p>}

      <Button type="submit" variant="primary" arrow disabled={status === "loading"} className="mt-2 w-fit text-center">
        {status === "loading" ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  )
}

export function SectionContact({ heading, subheading, items, formFields, anchorId }: SectionHeroContact) {
  const media = items?.[0]

  return (
    <Section id={anchorId ?? undefined} className="pt-0">
      <FadeInGroup stagger={0.25} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: heading + media */}
        <FadeIn direction="up">
          {media && (
            <div className="aspect-4/5 w-full bg-surface rounded-custom overflow-hidden">
              <MediaItem item={media} sizes="(max-width: 1024px) 90vw, 50vw" widths={[400, 640, 900, 1280]} loading="eager" />
            </div>
          )}
        </FadeIn>

        <FadeIn direction="up">
          <h1 className="type-3xl text-balance">{heading}</h1>
          {subheading && <p className="type-base-plus pt-6 pb-8">{subheading}</p>}
          <ContactForm formFields={formFields} />
        </FadeIn>
      </FadeInGroup>
    </Section>
  )
}
