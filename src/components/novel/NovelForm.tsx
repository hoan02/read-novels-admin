import NovelGuidelines from "./NovelGuidelines";
import { Option } from "../custom-ui/MultipleSelector";
import Image from "next/image";

interface NovelFormData {
  initialData?: {
    _id: string;
    novelName: string;
    genres: Option[];
    author: string;
    description: string;
    urlCover: string;
  } | null;
}

const NovelForm: React.FC<NovelFormData> = ({ initialData }) => {
  return (
    <div className="space-y-4">
      <NovelGuidelines />

      <div className="p-4 rounded-lg border">
        {initialData && (
          <>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold">Tên truyện:</h3>
                <p>{initialData.novelName}</p>
              </div>

              <div>
                <h3 className="font-semibold">Thể loại:</h3>
                <ul>
                  {initialData.genres.map((genre) => (
                    <li key={genre.value}>{genre.label}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold">Tên tác giả:</h3>
                <p>{initialData.author}</p>
              </div>

              <div>
                <h3 className="font-semibold">Mô tả ngắn:</h3>
                <p>{initialData.description}</p>
              </div>

              <div>
                <h3 className="font-semibold">Ảnh bìa:</h3>
                <Image
                  width={200}
                  height={300}
                  src={initialData.urlCover}
                  alt="Cover"
                  className="max-w-xs"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NovelForm;
