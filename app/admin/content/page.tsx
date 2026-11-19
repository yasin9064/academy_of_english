'use client';

import React, { useState, useEffect } from 'react';
import { SiteContentData } from '@/lib/types';
import {
  Save,
  Loader2,
  Sparkles,
  User,
  Target,
  Phone,
  Share2,
  Home,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminContentPage() {
  const [content, setContent] = useState<SiteContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'hero' | 'trainer' | 'mission' | 'contact'>(
    'hero'
  );

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (data.content) setContent(data.content);
      })
      .catch(() => toast.error('Failed to load site content'))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      if (!res.ok) throw new Error();
      toast.success('Website content updated successfully! Changes are live.');
    } catch {
      toast.error('Failed to update content');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
    return <div className="py-20 text-center text-zinc-400 text-sm">Loading site CMS...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif">
            Website Content Management
          </h1>
          <p className="text-xs text-zinc-400">
            Edit homepage hero copy, trainer biography, mission numbers, and contact details in real-time.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-[#F5D638] text-black hover:bg-[#e0c228] transition-all shadow-md shadow-[#F5D638]/20 cursor-pointer disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Publishing Changes...' : 'Save All Changes'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 overflow-x-auto no-scrollbar">
        {[
          { id: 'hero', label: 'Homepage Hero & Intro', icon: Home },
          { id: 'trainer', label: 'Trainer Faizan Profile', icon: User },
          { id: 'mission', label: 'Vision & Mission', icon: Target },
          { id: 'contact', label: 'Contact & Socials', icon: Phone },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#111111] text-[#F5D638] border border-[#F5D638]/30 font-bold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main CMS Form */}
      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl bg-[#111111] border border-zinc-800 space-y-6 shadow-2xl">
        {/* TAB 1: HERO & INTRO */}
        {activeTab === 'hero' && (
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-white font-serif border-b border-zinc-800 pb-2">
              Homepage Hero Section
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300 uppercase block">
                Main Headline
              </label>
              <input
                type="text"
                value={content.hero.headline}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, headline: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs sm:text-sm focus:border-[#F5D638]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300 uppercase block">
                Supporting Text / Subheadline
              </label>
              <textarea
                rows={2}
                value={content.hero.subheadline}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, subheadline: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs sm:text-sm focus:border-[#F5D638] resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 uppercase block">
                  Highlight Text
                </label>
                <input
                  type="text"
                  value={content.hero.highlight}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, highlight: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs focus:border-[#F5D638]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 uppercase block">
                  Primary CTA Text
                </label>
                <input
                  type="text"
                  value={content.hero.primaryCtaText}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, primaryCtaText: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs focus:border-[#F5D638]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 uppercase block">
                  Secondary CTA Text
                </label>
                <input
                  type="text"
                  value={content.hero.secondaryCtaText}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, secondaryCtaText: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs focus:border-[#F5D638]"
                />
              </div>
            </div>

            <h3 className="text-lg font-bold text-white font-serif border-b border-zinc-800 pt-4 pb-2">
              Academy Introduction Section
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300 uppercase block">
                Intro Heading
              </label>
              <input
                type="text"
                value={content.intro.heading}
                onChange={(e) =>
                  setContent({
                    ...content,
                    intro: { ...content.intro, heading: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs sm:text-sm focus:border-[#F5D638]"
              />
            </div>
          </div>
        )}

        {/* TAB 2: TRAINER PROFILE */}
        {activeTab === 'trainer' && (
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-white font-serif border-b border-zinc-800 pb-2">
              Trainer Md. Faizan Alam
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 uppercase block">
                  Trainer Name
                </label>
                <input
                  type="text"
                  value={content.trainer.name}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      trainer: { ...content.trainer, name: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs sm:text-sm focus:border-[#F5D638]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 uppercase block">
                  Popular Title
                </label>
                <input
                  type="text"
                  value={content.trainer.title}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      trainer: { ...content.trainer, title: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs sm:text-sm focus:border-[#F5D638]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300 uppercase block">
                Biography / Introduction
              </label>
              <textarea
                rows={4}
                value={content.trainer.bio}
                onChange={(e) =>
                  setContent({
                    ...content,
                    trainer: { ...content.trainer, bio: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs sm:text-sm focus:border-[#F5D638] resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300 uppercase block">
                Public Speaking Journey Story (Munawar Zama Mentorship)
              </label>
              <textarea
                rows={4}
                value={content.trainer.publicSpeakingJourney}
                onChange={(e) =>
                  setContent({
                    ...content,
                    trainer: { ...content.trainer, publicSpeakingJourney: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs sm:text-sm focus:border-[#F5D638] resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300 uppercase block">
                Certified Speaker Story (English House Academy experience)
              </label>
              <textarea
                rows={4}
                value={content.trainer.certificationStory}
                onChange={(e) =>
                  setContent({
                    ...content,
                    trainer: { ...content.trainer, certificationStory: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs sm:text-sm focus:border-[#F5D638] resize-none"
              />
            </div>
          </div>
        )}

        {/* TAB 3: VISION & MISSION */}
        {activeTab === 'mission' && (
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-white font-serif border-b border-zinc-800 pb-2">
              Vision Section
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300 uppercase block">
                Vision Content
              </label>
              <textarea
                rows={3}
                value={content.vision.content}
                onChange={(e) =>
                  setContent({
                    ...content,
                    vision: { ...content.vision, content: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs sm:text-sm focus:border-[#F5D638] resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300 uppercase block">
                Vision Highlight Tagline
              </label>
              <input
                type="text"
                value={content.vision.highlight}
                onChange={(e) =>
                  setContent({
                    ...content,
                    vision: { ...content.vision, highlight: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs sm:text-sm focus:border-[#F5D638]"
              />
            </div>

            <h3 className="text-lg font-bold text-white font-serif border-b border-zinc-800 pt-4 pb-2">
              Mission Section
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300 uppercase block">
                Mission Target Number (Animated Counter)
              </label>
              <input
                type="number"
                value={content.mission.targetCount}
                onChange={(e) =>
                  setContent({
                    ...content,
                    mission: { ...content.mission, targetCount: Number(e.target.value) },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs sm:text-sm focus:border-[#F5D638]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300 uppercase block">
                Mission Content
              </label>
              <textarea
                rows={3}
                value={content.mission.content}
                onChange={(e) =>
                  setContent({
                    ...content,
                    mission: { ...content.mission, content: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs sm:text-sm focus:border-[#F5D638] resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300 uppercase block">
                Mission Statement
              </label>
              <input
                type="text"
                value={content.mission.statement}
                onChange={(e) =>
                  setContent({
                    ...content,
                    mission: { ...content.mission, statement: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs sm:text-sm focus:border-[#F5D638]"
              />
            </div>
          </div>
        )}

        {/* TAB 4: CONTACT & SOCIALS */}
        {activeTab === 'contact' && (
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-white font-serif border-b border-zinc-800 pb-2">
              Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 uppercase block">
                  Campus Location
                </label>
                <input
                  type="text"
                  value={content.contact.location}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact: { ...content.contact, location: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs sm:text-sm focus:border-[#F5D638]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 uppercase block">
                  Official Email
                </label>
                <input
                  type="email"
                  value={content.contact.email}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact: { ...content.contact, email: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs sm:text-sm focus:border-[#F5D638]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 uppercase block">
                  Phone / WhatsApp 1
                </label>
                <input
                  type="text"
                  value={content.contact.phones[0] || ''}
                  onChange={(e) => {
                    const newPhones = [...content.contact.phones];
                    newPhones[0] = e.target.value;
                    setContent({
                      ...content,
                      contact: { ...content.contact, phones: newPhones },
                    });
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs sm:text-sm focus:border-[#F5D638]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 uppercase block">
                  Phone 2 (Helpline)
                </label>
                <input
                  type="text"
                  value={content.contact.phones[1] || ''}
                  onChange={(e) => {
                    const newPhones = [...content.contact.phones];
                    newPhones[1] = e.target.value;
                    setContent({
                      ...content,
                      contact: { ...content.contact, phones: newPhones },
                    });
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs sm:text-sm focus:border-[#F5D638]"
                />
              </div>
            </div>

            <h3 className="text-lg font-bold text-white font-serif border-b border-zinc-800 pt-4 pb-2">
              Official Social Media Profile Links
            </h3>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-400 block">
                  YouTube Channel URL
                </label>
                <input
                  type="url"
                  value={content.contact.socials.youtube.url}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact: {
                        ...content.contact,
                        socials: {
                          ...content.contact.socials,
                          youtube: {
                            ...content.contact.socials.youtube,
                            url: e.target.value,
                          },
                        },
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs focus:border-[#F5D638]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-400 block">
                  Instagram Profile URL
                </label>
                <input
                  type="url"
                  value={content.contact.socials.instagram.url}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact: {
                        ...content.contact,
                        socials: {
                          ...content.contact.socials,
                          instagram: {
                            ...content.contact.socials.instagram,
                            url: e.target.value,
                          },
                        },
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs focus:border-[#F5D638]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-400 block">
                  Facebook Page URL
                </label>
                <input
                  type="url"
                  value={content.contact.socials.facebook.url}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact: {
                        ...content.contact,
                        socials: {
                          ...content.contact.socials,
                          facebook: {
                            ...content.contact.socials.facebook,
                            url: e.target.value,
                          },
                        },
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080808] border border-zinc-800 text-white text-xs focus:border-[#F5D638]"
                />
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-zinc-800 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-[#F5D638] text-black hover:bg-[#e0c228] transition-all shadow-md cursor-pointer"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save & Publish Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
