import { ReactNode } from 'react';

type Props = {
  title: string | ReactNode;
  description: string;
};

export const Card = ({ title, description }: Props) => {
  return (
    <div className="shadow-lg rounded-lg p-4">
      <h4 className="text-base font-semibold">{title}</h4>
      <p className="text-sm text-muted-foreground text-[#dae2ed]m mt-2">{description}</p>
    </div>
  );
};
