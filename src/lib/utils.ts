import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate Google Calendar URL
 */
export function generateGoogleCalendarUrl(
  title: string,
  description: string,
  location: string,
  startDateISO: string // e.g. "2026-08-27"
): string {
  // Event time: 2026-08-27 17:00:00 UTC / 20:00 Local
  const start = "20260827T170000Z";
  const end = "20260827T210000Z";

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    details: description,
    location: location,
    dates: `${start}/${end}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Download .ics calendar file for Apple Calendar / Outlook / iCal
 */
export function downloadIcsFile(
  title: string,
  description: string,
  location: string
) {
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//HuzeyfaAndHawraa//EngagementInvitation//AR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "SUMMARY:" + title,
    "DESCRIPTION:" + description.replace(/\n/g, "\\n"),
    "LOCATION:" + location,
    "DTSTART:20260827T170000Z",
    "DTEND:20260827T210000Z",
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", "حفل_خطوبة_حذيفة_وحوراء.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
