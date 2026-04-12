import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { apiFetch } from "../../../utils/api";

const ScheduleTable = () => {
  const [schedules, setSchedules] = useState([]);
  const [selectedWeekStart, setSelectedWeekStart] = useState(
    dayjs().startOf("week")
  ); // Tuần hiện tại (bắt đầu từ Chủ nhật, 01/06/2025)
  const [weekOptions, setWeekOptions] = useState([]);

  // Tạo danh sách các ngày trong tuần từ selectedWeekStart
  const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
    selectedWeekStart.add(i, "day").format("YYYY-MM-DD")
  );

  // Tạo danh sách tuần cho dropdown (12 tuần: 6 tuần trước và 6 tuần sau tuần hiện tại)
  const generateWeekOptions = () => {
    const currentWeek = dayjs().startOf("week");
    const weeks = [];
    for (let i = -6; i <= 6; i++) {
      const weekStart = currentWeek.add(i, "week");
      weeks.push(weekStart);
    }
    return weeks;
  };

  // Gọi API để lấy lịch học trong khoảng thời gian
  const fetchSchedules = async (start, end) => {
    try {
      const startDate = start.format("YYYY-MM-DD");
      const endDate = end.format("YYYY-MM-DD");
      const response = await apiFetch(
        `/schedule/between?startDate=${startDate}&endDate=${endDate}`
      );
      const data = await response.json();
      if (response.ok && data.status === 200) {
        setSchedules(data.data || []);
      } else {
        toast.error(`Lỗi: ${data.message || "Không thể lấy dữ liệu lịch học"}`);
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
      toast.error("Có lỗi xảy ra khi kết nối với API");
    }
  };

  // Tạo dữ liệu lịch học theo ngày
  const organizeSchedulesByDay = () => {
    const calendarData = daysOfWeek.map((day) =>
      schedules.filter((schedule) =>
        dayjs(schedule.classDate).isSame(day, "day")
      )
    );
    return calendarData;
  };

  useEffect(() => {
    const weeks = generateWeekOptions();
    setWeekOptions(weeks);

    // Lấy lịch học cho tuần được chọn
    const weekEnd = selectedWeekStart.add(6, "day").endOf("day");
    fetchSchedules(selectedWeekStart, weekEnd);
  }, [selectedWeekStart]);

  const calendarData = organizeSchedulesByDay();

  return (
    <div className="max-w-max mx-auto bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
      <h2 className="text-3xl font-bold text-gray-100 mb-6">
        Lịch học trung tâm Pinyin Centre
      </h2>

      {/* Dropdown chọn tuần */}
      <div className="mb-6 flex items-center space-x-4">
        <label className="text-gray-300 font-medium">Chọn tuần:</label>
        <select
          value={selectedWeekStart.format("YYYY-MM-DD")}
          onChange={(e) => setSelectedWeekStart(dayjs(e.target.value))}
          className="bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
        >
          {weekOptions.map((week) => (
            <option
              key={week.format("YYYY-MM-DD")}
              value={week.format("YYYY-MM-DD")}
              className="text-gray-50"
            >
              Tuần {week.format("DD/MM/YYYY")} -{" "}
              {week.add(6, "day").format("DD/MM/YYYY")}
            </option>
          ))}
        </select>
      </div>

      {/* Bảng lịch học */}
      {schedules.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                {daysOfWeek.map((day) => (
                  <th
                    key={day}
                    className="border border-gray-700 bg-gray-900 text-gray-200 p-3 font-semibold text-center"
                  >
                    {dayjs(day).format("ddd, DD/MM")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {calendarData.map((daySchedules, index) => (
                  <td
                    key={daysOfWeek[index]}
                    className="border border-gray-700 p-3 min-w-[180px] align-top"
                  >
                    {daySchedules.length > 0 ? (
                      daySchedules.map((schedule, slotIndex) => (
                        <div
                          key={slotIndex}
                          className="bg-gray-700 rounded-lg p-3 mb-3 shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                          <p className="font-semibold text-gray-100">
                            {schedule.className || "Lớp không xác định"}
                          </p>
                          <p className="text-gray-400">
                            {schedule.teacher?.name || "Chưa có giảng viên"}
                          </p>
                          <p className="text-gray-500">
                            {schedule.startTime.slice(0, 5)} -{" "}
                            {schedule.endTime.slice(0, 5)}
                          </p>
                          {schedule.link && (
                            <a
                              href={schedule.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline text-sm"
                            >
                              Link
                            </a>
                          )}
                          {schedule.description && (
                            <p className="text-gray-500 text-sm mt-1">
                              {schedule.description}
                            </p>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center italic">
                        Không có lịch học
                      </p>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          Không có lịch học trong tuần này.
        </p>
      )}
    </div>
  );
};

export default ScheduleTable;
