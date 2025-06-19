import { AppButton } from './AppButton';

type Props = {
  onDelete: () => void;
};

export function DeleteButton({ onDelete }: Props) {
  return (
    <AppButton type="button" variant="danger" onClick={onDelete}>
      Delete
    </AppButton>
  );
}
