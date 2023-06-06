import { Edit2 } from "react-feather";

type Edit = {
  onClick: () => void;
};

export function EditBtn({ onClick }: Edit) {
  return (
    <button onClick={onClick} className="edit-button">
      <Edit2 size={24} />
    </button>
  );
}
