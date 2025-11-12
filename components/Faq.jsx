"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <section
      id="faqs"
      className="py-20 bg-white dark:bg-[#0d0d0d] overflow-hidden"
    >
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Image */}
          <div className="mx-auto w-full">
            <Image
              src="/resort/hero/whole.jpeg"
              alt="N Farms Staycation FAQ"
              width={680}
              height={644}
              className="w-full max-w-[90%] sm:max-w-full rounded-2xl object-cover mx-auto"
              unoptimized
            />
          </div>

          {/* Right Content */}
          <div className="lg:px-10">
            <p className="text-dark/75 dark:text-white/75 text-sm sm:text-base font-semibold flex gap-2 items-center mb-2">
              <Icon
                icon="ph:chat-circle-dots-fill"
                className="text-xl sm:text-2xl text-green-600"
              />
              FAQs
            </p>

            <h2 className="text-[9vw] sm:text-[44px] leading-[1.2] font-medium text-dark dark:text-white mb-3">
              Everything About N Farms Staycation
            </h2>

            <p className="text-dark/50 dark:text-white/50 sm:pr-10 mb-8 text-sm sm:text-base">
              Planning your getaway? Here are some common questions about
              bookings, facilities, and experiences at N Farms to make your stay
              seamless and memorable.
            </p>

            <Accordion
              type="single"
              defaultValue="item-1"
              collapsible
              className="w-full flex flex-col gap-5"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  1. How can I book my stay at N Farms?
                </AccordionTrigger>
                <AccordionContent>
                  You can easily book through our website or contact us directly
                  via phone or WhatsApp. Early reservations are recommended on
                  weekends and holidays.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>
                  2. What amenities are included during the stay?
                </AccordionTrigger>
                <AccordionContent>
                  We offer private pool access, BBQ setup, bonfire area, DJ
                  space, projector screen, indoor/outdoor games, and a full
                  farmhouse kitchen.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>
                  3. Can we host parties or events at N Farms?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely! N Farms is perfect for birthdays, family
                  gatherings, team outings, and small private events. Custom
                  decor and catering can be arranged upon request.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>
                  4. What are the check-in and check-out timings?
                </AccordionTrigger>
                <AccordionContent>
                  Booking hours are from <strong>11:00 AM to 10:00 AM</strong>{" "}
                  (23 hours total). We maintain a full-day booking window to
                  ensure guests have a complete and uninterrupted stay.
                  Early check-in or late check-out may be available depending on
                  schedule and availability.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>
                  5. Is food available at the staycation?
                </AccordionTrigger>
                <AccordionContent>
                  Yes! We provide farm-fresh vegetarian and non-vegetarian meals
                  prepared by our in-house chef. Guests may also bring their own
                  ingredients for a personalized BBQ experience.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>
                  6. What is the Advance Payment Policy?
                </AccordionTrigger>
                <AccordionContent>
                  To confirm your booking, an advance payment of{" "}
                  <strong>INR 3,000</strong> is required. This amount is{" "}
                  <strong>refundable or adjustable</strong> toward your booking
                  if the stay is completed successfully and the property is
                  maintained well.
                  <br />
                  <br />
                  In case of <strong>damages or repairs</strong>, the respective
                  amount will be deducted from the advance.
                  <br />
                  <br />
                  <strong>No-Show Policy:</strong> If the guest fails to arrive
                  on the booked date without prior notice, the advance
                  <strong> will not be refunded</strong> as the day remains
                  blocked for other potential guests.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
