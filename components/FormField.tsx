import { AlertCircle } from 'lucide-react'
import { FieldError } from 'react-hook-form'

interface FormFieldProps {
  label: string
  error?: FieldError
  children: React.ReactNode
  required?: boolean
}

export function FormField({ label, error, children, required = false }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label} {required && '*'}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
          <AlertCircle size={14} />
          {error.message}
        </p>
      )}
    </div>
  )
} 