import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Stop, Text as SvgText } from 'react-native-svg';

import { DailyProgress } from '../types/progress.types';

interface Props {
  data: DailyProgress[];
  height?: number;
  hideDots?: boolean;
  highlightIndex?: number;
  showPercentSign?: boolean;
}

const { width } = Dimensions.get('window');

export const ProgressChart = ({
  data,
  height = 120,
  hideDots = false,
  highlightIndex = 5,
  showPercentSign = false,
}: Props) => {
  // chartWidth tổng thể bằng chiều rộng màn hình trừ padding của card
  const chartWidth = width - 80;

  // --- THUẬT TOÁN TẠO KHOẢNG THỞ (HEADROOM) VÀ PADDING NGANG ---
  const topPadding = 30;
  const drawHeight = height - topPadding;

  // TẠO PADDING TRÁI/PHẢI ĐỂ CHỮ KHÔNG BỊ XÉN
  const hPadding = 16; // Chừa 16px ở mỗi bên lề trái và lề phải
  const drawWidth = chartWidth - hPadding * 2; // Chiều rộng thực tế dùng để vẽ đồ thị

  const maxDataVal = Math.max(...data.map(d => d.value));
  const minDataVal = Math.min(...data.map(d => d.value));

  const range = maxDataVal - minDataVal === 0 ? maxDataVal : maxDataVal - minDataVal;
  const maxVal = maxDataVal + range * 0.4;
  const minVal = Math.max(0, minDataVal - range * 0.1);

  // Chia khoảng cách điểm dựa trên chiều rộng đã bị thu hẹp (drawWidth)
  const stepX = drawWidth / (data.length - 1);

  // Tính tọa độ các điểm. Lưu ý: cộng thêm hPadding vào trục X để đẩy đồ thị sang phải 1 chút.
  const points = data.map((d, i) => ({
    x: hPadding + i * stepX,
    y: topPadding + (drawHeight - ((d.value - minVal) / (maxVal - minVal)) * drawHeight),
    value: d.value,
  }));

  // Tạo đường cong mượt (Cubic Bezier)
  let path = `M ${points[0].x} ${points[0].y} `;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpX = (prev.x + curr.x) / 2;
    path += `C ${cpX} ${prev.y}, ${cpX} ${curr.y}, ${curr.x} ${curr.y} `;
  }

  // Vùng tô màu (Fill) chạy từ điểm cuối (points[length-1].x) thay vì chartWidth
  const fillPath = `${path} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  return (
    <View>
      <Svg width={chartWidth} height={height} style={{ overflow: 'visible' }}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#D90429" stopOpacity="0.15" />
            <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </LinearGradient>
        </Defs>

        <Path d={fillPath} fill="url(#grad)" />
        <Path d={path} fill="none" stroke="#D90429" strokeWidth="2.5" />

        {!hideDots &&
          points.map((p, i) => {
            const isHighlight = i === highlightIndex;
            return (
              <React.Fragment key={i}>
                {isHighlight ? (
                  <>
                    <Circle
                      cx={p.x}
                      cy={p.y}
                      r="8"
                      fill="#FFF0F0"
                      stroke="#D90429"
                      strokeWidth="2"
                    />
                    <Circle cx={p.x} cy={p.y} r="3" fill="#D90429" />
                  </>
                ) : (
                  <Circle cx={p.x} cy={p.y} r="3" fill="white" stroke="#D90429" strokeWidth="1.5" />
                )}

                {/* Chữ hiển thị */}
                <SvgText
                  x={p.x}
                  y={p.y - 12}
                  fontSize="11"
                  fill="#D90429"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {showPercentSign ? `${p.value}%` : p.value}
                </SvgText>
              </React.Fragment>
            );
          })}
      </Svg>

      {/* Trục X: Trục ngày tháng MON, TUE... cũng cần thụt vào 2 bên để đồng bộ với các điểm đồ thị */}
      <View
        className="mt-3 flex-row justify-between"
        style={{ paddingHorizontal: hPadding - 10 }} // Căn nhẹ lề 2 bên của các chữ hiển thị ngày
      >
        {data.map((d, i) => (
          <View key={i} className="items-center">
            <Text
              className={`text-[10px] font-bold ${i === highlightIndex ? 'text-[#D90429]' : 'text-[#7A6F6F]'}`}
            >
              {d.day}
            </Text>
            {i === highlightIndex && <View className="mt-1 h-[2px] w-4 bg-[#D90429]" />}
          </View>
        ))}
      </View>
    </View>
  );
};
