import { useNavigate } from 'react-router-dom';
import { AppButton } from './AppButton';

export function BackButton() {
  const navigate = useNavigate();
  return (
    <AppButton type="button" variant="neutral" onClick={() => navigate(-1)}>
      ← Back
    </AppButton>
  );
}
