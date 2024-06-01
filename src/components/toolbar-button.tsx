type Props = {
  label: string;
  onClick: () => void;
  variant: 'marker' | 'control';
};

const ToolbarButton = ({ label, variant, onClick }: Props) => {
  let classNameColors =
    'bg-violet-700 hover:bg-violet-500 active:bg-violet-800';
  switch (variant) {
    case 'marker':
      classNameColors =
        'bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600';
      break;
    case 'control':
      classNameColors =
        'bg-violet-700 hover:bg-violet-500 active:bg-violet-800';
      break;
  }

  return (
    <input
      type="button"
      value={label}
      className={`flex-grow rounded p-2 text-white ${classNameColors}`}
      onClick={onClick}
    />
  );
};

export default ToolbarButton;
