import { useRef, useState } from 'react';
import { Search, Lock, ArrowRight } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  locationLocked: boolean;
  canSubmit: boolean;
}

export function SearchInput({ value, onChange, locationLocked, canSubmit }: SearchInputProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isDisabled = !locationLocked;

  return (
    <div className="relative w-full">
      {/* Label */}
      <label className="block font-mono text-[11px] leading-none tracking-[0.12em] uppercase text-text-hint mb-1.5">
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
        <div className="ml-4 flex-shrink-0">
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
          className={`flex-1 bg-transparent font-mono text-sm placeholder:text-text-hint px-2.5 py-4 outline-none transition-all min-w-0 ${
            isDisabled ? 'text-text-hint/40 cursor-not-allowed' : 'text-text-primary'
          }`}
        />

        {/* Compare Prices Submit Button (rightmost) */}
        <button
          type="submit"
          disabled={!canSubmit}
          onClick={(e) => e.stopPropagation()}
          className={`flex items-center gap-1.5 pl-2.5 pr-3 py-1.5 mr-2 font-mono text-[10px] tracking-[0.12em] uppercase transition-all duration-200 ${
            canSubmit
              ? 'bg-accent text-white hover:bg-accent/90 active:scale-[0.97] cursor-pointer'
              : 'bg-surface border border-divider text-text-hint cursor-not-allowed'
          }`}
        >
          <span>Compare</span>
          <ArrowRight className="w-3 h-3" strokeWidth={2} />
        </button>
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
