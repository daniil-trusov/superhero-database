import { HeroForm } from '../components/HeroForm/HeroForm';
import { useCreateHeroForm } from '../hooks';

export function HeroCreatePage() {
  const {
    formData,
    handleChange,
    handleSubmit,
    handleImageUpload,
    handleImageRemove,
    error,
    avatarUrl,
    images,
  } = useCreateHeroForm();

  return (
    <HeroForm
      mode={'create'}
      formData={formData}
      avatarUrl={avatarUrl}
      images={images}
      errorMessage={error}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleImageUpload={handleImageUpload}
      handleImageRemove={handleImageRemove}
      onHeroDelete={() => {}}
    />
  );
}
