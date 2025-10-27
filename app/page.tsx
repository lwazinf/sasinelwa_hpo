'use client';

import { Button } from '@/components/ui/button';
import { Menu, X, Phone, Mail, MapPin, ArrowRight, CheckCircle, FileText, Clock, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const fadeInStyles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
`;

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicationData, setApplicationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    program: '',
    educationLevel: '',
    workExperience: '',
    motivation: '',
    availability: '',
    agree1: false,
    agree2: false,
    agree3: false,
  });
  
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollBlur, setScrollBlur] = useState(0);

  // Handle scroll blur effect
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        const scrollProgress = Math.max(0, 1 - (heroBottom / window.innerHeight));
        const blur = scrollProgress * 10; // Max 10px blur
        setScrollBlur(blur);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Animations on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero content animation timeline
      const heroTimeline = gsap.timeline({ defaults: { duration: 0.8, ease: 'power2.out' } });

      // Animate badge with slight delay
      heroTimeline.from('.hero-badge', {
        opacity: 0,
        y: -20,
        duration: 0.6
      }, 0.2);

      // Animate headline
      heroTimeline.from('.hero-headline', {
        opacity: 0,
        y: 30,
        duration: 0.8
      }, 0.3);

      // Animate subheadline
      heroTimeline.from('.hero-subheadline', {
        opacity: 0,
        y: 20,
        duration: 0.8
      }, 0.5);

      // Animate buttons using selector
      heroTimeline.from('.hero-button', {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.6
      }, 0.7);

      // Animate stats using selector
      heroTimeline.from('.stat-card', {
        opacity: 0,
        y: 15,
        stagger: 0.1,
        duration: 0.6
      }, 0.9);

      // Scroll trigger animations for sections
      gsap.utils.toArray<Element>('[data-animate]').forEach((element: Element) => {
  gsap.from(element, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    scrollTrigger: {
      trigger: element as gsap.DOMTarget,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
});
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Sasinelwa Training Academy",
    "description": "SANC-accredited nursing training academy in Kimberley, Northern Cape. Professional nursing programs including Registered Nurse, Enrolled Nurse, Midwifery, and Critical Care.",
    "url": "https://hpo.sasinelwa.co.za",
    "logo": "https://hpo.sasinelwa.co.za/logo.png",
    "sameAs": [
      "https://www.facebook.com/sasinelwaacademy",
      "https://www.linkedin.com/company/sasinelwa-academy",
      "https://www.instagram.com/sasinelwaacademy"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Admissions",
      "telephone": "+27-53-XXXX-XXXX",
      "email": "admissions@sasinelwaacademy.co.za"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kimberley",
      "addressLocality": "Kimberley",
      "addressRegion": "Northern Cape",
      "postalCode": "8300",
      "addressCountry": "ZA"
    },
    "areaServed": ["ZA"],
    "founder": {
      "@type": "Organization",
      "name": "Sasinelwa Training Academy"
    },
    "foundingDate": "2015",
    "knowsAbout": [
      "Nursing Education",
      "Healthcare Training",
      "SANC Accreditation",
      "Nursing Programs"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do I need work experience to apply?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, work experience is not required. However, healthcare volunteer work or internships can strengthen your application and help you understand if nursing is right for you."
        }
      },
      {
        "@type": "Question",
        "name": "What if I don't have Grade 12 yet?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Grade 12 or equivalent is required for admission. If you're still completing it, apply once you have your certificate."
        }
      },
      {
        "@type": "Question",
        "name": "How long does the application process take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Typically 2-4 weeks from application to admission decision, depending on how quickly you submit documents and schedule your interview."
        }
      },
      {
        "@type": "Question",
        "name": "Can I apply if my Grade 12 scores were low?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can still apply. We consider your overall profile including motivation, experience, and potential. Your GPA must be at least 2.5."
        }
      },
      {
        "@type": "Question",
        "name": "What is the entrance assessment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our entrance exam tests your readiness for nursing studies. It covers basic literacy, numeracy, and comprehension. You can take it online or in-person."
        }
      }
    ]
  };

  const programSchema = {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    "name": "Nursing Programs - Sasinelwa Training Academy",
    "description": "Comprehensive nursing education programs",
    "url": "https://hpo.sasinelwa.co.za",
    "offers": [
      {
        "@type": "Offer",
        "name": "Registered Nurse Program",
        "description": "4-year nursing degree"
      },
      {
        "@type": "Offer",
        "name": "Enrolled Nurse Program",
        "description": "2-year nursing program"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <style dangerouslySetInnerHTML={{ __html: fadeInStyles }} />
      
      {/* Schema Tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(programSchema)}
      </script>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">STA</span>
            </div>
            <span className="font-bold text-slate-900">Sasinelwa Academy</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6">
            <a href="#programs" className="text-slate-600 hover:text-slate-900 font-medium text-sm">Programs</a>
            <a href="#requirements" className="text-slate-600 hover:text-slate-900 font-medium text-sm">Requirements</a>
            <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 font-medium text-sm">How It Works</a>
            <a href="#faq" className="text-slate-600 hover:text-slate-900 font-medium text-sm">FAQ</a>
            <button onClick={() => setIsModalOpen(true)} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition text-sm">
              Apply Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 p-4 flex flex-col gap-4">
            <a href="#programs" className="text-slate-600 hover:text-slate-900 font-medium">Programs</a>
            <a href="#requirements" className="text-slate-600 hover:text-slate-900 font-medium">Requirements</a>
            <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 font-medium">How It Works</a>
            <a href="#faq" className="text-slate-600 hover:text-slate-900 font-medium">FAQ</a>
            <button onClick={() => setIsModalOpen(true)} className="w-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
              Apply Now
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        {/* Hero Section */}
        <section 
          ref={heroRef} 
          className="relative h-screen flex items-center justify-center overflow-hidden bg-cover bg-center transition-all duration-100"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/5721671/pexels-photo-5721671.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
            backgroundAttachment: 'fixed',
            filter: `blur(${scrollBlur}px)`,
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="hero-badge inline-block px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold mb-6">
              Professional Nursing Education
            </span>

            <h1 className="hero-headline text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Become a Healthcare Professional
            </h1>

            <p className="hero-subheadline text-lg sm:text-xl text-gray-100 mb-10 max-w-2xl mx-auto">
              Join Sasinelwa Training Academy and receive world-class SANC-accredited nursing education in Kimberley, Northern Cape.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setIsModalOpen(true)} className="hero-button px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2">
                Start Application <ArrowRight size={20} />
              </button>
              <a href="#how-it-works" className="hero-button px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-slate-900 transition">
                Learn More
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-20 sm:mt-32">
              <div className="stat-card text-center backdrop-blur-sm bg-white/10 rounded-lg p-6">
                <div className="text-3xl sm:text-4xl font-bold text-blue-300 mb-2">500+</div>
                <p className="text-white">Students Graduated</p>
              </div>
              <div className="stat-card text-center backdrop-blur-sm bg-white/10 rounded-lg p-6">
                <div className="text-3xl sm:text-4xl font-bold text-blue-300 mb-2">95%</div>
                <p className="text-white">Employment Rate</p>
              </div>
              <div className="stat-card text-center backdrop-blur-sm bg-white/10 rounded-lg p-6">
                <div className="text-3xl sm:text-4xl font-bold text-blue-300 mb-2">8+</div>
                <p className="text-white">Years Established</p>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section id="programs" data-animate className="bg-white py-12 sm:py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-10 sm:mb-12 text-center">
              Our Nursing Programs
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {[
                { title: "Registered Nurse (RN)", duration: "4 Years", desc: "Complete professional nursing qualification" },
                { title: "Enrolled Nurse (EN)", duration: "2 Years", desc: "Advanced healthcare support qualification" },
                { title: "Midwifery", duration: "1 Year", desc: "Specialization in maternity care" },
                { title: "Critical Care", duration: "6 Months", desc: "Intensive care specialization" }
              ].map((program, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg p-6 sm:p-8 hover:shadow-lg transition">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                      <FileText className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">{program.title}</h3>
                      <p className="text-blue-600 font-semibold text-sm">{program.duration}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm sm:text-base">{program.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-slate-200"></div>

        {/* Requirements Section */}
        <section id="requirements" data-animate className="bg-slate-50 py-12 sm:py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-10 sm:mb-12 text-center">
              Admission Requirements
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <h3 className="font-bold text-slate-900">Grade 12 Certificate</h3>
                </div>
                <p className="text-slate-600 text-sm">Minimum GPA of 2.5 required</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <h3 className="font-bold text-slate-900">Age Requirement</h3>
                </div>
                <p className="text-slate-600 text-sm">Must be at least 18 years old</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <h3 className="font-bold text-slate-900">Health Screening</h3>
                </div>
                <p className="text-slate-600 text-sm">Complete medical examination and vaccinations</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <h3 className="font-bold text-slate-900">Criminal Record Check</h3>
                </div>
                <p className="text-slate-600 text-sm">Clean criminal background required</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-slate-200"></div>

        {/* How It Works Section */}
        <section id="how-it-works" data-animate className="bg-white py-12 sm:py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-10 sm:mb-12 text-center">
              How the Application Process Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
              {[
                { num: "01", title: "Application", desc: "Submit your application form online" },
                { num: "02", title: "Documents", desc: "Upload required documents and certificates" },
                { num: "03", title: "Assessment", desc: "Complete entrance exam and interview" },
                { num: "04", title: "Admission", desc: "Receive admission decision within 2-4 weeks" }
              ].map((step, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-4">{step.num}</div>
                  <h3 className="font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 text-sm">{step.desc}</p>
                  {idx < 3 && <ArrowRight className="hidden md:block text-blue-300 mx-auto mt-6 absolute right-0 transform translate-x-8" size={24} />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-slate-200"></div>

        {/* Application Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[95vh] overflow-hidden flex flex-col shadow-2xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 sm:px-8 py-6 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white">Application Form</h2>
                  <p className="text-blue-100 text-sm mt-1">Step {formStep} of 3</p>
                </div>
                <button onClick={() => {
                  setIsModalOpen(false);
                  setFormStep(1);
                  setApplicationSubmitted(false);
                }} className="text-white hover:bg-blue-500 p-2 rounded-lg transition">
                  <X size={24} />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="bg-blue-50 px-6 sm:px-8 py-4">
                <div className="flex gap-2">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex-1 h-1 bg-slate-300 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${step <= formStep ? 'bg-blue-600' : ''}`}
                        style={{ width: step <= formStep ? '100%' : '0%' }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-xs text-slate-600">
                  {formStep === 1 && "Personal Information"}
                  {formStep === 2 && "Program & Education Details"}
                  {formStep === 3 && "Review & Confirmation"}
                </div>
              </div>

              {/* Form Content */}
              <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-8">
                {!applicationSubmitted ? (
                  <form className="space-y-6">
                    {/* Step 1: Personal Information */}
                    {formStep === 1 && (
                      <div className="space-y-5 animate-fadeIn">
                        <div>
                          <label className="block text-sm font-semibold text-slate-900 mb-2">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input 
                            type="text" 
                            value={applicationData.firstName} 
                            onChange={(e) => setApplicationData({...applicationData, firstName: e.target.value})} 
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                            placeholder="Enter your first name"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-900 mb-2">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input 
                            type="text" 
                            value={applicationData.lastName} 
                            onChange={(e) => setApplicationData({...applicationData, lastName: e.target.value})} 
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                            placeholder="Enter your last name"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-900 mb-2">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input 
                            type="email" 
                            value={applicationData.email} 
                            onChange={(e) => setApplicationData({...applicationData, email: e.target.value})} 
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                            placeholder="your.email@example.com"
                            required
                          />
                          <p className="text-xs text-slate-500 mt-1">We&apos;ll use this to contact you about your application</p>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-900 mb-2">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input 
                            type="tel" 
                            value={applicationData.phone} 
                            onChange={(e) => setApplicationData({...applicationData, phone: e.target.value})} 
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                            placeholder="+27 (0) 53 XXX XXXX"
                            required
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 2: Program & Education */}
                    {formStep === 2 && (
                      <div className="space-y-5 animate-fadeIn">
                        <div>
                          <label className="block text-sm font-semibold text-slate-900 mb-3">
                            Select Program <span className="text-red-500">*</span>
                          </label>
                          <div className="space-y-2">
                            {[
                              { value: 'rn', label: 'Registered Nurse (RN)', desc: '4-year professional qualification' },
                              { value: 'en', label: 'Enrolled Nurse (EN)', desc: '2-year advanced support qualification' },
                              { value: 'midwifery', label: 'Midwifery', desc: '1-year maternity specialization' },
                              { value: 'critical', label: 'Critical Care', desc: '6-month intensive care specialization' }
                            ].map((prog) => (
                              <label key={prog.value} className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg hover:bg-blue-50 cursor-pointer transition">
                                <input 
                                  type="radio" 
                                  name="program" 
                                  value={prog.value} 
                                  checked={applicationData.program === prog.value}
                                  onChange={(e) => setApplicationData({...applicationData, program: e.target.value})} 
                                  className="mt-1"
                                  required
                                />
                                <div>
                                  <p className="font-semibold text-slate-900 text-sm">{prog.label}</p>
                                  <p className="text-xs text-slate-600">{prog.desc}</p>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-900 mb-3">
                            Education Level <span className="text-red-500">*</span>
                          </label>
                          <select 
                            value={applicationData.educationLevel} 
                            onChange={(e) => setApplicationData({...applicationData, educationLevel: e.target.value})} 
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            required
                          >
                            <option value="">Select your education level</option>
                            <option value="grade12">Grade 12 / Matric</option>
                            <option value="diploma">Diploma</option>
                            <option value="degree">Bachelor&apos;s Degree</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-900 mb-2">
                            Healthcare Experience <span className="text-slate-500">(Optional)</span>
                          </label>
                          <textarea 
                            value={applicationData.workExperience} 
                            onChange={(e) => setApplicationData({...applicationData, workExperience: e.target.value})} 
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                            rows={3} 
                            placeholder="Tell us about any relevant healthcare volunteer work, internships, or experience"
                          ></textarea>
                          <p className="text-xs text-slate-500 mt-1">This helps us understand your background and motivation</p>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Review & Confirmation */}
                    {formStep === 3 && (
                      <div className="space-y-6 animate-fadeIn">
                        {/* Summary Box */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                          <h3 className="font-semibold text-slate-900 mb-4">Application Summary</h3>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-600">Name:</span>
                              <span className="font-semibold text-slate-900">{applicationData.firstName} {applicationData.lastName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Email:</span>
                              <span className="font-semibold text-slate-900">{applicationData.email}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Phone:</span>
                              <span className="font-semibold text-slate-900">{applicationData.phone}</span>
                            </div>
                            <div className="border-t border-blue-200 pt-3">
                              <div className="flex justify-between">
                                <span className="text-slate-600">Program:</span>
                                <span className="font-semibold text-slate-900">
                                  {applicationData.program === 'rn' && 'Registered Nurse'}
                                  {applicationData.program === 'en' && 'Enrolled Nurse'}
                                  {applicationData.program === 'midwifery' && 'Midwifery'}
                                  {applicationData.program === 'critical' && 'Critical Care'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Motivation */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-900 mb-2">
                            Why do you want to study nursing? <span className="text-red-500">*</span>
                          </label>
                          <textarea 
                            value={applicationData.motivation} 
                            onChange={(e) => setApplicationData({...applicationData, motivation: e.target.value})} 
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                            rows={3} 
                            placeholder="Share your motivation and goals..."
                            required
                          ></textarea>
                        </div>

                        {/* Agreements */}
                        <div className="space-y-3 bg-slate-50 p-4 rounded-lg">
                          <p className="font-semibold text-slate-900 text-sm mb-4">Confirmations</p>
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={applicationData.agree1} 
                              onChange={(e) => setApplicationData({...applicationData, agree1: e.target.checked})} 
                              className="mt-1 w-4 h-4 accent-blue-600"
                              required
                            />
                            <span className="text-sm text-slate-700">I have read and agree to the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a></span>
                          </label>
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={applicationData.agree2} 
                              onChange={(e) => setApplicationData({...applicationData, agree2: e.target.checked})} 
                              className="mt-1 w-4 h-4 accent-blue-600"
                              required
                            />
                            <span className="text-sm text-slate-700">I certify that the information provided is true and accurate</span>
                          </label>
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={applicationData.agree3} 
                              onChange={(e) => setApplicationData({...applicationData, agree3: e.target.checked})} 
                              className="mt-1 w-4 h-4 accent-blue-600"
                              required
                            />
                            <span className="text-sm text-slate-700">I consent to background check and medical screening as required</span>
                          </label>
                        </div>
                      </div>
                    )}
                  </form>
                ) : (
                  <div className="text-center py-12 animate-fadeIn">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="text-green-600" size={32} />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Application Submitted!</h3>
                    <p className="text-slate-600 mb-2">Thank you for applying to Sasinelwa Training Academy.</p>
                    <p className="text-sm text-slate-500 mb-8">We&apos;ll review your application and contact you within 2-4 weeks at the email and phone number you provided.</p>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                      <p className="text-xs font-semibold text-slate-700 mb-2">What&apos;s Next?</p>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>✓ Check your email for confirmation</li>
                        <li>✓ Prepare required documents</li>
                        <li>✓ Schedule your entrance assessment</li>
                      </ul>
                    </div>

                    <button 
                      onClick={() => {
                        setIsModalOpen(false);
                        setFormStep(1);
                        setApplicationSubmitted(false);
                      }}
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition text-sm"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>

              {/* Footer with Navigation */}
              {!applicationSubmitted && (
                <div className="bg-slate-50 border-t border-slate-200 px-6 sm:px-8 py-4 flex gap-3 justify-between">
                  <button 
                    type="button"
                    onClick={() => setFormStep(Math.max(1, formStep - 1))}
                    disabled={formStep === 1}
                    className="px-6 py-2.5 border border-slate-300 rounded-lg font-semibold text-slate-900 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm"
                  >
                    Previous
                  </button>
                  
                  <div className="flex gap-2">
                    <button 
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setFormStep(1);
                      }}
                      className="px-6 py-2.5 border border-slate-300 rounded-lg font-semibold text-slate-900 hover:bg-slate-100 transition text-sm"
                    >
                      Cancel
                    </button>
                    
                    {formStep < 3 ? (
                      <button 
                        type="button"
                        onClick={() => setFormStep(formStep + 1)}
                        className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition text-sm disabled:opacity-50"
                        disabled={formStep === 1 && (!applicationData.firstName || !applicationData.lastName || !applicationData.email || !applicationData.phone)}
                      >
                        Continue
                      </button>
                    ) : (
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          if (applicationData.agree1 && applicationData.agree2 && applicationData.agree3) {
                            setApplicationSubmitted(true);
                          }
                        }}
                        className="px-8 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition text-sm disabled:opacity-50"
                        disabled={!applicationData.motivation || !applicationData.agree1 || !applicationData.agree2 || !applicationData.agree3}
                      >
                        Submit Application
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-slate-200"></div>

        {/* FAQ Section */}
        <section id="faq" data-animate className="bg-white py-12 sm:py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-10 sm:mb-12 text-center">
              Frequently Asked Questions About Our Nursing Programs
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "Do I need work experience to apply?",
                  a: "No, work experience is not required. However, healthcare volunteer work or internships can strengthen your application and help you understand if nursing is right for you.",
                },
                {
                  q: "What if I don't have Grade 12 yet?",
                  a: "Grade 12 or equivalent is required for admission. If you're still completing it, apply once you have your certificate.",
                },
                {
                  q: "How long does the application process take?",
                  a: "Typically 2-4 weeks from application to admission decision, depending on how quickly you submit documents and schedule your interview.",
                },
                {
                  q: "Can I apply if my Grade 12 scores were low?",
                  a: "Yes, you can still apply. We consider your overall profile including motivation, experience, and potential. Your GPA must be at least 2.5.",
                },
                {
                  q: "What is the entrance assessment?",
                  a: "Our entrance exam tests your readiness for nursing studies. It covers basic literacy, numeracy, and comprehension. You can take it online or in-person.",
                },
              ].map((item, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                    className="w-full px-5 sm:px-6 py-4 flex justify-between items-start sm:items-center hover:bg-slate-50 transition text-left"
                  >
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base pr-3">
                      {item.q}
                    </h3>
                    <ChevronDown 
                      className={`flex-shrink-0 transition ${expandedFAQ === idx ? 'rotate-180' : ''}`} 
                      size={20} 
                    />
                  </button>
                  {expandedFAQ === idx && (
                    <div className="px-5 sm:px-6 py-4 border-t border-slate-200 bg-slate-50">
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-slate-200"></div>

        {/* Contact Section */}
        <section data-animate className="bg-slate-50 py-12 sm:py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-10 sm:mb-12 text-center">
              Contact Sasinelwa Training Academy
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 text-center">
                <Phone className="text-blue-600 mx-auto mb-4" size={32} />
                <h3 className="font-bold text-slate-900 mb-3">Call Us</h3>
                <a href="tel:+27xxxxxxxxxx" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                  +27 (0) 53 XXX XXXX
                </a>
                <p className="text-slate-600 text-xs mt-3">
                  Mon-Fri, 08:00 - 17:00
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 text-center">
                <Mail className="text-blue-600 mx-auto mb-4" size={32} />
                <h3 className="font-bold text-slate-900 mb-3">Email</h3>
                <a href="mailto:admissions@sasinelwaacademy.co.za" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                  admissions@sasinelwaacademy.co.za
                </a>
                <p className="text-slate-600 text-xs mt-3">
                  Response within 24 hours
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 text-center">
                <MapPin className="text-blue-600 mx-auto mb-4" size={32} />
                <h3 className="font-bold text-slate-900 mb-3">Visit Us</h3>
                <p className="text-slate-600 font-semibold text-sm">
                  Kimberley
                </p>
                <p className="text-slate-600 text-xs">
                  Northern Cape, South Africa
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-10 sm:py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">STA</span>
                  </div>
                  <span className="font-bold text-white text-sm">Sasinelwa Academy</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed">
                  Professional SANC-accredited nursing education in Kimberley, Northern Cape.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-4 text-xs sm:text-sm">Programs</h4>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li><a href="#programs" className="hover:text-white transition">All Programs</a></li>
                  <li><a href="#requirements" className="hover:text-white transition">Requirements</a></li>
                  <li><a href="#how-it-works" className="hover:text-white transition">Process</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white mb-4 text-xs sm:text-sm">Apply</h4>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li><a href="#apply" className="hover:text-white transition">Start Application</a></li>
                  <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
                  <li><a href="#" className="hover:text-white transition">Contact</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white mb-4 text-xs sm:text-sm">Legal</h4>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
                  <li><a href="#" className="hover:text-white transition">Contact</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm">
              <p>&copy; 2024 Sasinelwa Training Academy. All rights reserved. SANC Accredited.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition">Privacy</a>
                <a href="#" className="hover:text-white transition">Terms</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}