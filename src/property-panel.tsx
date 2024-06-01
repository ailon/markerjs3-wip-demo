import React from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
};

const PropertyPanel = ({ title, children }: Props) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-md border border-slate-600 bg-slate-100 shadow">
      <h3 className="bg-slate-600 p-1 text-white">{title}</h3>
      <div className="overflow-y-auto ">
        <div className="m-3 grid grid-cols-2 gap-2 text-left">{children}</div>
      </div>
    </div>
  );
};

export default PropertyPanel;
