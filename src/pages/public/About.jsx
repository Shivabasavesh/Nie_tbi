import SEOHead from '../../components/system/SEOHead';
import React
 from 'react';
import PageHero from '../../components/page-structure/PageHero';
import SectionHeader from '../../components/page-structure/SectionHeader';
import CTASection from '../../components/page-structure/CTASection';
import { Target, Eye, Shield, Building } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-bg-light min-h-screen">
      <SEOHead title="About Us" description="Learn about the vision, mission, and heritage of NIETBI." />
      {/* 1. PageHero */}
      <PageHero 
        title="About NIETBI" 
        subtitle="The Innovation and Entrepreneurship Arm of The National Institute of Engineering" 
        breadcrumb="Home > About" 
      />

      {/* 2. NIETBI Overview */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader title="Fostering Innovation" align="center" />
          <p className="text-lg text-text-body leading-relaxed mb-6">
            The NIE Technology Business Incubator (NIETBI) is a premier incubation center established to nurture and support technology startups, researchers, and student entrepreneurs. Supported by leading government initiatives, NIETBI bridges the gap between academic research and commercial enterprise.
          </p>
          <p className="text-lg text-text-body leading-relaxed">
            By providing access to world-class infrastructure, expert mentorship, and vital funding networks, we empower founders to build scalable, sustainable businesses that solve critical real-world challenges.
          </p>
        </div>
      </section>

      {/* 3 & 4. Vision and Mission */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-10 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <Eye className="w-16 h-16 text-nie-orange mb-6" />
            <h2 className="text-3xl font-bold text-nie-navy mb-4">Our Vision</h2>
            <div className="w-12 h-1 bg-nie-orange mb-6"></div>
            <p className="text-text-body text-lg">
              To be a globally recognized center of excellence for entrepreneurship and innovation, driving economic growth and societal impact through technology commercialization.
            </p>
          </div>
          <div className="bg-white p-10 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <Target className="w-16 h-16 text-nie-orange mb-6" />
            <h2 className="text-3xl font-bold text-nie-navy mb-4">Our Mission</h2>
            <div className="w-12 h-1 bg-nie-orange mb-6"></div>
            <p className="text-text-body text-lg">
              To provide a comprehensive ecosystem that accelerates the growth of early-stage startups by offering strategic guidance, technical resources, funding opportunities, and industry connections.
            </p>
          </div>
        </div>
      </section>

      {/* 5. NIE Heritage Timeline */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="Our Heritage & Journey" description="A legacy of engineering excellence evolving into a modern innovation ecosystem." align="center" />
          
          <div className="mt-16 relative border-l-4 border-nie-orange ml-4 md:ml-1/2 left-0 md:left-1/2 transform md:-translate-x-1/2 space-y-12">
            
            <div className="relative pl-8 md:pl-0 w-full md:w-1/2 md:-ml-[17px] md:pr-12 md:text-right">
              <div className="absolute top-0 left-[-11px] md:right-[-11px] md:left-auto w-6 h-6 rounded-full bg-nie-navy border-4 border-white shadow"></div>
              <h3 className="text-2xl font-bold text-nie-navy">1946</h3>
              <h4 className="text-lg font-semibold text-nie-orange mb-2">NIE Established</h4>
              <p className="text-text-body">The National Institute of Engineering was founded, beginning its journey as one of the premier engineering institutions in the country.</p>
            </div>

            <div className="relative pl-8 w-full md:w-1/2 md:ml-1/2 md:pl-12">
              <div className="absolute top-0 left-[-11px] w-6 h-6 rounded-full bg-nie-navy border-4 border-white shadow"></div>
              <h3 className="text-2xl font-bold text-nie-navy">Early 2000s</h3>
              <h4 className="text-lg font-semibold text-nie-orange mb-2">Technology Entrepreneurship Initiatives</h4>
              <p className="text-text-body">NIE begins laying the groundwork for student entrepreneurship cells and promoting research commercialization.</p>
            </div>

            <div className="relative pl-8 md:pl-0 w-full md:w-1/2 md:-ml-[17px] md:pr-12 md:text-right">
              <div className="absolute top-0 left-[-11px] md:right-[-11px] md:left-auto w-6 h-6 rounded-full bg-nie-navy border-4 border-white shadow"></div>
              <h3 className="text-2xl font-bold text-nie-navy">2018</h3>
              <h4 className="text-lg font-semibold text-nie-orange mb-2">Formation of NIETBI</h4>
              <p className="text-text-body">The formal establishment of the Technology Business Incubator to structured support startups and secure government grants.</p>
            </div>

            <div className="relative pl-8 w-full md:w-1/2 md:ml-1/2 md:pl-12">
              <div className="absolute top-0 left-[-11px] w-6 h-6 rounded-full bg-nie-navy border-4 border-white shadow"></div>
              <h3 className="text-2xl font-bold text-nie-navy">Present</h3>
              <h4 className="text-lg font-semibold text-nie-orange mb-2">Current Innovation Ecosystem</h4>
              <p className="text-text-body">A thriving hub supporting dozens of startups across Agritech, DeepTech, and Manufacturing with state-of-the-art facilities.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Government & Institutional Support */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <SectionHeader title="Supported By" description="We are backed by premier government institutions and industry partners." align="center" />
          <div className="flex flex-wrap justify-center items-center gap-12 mt-12 opacity-60 grayscale hover:grayscale-0 transition-all">
            <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">Logo 1</div>
            <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">Logo 2</div>
            <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">Logo 3</div>
            <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">Logo 4</div>
          </div>
        </div>
      </section>

      {/* 7. Final CTA */}
      <CTASection 
        title="Partner With Us" 
        description="Whether you are a mentor, investor, or corporate looking to drive innovation, we want to hear from you."
        primaryText="Become a Partner"
        primaryAction={() => console.log('Partner clicked')}
      />
    </div>
  );
};

export default About;
