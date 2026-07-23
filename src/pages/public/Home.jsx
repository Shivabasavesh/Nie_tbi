import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../../components/page-structure/SectionHeader';
import CTASection from '../../components/page-structure/CTASection';
import StatCard from '../../components/data-display/StatCard';
import StartupCard from '../../components/data-display/StartupCard';
import EventCard from '../../components/data-display/EventCard';
import InfrastructureCard from '../../components/data-display/InfrastructureCard';
import { Button } from '../../components/ui/Button';
import { Rocket, Users, Target, Building2, Cpu, Leaf, Wrench, Sprout, Network } from 'lucide-react';
import SEOHead from '../../components/system/SEOHead';
import { useFeaturedStartups } from '../../hooks/useStartups';
import { useUpcomingEvents } from '../../hooks/useEvents';
import { useInfrastructure } from '../../hooks/useInfrastructure';
import { Link } from 'react-router-dom';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Home = () => {
  const { data: featuredStartups, isLoading: loadingStartups } = useFeaturedStartups();
  const { data: upcomingEvents, isLoading: loadingEvents } = useUpcomingEvents();
  const { data: infrastructure, isLoading: loadingInfrastructure } = useInfrastructure();

  return (
    <div className="bg-bg-light min-h-screen overflow-hidden">
      <SEOHead title="Home" description="Empowering Innovators and Building Enterprises at NIETBI." />
      {/* 1. Hero Section */}
      <section className="bg-nie-navy text-white py-24 px-6 relative overflow-hidden">
        <motion.div 
          className="max-w-7xl mx-auto text-center relative z-10"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <motion.h1 variants={staggerItem} className="text-5xl md:text-6xl font-bold mb-6">Empowering Innovators. Building Enterprises.</motion.h1>
          <motion.p variants={staggerItem} className="text-xl opacity-90 mb-10 max-w-3xl mx-auto">
            The National Institute of Engineering Technology Business Incubator (NIETBI) is the official innovation and entrepreneurship arm of NIE, fostering a robust ecosystem for startups to scale and succeed.
          </motion.p>
          <motion.div variants={staggerItem} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg">Apply Now</Button>
            <Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white hover:text-nie-navy">
              Explore Programs
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Impact Statistics */}
      <section className="py-16 px-6 -mt-10 relative z-20">
        <motion.div 
          className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div variants={staggerItem}><StatCard number="25+" label="Startups Supported" icon={Rocket} /></motion.div>
          <motion.div variants={staggerItem}><StatCard number="40+" label="Mentors" icon={Users} /></motion.div>
          <motion.div variants={staggerItem}><StatCard number="10+" label="Programs" icon={Target} /></motion.div>
          <motion.div variants={staggerItem}><StatCard number="15+" label="Partnerships" icon={Building2} /></motion.div>
        </motion.div>
      </section>

      {/* 3. Focus Areas */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Our Focus Areas" description="We specialize in supporting startups across high-growth, high-impact sectors driven by technology and research." align="center" />
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center mt-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={staggerItem} className="p-6 bg-slate-50 rounded-lg border border-slate-100 flex flex-col items-center hover:-translate-y-2 hover:shadow-md transition-all duration-300">
              <Sprout className="w-12 h-12 text-nie-orange mb-4" />
              <h3 className="font-bold text-nie-navy">Agritech</h3>
            </motion.div>
            <motion.div variants={staggerItem} className="p-6 bg-slate-50 rounded-lg border border-slate-100 flex flex-col items-center hover:-translate-y-2 hover:shadow-md transition-all duration-300">
              <Cpu className="w-12 h-12 text-nie-orange mb-4" />
              <h3 className="font-bold text-nie-navy">DeepTech</h3>
            </motion.div>
            <motion.div variants={staggerItem} className="p-6 bg-slate-50 rounded-lg border border-slate-100 flex flex-col items-center hover:-translate-y-2 hover:shadow-md transition-all duration-300">
              <Wrench className="w-12 h-12 text-nie-orange mb-4" />
              <h3 className="font-bold text-nie-navy">Manufacturing</h3>
            </motion.div>
            <motion.div variants={staggerItem} className="p-6 bg-slate-50 rounded-lg border border-slate-100 flex flex-col items-center hover:-translate-y-2 hover:shadow-md transition-all duration-300">
              <Leaf className="w-12 h-12 text-nie-orange mb-4" />
              <h3 className="font-bold text-nie-navy">Sustainability</h3>
            </motion.div>
            <motion.div variants={staggerItem} className="p-6 bg-slate-50 rounded-lg border border-slate-100 flex flex-col items-center hover:-translate-y-2 hover:shadow-md transition-all duration-300">
              <Network className="w-12 h-12 text-nie-orange mb-4" />
              <h3 className="font-bold text-nie-navy">AI & Digital</h3>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. Programs Preview */}
      <section className="py-16 px-6 bg-bg-light">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Incubation Programs" description="Structured pathways designed to take your idea from concept to commercialization." />
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={staggerItem} className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-bold text-nie-navy mb-3">Pre-Incubation</h3>
              <p className="text-text-body mb-6">Validate your idea, build a prototype, and establish market feasibility with expert guidance.</p>
              <Button variant="outline" className="w-full" asChild><Link to="/programs">Learn More</Link></Button>
            </motion.div>
            <motion.div variants={staggerItem} className="bg-white p-8 rounded-lg shadow-sm border border-nie-orange border-t-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-bold text-nie-navy mb-3">Incubation</h3>
              <p className="text-text-body mb-6">Scale your early-stage startup with funding access, workspace, and dedicated mentorship.</p>
              <Button variant="primary" className="w-full" asChild><Link to="/programs">Learn More</Link></Button>
            </motion.div>
            <motion.div variants={staggerItem} className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-bold text-nie-navy mb-3">Mentorship</h3>
              <p className="text-text-body mb-6">Get connected with industry veterans, academic experts, and successful alumni entrepreneurs.</p>
              <Button variant="outline" className="w-full" asChild><Link to="/programs">Learn More</Link></Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. Featured Startups Preview */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <SectionHeader title="Featured Startups" description="Discover the innovative companies building the future at NIETBI." />
            <Button variant="outline" className="mb-10 hidden md:inline-flex" asChild><Link to="/startups">View All Startups</Link></Button>
          </div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {loadingStartups ? (
              [...Array(3)].map((_, i) => (
                <motion.div key={i} variants={staggerItem} className="h-[380px] bg-slate-100 animate-pulse rounded-lg"></motion.div>
              ))
            ) : featuredStartups?.length > 0 ? (
              featuredStartups.map(startup => (
                <motion.div key={startup.id} variants={staggerItem}>
                  <StartupCard 
                    name={startup.name} 
                    sector={startup.sector} 
                    description={startup.description}
                    logo={startup.logo_url}
                    websiteLink={startup.website_link}
                    featured={startup.is_featured}
                  />
                </motion.div>
              ))
            ) : (
              <p className="col-span-3 text-center text-slate-500">No featured startups to display yet.</p>
            )}
          </motion.div>
          <div className="mt-8 text-center md:hidden">
             <Button variant="outline" asChild><Link to="/startups">View All Startups</Link></Button>
          </div>
        </div>
      </section>

      {/* 6. Infrastructure Preview */}
      <section className="py-16 px-6 bg-bg-light">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="World-Class Infrastructure" description="State-of-the-art facilities providing everything you need to build your product." />
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {loadingInfrastructure ? (
              [...Array(3)].map((_, i) => (
                <motion.div key={i} variants={staggerItem} className="h-[300px] bg-slate-200 animate-pulse rounded-lg"></motion.div>
              ))
            ) : infrastructure?.length > 0 ? (
              infrastructure.map(item => (
                <motion.div key={item.id} variants={staggerItem}>
                  <InfrastructureCard 
                    title={item.title} 
                    description={item.description}
                    image={item.image_url}
                  />
                </motion.div>
              ))
            ) : (
              <p className="col-span-3 text-center text-slate-500">Infrastructure details coming soon.</p>
            )}
          </motion.div>
        </div>
      </section>

      {/* 7. Featured Events Preview */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <SectionHeader title="Upcoming Events" description="Join our community of innovators, investors, and industry experts." />
            <Button variant="outline" className="mb-10 hidden md:inline-flex" asChild><Link to="/events">View All Events</Link></Button>
          </div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {loadingEvents ? (
              [...Array(3)].map((_, i) => (
                <motion.div key={i} variants={staggerItem} className="h-[400px] bg-slate-100 animate-pulse rounded-lg"></motion.div>
              ))
            ) : upcomingEvents?.length > 0 ? (
              upcomingEvents.map(event => (
                <motion.div key={event.id} variants={staggerItem}>
                  <EventCard 
                    title={event.title} 
                    date={new Date(event.event_start_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} 
                    description={event.description}
                    banner={event.banner_url}
                    status={event.status}
                  />
                </motion.div>
              ))
            ) : (
              <p className="col-span-3 text-center text-slate-500">No upcoming events currently scheduled.</p>
            )}
          </motion.div>
        </div>
      </section>

      {/* 8. Final CTA Section */}
      <CTASection 
        title="Ready to Build Your Startup?" 
        description="Join NIETBI to access funding, mentorship, and world-class infrastructure."
        primaryText="Apply for Incubation"
        primaryAction={() => console.log("Apply clicked")}
        secondaryText="Contact Us"
        secondaryAction={() => console.log("Contact clicked")}
      />
    </div>
  );
};

export default Home;
