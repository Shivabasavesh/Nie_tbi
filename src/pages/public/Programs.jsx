import SEOHead from '../../components/system/SEOHead';
import React
 from 'react';
import PageHero from '../../components/page-structure/PageHero';
import SectionHeader from '../../components/page-structure/SectionHeader';
import CTASection from '../../components/page-structure/CTASection';
import { Rocket, Lightbulb, Users, ShieldCheck, CheckCircle2, FileText, Send, Building } from 'lucide-react';

const Programs = () => {
  return (
    <div className="bg-bg-light min-h-screen">
      <SEOHead title="Programs" description="Explore our Incubation, Pre-Incubation, and Mentorship programs." />
      {/* 1. PageHero */}
      <PageHero 
        title="Our Programs" 
        subtitle="Structured pathways for innovators at every stage of their entrepreneurial journey" 
        breadcrumb="Home > Programs" 
      />

      {/* 2 & 3 & 4. Incubation, Pre-Incubation, Mentorship */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-24">
          
          {/* Pre-Incubation */}
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="w-16 h-16 bg-orange-100 text-nie-orange rounded-xl flex items-center justify-center mb-6">
                <Lightbulb size={32} />
              </div>
              <h2 className="text-3xl font-bold text-nie-navy mb-4">Pre-Incubation Program</h2>
              <div className="h-1 w-16 bg-nie-orange mb-6"></div>
              <p className="text-text-body text-lg mb-6">
                Designed for early-stage founders and students with an innovative idea but no prototype. This 3-6 month program focuses on idea validation, market research, and building a Minimum Viable Product (MVP).
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-text-body"><CheckCircle2 className="text-nie-orange mr-3" size={20} /> Design Thinking Workshops</li>
                <li className="flex items-center text-text-body"><CheckCircle2 className="text-nie-orange mr-3" size={20} /> Business Model Canvas</li>
                <li className="flex items-center text-text-body"><CheckCircle2 className="text-nie-orange mr-3" size={20} /> Prototyping Access (IDEA Lab)</li>
              </ul>
            </div>
            <div className="md:w-1/2 bg-slate-100 rounded-2xl aspect-video flex items-center justify-center border border-slate-200">
              <span className="text-slate-400 font-medium">Pre-Incubation Image Placeholder</span>
            </div>
          </div>

          {/* Incubation */}
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
            <div className="md:w-1/2">
              <div className="w-16 h-16 bg-blue-100 text-nie-navy rounded-xl flex items-center justify-center mb-6">
                <Rocket size={32} />
              </div>
              <h2 className="text-3xl font-bold text-nie-navy mb-4">Incubation Program</h2>
              <div className="h-1 w-16 bg-nie-orange mb-6"></div>
              <p className="text-text-body text-lg mb-6">
                Our flagship 12-24 month program for startups with a working prototype or early revenue. We provide comprehensive support to help you scale, secure funding, and achieve operational sustainability.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-text-body"><CheckCircle2 className="text-nie-orange mr-3" size={20} /> Seed Funding Access</li>
                <li className="flex items-center text-text-body"><CheckCircle2 className="text-nie-orange mr-3" size={20} /> Dedicated Co-working Space</li>
                <li className="flex items-center text-text-body"><CheckCircle2 className="text-nie-orange mr-3" size={20} /> Legal & Compliance Support</li>
              </ul>
            </div>
            <div className="md:w-1/2 bg-slate-100 rounded-2xl aspect-video flex items-center justify-center border border-slate-200">
              <span className="text-slate-400 font-medium">Incubation Image Placeholder</span>
            </div>
          </div>

          {/* Mentorship Support */}
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="w-16 h-16 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center mb-6">
                <Users size={32} />
              </div>
              <h2 className="text-3xl font-bold text-nie-navy mb-4">Mentorship Support</h2>
              <div className="h-1 w-16 bg-nie-orange mb-6"></div>
              <p className="text-text-body text-lg mb-6">
                Get paired with industry veterans, academic researchers, and successful alumni entrepreneurs who provide strategic guidance, technical expertise, and network access.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-text-body"><CheckCircle2 className="text-nie-orange mr-3" size={20} /> 1-on-1 Strategy Sessions</li>
                <li className="flex items-center text-text-body"><CheckCircle2 className="text-nie-orange mr-3" size={20} /> Technical Review Boards</li>
                <li className="flex items-center text-text-body"><CheckCircle2 className="text-nie-orange mr-3" size={20} /> Investor Pitch Preparation</li>
              </ul>
            </div>
            <div className="md:w-1/2 bg-slate-100 rounded-2xl aspect-video flex items-center justify-center border border-slate-200">
              <span className="text-slate-400 font-medium">Mentorship Image Placeholder</span>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Startup Benefits */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Why Choose NIETBI?" description="We offer a comprehensive ecosystem of benefits to accelerate your growth." align="center" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg border border-slate-100 text-center">
              <Building className="w-10 h-10 text-nie-orange mx-auto mb-4" />
              <h3 className="font-bold text-nie-navy mb-2">Modern Workspace</h3>
              <p className="text-sm text-text-body">24/7 access to high-speed internet, meeting rooms, and physical infrastructure.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-slate-100 text-center">
              <ShieldCheck className="w-10 h-10 text-nie-orange mx-auto mb-4" />
              <h3 className="font-bold text-nie-navy mb-2">IP & Legal Aid</h3>
              <p className="text-sm text-text-body">Subsidized support for patent filing, company registration, and compliance.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-slate-100 text-center">
              <Rocket className="w-10 h-10 text-nie-orange mx-auto mb-4" />
              <h3 className="font-bold text-nie-navy mb-2">Cloud Credits</h3>
              <p className="text-sm text-text-body">Access to AWS, Google Cloud, and Microsoft startup program credits.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-slate-100 text-center">
              <Users className="w-10 h-10 text-nie-orange mx-auto mb-4" />
              <h3 className="font-bold text-nie-navy mb-2">Talent Access</h3>
              <p className="text-sm text-text-body">Direct access to NIE's student talent pool for internships and hiring.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 & 7. Eligibility Overview & Application Process */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <SectionHeader title="Eligibility Criteria" />
            <ul className="space-y-4 mt-6">
              <li className="flex items-start">
                <div className="mt-1 bg-orange-100 p-1 rounded-full mr-4"><CheckCircle2 className="text-nie-orange w-4 h-4" /></div>
                <p className="text-text-body">Registered as a Private Limited Company or LLP (for Incubation).</p>
              </li>
              <li className="flex items-start">
                <div className="mt-1 bg-orange-100 p-1 rounded-full mr-4"><CheckCircle2 className="text-nie-orange w-4 h-4" /></div>
                <p className="text-text-body">Technology-driven solution with high growth potential and scalability.</p>
              </li>
              <li className="flex items-start">
                <div className="mt-1 bg-orange-100 p-1 rounded-full mr-4"><CheckCircle2 className="text-nie-orange w-4 h-4" /></div>
                <p className="text-text-body">A dedicated founding team committed full-time to the venture.</p>
              </li>
              <li className="flex items-start">
                <div className="mt-1 bg-orange-100 p-1 rounded-full mr-4"><CheckCircle2 className="text-nie-orange w-4 h-4" /></div>
                <p className="text-text-body">Working prototype or Minimum Viable Product (MVP) ready.</p>
              </li>
            </ul>
          </div>
          <div>
            <SectionHeader title="Application Process" />
            <div className="space-y-6 mt-6">
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-8 h-8 rounded-full bg-nie-navy text-white flex items-center justify-center font-bold text-sm">1</div>
                  <div className="w-px h-full bg-slate-200 mt-2"></div>
                </div>
                <div className="pb-4">
                  <h4 className="font-bold text-nie-navy text-lg">Online Application</h4>
                  <p className="text-text-body text-sm mt-1">Submit your startup details, pitch deck, and founder information via our portal.</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-8 h-8 rounded-full bg-nie-navy text-white flex items-center justify-center font-bold text-sm">2</div>
                  <div className="w-px h-full bg-slate-200 mt-2"></div>
                </div>
                <div className="pb-4">
                  <h4 className="font-bold text-nie-navy text-lg">Initial Screening</h4>
                  <p className="text-text-body text-sm mt-1">Our internal committee reviews the application for alignment with our focus areas.</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-8 h-8 rounded-full bg-nie-navy text-white flex items-center justify-center font-bold text-sm">3</div>
                  <div className="w-px h-full bg-slate-200 mt-2"></div>
                </div>
                <div className="pb-4">
                  <h4 className="font-bold text-nie-navy text-lg">Pitch Presentation</h4>
                  <p className="text-text-body text-sm mt-1">Shortlisted startups pitch to our expert evaluation panel and advisory board.</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-8 h-8 rounded-full bg-nie-orange text-white flex items-center justify-center font-bold text-sm">4</div>
                </div>
                <div>
                  <h4 className="font-bold text-nie-navy text-lg">Onboarding</h4>
                  <p className="text-text-body text-sm mt-1">Signing of the incubation agreement and formal induction into NIETBI.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Final CTA */}
      <CTASection 
        title="Ready to Take the Next Step?" 
        description="Applications are currently open for our upcoming cohort. Submit your pitch deck today."
        primaryText="Apply Now"
        primaryAction={() => console.log('Apply clicked')}
      />
    </div>
  );
};

export default Programs;
