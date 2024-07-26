import {
  ILegacyPage,
  ILegacyDataBlock,
  ILegacyDataBlockBodyType,
} from "@/components/Legacy/types";
import bg from "@/assets/LegacyImages/privacyPolicy.png";
import { generateBlockId } from "@/lib/utils";

const data: ILegacyDataBlock[] = [
  {
    title: "",
    body: [
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "This privacy policy does not apply in the United States of America. The US privacy policy is available at Privacy policy.",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: ["No surprises!"],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.PARAGRAPH,
            content: [
              "We'll only ever collect, use and share your information in ways that are described in this policy.",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: ["We'll keep your information safe."],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.PARAGRAPH,
            content: [
              "We're committed to the confidentiality and security of the personal data you give us.",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: ["You're always in control."],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.PARAGRAPH,
            content: [
              "Update your profile and communication preferences at any time.",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "About this policy",
    body: [
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "Along with our <a href='/cookie-policy'>Cookie Policy</a> and <a href='/terms-of-service'>Terms of Service</a>, this Privacy Policy (the <b>“Policy”</b>) explains how we collect and handle your information across all of the Goods2load services, including the mobile app and the Goods2load website, and other services such as our customer service or user research channels (together, the <b>“Platforms”</b>). We'll review this from time to time to make sure it's up-to-date and post the latest version here. When we make significant changes, we'll let you know when you next access our services, or by other communications.",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "We use the term “personal data” a lot in this Policy. It means any information relating to you as an identifiable individual. We use the term “business data” a lot in this Policy as well. It means any information relating your business as an identifiable legal entity. This may include information such as your name, your company name, respective contact details, trip itinerary, internet protocol (<b>“IP”</b>) address, cookie strings or device IDs, as well as information that we store alongside such identifiers, such as how you use our Platforms.",
        ],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.PARAGRAPH,
            content: [
              "We can only speak for ourselves, so this Policy doesn't cover the collection or use of your information by the other companies whose products and services we feature on our Platforms, such as airlines, logistic services agents, road cargo, ship companies, activity providers, carbon offsetting providers, insurers and travel compensation specialists (<b>“Travel Providers”</b>).",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "When you make a booking or purchase with a Transportation Provider, your information will be processed by them in accordance with their own privacy notice and terms and conditions. If you make a booking or purchase with a Transportation Provider on the Goods2load Platforms, we'll always make links to these documents available so you can read them before you complete your booking or purchase.",
        ],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.PARAGRAPH,
            content: [
              "Please note that our Platforms are not intended for individual with no business, or children under 18 years of age, and nobody under the age of 18 should provide any information to Goods2load via our Platforms or otherwise. We don't knowingly collect personal data from anybody under 18, and we will delete any personal data that we learn has not been provided by, other than with the express authorization of, the child's parent or legal guardian.",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "We will update this Policy from time to time, so please make sure that you check this page occasionally to review the current version. If the updates are significant, we'll notify you of these changes when you next access our services, or by other communications.",
        ],
      },
    ],
  },
  {
    title: "What personal data do we collect and where does it come from?",
    body: [
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "Without information we can't help you to plan and book the perfect logistic service for your business or make our Platforms and other services the best they can be. So, when you use our Platforms or otherwise interact with us, we collect, use, store and share some personal data. Learn more about what personal data we collect and from where.",
        ],
      },
    ],
  },
  {
    title: "Why and how do we use personal data?",
    body: [
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: ["We collect personal data in three ways:"],
      },
      {
        type: ILegacyDataBlockBodyType.ULIST,
        content: ["<b>You give it to us</b>"],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.PARAGRAPH,
            content: [
              "For example, you will provide us with personal data when you log in identifying the user, create an account, sign up to marketing emails or price alerts, <a href='mailto:jpanigari@goods2load.com'>contact us</a> for customer support or otherwise communicate with us.",
              "It's always up to you whether you choose to give us these types of personal data, but if you decide not to provide certain categories of personal data then aspects of our Platforms and other services won't work (for example, you cannot sign-up to marketing or price alerts without providing us with your contact details).",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.ULIST,
        content: ["<b>We generate or collect it automatically</b>"],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.PARAGRAPH,
            content: [
              "We generate or collect some information from your computer or device automatically as you use our Platforms or otherwise interact with us.",
              "Depending on the Platform you are using and your privacy settings, this will include information like your IP address, cookie identifiers, location, the device and browser you're using, and how you use and interact with the Goods2load Platforms and certain third-party websites.",
              "Some of this information is generated or collected via cookies and similar technologies. For more information, see our <a href='/cookie-policy'>Cookie Policy</a>.",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.ULIST,
        content: ["<b>We receive it from third parties</b>"],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.PARAGRAPH,
            content: [
              "Sometimes we're given information about you from third parties - for example, if you come to our Platforms via a promotional partner, or when you log into your Goods2load account using our social network login feature.",
              "If you make a booking or purchase with a TransportaitonProvider on our Platforms or the Transportation Provider's platform, we may receive information from them about the travel option you book or purchase. Depending on the type of booking or purchase you make, we may also receive information about you from fraud prevention partners we cooperate with, to prevent misuse of personal data and protect our systems.",
              "We might also receive personal data from third parties with which we collaborate for marketing and advertising purposes, depending on the initiative. Where this is the case, you will be provided with further information in advance.",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: ["The types of personal data we process as a business."],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.PARAGRAPH,
            content: [
              "Depending on how you interact with us and your privacy settings, we collect and process the following types of personal data:",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: ["1. Contact Information such as:"],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.ULIST,
            content: ["name, address, email address, and telephone number."],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: ["2. Identification Information such as:"],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.ULIST,
            content: [
              "ID information, which may contain information like your name, address, gender, nationality, and date of birth.",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: ["3. Transportation and Booking Information such as:"],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.ULIST,
            content: [
              "booking references or order numbers, booking and purchase history, business name record (<b>“BNR”</b>), ID or license information, travel itinerary and other information relating to the goods or services purchased;",
              "where you are redirected to a Travel Provider's platform to complete a booking or purchase, information about the booking or purchase made with that Transportation Provider.",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "4. Account Information, if you choose to create an account and populate your profile, such as:",
        ],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.ULIST,
            content: [
              "name, date of birth, gender, and place of birth;",
              "identification information (see above);",
              "price alert scheme information.",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: ["5. Device and Location Information such as:"],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.ULIST,
            content: [
              "operating system;",
              "non-specific location based on your IP address;",
              "specific location data derived from your mobile device (if you choose to grant us access to this).",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: ["6. Usage Information such as:"],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.ULIST,
            content: [
              "How you interact with our Platforms and communications, including time you spend on our Platforms, searches performed, click per Transportation provider, Click per offer, filter modification and the pages, features or functionality you have accessed, links you have clicked to be redirected to or from our Platforms (including, for example, the identity of the Transportation Provider you are redirecting to and the type of travel service you have selected). Depending on the Platform you are using and your privacy settings, some of this data will be collected or generated using cookies - for more information, see our <a href='/cookie-policy'>Cookie Policy</a>.",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "7. Preferences Information you have communicated to us, such as:",
        ],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.ULIST,
            content: [
              "Specific consents you have given or declined, email and push notification preferences and cookie preferences;",
              "Preferred language, locale, currency and airport, seaport, roads for collection and delivery.",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: ["8. Communications Information such as:"],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.ULIST,
            content: [
              "The content of communications we send to and receive from you, including feedback, help requests and queries;",
              "Information about those communications, such as time and date sent and how you interact with communications we send to you (for example open rate and click- through rate).",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: ["9. User Generated or Provided Content such as:"],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.ULIST,
            content: [
              "Content you upload to our Platforms or which relate to our Platforms (such as photos, recommendations, preferences, reviews and prompts you enter into AI- powered language models we may make available to you on our Platforms) and information about the content, such as the time and date associated with that content;",
              "Your engagement with us on social media platforms (such as Instagram, Twitter or Facebook but not only) including comments, photos, videos, and publicly available information about your social media account (such as your username). If we love your content, we might reach out to you to ask whether you're happy for us to repost your content or use it on other platforms.",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: ["10. Third-Party Log-In Information:"],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.ULIST,
            content: [
              "If you choose to create a Goods2load account via a third-party platform (for example, Apple, Google or Facebook), we may automatically receive personal data about you from that third party, such as your email address, name and other contact details. The personal data we receive will vary depending on the information that you have provided to the third party and your preferences within the third-party platform (for example, you may have enabled Apple's 'Hide My Email' functionality). Please refer to the relevant third party's privacy notice for further information.",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: ["11. Profiling Information:"],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.ULIST,
            content: [
              "We combine information that we collect, generate, or receive (as described above) to understand you and your interests better, so that we can personalize our Platforms, services and advertising for you. We do this by drawing inferences about your preferences and interests from the combined data.",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "We don't routinely collect special category personal data (these are more sensitive types of data, such as information relating to your health, religion or ethnic origin). However, you may choose to provide us with information which reveals this type of data - for example, if you contact our customer services team to inform us about these personal aspect. You may also choose to provide us with this information if you participate in relevant types of market research or user testing - for example, if you provide feedback on the accessibility of our Platforms.",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: ["We only use your personal data where:"],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.ULIST,
            content: [
              "Necessary for us to perform a contract with you, or facilitate a contract between you and a Travel Provider;",
              "Necessary to pursue our or others' legitimate interests;",
              "Necessary to exercise legal rights or comply with legal obligations; or",
              "You've given us your consent.",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: ["Learn more about how and why we use your personal data."],
      },
    ],
  },
  {
    title: "Performing a Contract",
    body: [
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "We use personal data to deliver our services or facilitate the performance of a contract you've entered - or are entering - into, such as a booking with us or a Transportation Provider. In particular, we use personal data to:",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: ["<b>1. Make our Platforms work.</b> For example:"],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.ULIST,
            content: [
              "We generate results in response to your search queries, for example providing you with a list of the flight, ship or truck options that best meet your requirements;",
              "We ensure that our Platforms and services are accessible and usable (for example, making sure that we display our services correctly based on the type of device you are using).",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "<b>2. Facilitate bookings and purchases.</b> Where you find a transportation option that you'd like to book or purchase, we either:",
        ],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.ULIST,
            content: [
              "Redirect you to the Transportation Provider's platform along with the information necessary to enable them to recognize you and the trip option you had selected on our Platforms. This information includes details of your travel search and data about your browser/device; or",
              "Enable you to make your booking or purchase on our Platforms, in which case we collect any personal data necessary for your booking or purchase to be processed and share this with the Transportation Provider. Depending on the booking or purchase you are making, this information may include your contact details, company name or identification information.",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "<b>3. Send you important communications:</b> We will send you communications about:",
        ],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.ULIST,
            content: [
              "Your booking;",
              "Your Goods2load account;",
              "Other essential information, such as important changes or updates to our services.",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "<b>4. Provide customer services.</b> We respond to communications you send us about our services, your account, or a booking or purchase you've made.",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "<b>5. Maintain your Goods2load account.</b> We create and maintain your Goods2load account (if you have one) and provide you with the benefits associated with having an account, such as remembering your account details and using these during your checkout process, so that you can make bookings more quickly.",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "<b>6. Run competitions.</b> If you choose to enter any competition, sweepstake or similar run by Goods2load, we will use the personal data you provide to administer the competition and deliver prizes to winners.",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "We may use essential cookies and similar technologies on your device for some of these purposes, as explained in more detail in our <a href='/cookie-policy'>Cookie Policy</a>.",
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
          "We use personal data as necessary to pursue our legitimate interests, or those of third parties. Where we process your personal data based on legitimate interests, we will only do so where your own rights and freedoms are not unfairly impacted.",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: ["In particular, we use personal data to:"],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "<b>1. Make Platforms work.</b> We identify and correct faults with areas of our Platforms through use of information like browser type, operating system, locale, language and general site activity, along with any specific feedback you choose to provide to us from time to time.",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "<b>2. Perform Analytics and Improve our Platforms.</b> For example:",
        ],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.ULIST,
            content: [
              "We evaluate how, when and why business representer use Goods2load Platforms. For example, we identify which trip routes and Transportation Providers are most popular, which features on our Platforms are interacted with most often, and how people engage with our communications;",
              "We use this information to identify travel trends and to analyse and improve the Platforms and trip options we offer;",
              "We also make information about trip trends available to TransportationProviders and other third parties who want to use these insights to inform decisions about their own products and services.",
              "We also make information about your choice of preference in terms of Transportation provider and price selected to Third party.",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "<b>3. Personalise your Skyscanner experience:</b> we want to make our Platforms as helpful and relevant as possible. For example:",
        ],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.ULIST,
            content: [
              "We show you information or travel options that we believe are most relevant to you; ",
              "We use your business location to predict which airport you are likely to want to your goods depart from or arrive back to;",
              `We tailor marketing communications (if you've asked us to send these to you) and adverts to reflect what we believe will be of interest to you. See <a href='/privacy-policy#${generateBlockId("How is personal data used for advertising?")}'>'How is personal data used for advertising?'</a> for more information.`,
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "Personalisation involves us creating a profile for you based on information you provide to us - such as when making a booking or purchase, when populating your account profile, or when subscribing to flight alerts. For example, where we know that you've recently booked a sea service from Kuwait to Somalia on one of our Platforms, we may display a message to you asking whether you'd like to search for a read service in Somalia, or include information about truck in Somalia in your next email newsletter.",
        ],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.PARAGRAPH,
            content: [
              "To make sure that our personalization is as relevant and helpful as possible, we use your data to train our machine learning algorithms. We will not use directly identifying information such as your contact details or never we will in contact with your payment data for these purposes.",
              "These profiling and machine learning activities do not have legal or other significant effects on you.",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "<b>4. Ensure Security and Prevent Fraud.</b> We implement security measures on our Platforms and conduct fraud-prevention activities. For example:",
        ],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.PARAGRAPH,
            content: [
              "We use information about your device (such as brand, model, operating system, settings and browser) and the network you are connected to (such as IP address, domain, carrier) to identify suspicious activity.",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "For these purposes, we might make automated decisions about you which may result in us or the relevant Transportation Provider blocking your booking. If you are affected in this way and wish to discuss or appeal an automated decision then please <a href='mailto:jpanigari@goods2load.com'>contact us</a>.",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "<b>5. Perform Customer Satisfaction Surveys and Market Research (where consent is not required).</b> For example:",
        ],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.ULIST,
            content: [
              "We may contact you to invite you to participate in customer satisfaction surveys, market research or user testing;",
              "We will facilitate your participation in customer satisfaction surveys, market research or user testing and record and analyze any feedback that you choose to provide to us.",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "<b>6. Send Transportation Alerts and Marketing Communications (where consent is not required).</b> For example:",
        ],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.ULIST,
            content: [
              "We will send you alerts and updates if you ask to receive these - such as trip price alerts;",
              "We will send you marketing communications which we think will be of interest to you.",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: ["You can ask us to stop sending these at any time."],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: ["<b>7. Keep Records and Run our Business.</b> For example:"],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.ULIST,
            content: [
              "We use information for internal administrative and reporting purposes;",
              "We use information that we collect directly from you and information provided to us by Transportation Providers about your booking or purchase to calculate any fees due to Goods2load by the Transportation Provider.",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "Aspects of some of these activities (such as analytics and personalization) will be performed on the basis of consent (where you choose to grant it) rather than legitimate interests. See the Consent section below and our <a href='/cookie-policy'>Cookie Policy</a> for further information.",
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
          "We will ask you for your consent for certain uses of your data. For example, you will be asked whether you're happy for us to:",
        ],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.ULIST,
            content: [
              "Send you promotional communications (where consent is required);",
              "Contact you to invite you to participate in customer satisfaction surveys, market research or user testing, and record and analyze any feedback that you choose to provide to us (where consent is required);",
              "Use cookies and similar technologies (where consent is required), including for improved experience and personalized advertising purposes. See our Cookie Policy for more information.",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "Where we process your personal data based on consent, you will be informed and asked for your consent in advance. Where we process your business data based on consent, you will give the consent in advance by subscribing to any platform of Goods2load . If you choose to give your consent, you can withdraw it at any time by using the relevant functionality provided within our Platforms where possible (for example, using the 'unsubscribe' link in marketing emails, changing your privacy settings or amending your account settings), or by contacting us. If you withdraw your consent you will not benefit from promotions and offers from us.",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "We may need to use your personal data in connection with legal claims, or for compliance and regulatory purposes. For example, we will use, share or retain personal data where we are required by law, a court order or regulatory body. When you exercise any applicable legal rights you have to access, amend or delete your personal data, we may request identification and verification documents from you for the purpose of confirming your identity.",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: ["We only use your personal data where:"],
        additionalContent: [
          {
            type: ILegacyDataBlockBodyType.ULIST,
            content: [
              "Necessary for us to perform a contract with you, or facilitate a contract between you and a Transportation Provider;",
              "Necessary to pursue our or others' legitimate interests;",
              "Necessary to exercise legal rights or comply with legal obligations; or",
              "You've given us your consent.",
            ],
          },
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: ["Learn more about how and why we use your personal data."],
      },
    ],
  },
  {
    title: "When is personal data shared with or collected by third parties?",
    body: [
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "We share personal data where necessary for the purposes described in How and why do we use personal data? This means we share personal data where you ask us to, where it's a necessary part of doing business with you and providing you with services, where we need to for legal reasons, or where sharing information is necessary to pursue our, or a third party's, legitimate interests.",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "Personal data is made available to certain companies who process information on our behalf, to enable us to operate our Platforms and deliver our services. Transportation Providers with whom you make a booking or purchase via Goods2load (like air cargo, sea cargo and road cargo or logistic agents) will use your data in line with their own policies. Companies that advertise via our Platforms or with which we otherwise collaborate may also collect your information for their own purposes.",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "Sharing personal data with third parties who process it on our behalf.",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "We share personal data with selected third parties which provide us with a variety of services (<b>“Third-Party Processors”</b>). We require Third-Party Processors to undergo a security review and agree under contract with us to, amongst other things, keep personal data secure, comply with applicable data protection laws, and only use it for the purposes we have instructed.",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "The types of Third-Party Processors we may share your personal data with include:",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.OLIST,
        content: [
          "<b>Providers of email management and distribution tools.</b> For example, if you sign up to receive Goods2load newsletters or other marketing messages we will send these to you using a third-party email distribution tool;",
          "<b>Providers of security and fraud prevention services.</b> For example, we use these providers to identify automated software agents that might disrupt our services or to prevent misuse of our APIs;",
          "<b>Providers of data aggregation and analytics software services.</b>",
          "<b>Providers of tracking tools.</b> For example, we use these tools to identify when you click on a link on the Skyscanner Platforms and redirect to a Travel Provider's platform;",
          "<b>Providers of customer service software platforms.</b> These assist us in communicating with you and providing customer support to you - for example, via our online help centre;",
          "<b>Providers of customer satisfaction and market research services.</b> These assist us in inviting you to participate in these surveys or research, recording your feedback (if you choose to provide it) and helping us to understand your feedback;",
          "<b>Providers of online cloud storage services and other essential IT support services.</b> These enable us to operate our business and run our internal and external services;",
          "<b>Other companies within the Goods2load group.</b> Group companies assist us with the purposes described in this Policy, including delivery of our services to your business.",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "Sharing your information with third parties, or allowing them to collect it, for their own purposes Unlike Third-Party Processors, certain trusted companies will process your personal data as a separate controller, which means that they determine how and why your personal data is used rather than Goods2load:",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.ULIST,
        content: [
          "<b>Transportation Providers.</b> If you make a booking or purchase with a Transportation Provider on one of our Platforms, personal data you submit as part of your booking, in addition and olnly required with the business data, will be shared with the relevant Transportation Provider (or third parties providing services on their behalf) so that your booking or purchase can be processed. If you agree to receive marketing communications from the Transportation Provider or join their loyalty program, we will also share personal data for these purposes. We may also disclose personal data to Transportation Providers where necessary to assist you with business queries or issues you raise with our customer services team. You'll be able to review the Transportation Provider's privacy policy and terms and conditions first to understand how the Transportation Provider will use your information in advance of making your booking or purchase.",
          "<b>Fraud Prevention Partners.</b> In order to prevent and detect fraud, we may share information about you with the fraud prevention services providers we cooperate with. We may also share personal data with Transportation Providers for their, or our, verification and fraud- detection purposes.",
          "<b>Advertising Partners.</b> Depending on the Platform you are using and the privacy choices you make, certain information may be collected from you by third parties such as advertisers, marketing networks and affiliates using cookies and similar technologies. We may also collaborate with selected companies to understand more about our travellers' interests, for example, by identifying how goods2load businesses subscriber engage with third-party brands or to improve our advertising campaigns. You can find out more in our Cookie Policy and How is personal data used for advertising?",
          "<b>Brand Collaborations.</b> Where necessary, we will share personal data with third parties with which we collaborate on joint initiatives, such as promotions or competitions. These third parties may send you electronic direct marketing communications (for example, promotional emails), if you choose to consent to this.",
          "<b>Disclosing information for legal and other reasons.</b> We will disclose personal data where necessary to enforce our Terms of Service or other agreements, or as part of a corporate transaction or proceeding such as a merger, financing, acquisition, bankruptcy, dissolution, or a transfer, divestiture, or sale of all or a portion of our business or assets. We may also disclose personal data if necessary to prevent, detect or prosecute unlawful (or suspected unlawful) activities, including fraud, or where necessary to respond to legally binding requests (for example, from law enforcement agencies), legal claims or to enforce our own legal rights and remedies.",
          "<b>Other companies within the Skyscanner group.</b> Personal data is shared with other entities in the Skyscanner group which assist us with the purposes described in this Policy and for group-wide purposes, including delivery of our services to you, security and fraud- prevention, and internal reporting and administration.",
        ],
      },
    ],
  },
  {
    title: "Where do we process personal data?",
    body: [
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "Personal data is securely stored in data centres around the world – the exact location depends on where you are when you use Goods2load. Personal data will only be processed by suppliers who provide appropriate contractual safeguards for the information they process. Sometimes personal data may be stored in countries with different levels of security to your own but we always make sure their standards meet ours.",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `Your personal data is processed in the United Arab Emirates, where Goods2load is headquartered. Your personal data may also be processed by other Goods2load entities (see <a href='/privacy-policy#${generateBlockId("When is personal data shared with or collected by third parties?")}'>When is personal data shared with or collected by third parties?</a> for further information).`,
          "We store personal data on secure servers in various locations, depending on where you are in the world when you access our Platforms.",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "Third parties with which we share personal data may process your personal data outside of the country in which you are based. For example, if you are booking a logistic service that operates within a particular country you should expect that your personal data will be transferred to, and be processed by, Transportation Providers in that country.",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "The laws and regulations in these countries may not provide the same level of protection of personal data as the regulations in your own country. However, we'll put safeguards in place to protect your data when it is transferred. Where we transfer personal data from the Middle East Economic Area to a location outside the Middle East Economic Area which does not offer an adequate level of protection for personal data, we will put in place appropriate safeguards to ensure that the personal data is adequately protected in that location, most often by applying United Arab Emirates Commission-approved standard contractual clauses or relying on the relevant third party's approved Binding Corporate Rules.",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "If you have a question about the steps we take to safeguard your personal data, please <a href='mailto:jpanigari@goods2load.com'>contact us</a>.",
        ],
      },
    ],
  },
  {
    title: "How is personal data used for advertising?",
    body: [
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "You’ll see adverts when you use our Platforms and might also see adverts about Goods2load and selected Goods2load partners when you’re on other platforms. These adverts will come from us or from third parties and may be personalized to make them more relevant to you. The personal and business data used to personalize adverts may include information you’ve provided to us by creating an account or making a booking via the Goods2load Platforms, or through cookies and similar technologies (you can find out more in our <a href='/cookie-policy'>Cookie Policy</a>).",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "Adverts you might see while using Goods2load Platforms",
          `Goods2load partners with affiliate network and marketing services providers such as Facebook (<a href='/cookie-policy#${generateBlockId("Purpose of personalised adverts (including third-party ad solutions) cookies or similar technologies")}'>“Third-Party Ad Solutions”</a>) to market and advertise our services on third-party websites and applications and measure the effectiveness of the advertising campaigns. Such activities include:`,
        ],
      },
      {
        type: ILegacyDataBlockBodyType.OLIST,
        content: [
          "Creating audiences for Goods2load advertisements of other individuals who have similar characteristics to you based on the information our Third-Party Ad Solutions hold about you; and",
          "Including you in 'custom audiences' which will receive Goods2load advertising content.",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "For more information about how we use cookies and similar technologies, including how you can manage your preferences, please see our Cookie Policy.",
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
          "We use cookies and similar technologies to help deliver and optimize our Platforms, improve your experience and for advertising purposes, depending on whether you are using our website or app and your privacy settings.",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "Please see our <a href='/cookie-policy'>Cookie Policy</a> for more information and details on the types of cookies and similar technologies we use.",
        ],
      },
    ],
  },
  {
    title: "How long do we store personal data?",
    body: [
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "We keep personal data only for as long as we need to and in relation to the business data only. This depends on the purposes for which personal data was collected, and whether we have a continuing need or obligation to retain personal data for a certain period. If we no longer have a need to process your personal data, we will delete it or make sure that it no longer identifies you. If you would like further information about retention periods, please contact us.",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          `You can ask us to delete your personal data in certain circumstances. Find out more about how you can manage your personal data in <a href='/privacy-policy#${generateBlockId("What are your choices and rights?")}'>What are your choices and rights?</a>`,
        ],
      },
    ],
  },
  {
    title: "How do we keep personal data secure?",
    body: [
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "Safeguarding your privacy is embedded in our culture and we use a combination of industry- standard methods to protect it.",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "Keeping personal data secure is our highest priority. To make sure we maintain a culture of ‘Security & Privacy by Design’, we provide thorough data protection and privacy training, as well as security training to all Goods2load employees. We develop our services with the goal of using the minimum amount of personal data necessary, including through use of data minimisation techniques like anonymisation and pseudonymisation.",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "No website or app can guarantee complete security, but we have created an organisation-wide security programme designed to keep your personal data as safe as possible. It uses a range of technical, organisational and administrative security measures and best-practice techniques, depending on the type of data being processed. You can find out more about Goods2load’s commitment to security <a href='TODO'>here</a>.",
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
          "If you've got a Goods2load account, you can visit your profile to manage your account information and marketing preferences. You also have certain data protection rights, which we explain in more detail below. You can exercise these rights by getting in touch with us via our Help Centre.",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "You have the right to ask us for a copy of your personal data; to correct, delete or restrict processing of your personal data; and to obtain the personal data you have provided to us in a structured, machine-readable format. In addition, you can object to the processing of your personal data in some circumstances (in particular, where we don’t have to process the data to meet a contractual or other legal requirement).",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "Where we have asked for your consent, you may withdraw consent at any time. If you ask to withdraw your consent to Goods2load processing your data, this will not affect any processing which has already taken place at that time.",
          "These rights may be limited, for example if fulfilling your request would reveal personal data about another person, or if you ask us to delete information which we are required by law or have compelling legitimate interests to keep.",
          "You can take certain actions in your Goods2load account (e.g. view, edit, and remove certain personal data from your profile), or make a request by contacting us electronically via our Help Centre or by writing to our address BIZ00921 Compass Building, Al Shohada Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates - Goods2load FZ-LLC LICENCE NO 47010212",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "If you have unresolved concerns, you have the right to complain to a data protection Supervisory Authority.",
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
          "Goods2load is provided by Goods2load FZ-LLC, a company registered in the UAE.",
          "Our company number is: 47010212.",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "Our registered office address is: BIZ00921 Compass Building, Al Shohada Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah,",
          "United Arab Emirates.",
        ],
      },
      {
        type: ILegacyDataBlockBodyType.PARAGRAPH,
        content: [
          "You can contact us electronically via our <a href='/help-centre'>Help Centre</a> or by writing to Goods2load FZ- LLC LICENCE NO 47010212 BIZ00921 Compass Building, Al Shohada Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates.",
        ],
      },
    ],
  },
];

export const privacyPolicyPageData: ILegacyPage = {
  title: "Goods2load Privacy Policy",
  subTitle: "Wednesday, 3 January 2024",
  bg,
  data,
};
