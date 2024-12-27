"use client"
import Image from "next/image";
import { Button } from "primereact/button";
import type { ReactElement } from "react";
import React, { useRef, useState } from "react";
import Logo from "~/svg/logo.svg";
import LandingHero from "~/img/landing-hero.png";
import HeroCreation from "~/img/hero-creation.png";
import HeroInvitation from "~/img/hero-invitation.png";
import HeroEmail from "~/img/hero-email.png";
import BgHeroWa from "~/img/bg-hero-wa.png";
import BgHeroWaShadow from "~/img/bg-hero-wa-shadow.png";
import BgHeroEvent from "~/img/bg-hero-event.png";
import LogoFlat from "~/svg/logo-flat.svg";
import type { OverlayPanel } from "primereact/overlaypanel";
import { AnimatePresence, motion } from "framer-motion";
import ButtonLanguage from "@/components/ui/button-language";
import '@/styles/landing-page/style.css'


export default function LandingPage(): ReactElement {

  const [activeComponent, setActiveComponent] = useState(1);

  const signIn = () => {
    window.location.href = '/auth/sign-in';

  }

  const handleComponentChange = (nextComponent) => {
    setActiveComponent(nextComponent);
  };

  const op = useRef<OverlayPanel>(null);

  const pageHero1 = (
    <div className="tw-bg-base-purple tw-flex tw-justify-between tw-pr-[54px]">
      <Image alt="Hero Email" height={690} src={HeroEmail} width={576} />
      <div className="tw-flex tw-flex-col tw-items-end tw-justify-center tw-space-y-8">
        <h1 className="tw-align-top tw-leading-normal tw-max-w-[844px] tw-text-[96px] tw-text-right tw-text-white">Direct Email Invitations</h1>
        <p className="tw-leading-normal tw-max-w-[958px] tw-text-[24px] tw-text-right tw-text-white">
          Streamline the invitation process with direct email invitations sent to participants. Notulensia ensures that invitations reach your desired participants promptly and efficiently.
        </p>
        <Button className="tw-h-[86px] tw-w-[285px]" label="Try It ->" onClick={signIn} outlined style={{ borderColor: "white", borderRadius: "1000px", color: "white", fontSize: "25px", fontWeight: "400" }} />
      </div>
    </div>
  );

  const pageHero2 = (
    <div className="tw-flex tw-flex-row-reverse tw-gap-4 tw-justify-between">
      <Image alt="Hero Invitation" height={690} src={HeroInvitation} width={576} />
      <div className="tw-flex tw-flex-col tw-items-end tw-justify-center tw-space-y-8 ">
        <h1 className="tw-align-top tw-leading-normal tw-max-w-[896px] tw-text-[96px] tw-text-base-purple tw-text-right">Invite Participants with Eases</h1>
        <p className="tw-leading-normal tw-max-w-[938px] tw-text-[24px] tw-text-base-purple tw-text-right">
          Include a feature for inviting participants, enabling you to send invitations quickly and effortlessly. Notulensia streamlines the invitation process, ensuring the presence of desired participants.
        </p>
        <Button className="tw-h-[86px] tw-w-[285px]" label="Try It ->" onClick={signIn} outlined style={{ borderColor: "#334798", borderRadius: "1000px", color: "#334798", fontSize: "25px", fontWeight: "400" }} />
      </div>
    </div>
  );

  const pageHero3 = (
    <div className="tw-bg-base-pink tw-flex tw-justify-between tw-pr-[54px]">
      <Image alt="Hero Creation" height={690} src={HeroCreation} width={576} />
      <div className="tw-flex tw-flex-col tw-items-end tw-justify-center tw-space-y-8">
        <h1 className="tw-align-top tw-leading-normal tw-max-w-[844px] tw-text-[96px] tw-text-right tw-text-white">Hassle-Free Meeting Creation</h1>
        <p className="tw-leading-normal tw-max-w-[958px] tw-text-[24px] tw-text-right tw-text-white">
          Introducing a feature that simplifies the meeting creation process. With Notulensia, setting up a meeting is quick and intuitive,
          allowing you to focus on the substance of the discussion rather than the logistics.
        </p>
        <Button className="tw-h-[86px] tw-w-[285px]" label="Try It ->" onClick={signIn} outlined style={{ borderColor: "white", borderRadius: "1000px", color: "white", fontSize: "25px", fontWeight: "400" }} />
      </div>
    </div>
  );


  return (
    <>
      <div className="tw-font-exo tw-font-[600] tw-text-[20px] tw-w-full tw-h-[100px] tw-bg-white tw-flex tw-fixed tw-items-center tw-justify-between tw-px-10">
        <div className="tw-flex tw-items-center">
          <Logo className="tw-h-[57px] tw-w-[353px] tw-mx-32" />
          <nav className="tw-flex tw-space-x-48">
            <a href="#about">About</a>
            <a href="#service">Service</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
        <div className="tw-flex tw-gap-5 tw-justify-center">
          <ButtonLanguage />
          <Button label="Log In" onClick={signIn} style={{ backgroundColor: "#334798", borderRadius: "1000px", fontFamily: "Exo", fontSize: "20px", fontWeight: 600, height: "58px", width: "179px" }} />
        </div>
      </div>


      <main className="tw-font-exo tw-w-full tw-bg-white tw-border-blue-400 tw-pt-[110px] tw-flex tw-flex-col tw-space-y-10">
        <article className="tw-flex tw-items-start tw-justify-center tw-pl-10 tw-pr-10 tw-w-full">
          <div className="tw-p-16 tw-w-[50%]">
            <div className="tw-max-w-[800px] tw-mb-[20%]">
              <h1 className="tw-leading-[100px] tw-text-[85px] tw-text-base-purple tw-font-[600] tw-w-full">Simplify Your Day, Organize Your Schedule</h1>
              <p className="tw-leading-relaxed tw-text-[30px] tw-text-red-500">
                This website streamlines your meeting scheduling,<br />
                making it easy<br />
                to plan meetings, invite participants,<br />
                and manage schedules efficiently.<br />
              </p>
            </div>
            <Button className="tw-w-[285px] tw-h-[86px]" label="Get Started" onClick={signIn} style={{ backgroundColor: "#334798", borderRadius: "1000px", fontSize: "25px", fontWeight: "800" }} />
          </div>
          <Image
            alt="Hero"
            className="tw-pt-10"
            height={778}
            src={LandingHero}
            width={835}
          />
        </article>

        <article className="tw-flex tw-flex-col tw-text-xs tw-w-full tw-justify-center tw-items-center tw-space-y-5 tw-pl-10 tw-pr-10">
          <div className="tw-space-y-8">
            <h1 className="tw-text-base-purple tw-text-center tw-text-[64px]">Event Management</h1>
            <p className="tw-text-center tw-text-base-purple tw-text-[24px] tw-font-notosan">Our Event Management feature is meticulously crafted to ensure every occasion you host is a resounding success.</p>
          </div>

          <div className="tw-w-[95%] tw-font-notosan ">
            <div className="tw-relative tw-w-full tw-h-[69px] tw-grid tw-grid-cols-3 tw-items-center tw-justify-center tw-text-[32px] tw-font-[600]">
              <motion.div
                animate={{
                  backgroundColor: activeComponent === 2 ? '#334798' : '#ffffff',
                  left: `calc(${activeComponent - 1} * (100% / 3) + (100% / 10.2))`
                }}
                className="tw-absolute tw-w-60 tw-h-1 tw-rounded-full tw-bottom-1"
                initial={false}
                transition={{ duration: 0.8, damping: 20, ease: 'easeIn', stiffness: 100 }}
              />
              <button
                className="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-text-white tw-bg-base-purple tw-outline-4"
                onClick={() => { handleComponentChange(1); }}
                onMouseEnter={() => { setActiveComponent(1); }}
                type="button"
              >
                Direct Email
              </button>
              <button
                className="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center"
                onClick={() => { handleComponentChange(2); }}
                onMouseEnter={() => { setActiveComponent(2); }}
                type="button"
              >
                Invite Participants
              </button>
              <button
                className="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-text-white tw-bg-base-pink"
                onClick={() => { handleComponentChange(3); }}
                onMouseEnter={() => { setActiveComponent(3); }}
                type="button"
              >
                Create Meeting
              </button>
            </div>

            <div className="tw-h-[690px]">
              <AnimatePresence mode="wait">
                {activeComponent === 1 && (
                  <motion.div
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    initial={{ x: "-100%" }}
                    key="component-1"
                    transition={{ duration: 2, ease: 'linear', x: { duration: 0.5 } }}
                  >
                    {pageHero1}
                  </motion.div>
                )}
                {activeComponent === 2 && (
                  <motion.div
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    initial={{ x: "100%" }}
                    key="component-2"
                    transition={{ duration: 2, ease: 'linear', x: { duration: 0.5 } }}
                  >
                    {pageHero2}
                  </motion.div>
                )}
                {activeComponent === 3 && (
                  <motion.div
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    initial={{ x: "-100%" }}
                    key="component-3"
                    transition={{ duration: 2, ease: 'linear', x: { duration: 0.5 } }}
                  >
                    {pageHero3}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </article>

        <article className="tw-flex tw-font-notosan tw-h-[1080px]">
          <div className="tw-bg-base-purple tw-flex tw-flex-1 tw-flex-col tw-items-center tw-justify-start tw-pt-2 tw-space-y-10">
            <div className="tw-flex tw-flex-col tw-items-center">
              <Image alt="Bg Hero Wa" className="-tw-mt-2" height={24} src={BgHeroWaShadow} width={258} />
              <Image alt="Bg Hero Wa" height={653} src={BgHeroWa} width={797} />
            </div>
            <div className="tw-flex tw-flex-col tw-items-center tw-max-w-[741px] tw-space-y-10">
              <h1 className="tw-font-[600] tw-leading-normal tw-text-center tw-text-[64px] tw-text-white">WhatsApp Notifications</h1>
              <p className="tw-font-[400] tw-leading-normal tw-text-center tw-text-[24px] tw-text-white tw-w-[90%]">Connect with your participants more closely with notifications through WhatsApp. Receive important information and meeting updates directly in your favorite messaging app.</p>
            </div>
          </div>
          <div className="tw-relative">
            <Image alt="Bg Hero Event" className="tw-bg-base-pink tw-object-contain tw-z-0" height={1080} src={BgHeroEvent} width={1014} />
            <div className="tw-absolute tw-bottom-[131px] tw-right-[95px] tw-space-y-5 tw-w-[708px] tw-z-10">
              <h1 className="tw-font-[600] tw-text-[64px] tw-text-right tw-text-white">Event Directory</h1>
              <p className="tw-font-[400] tw-leading-normal tw-pl-5 tw-text-[24px] tw-text-right tw-text-white">Structured Meeting Evaluation: Explore the innovative Event Directory feature, allowing you to evaluate meeting outcomes with structured and organized feedback. Notulensia ensures that your post-meeting assessments are comprehensive and insightful.</p>
            </div>
          </div>
        </article>


        <footer className="tw-bg-base-purple tw-bg-opacity-50 tw-font-notosan">
          <div className="tw-flex tw-justify-center tw-items-center">
            <LogoFlat className="tw-w-[450px] tw-h-[73px] tw-pl-[129px]" />
            <div className="tw-text-center tw-text-[32px] tw-py-10 tw-flex tw-flex-1 tw-justify-center tw-space-x-32">
              <a href="#">Company</a>
              <a href="#">Why Notulensia?</a>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </div>

          </div>
          <p className="tw-text-center tw-mt-5">&copy; 2024 PT Sarana Integrasi. All rights reserved.</p>
        </footer>

      </main>
    </>
  );
}
