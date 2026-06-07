/// <reference types="vite/client" />
import { useState, useRef, useEffect, useCallback, type ChangeEvent } from 'react';
import { MapPin, X, Loader2 } from 'lucide-react';

export interface LocationResult {
  label: string;
  lat: number;
  lng: number;
  city?: string;
}

interface LocationInputProps {
  value: LocationResult | null;
  onChange: (location: LocationResult | null) => void;
}

interface GeoapifyFeature {
  properties: {
    formatted: string;
    lat: number;
    lon: number;
    city?: string;
    name?: string;
    address_line1?: string;
    address_line2?: string;
  };
}

const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPIFY_KEY ?? '';

function debounce<T extends (...args: Parameters<T>) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

export function LocationInput({ value, onChange }: LocationInputProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<LocationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setFocused(false);
        // If user typed but didn't select, reset to last valid value label
        if (value) {
          setQuery(value.label);
        } else {
          setQuery('');
        }
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [value]);

  // Sync query with selected value
  useEffect(() => {
    if (value) setQuery(value.label);
  }, [value]);

  const fetchSuggestions = useCallback(
    debounce(async (text: string) => {
      if (text.trim().length < 2) {
        setSuggestions([]);
        setOpen(false);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const endpoint = GEOAPIFY_KEY
          ? `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(text)}&limit=6&apiKey=${GEOAPIFY_KEY}`
          : `https://photon.komoot.io/api/?q=${encodeURIComponent(text)}&limit=6&lang=en`;

        const res = await fetch(endpoint);
        const json = await res.json();

        let results: LocationResult[] = [];

        if (GEOAPIFY_KEY) {
          results = (json.features as GeoapifyFeature[]).map((f) => ({
            label: f.properties.formatted,
            lat: f.properties.lat,
            lng: f.properties.lon,
            city: f.properties.city,
          }));
        } else {
          // Photon fallback
          results = json.features.map((f: { properties: { name?: string; city?: string; state?: string; country?: string; type?: string }; geometry: { coordinates: [number, number] } }) => {
            const p = f.properties;
            const parts = [p.name, p.city, p.state, p.country].filter(Boolean);
            return {
              label: parts.join(', '),
              lat: f.geometry.coordinates[1],
              lng: f.geometry.coordinates[0],
              city: p.city,
            };
          });
        }

        setSuggestions(results);
        setOpen(results.length > 0);
      } catch {
        setSuggestions([]);
        setOpen(false);
      } finally {
        setLoading(false);
      }
    }, 250),
    []
  );

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setQuery(text);
    // Clear selected value if user edits
    if (value) onChange(null);
    fetchSuggestions(text);
  };

  const handleSelect = (suggestion: LocationResult) => {
    onChange(suggestion);
    setQuery(suggestion.label);
    setSuggestions([]);
    setOpen(false);
    setFocused(false);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    onChange(null);
    setQuery('');
    setSuggestions([]);
    setOpen(false);
    inputRef.current?.focus();
  };

  const isSelected = !!value;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Label */}
      <label className="block font-mono text-[10px] tracking-widest uppercase text-text-hint mb-2">
        Your Location
      </label>

      {/* Input wrapper */}
      <div
        className={`relative flex items-center border transition-all duration-200 ${
          focused
            ? 'border-accent bg-surface-elevated'
            : isSelected
            ? 'border-success/50 bg-surface-elevated'
            : 'border-divider bg-surface hover:border-text-hint/30'
        }`}
      >
        <MapPin
          className={`absolute left-4 w-4 h-4 flex-shrink-0 transition-colors duration-200 ${
            isSelected ? 'text-success' : focused ? 'text-accent' : 'text-text-hint'
          }`}
          strokeWidth={1.5}
        />

        <input
          ref={inputRef}
          id="location-input"
          type="text"
          value={query}
          onChange={handleInput}
          onFocus={() => {
            setFocused(true);
            if (suggestions.length > 0) setOpen(true);
          }}
          placeholder="Search city, area, locality..."
          autoComplete="off"
          spellCheck={false}
          className="w-full bg-transparent font-mono text-sm text-text-primary placeholder:text-text-hint pl-11 pr-10 py-4 outline-none"
        />

        {/* Right icon */}
        <div className="absolute right-4">
          {loading ? (
            <Loader2 className="w-4 h-4 text-text-hint animate-spin" strokeWidth={1.5} />
          ) : (query && !isSelected) ? (
            <button
              onClick={handleClear}
              className="text-text-hint hover:text-text-primary transition-colors"
              aria-label="Clear location"
              tabIndex={-1}
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          ) : isSelected ? (
            <button
              onClick={handleClear}
              className="text-success/60 hover:text-text-primary transition-colors"
              aria-label="Clear location"
              tabIndex={-1}
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          ) : null}
        </div>
      </div>

      {/* Hint */}
      <p className="mt-1.5 font-mono text-[10px] text-text-hint">
        {isSelected
          ? <span className="text-success tracking-wider">✓ LOCATION SET — {value!.lat.toFixed(4)}, {value!.lng.toFixed(4)}</span>
          : 'Type to search · Select from dropdown only'}
      </p>

      {/* Dropdown */}
      {open && suggestions.length > 0 && (
        <div className="absolute top-[calc(100%+4px)] left-0 right-0 z-50 border border-divider bg-surface-elevated shadow-2xl shadow-black/60 overflow-hidden">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onMouseDown={(e) => {
                e.preventDefault(); // prevent blur before click
                handleSelect(s);
              }}
              className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-primary/60 transition-colors duration-100 border-b border-divider last:border-b-0 group"
            >
              <MapPin
                className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5"
                strokeWidth={1.5}
              />
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-xs text-text-primary truncate leading-snug">
                  {s.label}
                </span>
                {s.city && s.city !== s.label && (
                  <span className="font-mono text-[10px] text-text-hint truncate mt-0.5">
                    {s.city}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
