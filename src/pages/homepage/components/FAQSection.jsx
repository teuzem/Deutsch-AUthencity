import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeCategory, setActiveCategory] = useState('general');
  const [openFAQ, setOpenFAQ] = useState(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      faqTitle: 'Frequently Asked Questions',
      faqSubtitle: 'Find answers to common questions about our German document services',
      searchPlaceholder: 'Search FAQ...',
      categories: {
        general: 'General',
        documents: 'Documents',
        pricing: 'Pricing',
        support: 'Support'
      }
    },
    de: {
      faqTitle: 'Häufig gestellte Fragen',
      faqSubtitle: 'Finden Sie Antworten auf häufige Fragen zu unseren deutschen Dokumentenservices',
      searchPlaceholder: 'FAQ durchsuchen...',
      categories: {
        general: 'Allgemein',
        documents: 'Dokumente',
        pricing: 'Preise',
        support: 'Support'
      }
    }
  };

  const t = translations[currentLanguage];

  const faqData = {
    general: [
      {
        id: 1,
        question: 'How long does it take to process my document?',
        questionDe: 'Wie lange dauert die Bearbeitung meines Dokuments?',
        answer: 'Processing times vary by document type. Most documents are processed within 24-48 hours, while complex applications like visas may take 5-7 business days.',
        answerDe: 'Die Bearbeitungszeiten variieren je nach Dokumententyp. Die meisten Dokumente werden innerhalb von 24-48 Stunden bearbeitet, während komplexe Anträge wie Visa 5-7 Werktage dauern können.'
      },
      {
        id: 2,
        question: 'Is my personal information secure?',
        questionDe: 'Sind meine persönlichen Daten sicher?',
        answer: 'Yes, we use bank-level encryption and follow GDPR compliance standards. Your data is protected with SSL certificates and secure storage systems.',
        answerDe: 'Ja, wir verwenden Verschlüsselung auf Bankniveau und befolgen DSGVO-Compliance-Standards. Ihre Daten sind mit SSL-Zertifikaten und sicheren Speichersystemen geschützt.'
      },
      {
        id: 3,
        question: 'Do you offer services in multiple languages?',
        questionDe: 'Bieten Sie Services in mehreren Sprachen an?',
        answer: 'Yes, we provide services in German and English. Our multilingual support team can assist you in your preferred language.',
        answerDe: 'Ja, wir bieten Services in Deutsch und Englisch an. Unser mehrsprachiges Support-Team kann Sie in Ihrer bevorzugten Sprache unterstützen.'
      }
    ],
    documents: [
      {
        id: 4,
        question: 'What documents do I need for a German passport application?',
        questionDe: 'Welche Dokumente benötige ich für einen deutschen Reisepass-Antrag?',
        answer: 'You typically need: valid ID, birth certificate, proof of German citizenship, recent passport photos, and completed application form.',
        answerDe: 'Sie benötigen normalerweise: gültigen Ausweis, Geburtsurkunde, Nachweis der deutschen Staatsbürgerschaft, aktuelle Passfotos und ausgefülltes Antragsformular.'
      },
      {
        id: 5,
        question: 'Can you help with document translation and certification?',
        questionDe: 'Können Sie bei Dokumentenübersetzung und -beglaubigung helfen?',
        answer: 'Yes, we offer certified translation services for all major languages and can provide apostille services for international document recognition.',
        answerDe: 'Ja, wir bieten beglaubigte Übersetzungsdienste für alle wichtigen Sprachen an und können Apostille-Services für die internationale Dokumentenanerkennung bereitstellen.'
      },
      {
        id: 6,
        question: 'What if my documents are rejected?',
        questionDe: 'Was passiert, wenn meine Dokumente abgelehnt werden?',
        answer: 'We provide a full review and resubmission service. If rejection occurs due to our error, we offer a full refund or free reprocessing.',
        answerDe: 'Wir bieten einen vollständigen Überprüfungs- und Wiedereinreichungsservice. Wenn eine Ablehnung aufgrund unseres Fehlers erfolgt, bieten wir eine vollständige Rückerstattung oder kostenlose Wiederbearbeitung an.'
      }
    ],
    pricing: [
      {
        id: 7,
        question: 'How much do your services cost?',
        questionDe: 'Wie viel kosten Ihre Services?',
        answer: 'Pricing varies by service type. Basic document processing starts at €59, while complex applications like residence permits start at €299.',
        answerDe: 'Die Preise variieren je nach Service-Typ. Die grundlegende Dokumentenbearbeitung beginnt bei 59 €, während komplexe Anträge wie Aufenthaltsgenehmigungen bei 299 € beginnen.'
      },
      {
        id: 8,
        question: 'Are there any hidden fees?',
        questionDe: 'Gibt es versteckte Gebühren?',
        answer: 'No, we believe in transparent pricing. All fees are clearly stated upfront, including government fees and processing charges.',
        answerDe: 'Nein, wir glauben an transparente Preise. Alle Gebühren werden klar im Voraus angegeben, einschließlich Regierungsgebühren und Bearbeitungskosten.'
      },
      {
        id: 9,
        question: 'Do you offer refunds?',
        questionDe: 'Bieten Sie Rückerstattungen an?',
        answer: 'Yes, we offer full refunds if we cannot process your application due to insufficient documentation provided by us.',
        answerDe: 'Ja, wir bieten vollständige Rückerstattungen an, wenn wir Ihren Antrag aufgrund unzureichender Dokumentation unsererseits nicht bearbeiten können.'
      }
    ],
    support: [
      {
        id: 10,
        question: 'How can I track my application status?',
        questionDe: 'Wie kann ich den Status meines Antrags verfolgen?',
        answer: 'You can track your application through our online portal or mobile app. You\'ll receive SMS and email notifications for status updates.',
        answerDe: 'Sie können Ihren Antrag über unser Online-Portal oder unsere mobile App verfolgen. Sie erhalten SMS- und E-Mail-Benachrichtigungen für Status-Updates.'
      },
      {
        id: 11,
        question: 'What support channels do you offer?',
        questionDe: 'Welche Support-Kanäle bieten Sie an?',
        answer: 'We offer 24/7 live chat, email support, phone support during business hours, and an extensive knowledge base.',
        answerDe: 'Wir bieten 24/7-Live-Chat, E-Mail-Support, Telefon-Support während der Geschäftszeiten und eine umfangreiche Wissensdatenbank.'
      },
      {
        id: 12,
        question: 'Can I get help with urgent applications?',
        questionDe: 'Kann ich Hilfe bei dringenden Anträgen bekommen?',
        answer: 'Yes, we offer expedited processing for urgent applications. Contact our priority support team for assistance.',
        answerDe: 'Ja, wir bieten eine beschleunigte Bearbeitung für dringende Anträge. Wenden Sie sich an unser Prioritäts-Support-Team für Unterstützung.'
      }
    ]
  };

  const categories = [
    { id: 'general', icon: 'Info', label: t.categories.general },
    { id: 'documents', icon: 'FileText', label: t.categories.documents },
    { id: 'pricing', icon: 'DollarSign', label: t.categories.pricing },
    { id: 'support', icon: 'Headphones', label: t.categories.support }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-primary">
            {t.faqTitle}
          </h2>
          <p className="text-xl text-text-secondary font-body max-w-3xl mx-auto">
            {t.faqSubtitle}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-body font-medium transition-smooth ${
                activeCategory === category.id
                  ? 'bg-accent text-white shadow-elevation-2'
                  : 'bg-background text-text-secondary hover:bg-accent/10 hover:text-accent'
              }`}
            >
              <Icon name={category.icon} size={18} />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqData[activeCategory]?.map((faq) => (
              <div
                key={faq.id}
                className="bg-background rounded-xl border border-border shadow-elevation-1 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-accent/5 transition-smooth"
                >
                  <h3 className="text-lg font-heading font-semibold text-text-primary pr-4">
                    {currentLanguage === 'de' ? faq.questionDe : faq.question}
                  </h3>
                  <Icon
                    name={openFAQ === faq.id ? 'ChevronUp' : 'ChevronDown'}
                    size={20}
                    className={`text-text-secondary transition-smooth ${
                      openFAQ === faq.id ? 'text-accent' : ''
                    }`}
                  />
                </button>
                
                {openFAQ === faq.id && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <div className="pt-4 border-t border-border">
                      <p className="text-text-secondary font-body leading-relaxed">
                        {currentLanguage === 'de' ? faq.answerDe : faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="MessageCircle" size={32} className="text-accent" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-text-primary">
                Still have questions?
              </h3>
              <p className="text-text-secondary font-body">
                Our support team is available 24/7 to help you with any questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="flex items-center space-x-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-smooth">
                  <Icon name="MessageCircle" size={18} />
                  <span className="font-body font-medium">Live Chat</span>
                </button>
                <button className="flex items-center space-x-2 px-6 py-3 bg-surface border border-border text-text-primary rounded-lg hover:bg-background transition-smooth">
                  <Icon name="Mail" size={18} />
                  <span className="font-body font-medium">Email Support</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;