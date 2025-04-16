
import React from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import POSProductGrid from '@/components/pos/POSProductGrid';

interface Category {
  id: string;
  name: string;
}

interface POSCategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  searchQuery: string;
}

const POSCategoryTabs: React.FC<POSCategoryTabsProps> = ({ 
  categories, 
  activeCategory, 
  setActiveCategory,
  searchQuery 
}) => {
  return (
    <Card className="flex-1 overflow-hidden border-gray-200">
      <CardHeader className="p-0">
        <Tabs defaultValue="all" value={activeCategory} className="w-full">
          <TabsList className="w-full h-auto justify-start overflow-x-auto bg-gray-50 p-1 rounded-none border-b">
            {categories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                onClick={() => setActiveCategory(category.id)}
                className="py-1.5 px-3 text-sm"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={activeCategory} className="m-0 p-4 overflow-y-auto max-h-[calc(100vh-280px)]">
            <POSProductGrid 
              category={activeCategory}
              searchQuery={searchQuery}
            />
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  );
};

export default POSCategoryTabs;
