# 📱 HƯỚNG DẪN TEST UI VOCABULARY - CHI TIẾT TỪNG BƯỚC

## ✅ CHUẨN BỊ

Đảm bảo bạn đã:

- ✓ Cài đặt đầy đủ dependencies (`npm install` hoặc `yarn install`)
- ✓ File `vocabularyLearning.tsx` đã được cập nhật (import DemoNavigator)
- ✓ App đang chạy: `npx expo start` hoặc `npm start`

---

## 🎯 BƯỚC 1: KHỞI ĐỘNG APP

### Làm gì:

```bash
# Trong terminal, chạy:
npx expo start
```

### Kết quả mong đợi:

- Terminal hiện QR code
- Chọn platform:
  - Nhấn **`i`** để mở iOS Simulator
  - Nhấn **`a`** để mở Android Emulator
  - Scan QR code bằng Expo Go app trên điện thoại thật

### Bạn sẽ thấy:

```
🧪 Vocabulary Demo
Test and debug UI components with mock data

👨‍💻 Developer Mode
All screens use mock data. No backend required.

Exercise Types:
[Flashcard] [Multiple Choice] [Image Quiz]
[Match Terms] [Fill in Blank] [Review Session]
[Lesson Result]
```

---

## 🎯 BƯỚC 2: TEST FLASHCARD (Thẻ từ vựng)

### Làm gì:

1. **Nhấn vào "Flashcard"** trong menu
2. Bạn sẽ thấy thẻ từ đầu tiên: "Transformer"

### Test các tính năng:

#### ✅ Test 1: Lật thẻ (Flip Card)

- **Hành động**: Nhấn vào thẻ từ vựng (giữa màn hình)
- **Kết quả**: Thẻ lật từ mặt trước → mặt sau
- **Mặt trước hiện**: Từ vựng + Phiên âm
- **Mặt sau hiện**: Định nghĩa + Ví dụ + Dịch nghĩa

#### ✅ Test 2: Phát âm thanh

- **Hành động**: Nhấn nút 🔊 (speaker icon)
- **Kết quả**: Console log: "Play audio: https://..."
- **Lưu ý**: Chưa có audio thật, chỉ log để test

#### ✅ Test 3: Đánh dấu "Biết từ"

- **Hành động**: Nhấn nút **"✓ I know it"** (nút xanh)
- **Kết quả**:
  - Chuyển sang thẻ tiếp theo
  - Progress bar tăng lên

#### ✅ Test 4: Đánh dấu "Chưa biết"

- **Hành động**: Nhấn nút **"✕ Don't know"** (nút xám)
- **Kết quả**:
  - Chuyển sang thẻ tiếp theo
  - Thẻ này sẽ xuất hiện lại ở phần Review

#### ✅ Test 5: Điều hướng

- **Hành động**: Nhấn "Previous" / "Next"
- **Kết quả**: Di chuyển giữa các thẻ

#### ✅ Test 6: Debug Controls (Kiểm tra trạng thái)

- **Vị trí**: Cuối màn hình, nền xám
- **Hành động**: Nhấn "Toggle Flip"
- **Kết quả**: Lật thẻ trực tiếp không cần animation

### Thử:

- Lật 5 thẻ liên tiếp
- Kiểm tra progress bar (từ 20% → 100%)
- Quay lại thẻ trước đó

---

## 🎯 BƯỚC 3: TEST MULTIPLE CHOICE (Trắc nghiệm)

### Làm gì:

1. **Nhấn "← Menu"** ở góc trên phải
2. **Chọn "Multiple Choice"** từ menu

### Test các tính năng:

#### ✅ Test 1: Chọn đáp án

- **Câu hỏi hiện**: "What does Artificial Intelligence mean...?"
- **Hành động**: Nhấn vào một trong 4 đáp án (A, B, C, D)
- **Kết quả**: Đáp án được chọn có viền đỏ

#### ✅ Test 2: Kiểm tra đáp án đúng

- **Hành động**: Chọn đáp án đúng → Nhấn **"Check Answer"**
- **Kết quả**:
  - Đáp án đúng: Nền xanh lá + viền xanh
  - Hiện hộp **Explanation** màu xanh dương
  - Nút đổi thành "Next Question"

#### ✅ Test 3: Kiểm tra đáp án sai

- **Hành động**: Chọn đáp án sai → Nhấn **"Check Answer"**
- **Kết quả**:
  - Đáp án sai bạn chọn: Nền đỏ + viền đỏ
  - Đáp án đúng: Nền xanh lá (tự động hiện)
  - Hiện explanation

#### ✅ Test 4: Chuyển câu hỏi

- **Hành động**: Nhấn **"Next Question"**
- **Kết quả**:
  - Chuyển sang câu hỏi 2/5
  - Progress bar tăng

#### ✅ Test 5: Debug Controls

- **Hành động**: Nhấn "Toggle Answered State"
- **Kết quả**: Xem trạng thái "Answered" / "Unanswered" ngay lập tức

### Thử:

- Trả lời 5 câu liên tục
- Chọn cố ý đáp án sai để xem UI màu đỏ
- Chọn đáp án đúng để xem UI màu xanh

---

## 🎯 BƯỚC 4: TEST IMAGE QUIZ (Đoán từ qua hình ảnh)

### Làm gì:

1. **Quay về Menu**
2. **Chọn "Image Quiz"**

### Test các tính năng:

#### ✅ Test 1: Xem hình ảnh

- **Kết quả**: Hiện ảnh placeholder từ picsum.photos
- **Câu hỏi**: "What does this image represent?"
- **4 đáp án** ở dưới hình

#### ✅ Test 2: Chọn đáp án

- **Tương tự Multiple Choice**
- **Hành động**: Chọn → Check Answer → Next

#### ✅ Test 3: UI feedback

- **Nút đúng**: Nền xanh lá
- **Nút sai**: Nền đỏ
- **Explanation** hiện ở dưới

### Thử:

- Test với 5 hình ảnh khác nhau
- Xem loading của ảnh có mượt không

---

## 🎯 BƯỚC 5: TEST MATCH TERMS (Nối từ)

### Làm gì:

1. **Quay về Menu**
2. **Chọn "Match Terms"**

### Test các tính năng:

#### ✅ Test 1: Chọn Terms (Thuật ngữ)

- **Hành động**: Nhấn vào một term (vd: "Overfitting")
- **Kết quả**:
  - Term được chọn có viền đỏ + nền đỏ nhạt
  - Sau 0.5 giây, tự động ghép với definition đúng
  - Cả term và definition chuyển sang màu xanh lá

#### ✅ Test 2: Theo dõi Progress

- **Matched**: 0/8 → 1/8 → ... → 8/8
- **Progress bar** tăng dần

#### ✅ Test 3: Hoàn thành

- **Khi ghép hết 8 cặp**:
- **Kết quả**:
  ```
  🎉 All paired correctly!
  Total mistakes: 0
  ```
- **Nút "Reset"** đổi thành **"Continue"**

#### ✅ Test 4: Reset

- **Hành động**: Nhấn "Reset"
- **Kết quả**: Xóa hết matches, bắt đầu lại

### Thử:

- Ghép 8 cặp từ liên tục
- Nhấn Reset và thử lại
- Xem animation khi ghép đúng

---

## 🎯 BƯỚC 6: TEST FILL IN THE BLANK (Điền từ còn thiếu)

### Làm gì:

1. **Quay về Menu**
2. **Chọn "Fill in the Blank"**

### Test các tính năng:

#### ✅ Test 1: Đọc câu có chỗ trống

- **Câu hiện**: "The model uses a \_\_\_ mechanism to process..."
- **Chỗ trống**: Hiện dấu gạch chân

#### ✅ Test 2: Xem hint (gợi ý)

- **Vị trí**: Hộp màu xanh dương ngay dưới câu
- **Nội dung**: "💡 Hint: This mechanism allows..."

#### ✅ Test 3: Chọn đáp án

- **Hành động**: Nhấn một trong 4 options
- **Kết quả**: Option được chọn có viền đỏ

#### ✅ Test 4: Kiểm tra

- **Hành động**: Nhấn "Check Answer"
- **Đúng**: Hiện hộp xanh "✓ Correct!"
- **Sai**: Hiện hộp đỏ "✗ Incorrect" + đáp án đúng

### Thử:

- Trả lời 5 câu
- Thử cả đúng và sai
- Xem hint có hiện đúng không

---

## 🎯 BƯỚC 7: TEST REVIEW SESSION (Ôn lại lỗi sai)

### Làm gì:

1. **Quay về Menu**
2. **Chọn "Review Session"**

### Test các tính năng:

#### ✅ Test 1: Xem danh sách lỗi

- **Tiêu đề**: "Review Your Mistakes"
- **Banner vàng**: "📚 4 mistakes found"

#### ✅ Test 2: Xem từng mistake card

- **Mỗi card hiện**:
  - **Từ vựng**: Transformer
  - **Your answer** (màu đỏ): Câu trả lời sai
  - **Correct answer** (màu xanh): Câu trả lời đúng
  - **Explanation**: Giải thích tại sao

#### ✅ Test 3: Scroll

- **Hành động**: Scroll xuống xem 4 mistakes
- **Kết quả**: Scroll mượt, card đầy đủ

#### ✅ Test 4: Tiếp tục

- **Nút**: "Continue to Results"
- **Hành động**: Console log "Continue"

### Thử:

- Đọc hết 4 mistakes
- Xem UI có rõ ràng không
- Kiểm tra màu sắc (đỏ/xanh)

---

## 🎯 BƯỚC 8: TEST LESSON RESULT (Kết quả bài học)

### Làm gì:

1. **Quay về Menu**
2. **Chọn "Lesson Result"**

### Test các tính năng:

#### ✅ Test 1: Debug Panel (Chuyển mức độ)

- **Vị trí**: Top của màn hình, nền xám
- **4 nút**:
  - 🎉 Excellent (95%)
  - 👍 Good (80%)
  - 📚 Average (67%)
  - 💪 Needs Work (50%)

#### ✅ Test 2: Xem thống kê "Excellent"

- **Hành động**: Nhấn "🎉 Excellent (95%)"
- **Kết quả hiện**:

  ```
  Spectacular!
  You've mastered 19 new industry terms

  📊 Stats:
  - Total Words: 20
  - Accuracy: 95%
  - Time Spent: 5:30
  - Mastered: 19
  - Streak: 7 🔥
  ```

#### ✅ Test 3: Xem thống kê "Needs Work"

- **Hành động**: Nhấn "💪 Needs Work (50%)"
- **Kết quả**:

  ```
  Keep Practicing!
  You've learned 5 new terms

  📊 Stats:
  - Total Words: 10
  - Accuracy: 50%
  - Time Spent: 8:00
  - Mastered: 5
  - No streak
  ```

#### ✅ Test 4: Chuyển đổi nhanh

- **Hành động**: Nhấn liên tục 4 nút ở debug panel
- **Kết quả**: UI thay đổi tức thì
  - Message thay đổi
  - Stats thay đổi
  - Màu sắc thay đổi

### Thử:

- Test cả 4 mức độ
- Xem message có phù hợp với điểm không
- Kiểm tra streak có hiện đúng không

---

## 🎯 BƯỚC 9: TEST DARK MODE

### Làm gì:

1. **Trong emulator/simulator**: Thay đổi theme
   - **iOS**: Settings → Display & Brightness → Dark
   - **Android**: Settings → Display → Dark theme

2. **Kiểm tra lại tất cả screens**

### Kết quả mong đợi:

- ✅ Background: Trắng → Xám đen
- ✅ Text: Đen → Trắng
- ✅ Cards: Trắng → Xám tối
- ✅ Borders: Xám nhạt → Xám đậm
- ✅ Tất cả text vẫn đọc được rõ ràng

---

## 🎯 BƯỚC 10: TEST DEBUG CONTROLS

### Tại mỗi screen, test phần debug ở dưới cùng:

#### Flashcard:

- **"Toggle Flip"**: Lật thẻ ngay lập tức

#### Multiple Choice:

- **"Toggle Answered State"**: Xem trạng thái đã trả lời

#### Image Quiz:

- **"Toggle Answered"**: Tương tự Multiple Choice

#### Fill Blank:

- **"Toggle Answered"**: Xem UI khi đã kiểm tra

#### Lesson Result:

- **4 nút performance**: Chuyển đổi điểm số

### Mục đích:

- Debug nhanh không cần làm hết flow
- Xem tất cả UI states dễ dàng
- Tiết kiệm thời gian test

---

## ✅ CHECKLIST ĐẦY ĐỦ

Sau khi test xong, check lại:

### Flashcard

- [ ] Lật thẻ mượt mà
- [ ] Nút audio hiện đúng vị trí
- [ ] Progress bar cập nhật chính xác
- [ ] Navigation Previous/Next work
- [ ] Debug controls hoạt động

### Multiple Choice

- [ ] 4 options hiện rõ ràng
- [ ] Chọn đáp án highlight đúng
- [ ] Check Answer work
- [ ] Màu xanh/đỏ phân biệt rõ
- [ ] Explanation hiện đầy đủ

### Image Quiz

- [ ] Ảnh load được
- [ ] Layout đẹp
- [ ] UI tương tự Multiple Choice
- [ ] Options dễ nhấn

### Match Terms

- [ ] Terms color change khi select
- [ ] Auto-match work
- [ ] Progress update chính xác
- [ ] Completion message hiện

### Fill Blank

- [ ] Câu có blank hiện rõ
- [ ] Hint hiện đúng vị trí
- [ ] Options dễ chọn
- [ ] Feedback rõ ràng

### Review Session

- [ ] 4 mistakes hiện đủ
- [ ] Scroll mượt
- [ ] Card layout đẹp
- [ ] Colors rõ ràng (red/green)

### Lesson Result

- [ ] 4 performance levels work
- [ ] Stats hiện đúng
- [ ] Message phù hợp với điểm
- [ ] Layout responsive

### General

- [ ] Dark mode work tốt
- [ ] Không có error trong console
- [ ] App không crash
- [ ] Navigation mượt mà
- [ ] Text dễ đọc

---

## 🐛 NẾU GẶP LỖI

### Lỗi: "Cannot find module DemoNavigator"

**Giải pháp**:

```bash
# Stop app (Ctrl+C)
# Restart
npx expo start --clear
```

### Lỗi: Màn hình trắng

**Giải pháp**:

1. Xem console có error gì không
2. Check file `vocabularyLearning.tsx` đã import đúng chưa
3. Restart Metro bundler

### Lỗi: Image không load

**Giải pháp**:

- Kiểm tra internet connection
- Picsum.photos có thể bị block, thay bằng local images

### Lỗi: TypeScript errors

**Giải pháp**:

```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
npx expo start --clear
```

---

## 📞 GHI CHÚ QUAN TRỌNG

### ⚠️ Đây là DEMO/TEST mode

- Không có backend thật
- Không lưu data
- Console.log thay vì action thật
- Mock data cố định

### ✅ Sau khi test xong

1. Thay DemoNavigator bằng logic thật
2. Kết nối API backend
3. Implement audio playback thật
4. Add state management (Redux/Zustand)

### 🎯 Mục đích test này

- ✅ Xem UI có đẹp không
- ✅ Flow có hợp lý không
- ✅ Colors có phù hợp không
- ✅ Dark mode có work không
- ✅ Responsive có tốt không

---

## 🚀 SAU KHI TEST XONG LÀM GÌ?

1. **Note lại bugs/improvements**
2. **Chụp screenshots** nếu cần
3. **Quyết định có cần thay đổi UI không**
4. **Sẵn sàng integrate backend**

---

**CHÚC BẠN TEST THÀNH CÔNG! 🎉**

Nếu có câu hỏi gì, check file:

- `screens/vocabulary/__demo__/README.md` (chi tiết hơn)
- `screens/vocabulary/__demo__/INTEGRATION_EXAMPLES.ts` (code examples)
