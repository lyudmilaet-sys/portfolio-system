import { useId, type InputHTMLAttributes } from "react";

export type FormFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  /** Підпис над полем. Обов'язковий: це назва поля для людей і скрінрідерів. */
  label: string;
  /** Показує стан помилки: межа `danger`, `aria-invalid`, текст помилки під полем. */
  error?: boolean;
  /** Текст помилки під полем, з іконкою. Показується лише коли `error`; зв'язаний через `aria-describedby`. */
  errorMessage?: string;
  /** Вимикає поле (атрибут `disabled`): не редагується, не фокусується, значення не відправляється з формою. */
  disabled?: boolean;
  /** Власний `id` поля. Якщо не задано, створюється автоматично. */
  id?: string;
};

// outline-ink stays on all the time (invisible without a width), so transition-colors
// doesn't animate the focus ring colour.
const inputBase =
  "w-full rounded-control border-2 px-6 py-3 font-sans text-body outline-ink transition-colors " +
  "placeholder:text-ink-muted focus:outline-2 focus:outline-offset-2";

const inputStates = {
  default: "bg-canvas text-ink border-ink-muted hover:border-ink",
  error: "bg-canvas text-ink border-danger",
  disabled: "bg-surface text-ink-muted border-surface cursor-not-allowed",
};

/**
 * Поле форми: текстове поле з підписом над ним.
 * Стани: default, hover, focus, заповнене, помилка (межа й текст `danger`, іконка), disabled.
 */
export function FormField({
  label,
  error = false,
  errorMessage,
  disabled = false,
  id,
  className,
  type = "text",
  "aria-describedby": describedBy,
  ...rest
}: FormFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;
  const showError = error && !disabled && Boolean(errorMessage);
  const describedByIds = [describedBy, showError ? errorId : undefined].filter(Boolean).join(" ") || undefined;

  const state = disabled ? "disabled" : error ? "error" : "default";

  return (
    <div className={["flex flex-col gap-2", className].filter(Boolean).join(" ")}>
      <label htmlFor={inputId} className={`text-caption font-medium ${disabled ? "text-ink-muted" : "text-ink"}`}>
        {label}
      </label>
      <input
        {...rest}
        id={inputId}
        type={type}
        disabled={disabled}
        aria-invalid={state === "error" || undefined}
        aria-describedby={describedByIds}
        className={`${inputBase} ${inputStates[state]}`}
      />
      {showError && (
        <p id={errorId} className="flex items-center gap-2 text-caption text-danger">
          <svg className="size-4 shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm0 3a.9.9 0 0 1 .9.9v3.6a.9.9 0 0 1-1.8 0V4.9A.9.9 0 0 1 8 4Zm0 8.2a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1Z" />
          </svg>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
