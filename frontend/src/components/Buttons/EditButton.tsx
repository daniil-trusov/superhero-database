import { AppButton } from './AppButton';

type Props = {
  id: number;
};

export function EditButton({ id }: Props) {
  return (
    <AppButton type="link" to={`/heroes/${id}/edit`} variant="secondary">
      Edit
    </AppButton>
  );
}
