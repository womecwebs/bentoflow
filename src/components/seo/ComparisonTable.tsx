import React from 'react';

interface ComparisonTableProps {
  toolName: string;
  data: { feature: string; bento: string; custom: string }[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ toolName, data }) => {
  return (
    <div className="my-16 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold">Manual Coding vs. {toolName}</h2>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="bg-white/5 text-white/40 uppercase text-[10px] tracking-wider">
          <tr>
            <th className="px-8 py-4">Feature</th>
            <th className="px-8 py-4">Manual Bento Coding</th>
            <th className="px-8 py-4 text-emerald-400">{toolName}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-white/70">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-white/5 transition-colors">
              <td className="px-8 py-6 font-medium text-white">{row.feature}</td>
              <td className="px-8 py-6">{row.custom}</td>
              <td className="px-8 py-6 text-emerald-400 font-medium">{row.bento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
