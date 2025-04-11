
import React from 'react';
import { Link } from 'react-router-dom';
import StoreListing from './StoreListing';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Store, Product } from '@/types';

interface FeaturedSectionProps {
  title: string;
  subtitle?: string;
  stores?: Store[];
  products?: Product[];
  viewAllLink?: string;
  viewAllText?: string;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  title,
  subtitle,
  stores,
  products,
  viewAllLink,
  viewAllText = "View All"
}) => {
  return (
    <section className="py-10">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-marcat-navy">{title}</h2>
            {subtitle && <p className="text-marcat-gray mt-1">{subtitle}</p>}
          </div>
          
          {viewAllLink && (
            <Link to={viewAllLink}>
              <Button variant="outline" className="text-marcat-accent hover:text-marcat-navy border-marcat-accent hover:border-marcat-navy">
                {viewAllText}
              </Button>
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stores && stores.map(store => (
            <StoreListing key={store.id} store={store} />
          ))}
          
          {products && products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
