import { AppButton } from './AppButton';

type Props = {
  children: React.ReactNode;
};

export function SubmitButton({ children }: Props) {
  return (
    <AppButton type="submit" variant="success">
      {children}
    </AppButton>
  );
}
