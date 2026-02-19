"use client";

import { useState, useMemo, useEffect } from "react";
import { format, addDays, startOfToday, isBefore, isSameDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  Loader2,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";

interface BookingFormProps {
  title?: string;
  description?: string;
  image?: any;
  isPromo?: boolean;
  ctaLink?: string;
  availability: any;
}

export default function BookingForm({
  title,
  description,
  image,
  isPromo,
  ctaLink = "/booking",
  availability,
}: BookingFormProps) {
  const [date, setDate] = useState<Date | undefined>(startOfToday());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState<"datetime" | "details" | "success">(
    "datetime",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [existingBookings, setExistingBookings] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });

  // Fetch bookings for the selected date
  useEffect(() => {
    if (date) {
      const fetchBookings = async () => {
        try {
          const dateStr = format(date, "yyyy-MM-dd");
          const res = await fetch(`/api/bookings/check?date=${dateStr}`);
          const data = await res.json();
          setExistingBookings(data.bookedSlots || []);
        } catch (err) {
          console.error("Error fetching bookings:", err);
        }
      };
      fetchBookings();
    }
    setSelectedSlot(null);
  }, [date]);

  const slots = useMemo(() => {
    if (!date) return [];

    const dayName = format(date, "EEEE");
    const dayConfig = availability?.workingHours?.find(
      (h: any) => h.day === dayName,
    );

    if (dayConfig?.isClosed) return [];

    const openTime = dayConfig?.open || "09:00";
    const closeTime = dayConfig?.close || "17:00";
    const duration = availability?.slotDuration || 60;

    const availableSlots = [];
    let current = new Date(`2000-01-01T${openTime}`);
    const end = new Date(`2000-01-01T${closeTime}`);

    while (current < end) {
      const slotTime = format(current, "HH:mm");
      if (!existingBookings.includes(slotTime)) {
        availableSlots.push(slotTime);
      }
      current = new Date(current.getTime() + duration * 60000);
    }

    return availableSlots;
  }, [date, availability, existingBookings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isPromo) {
      window.location.href = ctaLink;
      return;
    }

    if (!date || !selectedSlot) {
      alert("Please select a date and time first.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          date: format(date, "yyyy-MM-dd"),
          slot: selectedSlot,
          notes: formData.notes,
        }),
      });

      if (res.ok) {
        setStep("success");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (step === "success") {
    return (
      <div className="max-w-xl mx-auto text-center py-20 space-y-8 bg-white p-12 rounded-3xl shadow-xl border border-accent/10">
        <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 text-accent" />
        </div>
        <div className="space-y-4">
          <Heading type="h2">Booking Received!</Heading>
          <Text variant="muted">
            We've received your booking request for{" "}
            <span className="font-bold text-foreground">
              {date && format(date, "MMMM do")} at {selectedSlot}
            </span>
            . Our team will contact you shortly to confirm.
          </Text>
        </div>
        <Button
          onClick={() => {
            setStep("datetime");
            setSelectedSlot(null);
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              notes: "",
            });
          }}
          className="rounded-full px-8"
        >
          Book Another Session
        </Button>
      </div>
    );
  }

  const currentDayWorkingHours = date
    ? availability?.workingHours?.find(
        (h: any) => h.day === format(date, "EEEE"),
      )
    : null;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Column 1: Info & Image */}
        <div className="lg:col-span-3 space-y-10">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full backdrop-blur-sm">
              <Text
                as="span"
                className="text-[10px] font-semibold uppercase tracking-[0.5em] text-accent"
              >
                Consultation
              </Text>
            </div>
            <Heading type="h1" className="text-foreground lg:text-5xl">
              {title || "Booking"}
            </Heading>
            <Text variant="muted" className="text-lg leading-relaxed max-w-sm">
              {description ||
                "Ready for a transformative experience? Book your appointment now and let us craft a style that defines you."}
            </Text>
          </div>

          {image && (
            <div className="relative aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-black/5">
              <Image
                src={urlForImage(image).url()}
                alt={title || "Booking Illustration"}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>

        {/* Column 2: Calendar & Working Hours */}
        <div className="lg:col-span-5 bg-white/50 backdrop-blur-sm rounded-[2.5rem] p-10 shadow-lg border border-white/40 space-y-10">
          <div className="space-y-8">
            <div className="flex justify-center p-2 rounded-[2.5rem]">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) =>
                  isBefore(date, startOfToday()) ||
                  availability?.blockedDates?.some((d: string) =>
                    isSameDay(new Date(d), date),
                  )
                }
                className="w-full p-8 shadow-inner"
                classNames={{
                  root: "w-full",
                  months: "w-full",
                  month: "w-full space-y-8",
                  nav: "flex items-center justify-between w-full mb-4",
                  button_previous:
                    "text-foreground/50 hover:text-accent transition-colors p-2",
                  button_next:
                    "text-foreground/50 hover:text-accent transition-colors p-2",
                  month_caption: "flex justify-center items-center",
                  caption_label:
                    "text-2xl font-light tracking-tight text-foreground px-4",
                  table: "w-full border-collapse",
                  head_row: "flex w-full mb-6",
                  head_cell:
                    "text-muted-foreground/50 flex-1 font-medium text-xs text-center",
                  week: "flex w-full mt-4 justify-between",
                  day: cn(
                    "flex-1 aspect-square p-0 font-medium aria-selected:opacity-100 rounded-lg hover:bg-accent/5 transition-all duration-300 flex items-center justify-center text-sm w-full",
                  ),
                  day_selected:
                    "bg-primary! text-white! hover:bg-primary/90! hover:text-white! focus:bg-primary! focus:text-white! shadow-lg shadow-primary/20 font-bold scale-110 z-10",
                  day_today: "text-accent font-bold ring-2 ring-accent/20",
                  day_outside: "text-muted-foreground/10 opacity-30",
                  day_disabled: "text-muted-foreground/20 opacity-30",
                  day_hidden: "invisible",
                }}
                components={{
                  Chevron: ({ orientation }) => {
                    if (orientation === "left")
                      return <ChevronLeft className="w-5 h-5" />;
                    if (orientation === "right")
                      return <ChevronRight className="w-5 h-5" />;
                    return <></>;
                  },
                }}
              />
            </div>
          </div>

          <div className="space-y-10 border-t border-black/5 pt-10">
            <div className="space-y-4">
              <Heading type="h3" className="text-2xl">
                Working Hours
              </Heading>
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-black/5">
                  <span className="text-muted-foreground font-medium">
                    Working Days
                  </span>
                  <span className="font-bold">
                    {currentDayWorkingHours?.isClosed
                      ? "Closed"
                      : `${currentDayWorkingHours?.open || "9AM"} - ${currentDayWorkingHours?.close || "9PM"}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Time Slot Selection (Integrated below Working Hours for space efficiency) */}
            <div className="space-y-4">
              <Text className="text-sm font-semibold text-accent uppercase tracking-widest">
                Available Slots
              </Text>
              <div className="grid grid-cols-4 gap-3">
                {slots.slice(0, 8).map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={cn(
                      "py-2 px-3 rounded-lg text-xs font-bold transition-all border",
                      selectedSlot === slot
                        ? "bg-accent border-accent text-white shadow-md"
                        : "bg-white border-black/5 hover:border-accent text-foreground",
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Contact Form */}
        <div className="lg:col-span-4 bg-[#2D2D2D] rounded-[2.5rem] p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-12">
            <Heading type="h2" className="text-3xl text-white leading-tight">
              We will call you
            </Heading>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-1 border-b border-white/10 pb-2">
                <label className="text-xs text-white/40 uppercase tracking-widest font-bold">
                  First Name
                </label>
                <input
                  required
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full bg-transparent border-none focus:ring-0 text-lg p-0 placeholder:text-white/10"
                  placeholder="Your first name"
                />
              </div>
              <div className="space-y-1 border-b border-white/10 pb-2">
                <label className="text-xs text-white/40 uppercase tracking-widest font-bold">
                  Last Name
                </label>
                <input
                  required
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="w-full bg-transparent border-none focus:ring-0 text-lg p-0 placeholder:text-white/10"
                  placeholder="Your last name"
                />
              </div>
              <div className="space-y-1 border-b border-white/10 pb-2">
                <label className="text-xs text-white/40 uppercase tracking-widest font-bold">
                  Phone
                </label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full bg-transparent border-none focus:ring-0 text-lg p-0 placeholder:text-white/10"
                  placeholder="Your phone number"
                />
              </div>
              <div className="space-y-1 border-b border-white/10 pb-2">
                <label className="text-xs text-white/40 uppercase tracking-widest font-bold">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-transparent border-none focus:ring-0 text-lg p-0 placeholder:text-white/10"
                  placeholder="Your email address"
                />
              </div>

              <div className="pt-8">
                <Button
                  type="submit"
                  disabled={isLoading || (!isPromo && !selectedSlot)}
                  className="bg-white text-black hover:bg-gray-100 rounded-full px-10 py-7 text-lg font-bold w-full sm:w-auto shadow-xl"
                >
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : isPromo ? (
                    "Book appointment"
                  ) : (
                    "Reserve Session"
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Subtle design element */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
        </div>
      </div>
    </div>
  );
}
