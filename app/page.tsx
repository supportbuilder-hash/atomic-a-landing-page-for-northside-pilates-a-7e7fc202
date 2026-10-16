"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Sparkles, ArrowRight, Activity, Heart, User, Clock, Star, Check, MapPin, Phone, Mail } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

interface FactItem {
  value: string;
  label: string;
}

interface ClassItem {
  title: string;
  description: string;
  duration: string;
  level: string;
}

interface InstructorItem {
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

interface HourItem {
  day: string;
  hours: string;
}

interface ScheduleClass {
  time: string;
  title: string;
  instructor: string;
}

interface ScheduleDay {
  day: string;
  classes: ScheduleClass[];
}

interface TrialForm {
  name: string;
  email: string;
  phone: string;
  classType: string;
}

const CLASS_ICONS = [Activity, Heart, Sparkles, User, Clock, Star];

export default function Home() {
  const t = useTranslations();

  const factsRaw = t.raw("overview.facts");
  const FACTS = (Array.isArray(factsRaw) ? factsRaw : []) as FactItem[];

  const classItemsRaw = t.raw("classes.items");
  const CLASS_ITEMS = (Array.isArray(classItemsRaw) ? classItemsRaw : []) as ClassItem[];

  const instructorItemsRaw = t.raw("instructors.items");
  const INSTRUCTOR_ITEMS = (Array.isArray(instructorItemsRaw) ? instructorItemsRaw : []) as InstructorItem[];

  const pricingPlansRaw = t.raw("pricing.plans");
  const PRICING_PLANS = (Array.isArray(pricingPlansRaw) ? pricingPlansRaw : []) as PricingPlan[];

  const trialBenefitsRaw = t.raw("trial.benefits");
  const TRIAL_BENEFITS = (Array.isArray(trialBenefitsRaw) ? trialBenefitsRaw : []) as string[];

  const hoursItemsRaw = t.raw("contact.hours");
  const HOURS_ITEMS = (Array.isArray(hoursItemsRaw) ? hoursItemsRaw : []) as HourItem[];

  const scheduleRaw = t.raw("schedule.days");
  const SCHEDULE_DAYS = (Array.isArray(scheduleRaw) ? scheduleRaw : []) as ScheduleDay[];

  const [form, setForm] = useState<TrialForm>({
    name: "",
    email: "",
    phone: "",
    classType: CLASS_ITEMS[0]?.title ?? "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setSubmitted(true);
  }

  return (
    <main>
      <Reveal>
        <section className="relative overflow-hidden bg-mesh">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-28 md:py-36 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm font-medium text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                {t("hero.eyebrow")}
              </span>
              <h1 className="mt-6 text-balance text-4xl font-display font-semibold tracking-tight text-foreground md:text-6xl">
                {t("hero.titleStart")}{" "}
                <span className="text-gradient">{t("hero.titleHighlight")}</span>
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                {t("hero.subtitle")}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="#trial"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {t("hero.primaryCta")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="#classes"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {t("hero.secondaryCta")}
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="motion-safe:animate-float glass-strong rounded-3xl p-3 shadow-glow">
                <img
                  src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/0956df5de9fd477782b09c3ac46d0bcd.jpg"
                  alt="Instructor guiding a client through a reformer pilates session"
                  className="aspect-[4/5] h-full w-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="overview" className="bg-background py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-2xl font-display font-semibold tracking-tight text-foreground md:text-3xl">
                {t("overview.title")}
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{t("overview.subtitle")}</p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
              {FACTS.map((fact, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="surface-elevated rounded-2xl border border-border bg-card p-6 text-center">
                    <div className="text-3xl font-display font-semibold text-gradient">{fact.value}</div>
                    <p className="mt-2 text-sm text-muted-foreground">{fact.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="classes" className="bg-muted/30 py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("classes.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-display font-semibold tracking-tight text-foreground md:text-4xl">
                {t("classes.title")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t("classes.subtitle")}</p>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CLASS_ITEMS.map((item, i) => {
                const Icon = CLASS_ICONS[i % CLASS_ICONS.length] ?? Sparkles;
                return (
                  <Reveal key={i} delay={i * 0.06}>
                    <div className="group h-full rounded-2xl border border-border bg-card p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <h3 className="mt-5 text-lg font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                      <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
                        <span className="rounded-full bg-secondary px-3 py-1">{item.duration}</span>
                        <span className="rounded-full bg-secondary px-3 py-1">{item.level}</span>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="schedule" className="bg-background py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("schedule.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-display font-semibold tracking-tight text-foreground md:text-4xl">
                {t("schedule.title")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t("schedule.subtitle")}</p>
            </div>
            {SCHEDULE_DAYS.length > 0 && (
              <div className="mt-14">
                <Tabs defaultValue={SCHEDULE_DAYS[0]?.day ?? ""}>
                  <div className="-mx-6 overflow-x-auto px-6 pb-2">
                    <TabsList className="flex-nowrap gap-1 whitespace-nowrap">
                      {SCHEDULE_DAYS.map((d) => (
                        <TabsTrigger key={d.day} value={d.day}>
                          {d.day}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                  {SCHEDULE_DAYS.map((d) => (
                    <TabsContent key={d.day} value={d.day}>
                      <Card>
                        <CardContent className="divide-y divide-border p-0">
                          {d.classes.map((c, i) => (
                            <div
                              key={`${d.day}-${i}`}
                              className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between"
                            >
                              <div className="flex items-center gap-3">
                                <Clock className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                                <span className="text-sm font-medium text-foreground">{c.time}</span>
                              </div>
                              <div className="sm:flex-1 sm:px-6">
                                <span className="text-sm font-semibold text-foreground">{c.title}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">{c.instructor}</span>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            )}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="instructors" className="bg-muted/30 py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("instructors.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-display font-semibold tracking-tight text-foreground md:text-4xl">
                {t("instructors.title")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t("instructors.subtitle")}</p>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {INSTRUCTOR_ITEMS.map((item, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="surface-elevated overflow-hidden rounded-2xl border border-border bg-card">
                    <img src={item.image} alt={item.name} className="aspect-square w-full object-cover" />
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                      <p className="mt-1 text-sm font-medium text-primary">{item.role}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.bio}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="pricing" className="bg-background py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("pricing.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-display font-semibold tracking-tight text-foreground md:text-4xl">
                {t("pricing.title")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t("pricing.subtitle")}</p>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {PRICING_PLANS.map((plan, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div
                    className={cn(
                      "relative flex h-full flex-col rounded-2xl border p-8 transition-all duration-300 ease-out hover:-translate-y-1",
                      plan.highlighted
                        ? "border-primary bg-primary text-primary-foreground shadow-glow"
                        : "border-border bg-card hover:shadow-lg",
                    )}
                  >
                    {plan.badge && (
                      <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                        {plan.badge}
                      </span>
                    )}
                    <h3 className={cn("text-lg font-semibold", !plan.highlighted && "text-foreground")}>{plan.name}</h3>
                    <p
                      className={cn(
                        "mt-2 text-sm",
                        plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground",
                      )}
                    >
                      {plan.description}
                    </p>
                    <div className="mt-6 flex items-baseline gap-1">
                      <span className="text-4xl font-display font-semibold">{plan.price}</span>
                      <span className={cn("text-sm", plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground")}>
                        {plan.period}
                      </span>
                    </div>
                    <ul className="mt-6 flex-1 space-y-3">
                      {plan.features.map((feature, fi) => (
                        <li key={fi} className="flex items-start gap-2 text-sm">
                          <Check
                            className={cn("mt-0.5 h-4 w-4 shrink-0", plan.highlighted ? "text-primary-foreground" : "text-primary")}
                            aria-hidden="true"
                          />
                          <span className={plan.highlighted ? "text-primary-foreground/90" : "text-foreground"}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="#trial"
                      className={cn(
                        "mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        plan.highlighted
                          ? "bg-card text-foreground hover:shadow-lg"
                          : "bg-primary text-primary-foreground hover:shadow-lg",
                      )}
                    >
                      {t("pricing.cta")}
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="trial" className="bg-mesh py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-start">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">{t("trial.eyebrow")}</span>
              <h2 className="mt-3 text-balance text-3xl font-display font-semibold tracking-tight text-foreground md:text-4xl">
                {t("trial.title")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t("trial.subtitle")}</p>
              <ul className="mt-8 space-y-4">
                {TRIAL_BENEFITS.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-strong rounded-3xl p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{t("trial.successTitle")}</h3>
                  <p className="text-sm text-muted-foreground">{t("trial.successSubtitle")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                      {t("trial.nameLabel")}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                      {t("trial.emailLabel")}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground">
                      {t("trial.phoneLabel")}
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  <div>
                    <label htmlFor="classType" className="mb-1.5 block text-sm font-medium text-foreground">
                      {t("trial.classLabel")}
                    </label>
                    <select
                      id="classType"
                      name="classType"
                      value={form.classType}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {CLASS_ITEMS.map((item, i) => (
                        <option key={i} value={item.title}>
                          {item.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {t("trial.submitLabel")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="contact" className="bg-background py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">{t("contact.eyebrow")}</span>
              <h2 className="mt-3 text-balance text-3xl font-display font-semibold tracking-tight text-foreground md:text-4xl">
                {t("contact.title")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t("contact.subtitle")}</p>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-6 text-center">
                <MapPin className="mx-auto h-6 w-6 text-primary" aria-hidden="true" />
                <p className="mt-3 text-sm text-muted-foreground">{t("contact.address")}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 text-center">
                <Phone className="mx-auto h-6 w-6 text-primary" aria-hidden="true" />
                <p className="mt-3 text-sm text-muted-foreground">{t("contact.phone")}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 text-center">
                <Mail className="mx-auto h-6 w-6 text-primary" aria-hidden="true" />
                <p className="mt-3 text-sm text-muted-foreground">{t("contact.email")}</p>
              </div>
            </div>
            <div className="mt-10 mx-auto max-w-md rounded-2xl border border-border bg-card p-6">
              <h3 className="text-center text-sm font-semibold text-foreground">{t("contact.hoursTitle")}</h3>
              <ul className="mt-4 space-y-2">
                {HOURS_ITEMS.map((item, i) => (
                  <li key={i} className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{item.day}</span>
                    <span>{item.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
