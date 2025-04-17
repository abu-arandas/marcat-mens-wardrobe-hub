
import React from 'react';
import { Button } from "@/components/ui/button";

interface ReviewFiltersProps {
  filter: string;
  sort: string;
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: string) => void;
}

const ReviewFilters: React.FC<ReviewFiltersProps> = ({ 
  filter, 
  sort, 
  onFilterChange, 
  onSortChange 
}) => {
  return (
    <div className="flex flex-wrap gap-2 justify-between">
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={filter === 'all' ? "default" : "outline"} 
          size="sm" 
          onClick={() => onFilterChange('all')}
        >
          All Reviews
        </Button>
        <Button 
          variant={filter === 'positive' ? "default" : "outline"} 
          size="sm" 
          onClick={() => onFilterChange('positive')}
        >
          Positive
        </Button>
        <Button 
          variant={filter === 'negative' ? "default" : "outline"} 
          size="sm" 
          onClick={() => onFilterChange('negative')}
        >
          Negative
        </Button>
        <Button 
          variant={filter === 'with-images' ? "default" : "outline"} 
          size="sm" 
          onClick={() => onFilterChange('with-images')}
        >
          With Images
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm">Sort by:</span>
        <select 
          className="text-sm rounded border p-1"
          value={sort}
          onChange={e => onSortChange(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="helpful">Most Helpful</option>
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
        </select>
      </div>
    </div>
  );
};

export default ReviewFilters;
