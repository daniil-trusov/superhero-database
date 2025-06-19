import type { FormMode, Hero } from '../../types';
import { BackButton, DeleteButton, SubmitButton } from '../Buttons';
import { GalleryEditor } from '../Gallery';

const fields = [
  { name: 'nickname', type: 'input', placeholder: 'Nickname' },
  { name: 'catch_phrase', type: 'input', placeholder: 'Catch Phrase' },
  { name: 'real_name', type: 'input', placeholder: 'Real Name' },
  {
    name: 'origin_description',
    type: 'textarea',
    placeholder: 'Origin Description',
  },
  {
    name: 'superpowers',
    type: 'textarea',
    placeholder: 'Superpowers (comma separated)',
  },
] as const;

type Props = {
  mode: FormMode;
  formData: Omit<Hero, 'id'>;
  avatarUrl: string;
  images: string[];
  isLoading?: boolean;
  errorMessage?: string | null;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageRemove: (url: string) => void;
  onHeroDelete: () => void;
};

export function HeroForm({
  mode,
  formData,
  avatarUrl,
  images,
  isLoading,
  errorMessage,
  handleChange,
  handleSubmit,
  handleImageUpload,
  handleImageRemove,
  onHeroDelete,
}: Props) {
  if (isLoading) {
    return <p>Loading hero data...</p>;
  }

  if (errorMessage) {
    return <p className="text-red-500">{errorMessage}</p>;
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-4 flex items-center justify-between">
        <BackButton />
        {mode === 'edit' && <DeleteButton onDelete={onHeroDelete} />}
      </div>

      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-12">
        <img
          src={avatarUrl}
          alt="Hero avatar preview"
          className="h-48 w-48 rounded-full bg-gray-300 object-cover"
        />

        <form onSubmit={handleSubmit} className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold text-blue-700">
            {mode === 'edit' ? 'Edit Hero' : 'Create New Hero'}
          </h1>

          {fields.map((field) => {
            const commonProps = {
              name: field.name,
              placeholder: field.placeholder,
              onChange: handleChange,
              className: 'w-full rounded border px-3 py-2',
              required: true,
            };

            const value = formData[field.name];

            return field.type === 'input' ? (
              <input
                key={field.name}
                type="text"
                value={value}
                {...commonProps}
              />
            ) : (
              <textarea key={field.name} value={value} {...commonProps} />
            );
          })}

          <GalleryEditor
            images={images}
            onAddImages={handleImageUpload}
            onDeleteImage={handleImageRemove}
          />

          <div className="pt-2">
            <SubmitButton>{mode === 'edit' ? 'Save' : 'Create'}</SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}
