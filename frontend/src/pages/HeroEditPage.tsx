import { useNavigate, useParams } from 'react-router-dom';
import { HeroForm } from '../components/HeroForm/HeroForm';
import { useDeleteHero, useEditHeroForm } from '../hooks';

export function HeroEditPage() {
  const { id } = useParams();
  const heroId = Number(id);

  const navigate = useNavigate();

  const {
    formData,
    handleChange,
    handleSubmit,
    handleImageUpload,
    handleImageRemove,
    error,
    loading,
    avatarUrl,
    images,
  } = useEditHeroForm(heroId);

  const deleteHero = useDeleteHero(() => navigate('/'));
  const handleHeroDelete = () => deleteHero(heroId);

  return (
    <HeroForm
      mode={'edit'}
      formData={formData}
      avatarUrl={avatarUrl}
      images={images}
      isLoading={loading}
      errorMessage={error}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleImageUpload={handleImageUpload}
      handleImageRemove={handleImageRemove}
      onHeroDelete={handleHeroDelete}
    />
  );
}
