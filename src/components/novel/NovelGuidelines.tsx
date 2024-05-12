import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const NovelGuidelines = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <p className="text-lg">Quy định khi đăng truyện?</p>
        </AccordionTrigger>
        <AccordionContent>
          <div className="rounded-lg p-4 border">
            <ol className="list-decimal ml-4">
              <li>
                Không được phép đăng các truyện liên quan tới chính trị, tôn
                giáo, tình dục, sắc hiệp, dâm hiệp, nói xấu Việt Nam.
              </li>
              <li>
                Chỉ được đăng các truyện do bạn tự sáng tác hoặc bạn có quyền sử
                dụng.
              </li>
              <li>
                Nội dung giới thiệu truyện và nội dung chương truyện trình bày
                phải phân đoạn rõ ràng, nếu viết thành 1 khối dày đặc chữ sẽ bị
                xóa.
              </li>
              <li>
                Không được quảng cáo các trang web, nền tảng, dịch vụ khác dưới
                mọi hình thức.
              </li>
              <li>
                Không được đưa thông tin donate/ủng hộ của các trang web, nền
                tảng, dịch vụ khác dưới mọi hình thức.
              </li>
              <li>
                Ảnh bìa truyện không có các hình ảnh khiêu dâm, kích dục, kích
                động, thù hằn, ám chỉ đến tôn giáo, chính trị, các hoạt động bị
                cấm bởi pháp luật.
              </li>
              <li>
                Tất cả truyện bạn đăng lên Mê Truyện Chữ có bản quyền thuộc về
                cá nhân của bạn, Mê Truyện Chữ không có quyền lợi hay nghĩa vụ
                đăng ký bản quyền hộ bạn. Khi đăng truyện lên hệ thống bạn cho
                phép Mê Truyện Chữ và các website thuộc hệ thống quyền khai thác
                quảng cáo và quyền thu hộ trả phí (mở khóa) các chương truyện
                trên các truyện bạn đã đăng.
              </li>
            </ol>
            <p className="italic text-sm mt-6">
              Cập nhật lần cuối ngày 05/01/2024
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default NovelGuidelines;
