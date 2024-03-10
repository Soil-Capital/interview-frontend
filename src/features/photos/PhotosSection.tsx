import { LoadingPage } from '@pages';
import { usePhotosQuery } from '@services';

const PhotosSection = () => {
  const { data, error, isLoading } = usePhotosQuery();

  if (isLoading) {
    return <LoadingPage />
  }

  // @todo - improve
  if (error) {
    return <span>An error occured</span>
  }

  return (
    <div>
      {data?.slice(0, 3).map(({ title, url }) => (
        <img src={url} alt={title} />
      ))}
    </div>
  );
};

export default PhotosSection;
