import { useCallback, useRef, useState } from 'react';

export interface MatchPair {
  id: string;
  term: string;
  definition: string;
}

interface UseMatchTermsProps {
  pairs: MatchPair[];
  onComplete?: (score: number) => void;
}

export const useMatchTerms = ({ pairs, onComplete }: UseMatchTermsProps) => {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<string | null>(null);

  // Lưu mảng ID của các cặp đã nối đúng
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);

  // Lưu ID của 2 thẻ vừa nối sai để nháy đỏ UI
  const [wrongPair, setWrongPair] = useState<{ termId: string; defId: string } | null>(null);

  // Ref để khoá màn hình không cho user bấm loạn xạ khi đang nháy đỏ báo sai
  const isCheckingRef = useRef(false);

  const isComplete = pairs.length > 0 && matchedPairs.length === pairs.length;
  const score =
    pairs.length > 0
      ? Math.max(0, Math.round(((pairs.length - mistakes) / pairs.length) * 100))
      : 0;

  // Hàm xử lý việc so khớp khi user đã chọn đủ 1 trái và 1 phải
  const checkMatch = useCallback((tId: string, dId: string) => {
    isCheckingRef.current = true;

    if (tId === dId) {
      // ✅ TRƯỜNG HỢP ĐÚNG: Cập nhật danh sách đã nối, reset lựa chọn
      setMatchedPairs(prev => [...prev, tId]);
      setSelectedTerm(null);
      setSelectedDefinition(null);
      isCheckingRef.current = false;
    } else {
      // ❌ TRƯỜNG HỢP SAI: Bật cờ sai để UI nháy đỏ, tăng lỗi, sau 0.6s thì reset
      setMistakes(prev => prev + 1);
      setWrongPair({ termId: tId, defId: dId });

      setTimeout(() => {
        setWrongPair(null);
        setSelectedTerm(null);
        setSelectedDefinition(null);
        isCheckingRef.current = false;
      }, 600);
    }
  }, []);

  // Xử lý khi user bấm thẻ bên Trái (Term)
  const handleSelectTerm = useCallback(
    (termId: string) => {
      if (isCheckingRef.current || matchedPairs.includes(termId)) return;

      // Bấm lại thẻ đang chọn -> Bỏ chọn
      if (selectedTerm === termId) {
        setSelectedTerm(null);
        return;
      }

      // Nếu chưa chọn bên Phải -> Ghi nhận chọn bên Trái
      if (!selectedDefinition) {
        setSelectedTerm(termId);
      }
      // Nếu ĐÃ CÓ thẻ Phải đang chờ -> Tiến hành so khớp
      else {
        setSelectedTerm(termId); // Set tạm để UI highlight cả 2 thẻ
        checkMatch(termId, selectedDefinition);
      }
    },
    [selectedTerm, selectedDefinition, matchedPairs, checkMatch]
  );

  // Xử lý khi user bấm thẻ bên Phải (Definition)
  const handleSelectDefinition = useCallback(
    (defId: string) => {
      if (isCheckingRef.current || matchedPairs.includes(defId)) return;

      if (selectedDefinition === defId) {
        setSelectedDefinition(null);
        return;
      }

      if (!selectedTerm) {
        setSelectedDefinition(defId);
      } else {
        setSelectedDefinition(defId);
        checkMatch(selectedTerm, defId);
      }
    },
    [selectedTerm, selectedDefinition, matchedPairs, checkMatch]
  );

  const reset = useCallback(() => {
    setSelectedTerm(null);
    setSelectedDefinition(null);
    setMatchedPairs([]);
    setMistakes(0);
    setWrongPair(null);
    isCheckingRef.current = false;
  }, []);

  const handleNext = useCallback(() => {
    if (isComplete) {
      onComplete?.(score);
    }
  }, [isComplete, score, onComplete]);

  return {
    selectedTerm,
    selectedDefinition,
    matchedPairs,
    wrongPair,
    isComplete,
    progress: {
      current: matchedPairs.length,
      total: pairs.length,
    },
    handleSelectTerm,
    handleSelectDefinition,
    reset,
    handleNext,
  };
};
