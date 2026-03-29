import React, { useMemo } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { CurveType, LineChart } from 'react-native-gifted-charts';
import Svg, { Circle, Line, Polygon, Text as SvgText } from 'react-native-svg';

import { IconFeedBackRealTime } from '@/components/icon';
import { useAppTheme } from '@/hooks/useAppTheme';

import { CARD_BG_DARK } from '../constants/profile.constants';

const accentColor = '#D32F2F';
const screenWidth = Dimensions.get('window').width;

export const SkillProficiency = () => {
  const { colors, isDark } = useAppTheme();

  const chartTheme = useMemo(
    () => ({
      cardBg: isDark ? CARD_BG_DARK : '#FFFFFF',
      gridStroke: isDark ? '#44403C' : '#F3F4F6',
      radarLabelFill: isDark ? '#A8A29E' : '#4B5563',
      areaEndFill: isDark ? CARD_BG_DARK : '#FFFFFF',
      dataPointInner: isDark ? colors.surfaceElevated : '#FFFFFF',
    }),
    [colors.surfaceElevated, isDark]
  );
  // --- 1. RADAR CHART LOGIC (GIỮ NGUYÊN) ---
  const radarCenter = 130;
  const radarRadius = 80;
  const angles = [
    -Math.PI / 2,
    -Math.PI / 2 + (2 * Math.PI) / 5,
    -Math.PI / 2 + (4 * Math.PI) / 5,
    -Math.PI / 2 + (6 * Math.PI) / 5,
    -Math.PI / 2 + (8 * Math.PI) / 5,
  ];

  const radarData = [
    { label: 'Phát âm', value: 85, dotColor: '#10B981' },
    { label: 'Liên quan', value: 85, dotColor: '#F97316' },
    { label: 'Từ vựng', value: 68, dotColor: '#10B981' },
    { label: 'Ngữ pháp', value: 94, dotColor: '#F97316' },
    { label: 'Lưu loát', value: 72, dotColor: '#10B981' },
  ];

  const webs = [1, 0.8, 0.6, 0.4, 0.2].map(scale =>
    angles
      .map(
        a =>
          `${radarCenter + radarRadius * scale * Math.cos(a)},${radarCenter + radarRadius * scale * Math.sin(a)}`
      )
      .join(' ')
  );

  const dataPoints = radarData.map((item, i) => ({
    x: radarCenter + radarRadius * (item.value / 100) * Math.cos(angles[i]),
    y: radarCenter + radarRadius * (item.value / 100) * Math.sin(angles[i]),
    ...item,
  }));

  // --- 2. DỮ LIỆU LINE CHART (ĐÃ SỬA LẠI ĐỂ TEXT HIỂN THỊ) ---
  const lineData = [
    { value: 72, label: 'T2', dataPointText: '72%' },
    { value: 82, label: 'T3', dataPointText: '82%' },
    { value: 78, label: 'T4', dataPointText: '78%' },
    { value: 83, label: 'T5', dataPointText: '83%' },
    {
      value: 85,
      label: 'T6',
      dataPointText: '85%',
      customDataPoint: () => (
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            borderWidth: 2,
            borderColor: accentColor,
            backgroundColor: chartTheme.dataPointInner,
          }}
        />
      ),
      labelComponent: () => (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 11, fontWeight: 'bold', color: accentColor }}>T6</Text>
          <View style={{ marginTop: 2, height: 2, width: 16, backgroundColor: accentColor }} />
        </View>
      ),
    },
    { value: 83, label: 'T7', dataPointText: '83%' },
    { value: 78, label: 'CN', dataPointText: '78%' },
  ];

  // Tính toán chia khoảng cách trục X để chữ MON và SUN không bị lẹm 2 bên
  const chartWidth = screenWidth - 70;
  const startAndEndSpacing = 20;
  const stepSpacing = (chartWidth - startAndEndSpacing * 2) / 6;

  return (
    <View
      className="overflow-hidden rounded-3xl shadow-sm"
      style={{ elevation: 2, backgroundColor: chartTheme.cardBg }}
    >
      {/* --- PHẦN 1: SKILL PROFICIENCY (RADAR) --- */}
      <View
        className="border-b border-dashed p-6"
        style={{ borderBottomColor: isDark ? colors.border : '#E5E7EB' }}
      >
        <View className="mb-6 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <IconFeedBackRealTime width={20} height={20} color={accentColor} />
            <Text className="ml-2 text-lg font-bold" style={{ color: colors.text }}>
              Năng lực
            </Text>
          </View>
          <Text className="font-bold" style={{ color: accentColor }}>
            TỔNG QUAN: 85%
          </Text>
        </View>

        <View className="items-center justify-center">
          <Svg width={260} height={260}>
            {webs.map((points, index) => (
              <Polygon
                key={index}
                points={points}
                stroke={chartTheme.gridStroke}
                strokeWidth="1.5"
                fill="none"
              />
            ))}
            {angles.map((angle, index) => (
              <Line
                key={index}
                x1={radarCenter}
                y1={radarCenter}
                x2={radarCenter + radarRadius * Math.cos(angle)}
                y2={radarCenter + radarRadius * Math.sin(angle)}
                stroke={chartTheme.gridStroke}
                strokeWidth="1.5"
              />
            ))}
            <Polygon
              points={dataPoints.map(p => `${p.x},${p.y}`).join(' ')}
              fill={accentColor}
              fillOpacity="0.1"
              stroke={accentColor}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {dataPoints.map((point, index) => (
              <Circle key={index} cx={point.x} cy={point.y} r="4" fill={point.dotColor} />
            ))}
            {dataPoints.map((point, index) => {
              const textR = radarRadius + 28;
              return (
                <SvgText
                  key={index}
                  x={radarCenter + textR * Math.cos(angles[index])}
                  y={radarCenter + textR * Math.sin(angles[index])}
                  fontSize="12"
                  fontWeight="600"
                  fill={chartTheme.radarLabelFill}
                  textAnchor="middle"
                >
                  {point.label}
                  <SvgText
                    x={radarCenter + textR * Math.cos(angles[index])}
                    y={radarCenter + textR * Math.sin(angles[index]) + 16}
                    fontSize="13"
                    fontWeight="bold"
                    fill={accentColor}
                    textAnchor="middle"
                  >
                    {point.value}%
                  </SvgText>
                </SvgText>
              );
            })}
          </Svg>
        </View>
      </View>

      {/* --- PHẦN 2: THỐNG KÊ HÀNG NGÀY --- */}
      <View className="p-5 pt-6 pb-8">
        <Text className="mb-6 text-lg font-bold" style={{ color: colors.text }}>
          Thống kê hàng ngày
        </Text>

        {/* Đẩy lùi sang trái một chút để biểu đồ cân giữa hơn */}
        <View style={{ marginLeft: -15 }}>
          <LineChart
            data={lineData}
            width={chartWidth}
            height={140}
            curved
            curveType={CurveType.CUBIC}
            color={accentColor}
            thickness={3}
            startFillColor={accentColor}
            endFillColor={chartTheme.areaEndFill}
            startOpacity={0.2}
            endOpacity={0}
            areaChart
            // --- CÁCH FIX HIỂN THỊ SỐ % CHUẨN TYPESCRIPT ---
            // Thay vì dùng hideDataPoints={true}, ta cho chấm tròn tàng hình
            dataPointsRadius={0}
            dataPointsColor="transparent"
            // Config cho Text % nổi lên trên
            textColor={accentColor}
            textFontSize={11}
            textShiftY={-12} // Đẩy số lùi lên trên
            textShiftX={-10} // Đẩy số lùi sang trái cho căn giữa điểm
            // Layout & Trục X/Y
            rulesType="dashed"
            rulesColor="#F3F4F6"
            yAxisThickness={0}
            xAxisThickness={0}
            hideYAxisText={true}
            maxValue={100}
            yAxisOffset={30}
            // --- CÁCH FIX CHỮ SUN VÀ MON BỊ CẮT ---
            initialSpacing={startAndEndSpacing} // Thêm khoảng trống ở đầu cho MON
            endSpacing={startAndEndSpacing} // Thêm khoảng trống ở cuối cho SUN
            spacing={stepSpacing} // Khoảng cách đều giữa các ngày
            xAxisLabelTextStyle={{ color: colors.muted, fontSize: 11, fontWeight: 'bold' }}
          />
        </View>
      </View>
    </View>
  );
};
