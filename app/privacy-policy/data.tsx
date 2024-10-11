import {
  ILegacyPage,
  ILegacyDataBlock,
  ILegacyDataBlockBodyType,
} from "@/components/Legacy/types";
import bg from "@/assets/LegacyImages/privacyPolicy.png";
import { generateBlockId } from "@/lib/utils";

const data: ILegacyDataBlock[] = [
  {
    body: [
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `This Privacy Policy (the <strong>“Policy”</strong>) describes Goods2Load’s policies & procedures on the
          collection, usage & disclosure of your Personal Data. In this Policy, "we", "our" and “us” refer
          to Goods2Load.`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `We're committed to the confidentiality and security of the Personal Data you provide us and
          will keep your information safe. We'll only ever collect, use and share your information in
          ways that are described in this Policy. You can update your profile and communication
          preferences at any time.`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `Along with our <a href="/cookie-policy">Cookie Policy</a> and <a href="terms-of-service">Terms of Service</a>, this Policy explains how we collect and
          handle your information across all of the Goods2Load services, including the mobile app and
          the Goods2Load website, and other services such as our customer service or user research
          channels (together, the <strong>“Platforms”</strong>). By using our website or any of the functionalities
          provided on it, you hereby Consent to the collection of your data by Goods2Load. We'll
          review this from time to time to make sure it's up-to-date and post the latest version here.
          When we make significant changes, we'll let you know when you next access our services,
          or by other communications.`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `This Policy doesn't cover the collection or use of your information by advertisers or other
          companies whose products and services we feature on our Platforms, such as airlines,
          logistic services agents, road cargo, ship companies, activity providers, carbon offsetting
          providers, insurers and travel compensation specialists (<strong>“Transportation Providers”</strong>). When
          you make a booking or purchase with a Transportation Provider, your information will be
          processed by them in accordance with their own privacy policy and terms and conditions.`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `<u>We do not intentionally collect personal information from individuals as our services are
          solely for the use of businesses. However, in the course of providing our services or through
          interactions on our Platforms, we may inadvertently receive and collect limited personal
          information (e.g., names, business email addresses) from business representatives or
          through website cookies. To the extent that any Personal Data (as defined below) is
          collected, this Policy shall be applicable to such Personal Data.</u>`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `Please note that our Platforms are not intended for individual with no business, or children
            under 18 years of age, and nobody under the age of 18 should provide any information to
            Goods2Load via our Platforms or otherwise. We don't knowingly collect Personal Data from
            anybody under 18, and we will delete any Personal Data that we learn has not been
            provided by, other than with the express authorization of, the child's parent or legal guardian.`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `The terms of this Policy are without prejudice to any separate contractual terms you may
          enter with us, which shall prevail over the terms of this Policy. Notwithstanding anything
          stated to the contrary in this Policy it is clarified that unless any provisions contained in any
          separate agreement signed between you and Goods2Load is in violation of any legal
          provision, the agreement signed between you and Goods2Load shall supersede and prevail
          over this Policy.`,
        ],
      },
    ],
  },
  {
    title: "Definitions:",
    body: [
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `The following terms, that have been subsequently referred to in this Policy, have the below
          meanings in line with the Applicable Laws. To the extent that any words have not been
          defined herein, they shall be deemed to have the same meaning as in the <a href="/terms-of-service">Terms of
          Services.</a>`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `<strong>Business Data</strong> means any information relating your business as an identifiable legal entity.
          This may include information such as your company name, the name of your company’s
          authorised business representative, contact details, trip itinerary, internet protocol (“IP”)
          address, cookie strings or device IDs, as well as information that we store alongside such
          identifiers, such as how you use our Platforms.`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `<strong>Personal Data</strong> for the purpose of this Policy is defined as any data relating to an identified
          natural person, or a natural person who can be identified, directly or indirectly, through the
          linking of data, by reference to an identifier such as his name, addresses, contact number,
          voice, picture, identification number, electronic identifier, geographical location, or one or
          more physical, physiological, cultural or social characteristics. <u>For the purposes of this
          Policy, the term "Personal Data" may also encompass “Business Data” where applicable and
          the two terms may also be used interchangeably.</u>`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `<strong>Processing</strong> (and all forms of the word) for the purpose of this Policy is defined as any
          operation or set of operations performed on Personal Data or set of Personal Data, whether
          or not by automated means. This Processing includes collecting, storing, recording,
          organizing, adapting, modifying, circulating, altering, retrieving, exchanging, sharing, using,
          characterizing, disclosing Personal Data by broadcasting, transmitting, distributing, making
          available, coordinating, merging, restricting, blocking, erasing or destroying it or creating
          forms thereof.`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `<strong>Consent</strong> is where a user authorizes a third party to Process his/her Personal Data, provided
          that this consent indicates, in a specific, clear, and unambiguous manner, that he/she
          accepts the Processing of his/her Personal Data through a clear positive statement or
          action.`,
        ],
      },
    ],
  },
  {
    title: "Why do we use Personal Data?",
    body: [
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `Without information we can't help you to plan and book the perfect transportation service for
            your business or make our Platforms and other services the best they can be. So, when you
            use our Platforms or otherwise interact with us, we collect, use, store and share some
            Personal Data.`,
        ],
      },
    ],
  },
  {
    title: "What Personal Data do we collect and where does it come from?",
    body: [
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: ["Personal Data is collected in three ways:"],
      },
      {
        type: ILegacyDataBlockBodyType.ULIST,
        content: [
          `<i>You give it to us</i>: For example, you may provide us with Personal Data when you log
          in, create an account, sign up to marketing emails or solution finder, contact us for
          customer support or otherwise communicate with us. This type of Personal Data is
          provided voluntarily, but if you decide not to provide certain categories of Personal
          Data then aspects of our Platforms and other services won't work (for example, you
          cannot sign-up to marketing or solution finder without providing us with your contact
          details).`,
          `<i>We generate or collect it automatically</i>: We generate or collect some information from
          your computer or device automatically as you use our Platforms or otherwise interact
          with us. Depending on the Platform you are using and your privacy settings, this will
          include information like your IP address, cookie identifiers, location, the device and
          browser you're using, and how you use and interact with the Goods2Load Platforms
          and certain third-party websites. Some of this information is generated or collected
          via cookies and similar technologies. For more information, see our <a href="cookie-policy">Cookie Policy</a>.`,
          `<i>We receive it from third parties</i>: Sometimes we're given information about you from
          third parties - for example, if you come to our Platforms via a promotional partner, or
          when you log into your Goods2Load account using our social network login feature.
          We might also receive Personal Data from third parties with whom we collaborate for
          marketing and advertising purposes, depending on the initiative. Where this is the
          case, you will be provided with further information in advance.`,
        ],
      },
    ],
  },
  {
    title: "The types of Personal Data we Process as a business.",
    body: [
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `Depending on how you interact with us and your privacy settings, we may collect and
          Process the following types of Personal Data:`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.OLIST,
        content: [
          `Contact Information such as: <br /> - name, address, email address, and telephone number.`,
          `Identification Information such as: <br /> - ID information (which may contain information like your name, address, gender,
          nationality, and date of birth).`,
          `Transportation Information such as: <br /> - business name record (“BNR”), ID or license information, travel itinerary and other
          information relating to the services provided;`,
          `Account Information, if you choose to create an account and populate your profile, such as: <br /> - bidentification information (see above); <br>
          - solution finder scheme information.`,
          `Device and Location Information such as: <br /> - operating system; 
          <br />- non-specific location based on your IP address; <br/>
          - specific location data derived from your mobile device (if you choose to grant us
          access to this).`,
          `Usage Information such as: <br /> How you interact with our Platforms and communications, including time you spend
          on our Platforms, searches performed, click per Transportation Provider, Click per
          offer, filter modification and the pages, features or functionality you have accessed,
          links you have clicked to be redirected to or from our Platforms (including, for
          example, the identity of the Transportation Provider you are redirecting to and the
          type of travel service you have selected). Depending on the Platform you are using
          and your privacy settings, some of this data will be collected or generated using
          cookies - for more information, see our <a href="/cookie-policy">Cookie Policy</a>.`,
          `Preferences Information you have communicated to us, such as: <br /> 
          - Specific Consents you have given or declined, email and push notification
          preferences and cookie preferences; <br />
          - Preferred language, locale, currency and airport, seaport, roads for collection and
          delivery.`,
          `Communications Information such as: <br />
          - The content of communications we send to and receive from you, including
          feedback, help requests and queries; <br />
          - Information about those communications, such as time and date sent and how you
          interact with communications we send to you (for example open rate and click-
          through rate).`,
          `User Generated Content such as: <br />
          - Content you upload to our Platforms or which relate to our Platforms (such as
          photos, preferences, reviews and prompts you enter into AI- powered language
          models we may make available to you on our Platforms) and information about the
          content, such as the time and date associated with that content; <br />
          - Your engagement with us on social media platforms (such as Instagram, Twitter,
          Meta or Google) including comments, photos, videos, and publicly available
          information about your social media account (such as your username).`,
          `Third-Party Log-In Information: <br />
          - If you choose to create a Goods2Load account via a third-party, we may
          automatically receive Personal Data about you from that third party, such as your
          email address, name and other contact details. The Personal Data we receive will
          vary depending on the information that you have provided to the third party and your
          preferences within the third-party platform (for example, you may have enabled
          Apple's 'Hide My Email' functionality). Please refer to the relevant third party's privacy
          policy for further information.  
          `,
          `Profiling Information: <br />
          We combine information that we collect, generate, or receive (as described above) to
          understand you and your interests better, so that we can personalize our Platforms,
          services and advertising for you. We do this by drawing inferences about your
          preferences and interests from the combined data.`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `We don't routinely collect special category Personal Data (these are more sensitive types of
          data, such as information relating to your health, religion or ethnic origin). However, you may
          choose to provide us with information which reveals this type of data - for example, if you
          contact our customer services team to inform us about these personal aspects. You may
          also choose to provide us with this information if you participate in relevant types of market
          research or user testing - for example, if you provide feedback on the accessibility of our
          Platforms.`,
        ],
      },
    ],
  },
  {
    title: "We only use your Personal Data where:",
    body: [
      {
        type: ILegacyDataBlockBodyType.ULIST,
        content: [
          `Necessary for us to perform a contract with you, or facilitate a contract between you
          and a Transportation Provider;`,
          `Necessary to pursue our or others' legitimate interests;`,
          `Necessary to exercise legal rights or comply with legal obligations; or`,
          `You've given us your Consent.`,
        ],
      },
    ],
  },
  {
    title: "How and why we use your personal data.",
    body: [
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: ["We use your Personal Data to:"],
      },
      {
        type: ILegacyDataBlockBodyType.OLIST,
        content: [
          `Make our Platforms work.<br />
          - We generate results in response to your search queries, for example providing you
          with a list of the flight, ship or truck options that best meet your requirements;<br />
          - We ensure that our Platforms and services are accessible and usable (for example,
          making sure that we display our services correctly based on the type of device you
          are using).`,
          `Facilitate bookings and purchases. <br />
          - Where you find a transportation option that you'd like to book or purchase, we
          redirect you to the Transportation Provider's platform along with the information
          necessary to enable them to recognize you and the trip option you had selected on
          our Platforms. This information includes details of your travel search and data about
          your browser/device.`,
          `Send you important communications about: <br />
          - Your Goods2Load account;<br />
          - Other essential information, such as important changes or updates to our services.`,
          `Provide customer services. <br />
          - We respond to communications you send us about our services or your account.`,
          `Maintain your Goods2Load account. <br />
          - We create and maintain your Goods2Load account (if you have one) and provide you
          with the benefits associated with having an account.`,
          `Performing a Contract. <br />
          - We use Personal Data to deliver our services or facilitate the performance of a
          contract such as a booking with a Transportation Provider.`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `We may use essential cookies and similar technologies on your device for some of these
          purposes, as explained in more detail in our <a href="/cookie-policy">Cookie Policy</a>.`,
        ],
      },
    ],
  },
  {
    title: "Legitimate interests",
    body: [
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `We use Personal Data as necessary to pursue our legitimate interests, or those of third
          parties. Where we Process your Personal Data based on legitimate interests, we will only do
          so where your own rights and freedoms are not unfairly impacted. In particular, we use
          Personal Data to:`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.OLIST,
        content: [
          `Make Platforms work. <br />
          - We identify and correct faults with areas of our Platforms through use of information
          like browser type, operating system, locale, language and general site activity, along
          with any specific feedback you choose to provide to us from time to time.`,
          `Perform Analytics and Improve our Platforms. <br />
          - We evaluate how, when and why businesses use our Platforms. For example, we
          identify which trip routes and Transportation Providers are most popular, which
          features on our Platforms are interacted with most often, and how people engage
          with our communications; <br />
          - We use this information to identify travel trends and to analyse and improve the
          Platforms and trip options we offer; <br />
          - We also make information about trip trends available to Transportation Providers and
          other third parties who want to use these insights to inform decisions about their own
          products and services;<br />
          - We also make information about your choice of preference in terms of Transportation
          Providers and solution selected to third parties.`,
          `Personalise your experience to make our Platforms as helpful and relevant as possible.<br />
          - We show you information or travel options that we believe are most relevant to you;<br/>
          - We use your business location to predict which airport you are likely to want your
          goods to depart from or arrive back to; <br />
          - We tailor marketing communications (if you've asked us to send these to you) and
          adverts to reflect what we believe will be of interest to you;<br />
          - Personalisation involves us creating a profile for you based on information you
          provide to us - such as when populating your account profile, or when subscribing to
          alerts. For example, where we know that you've recently considered booking a sea
          service from Kuwait to Somalia on our Platforms, we may display a message to you
          asking whether you'd like to search for a road service in Somalia, or include
          information about trucks in Somalia in your email newsletter;<br />
          - To make sure that our personalization is as relevant and helpful as possible, we use
          your data to train our machine learning algorithms. We will not use directly identifying
          information for these purposes.`,
          `Ensure Security and Prevent Fraud.<br />
          - We implement security measures on our Platforms and conduct fraud-prevention
          activities;<br />
          - We use information about your device (such as brand, model, operating system,
          settings and browser) and the network you are connected to (such as IP address,
          domain, carrier) to identify suspicious activity;<br />
          - For these purposes, we might make automated decisions about you which may
          result in us blocking your access to the Platforms. If you are affected in this way and
          wish to discuss or appeal an automated decision then please contact us.<br />
          - Furthermore, you agree that we may use Personal Data provided by you in order to
          conduct applicable KYC checks in compliance with prevailing UAE Anti-Money
          Laundering regulations and any other relevant law(s) in your respective jurisdictions
          in this regard. Personal Data that you provide may also be disclosed to a credit
          reference or fraud prevention agency, which may keep a record of that information.`,
          `Perform Customer Satisfaction Surveys and Market Research (where Consent is not
          required).<br />
          - We may contact you to invite you to participate in customer satisfaction surveys,
          market research or user testing;<br />
          - We may record and analyze any feedback that you choose to provide to us.`,
          `Send Transportation Alerts and Marketing Communications (where Consent is not
          required).<br />
          - We will send you alerts and updates if you ask to receive these - such as trip solution
          find;<br />
          - We will send you marketing communications which we think will be of interest to you.
          You can ask us to stop sending these at any time.`,
          `Keep Records and Run our Business.<br />
          - We use information for internal administrative and reporting purposes;`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `Aspects of some of these activities (such as analytics and personalization) will be performed
          based on Consent (where you choose to grant it) rather than legitimate interests. See the
          Consent section below and our Cookie Policy for further information.`,
        ],
      },
    ],
  },
  {
    title: "Consent",
    body: [
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `We will ask you for your Consent for certain uses of your data. For example, you will be
          asked whether you're happy for us to:`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.ULIST,
        content: [
          `Send you promotional communications (where Consent is required);`,
          `Contact you to invite you to participate in customer satisfaction surveys, market
          research or user testing, and record and analyze any feedback that you choose to
          provide to us (where Consent is required);`,
          `Use cookies and similar technologies (where Consent is required), including for
          improved experience and personalized advertising purposes. See our Cookie Policy
          for more information.`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `Where we Process your Personal Data based on Consent, you will give the Consent in
          advance by subscribing to any Platforms of Goods2Load. If you choose to give your
          Consent, you can withdraw it at any time by using the relevant functionality provided within
          our Platforms where possible (for example, using the 'unsubscribe' link in marketing emails,
          changing your privacy settings or amending your account settings), or by contacting us.`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `We may need to use your Personal Data in connection with legal claims, or for compliance
          and regulatory purposes. For example, we will use, share or retain Personal Data where we
          are required by law, a court order or regulatory body. When you exercise any applicable
          legal rights you have to access, amend or delete your Personal Data, we may request
          identification and verification documents from you for the purpose of confirming your identity.`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `To the extent you are asked to click on/check "I accept", "I agree" or similar buttons/
          checkboxes/functionalities in relation to a Policy, doing so will be considered as providing
          your Consent to Process your Personal Data, only in the countries where such Consent is
          required by mandatory law. In all other countries, such action will be considered as a mere
          acknowledgement and the legal basis for the Processing of your Personal Data. You may
          withdraw your Consent by unchecking the “I accept” or “I agree" or similar buttons/
          checkboxes/functionalities in relation to a Policy, failing to do so will be considered as
          providing your Consent to Process your Personal Data.`,
        ],
      },
    ],
  },
  {
    title: "When is Personal Data shared with or collected by third parties?",
    body: [
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `Personal Data is made available to certain companies who process information on our
          behalf, to enable us to operate our Platforms and deliver our services. We may transfer
          Personal Data to our service providers, partners, suppliers, professional advisors, public and
          governmental authorities, including for KYC, fraud prevention or law enforcement purposes
          or third parties in connection with a (potential) corporate or commercial transaction. Such
          third parties may be located in other countries. Transportation Providers with whom you
          make a booking or purchase by being redirected through Goods2Load (like air cargo, sea
          cargo and road cargo or logistic agents) will use your data in line with their own policies.
          Companies that advertise via our Platforms or with which we otherwise collaborate may also
          collect your information for their own purposes.`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `We share Personal Data with selected third parties which provide us with a variety of
          services (<strong>“Third-Party Processors”</strong>). We require Third-Party Processors to undergo a
          security review and agree under contract with us to, amongst other things, keep Personal
          Data secure, comply with applicable data protection laws, and only use it for the purposes
          we have instructed.`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `The types of Third-Party Processors we may share your Personal Data with include:`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.OLIST,
        content: [
          `Providers of email management and distribution tools. For example, if you sign up to
receive Goods2Load newsletters or other marketing messages we will send these to
you using a third-party email distribution tool;`,
          `Providers of security and fraud prevention services. For example, we use these
providers to identify automated software agents that might disrupt our services or to
prevent misuse of our APIs;`,
          `Providers of data aggregation and analytics software services;`,
          `Providers of tracking tools. For example, we use these tools to identify when you
click on a link on the Platforms and redirect to a Transportation Provider's platform;`,
          `Providers of customer service software platforms. These assist us in communicating
with you and providing customer support to you - for example, via our online help
centre;`,
          `Providers of customer satisfaction and market research services. These assist us in
inviting you to participate in these surveys or research, recording your feedback (if
you choose to provide it) and helping us to understand your feedback;`,
          `Providers of online cloud storage services and other essential IT support
services. These enable us to operate our business and run our internal and external
services.`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `Unlike Third-Party Processors, certain trusted companies will process your Personal Data as
a separate controller, which means that they determine how and why your Personal Data is
used rather than Goods2Load:`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.ULIST,
        content: [
          `Transportation Providers. We may disclose Personal Data to Transportation
Providers where necessary to assist you with business queries or issues you raise
with our customer services team. You may review the Transportation Provider's
privacy policy and terms and conditions first to understand how the Transportation
Provider will use your information in advance of making your booking or purchase.`,
          `Fraud Prevention Partners. In order to prevent and detect fraud, we may share
information about you with the fraud prevention services providers we cooperate
with. We may also share Personal Data with Transportation Providers for their, or our,
verification and fraud- detection purposes.`,
          `Advertising Partners. Depending on the Platform you are using and the privacy
choices you make, certain information may be collected from you by third parties
such as advertisers, marketing networks and affiliates using cookies and similar
technologies. We may also collaborate with selected companies to understand more
about our users’ interests, for example, by identifying how users engage with third-
party brands or to improve our advertising campaigns.`,
          `Brand Collaborations. Where necessary, we will share Personal Data with third
parties with which we collaborate on joint initiatives, such as promotions or
competitions. These third parties may send you electronic direct marketing
communications (for example, promotional emails), if you choose to Consent to this.`,
          `Disclosing information for legal and other reasons. We will disclose Personal Data
where necessary to enforce our Terms of Service or other agreements, or as part of a
corporate transaction or proceeding such as a merger, financing, acquisition,
bankruptcy, dissolution, or a transfer, divestiture, or sale of all or a portion of our
business or assets. We may also disclose Personal Data if necessary to prevent,
detect or prosecute unlawful (or suspected unlawful) activities, including fraud, or
where necessary to respond to legally binding requests (for example, from law
enforcement agencies), legal claims or to enforce our own legal rights and remedies.
Further for any other purpose disclosed to you at the time we collect the information
or pursuant to your Consent.`,
        ],
      },
    ],
  },
  {
    title: "Where do we Process Personal Data?",
    body: [
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `Goods2Load utilizes Google Cloud, a third-party cloud service provider, to store and process
Personal Data. All Personal Data collected by Goods2Load is securely stored and
processed on Google Cloud servers, which represent to be compliant with industry
standards and regulations for data protection. While we take reasonable steps to ensure the
security of your information, including choosing trusted partners like Google Cloud, we are
not responsible for the actions or omissions of third-party service providers. By using our
services, you acknowledge that the storage and protection of your Personal Data is subject
to the terms of Google Cloud’s privacy policy and security protocols, and that Goods2Load
cannot guarantee the security of information outside of its direct control.`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `Your Personal Data is Processed in the United Arab Emirates, where Goods2Load is
headquartered. Third parties with which we share Personal Data may process your Personal
Data outside of the country in which you are based. For example, if you are booking a
Transportation Service that operates within a particular country you should expect that your
Personal Data will be transferred to, and be processed by, Transportation Providers in that
country.`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `The laws and regulations in these countries may not provide the same level of protection of
Personal Data as the regulations in your own country. However, we'll put safeguards in place
to protect your data when it is transferred. Where we transfer Personal Data from the Middle
East Economic Area to a location outside the Middle East Economic Area which does not
offer an adequate level of protection for Personal Data, we will put in place appropriate
safeguards to ensure that the Personal Data is adequately protected in that location, most
often by applying United Arab Emirates Commission-approved standard contractual clauses
or relying on the relevant third party's approved Binding Corporate Rules.`,
        ],
      },
    ],
  },
  {
    title: "How is Personal Data used for advertising?",
    body: [
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `You’ll see adverts when you use our Platforms and might also see adverts about
          Goods2Load when you’re on other platforms. These adverts will come from us or from third
          parties and may be personalized to make them more relevant to you. The Business data
          used to personalize adverts may include information you’ve provided to us by creating an
          account, or through cookies and similar technologies (you can find out more in our <a href="/cookie-policy">Cookie
          Policy</a>).`,
        ],
      },
    ],
  },
  {
    title: "Adverts on third-party platforms",
    body: [
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `Goods2Load partners with affiliate network and marketing services providers such as Meta
(“Third-Party Ad Solutions”) to market and advertise our services on third-party websites and
applications and measure the effectiveness of the advertising campaigns. Such activities
include creating audiences for Goods2Load advertisements of other individuals who have
similar characteristics to you based on the information our Third-Party Ad Solutions hold
about you; and including you in 'custom audiences' which will receive Goods2Load
advertising content. Each of our advertising partners has its own policies, and you may read
the third-party platform’s policies for information on their policies on user data privacy.`,
        ],
      },
    ],
  },
  {
    title: "Do we use cookies or similar technologies?",
    body: [
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `We use cookies and similar technologies to help deliver and optimize our Platforms, improve
          your experience and for advertising purposes, depending on which of our Platforms you are
          using and your privacy settings.`,
          `Please see our <a href="/cookie-policy">Cookie Policy</a> for more information and details on the types of cookies and
          similar technologies we use.`,
        ],
      },
    ],
  },
  {
    title: "How long do we store Personal Data?",
    body: [
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `We keep Personal Data only for as long as we need to, in relation to the Business Data only,
          and as long as it is required by Applicable Laws. This depends on the purposes for which
          Personal Data was collected, and whether we have a continuing need or obligation to retain
          Personal Data for a certain period. If we no longer have a need to Process your Personal
          Data, we will delete it or make sure that it no longer identifies you. If you would like further
          information about retention periods, please contact us. You can ask us to delete your
          Personal Data in certain circumstances.`,
        ],
      },
    ],
  },
  {
    title: "How do we keep Personal Data secure?",
    body: [
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `Safeguarding your privacy is embedded in our culture and we use a combination of industry-
standard methods to protect it. Keeping Personal Data secure is our highest priority. To
make sure we maintain a culture of ‘Security & Privacy by Design’, we provide thorough data
protection and privacy training, as well as security training to all Goods2Load employees.
We develop our services with the goal of using the minimum amount of Personal Data
necessary, including through use of data minimisation techniques like anonymisation and
pseudonymisation.`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `No website or app can guarantee complete security, but we have created an organisation-
wide security programme designed to keep your Personal Data as safe as possible. It uses
a range of technical, organisational and administrative security measures and best-practice
techniques, depending on the type of data being Processed. We prioritize the safety and
security of your personal data by employing industry-standard encryption, strict access
controls and regular security audits. We have a comprehensive incident response plan to
address data breaches promptly, adhere to data minimization principles, and ensure third-
party service providers comply with our security standards. We also encourage users to
protect their data with strong passwords, and to show vigilance against phishing scams.`,
        ],
      },
    ],
  },
  {
    title: "What are your choices and rights?",
    body: [
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `If you've got a Goods2Load account, you can visit your profile to manage your account
information and marketing preferences. You also have certain data protection rights, which
we explain in more detail below. You can exercise these rights by getting in touch with us via
our Help Centre.`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `You have the right to ask us for a copy of your Personal Data, if any; to correct, delete or
restrict Processing of your Personal Data; and to obtain the Personal Data you have
provided to us in a structured, machine-readable format. In addition, you can object to the
Processing of your Personal Data in some circumstances (in particular, where we don’t have
to Process the data to meet a contractual or other legal requirement). You may also request
the erasure of your Personal Data, including where such Personal Data would no longer be
necessary to achieve the purposes for which it was collected. You may object to automated
individual decision-making, including profiling or direct marketing purposes.`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `Where we have asked for your Consent, you may withdraw Consent at any time. If you ask
to withdraw your Consent to Goods2Load Processing your data, this will not affect any
Processing which has already taken place at that time.`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `These rights may be limited, for example if fulfilling your request would reveal Personal Data
about another person, or if you ask us to delete information which we are required by law or
have compelling legitimate interests to keep.`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `You can take certain actions in your Goods2Load account (e.g. view, edit, and remove
certain Personal Data from your profile), or make a request by contacting us electronically
via our Help Centre or by writing to us.`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `If you have unresolved concerns, you have the right to complain to a data protection
Supervisory Authority.`,
        ],
      },
    ],
  },
  {
    title: "Applicable Laws:",
    body: [
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `This Policy is governed by the data protection laws of the UAE, GDPR (EU), GDPR (UK),
and California Consumer Privacy Act (CCPA). Our commitment is to adhere to the highest
standards of data privacy and ensure compliance with the relevant legal frameworks.`,
        ],
      },
    ],
  },
  {
    title: "Who are we and how can you contact us?",
    body: [
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `Goods2Load is provided by Goods2Load FZ-LLC, a company registered in the UAE. Our
company number is: 47010212. Our registered office address is: BIZ00921 Compass
Building, Al Shohada Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab
Emirates. <br />
If you have any questions regarding this Policy, you can contact us electronically via
our Help Centre or by writing to Goods2Load FZ- LLC at BIZ00921 Compass Building, Al
Shohada Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates.`,
        ],
      },
    ],
  },
];

export const privacyPolicyPageData: ILegacyPage = {
  title: "Goods2load Privacy Policy",
  subTitle: "Thursday, 3 October 2024",
  bg,
  data,
};
