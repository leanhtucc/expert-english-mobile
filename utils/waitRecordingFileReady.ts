import * as FileSystem from 'expo-file-system/legacy';

function normalizeFileUri(uri: string): string {
  return uri.startsWith('file://') ? uri : `file://${uri}`;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Đợi file ghi âm vừa stop ghi xong trên đĩa (kích thước không đổi 2 lần liên tiếp).
 * Tránh đọc WAV/m4a quá sớm → parse lỗi / encode MP3 rỗng hoặc 0s.
 */
export async function waitRecordingFileReady(uri: string): Promise<void> {
  const path = normalizeFileUri(uri);
  let previous = -1;
  let stable = 0;

  for (let i = 0; i < 80; i++) {
    const info = await FileSystem.getInfoAsync(path);
    if (!info.exists) {
      await sleep(40);
      continue;
    }
    const size = 'size' in info && typeof info.size === 'number' ? info.size : 0;
    if (size > 0 && size === previous) {
      stable += 1;
      if (stable >= 2) {
        return;
      }
    } else {
      stable = 0;
    }
    previous = size;
    await sleep(50);
  }

  console.warn(
    '[waitRecordingFileReady] Hết thời gian chờ hoặc file=0 — có thể ghi chưa xong:',
    path
  );
}
