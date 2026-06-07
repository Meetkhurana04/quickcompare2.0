import { useRef, useState } from 'react';
import { Search, Lock } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  locationLocked: boolean;
}

export function SearchInput({ value, onChange, locationLocked }: SearchInputProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isDisabled = !locationLocked;

  return (
    <div className="relative w-full">
      {/* Label */}
      <label className="block font-mono text-[10px] tracking-widest uppercase text-text-hint mb-2">
        What are you looking for?
      </label>

      <div
        className={`relative flex items-center border transition-all duration-200 ${
          isDisabled
            ? 'border-divider/50 bg-surface/50 cursor-not-allowed'
            : focused
            ? 'border-accent bg-surface-elevated'
            : value
            ? 'border-text-hint/40 bg-surface-elevated'
            : 'border-divider bg-surface hover:border-text-hint/30'
        }`}
        onClick={() => {
          if (!isDisabled) inputRef.current?.focus();
        }}
      >
        <div className="absolute left-4">
          {isDisabled ? (
            <Lock className="w-4 h-4 text-text-hint/40" strokeWidth={1.5} />
          ) : (
            <Search
              className={`w-4 h-4 transition-colors duration-200 ${
                focused ? 'text-accent' : 'text-text-hint'
              }`}
              strokeWidth={1.5}
            />
          )}
        </div>

        <input
          ref={inputRef}
          id="search-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={isDisabled}
          placeholder={isDisabled ? 'Set location first...' : 'chocolate, eggs, milk, shampoo...'}
          className={`w-full bg-transparent font-mono text-sm placeholder:text-text-hint pl-11 pr-4 py-4 outline-none transition-all ${
            isDisabled ? 'text-text-hint/40 cursor-not-allowed' : 'text-text-primary'
          }`}
        />

        {/* Char count hint */}
        {!isDisabled && value.length > 0 && (
          <span className="absolute right-4 font-mono text-[10px] text-text-hint/60 flex-shrink-0">
            {value.length}
          </span>
        )}
      </div>

      <p className="mt-1.5 font-mono text-[10px] text-text-hint">
        {isDisabled ? (
          <span className="text-text-hint/50">← Set your location to unlock search</span>
        ) : (
          'Search any product · eg: "maggi", "eggs dozen", "chips"'
        )}
      </p>
    </div>
  );
}
