import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { extractPreferences, calculatePreferenceMatch } from '../services/nlpExtractor';
import { Resource, FilterState, PreferenceExtraction } from '../types';
import { SearchBar } from '../components/discovery/SearchBar';
import { SearchInterpretation } from '../components/discovery/SearchInterpretation';
import { FilterBar } from '../components/discovery/FilterBar';
import { ResourceCard } from '../components/discovery/ResourceCard';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Frown, ShieldCheck } from 'lucide-react';

export const DiscoverPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useLanguage();

  const initialQuery = searchParams.get('q') || '';
  const initialCat = searchParams.get('category') || 'all';

  const [query, setQuery] = useState(initialQuery);
  const [submittedQuery, setSubmittedQuery] = useState(initialQuery);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  // Multi-facet filter state
  const [filters, setFilters] = useState<FilterState>({
    category: (initialCat as any) || 'all',
    cost: 'all',
    language: 'all',
    maxDistance: 15,
    availability: 'all',
    verifiedOnly: false,
    search: ''
  });

  // Load resources from API service
  const loadResources = async () => {
    setLoading(true);
    try {
      const data = await api.getResources();
      setResources(data);
    } catch (e) {
      console.error('Failed to load resources', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResources();

    // Re-fetch if resources updated in localStorage
    const handleUpdate = () => loadResources();
    window.addEventListener('recovery_connect_resources_updated', handleUpdate);
    return () => window.removeEventListener('recovery_connect_resources_updated', handleUpdate);
  }, []);

  // Update category filter if URL param changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setFilters(prev => ({ ...prev, category: cat as any }));
    }
  }, [searchParams]);

  // Handle Search Submission
  const handleSearchSubmit = (searchVal: string) => {
    setSubmittedQuery(searchVal);
    setSearchParams(prev => {
      const p = new URLSearchParams(prev);
      if (searchVal.trim()) {
        p.set('q', searchVal.trim());
      } else {
        p.delete('q');
      }
      return p;
    });
  };

  // Perform Natural Language Preference Extraction on the submitted query
  const extraction: PreferenceExtraction = useMemo(() => {
    if (!submittedQuery.trim()) {
      return { rawQuery: '', tokens: [], keywords: [] };
    }
    return extractPreferences(submittedQuery);
  }, [submittedQuery]);

  // Compute matched items and calculate Preference Match Scores
  const resultsWithScores = useMemo(() => {
    return resources
      .map(resource => {
        // Compute match score against current extraction & category
        const matchResult = calculatePreferenceMatch(
          resource,
          extraction,
          filters.category !== 'all' ? filters.category : undefined
        );
        return { resource, matchResult };
      })
      .filter(({ resource, matchResult }) => {
        // Apply manual FilterBar criteria
        if (filters.category !== 'all' && resource.category !== filters.category) {
          return false;
        }
        if (filters.cost !== 'all' && resource.cost !== filters.cost) {
          return false;
        }
        if (filters.language !== 'all' && !resource.languages.includes(filters.language as any)) {
          return false;
        }
        if (filters.availability !== 'all' && resource.availability !== filters.availability) {
          return false;
        }
        if (filters.verifiedOnly && resource.verificationStatus !== 'verified') {
          return false;
        }
        if (resource.distanceKm > filters.maxDistance) {
          return false;
        }

        // If extraction extracted specific criteria, filter down to relevant results
        if (extraction.category && resource.category !== extraction.category) {
          return false;
        }
        if (extraction.cost === 'free' && resource.cost !== 'free') {
          return false;
        }
        if (extraction.language && !resource.languages.includes(extraction.language)) {
          return false;
        }
        if (extraction.availability === 'open_today' && resource.availability !== 'open_today' && resource.availability !== '24_7') {
          return false;
        }
        if (extraction.location) {
          const loc = extraction.location.toLowerCase();
          const matchesLoc =
            resource.city.toLowerCase().includes(loc) ||
            resource.address.toLowerCase().includes(loc) ||
            resource.distanceKm <= 3.5;
          if (!matchesLoc) return false;
        }

        return true;
      })
      // Sort by match score descending
      .sort((a, b) => b.matchResult.score - a.matchResult.score);
  }, [resources, extraction, filters]);

  const handleClearInterpretation = () => {
    setSubmittedQuery('');
    setQuery('');
    setSearchParams(prev => {
      const p = new URLSearchParams(prev);
      p.delete('q');
      return p;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold tracking-widest text-[#6F6D76] uppercase font-sans">
          Resource Discovery Engine
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#34343B]">
          Find support that fits your needs.
        </h1>
        <p className="text-xs sm:text-sm text-[#6F6D76]">
          Type naturally in everyday language or refine through verified criteria filters.
        </p>
      </div>

      {/* Large Natural-Language Search Bar */}
      <div className="max-w-3xl mx-auto">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={handleSearchSubmit}
        />
      </div>

      {/* Animated Preference Interpretation Panel (WE UNDERSTOOD) */}
      {extraction.tokens.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <SearchInterpretation
            extraction={extraction}
            matchedCount={resultsWithScores.length}
            onClear={handleClearInterpretation}
          />
        </div>
      )}

      {/* Multi-facet Filter Bar */}
      <FilterBar
        filters={filters}
        onChange={setFilters}
        totalCount={resultsWithScores.length}
      />

      {/* Resource Results Grid */}
      <section className="space-y-4">
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-8 h-8 mx-auto border-3 border-[#DDECF4] border-t-[#34343B] rounded-full animate-spin" />
            <p className="text-xs text-[#6F6D76]">Loading verified resources...</p>
          </div>
        ) : resultsWithScores.length === 0 ? (
          <div className="py-16 text-center space-y-4 bg-white/70 border border-[#EADBCE] rounded-3xl p-8 max-w-lg mx-auto">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#FFF9F3] border border-[#EADBCE] flex items-center justify-center text-[#6F6D76]">
              <Frown className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#34343B]">
                No matching resources found
              </h3>
              <p className="text-xs text-[#6F6D76] mt-1 max-w-sm mx-auto leading-relaxed">
                Try widening your distance limit, choosing "All Costs", or searching with broader keywords.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                handleClearInterpretation();
                setFilters({
                  category: 'all',
                  cost: 'all',
                  language: 'all',
                  maxDistance: 15,
                  availability: 'all',
                  verifiedOnly: false,
                  search: ''
                });
              }}
              className="px-5 py-2 rounded-full bg-[#34343B] text-white text-xs font-semibold hover:bg-black"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resultsWithScores.map(({ resource, matchResult }) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                matchResult={matchResult}
                showMatchDetails={true}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
