import { useEffect, useRef, useState } from "react";

type EditableInputFieldType = 'text' | 'textarea' | 'number';

interface EditableInputFieldProps {
  value: string | number;
  type?: EditableInputFieldType;
  onChange: (newValue: string | number) => void;
  renderDisplay?: (value: string | number) => React.ReactNode;
  className?: string;
  inputClassName?: string;
  displayClassName?: string;
  rows?: number; // for textarea
  autoFocus?: boolean;
  onEnterBlur?: boolean; // for textarea to optionally blur on Enter
  displayAs?: 'h1' | 'p' | 'span' | 'div';
}

const EditableInputField = ({
  value,
  type = 'text',
  onChange,
  renderDisplay,
  className = '',
  inputClassName = 'border p-1 rounded w-full',
  displayClassName = 'cursor-pointer',
  rows = 3,
  autoFocus = false,
  onEnterBlur = true,
  displayAs = 'p',
}: EditableInputFieldProps) => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
    }
  }, [editing]);

  const handleBlur = () => setEditing(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (type === 'textarea' && !onEnterBlur && !e.shiftKey) return;
      e.preventDefault();
      setEditing(false);
    }
  };

  const DisplayTag = displayAs;

  return (
    <div className={className}>
      {editing ? (
        type === 'textarea' ? (
          <textarea
            ref={ref as React.RefObject<HTMLTextAreaElement>}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            rows={rows}
            className={`${inputClassName} resize-none`}
          />
        ) : (
          <input
            ref={ref as React.RefObject<HTMLInputElement>}
            type={type}
            value={value}
            onChange={(e) =>
              onChange(type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value)
            }
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={inputClassName}
          />
        )
      ) : (
        <DisplayTag className={displayClassName} onDoubleClick={() => setEditing(true)}>
          {renderDisplay ? renderDisplay(value) : value || 'No value'}
        </DisplayTag>
      )}
    </div>
  );
};

export default EditableInputField;