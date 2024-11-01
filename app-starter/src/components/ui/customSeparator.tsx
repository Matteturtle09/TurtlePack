import React from 'react';
import { Separator } from './separator';

interface CustomSeparatorProps {
  text: string;
}

const CustomSeparator = ({ text }: CustomSeparatorProps) => {
  return (
    <div className="flex items-center gap-4">
      <Separator className="flex-1" />
      <span className="text-muted-foreground">{text}</span>
      <Separator className="flex-1" />
    </div>
  );
};

export default CustomSeparator;
