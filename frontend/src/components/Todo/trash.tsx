import { Trash2 } from "react-feather";

type Delete = {
  onClick: () => void;
};

export function TrashBtn({ onClick }: Delete) {
  return (
    <button onClick={onClick} className="trash-button">
      <Trash2 size={24} />
    </button>
  );
}
