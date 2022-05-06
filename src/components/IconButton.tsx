import React from "react";

type IconButtonProps = {
  label: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

const IconButton: React.FC<IconButtonProps> = (props: IconButtonProps) => {
  const Icon = props.icon;
  return (
    <div className="flex items-center px-3 py-1 bg-white/40 dark:bg-black/20 rounded-lg">
      <Icon className="w-4 h-4 mr-1" />
      {props.label}
    </div>
  );
};

export default IconButton;
