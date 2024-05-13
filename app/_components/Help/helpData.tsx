import { HelpData, TabName } from "@/app/interface/helpData";
import HelpShipSvg from "@/components/ui/Svg/HelpSvg/HelpShipSvg";
import HelpPlaneSvg from "@/components/ui/Svg/HelpSvg/HelpPlaneSvg";
import HelpTruckSvg from "@/components/ui/Svg/HelpSvg/HelpTruckSvg";

export const tabs = [
  {
    name: TabName.PLANE,
    icon: <HelpPlaneSvg />,
  },
  {
    name: TabName.SHIP,
    icon: <HelpShipSvg />,
  },
  {
    name: TabName.TRUCK,
    icon: <HelpTruckSvg />,
  },
];

export const helpData: HelpData = {
  [TabName.SHIP]: [
    {
      question:
        "What is the reason for specifying the Incoterm details in my shipping request?",
      description: <span>Specifying Incoterms details in your shipping request is essential for clarity, risk management, cost calculation, legal compliance, and efficient logistics planning.  
        <br/><br/><b>EXPORT (I’M SELLING):</b><br/> - CFR (Cost and Freight): The seller delivers the goods on board the vessel, contracting for and paying the costs and freight necessary to bring the goods to the named port of destination. - CIF (Cost, Insurance and Freight): Similar to CFR, but the seller must also obtain minimum insurance cover against the buyer&apos;s risk of loss or damage to the goods during carriage. - CPT (Carriage Paid To): The seller pays for the carriage of goods up to the named place of destination. - CIP ( Carriage and Insurance Paid): The seller pays for the carriage of the goods up to the named place of destination, with the exception that the seller is required to obtain minimum insurance for the goods while in transit.
        <br/><br/><b>IMPORT (I AM BUYING):</b><br/> - FOB (Free on Board): The seller delivers the goods on board the vessel nominated by the buyer at the named port of shipment. - FCA (Free Carrier): The seller delivers the goods, cleared for export, at a named place, which can be their own premises or another designated location.</span>,
    },
    {
      question:
        "HOW DOES THE PROCESS OF CARGO LOADING AND UNLOADING WORK AT PORTS FOR SEA SHIPMENTS?",
      description:
        "The process of cargo loading and unloading at ports involves specialized equipment such as cranes to move containers onto and off ships. Cargo is organized and stored in designated areas within the port until it&apos;s ready to be loaded onto the ship or transported away from the port.",
    },
    {
      question:
        "WHAT ARE THE MAIN FACTORS INFLUENCING TRANSIT TIMES FOR SEA CARGO SHIPMENTS?",
      description:
        "Transit times for sea cargo shipments are influenced by factors such as the distance between ports, shipping routes, vessel speed, port congestion, geopolitical tension, customs clearance procedures, and weather conditions.",
    },
    {
      question:
        "CAN YOU EXPLAIN THE DIFFERENT TYPES OF VESSELS USED FOR SEA CARGO TRANSPORTATION AND THEIR RESPECTIVE CAPABILITIES?",
      description: <span>
        Various types of vessels are used for sea cargo transportation, such as:
• Container Ships: These vessels are specifically designed to carry standardized containers,
known as TEUs (Twenty-foot Equivalent Units) or FEUs (Forty-foot Equivalent Units). Container ships are highly versatile and can transport a wide range of goods, including dry goods, perishables, and manufactured products. They are equipped with onboard cranes or gantry cranes to facilitate the loading and unloading of containers at ports.
• Bulk Carriers: Bulk carriers are designed to transport unpackaged bulk cargo, such as grain, coal, ore, and cement. They come in various sizes and configurations, including handy-sized, panamax, and capesize vessels, depending on the volume and type of cargo they are intended to carry. Bulk carriers typically have large cargo holds and hatches for efficient loading and unloading of bulk commodities.
• Tankers: Tankers are specialized vessels designed for transporting liquid cargo, including crude oil, petroleum products, chemicals, and liquefied natural gas (LNG). They are equipped with storage tanks specifically designed to handle different types of liquids, along with advanced pumping and loading systems to facilitate the transfer of cargo at sea terminals.
• Roll-on/Roll-off (Ro-Ro) Vessels: Ro-Ro vessels are designed to transport wheeled cargo, such as cars, trucks, trailers, and heavy machinery, that can be driven on and off the ship via ramps. These vessels are commonly used for transporting vehicles between continents or across large bodies of water. They offer efficient and cost-effective transportation for a wide range of wheeled cargo. 
Each type of vessel has its own capabilities and is suitable for transporting specific types of cargo.
      </span>,
    },
    {
      question:
        "CAN YOU EXPLAIN THE DIFFERENT TYPES OF VESSELS USED FOR SEA CARGO TRANSPORTATION AND THEIR RESPECTIVE CAPABILITIES?",
      description:
        "Customs procedures for sea cargo shipments, especially for international routes, involve thorough documentation checks, cargo inspections, and compliance with import/export regulations. Customs authorities verify the accuracy of documents such as the commercial invoice and packing list, conduct physical inspections when necessary, and ensure compliance with regulations on prohibited goods, customs duties, and tariffs. Risk assessments are performed to identify high-risk shipments, which may undergo enhanced scrutiny to mitigate potential risks such as smuggling or fraud. Compliance with customs procedures is essential to facilitate smooth clearance and avoid delays or penalties.",
    },
    {
      question:
        "WHAT MEASURES ARE IN PLACE TO SAFEGUARD SEA CARGO AGAINST ADVERSE WEATHER CONDITIONS OR UNFORESEEN EVENTS DURING TRANSIT?",
      description: <span>• Proper Packaging and Securing of Cargo: Cargo must be securely packed and stowed within containers or vessels to prevent shifting or damage during rough seas or inclement weather. Proper packaging techniques, such as using sturdy containers, securing cargo with lashings or bracing, and providing adequate cushioning, help minimize the risk of damage or loss.
        • Regular Maintenance of Vessels: Vessel owners and operators are responsible for
        ensuring that their ships are properly maintained and seaworthy. Regular inspections, maintenance checks, and adherence to international maritime safety standards help identify and address potential issues before they escalate into safety hazards.
        • Monitoring Weather Forecasts: Continuous monitoring of weather forecasts and sea conditions is essential for identifying potential hazards and making informed decisions regarding voyage routes, sailing schedules, and cargo handling procedures. Vessel operators use weather routing services and onboard weather monitoring systems to stay updated on changing weather patterns and minimize exposure to adverse conditions.
        • Implementation of Emergency Response Plans: Vessels are equipped with comprehensive emergency response plans that outline procedures for responding to emergencies such as severe weather events, mechanical failures, or accidents at sea. Crew members undergo regular training drills to ensure they are prepared to handle various emergency scenarios effectively.
        • Advanced Navigation and Communication Systems: Modern vessels are equipped with advanced navigation and communication systems, including GPS navigation, radar systems, satellite communication, and automated distress alert systems (such as EPIRBs), to enhance safety and facilitate real-time communication with shore-based authorities and rescue teams in case of emergencies. 
        By implementing these measures and adopting a proactive approach to risk management, stakeholders in the maritime industry can mitigate the impact of adverse weather conditions and unforeseen events on sea cargo transportation, thereby ensuring the safety of crew members, vessels, and cargo.</span>,
    },
  ],
  [TabName.PLANE]: [
    {
      question:
        "What is the reason for specifying the Incoterm details in my shipping  request?",
      description: <span>
        Specifying Incoterms details in your shipping request is essential for clarity, risk management, cost calculation, legal compliance, and efficient logistics planning.
        <br/><br/>
        <b>PREPAID:</b>
        <br/>- DDP (Delivered Duty Paid): The seller bears all costs and risks until the goods&apos; arrival at the named place of destination, including all taxes and customs formalities, without unloading. 
        <br/>- DPU (Delivered at Place Unloaded): The seller bears all risks and costs involved in bringing the goods to and unloading them at the named place of destination. 
        <br/>- DAP (Delivered At Place): The seller bears all costs and risks until arrival at the designated destination, excluding discharge. 
        <br/>- DDU (Delivered Duty Unpaid): The seller bears all costs and risks up to the named place, excluding discharge. 
        <br/>- CPT (Carriage Paid To): The seller arranges carriage to the named destination without bearing risks of loss or damage to the goods. 
        <br/>- CIP (Carriage and Insurance Paid to): Similar to CPT, but the seller is required to obtain minimum insurance for the goods while in transit.
        <br/><br/><b>COLLECT:</b>
        <br/>- EXW (Ex Works): The seller only makes the goods available to the buyer at their own premises.
        <br/>- FCA (Free Carrier): The seller delivers the goods to a carrier nominated by the buyer.
      </span>,
    },
    {
      question: "HOW DOES THE PROCESS OF CARGO HANDLING WORK AT AIRPORTS FOR AIR CARGO SHIPMENTS?",
      description: "The process of cargo handling at airports for air cargo shipments involves several steps to ensure efficient and timely movement of goods. Upon arrival at the airport, cargo is unloaded from arriving aircraft and transported to the cargo terminal or warehouse. Here, the cargo undergoes documentation checks, including verification of shipping manifests and customs clearance procedures. Next, cargo is sorted based on destination and type, and then loaded onto outbound aircraft for departure. Specialized equipment such as conveyor belts, forklifts, and pallet loaders are used to handle and transport cargo within the cargo terminal. Throughout the process, strict security measures are enforced to safeguard the integrity of the cargo. Finally, once loaded onto the aircraft, the cargo is secured in the cargo hold or on pallets to ensure safe transportation during flight.",
    },
    {
      question: "WHAT FACTORS INFLUENCE THE TRANSIT TIMES FOR AIR CARGO SHIPMENT?",
      description: <span>
        Several factors influence the transit times for air cargo shipments:
        <br/>1. Distance: The distance between the origin and destination airports plays a significant role in determining transit times. Longer distances typically result in longer transit times.
        <br/>2. Route Efficiency: The efficiency of the chosen flight route, including any layovers or stopovers, can affect transit times. Direct flights usually have shorter transit times compared to flights with multiple stops.
        <br/>3. Airport Congestion: Congestion at airports, especially during peak hours, can lead to delays in cargo handling, loading, and unloading, thereby increasing transit times.
        <br/>4. Customs Clearance: The efficiency of customs clearance procedures at both the origin and destination airports can impact transit times. Delays in customs processing can prolong the overall transit time.
        <br/>5. Weather Conditions: Adverse weather conditions such as storms, fog, or strong winds can disrupt flight schedules and lead to delays in air cargo shipments.
        <br/>6. Aircraft Capacity: The type and capacity of the aircraft used for transporting cargo also influence transit times. Larger aircraft with greater cargo capacity may be able to accommodate more shipments and reduce transit times.
        <br/>Overall, efficient planning, effective logistics management, and collaboration between all stakeholders involved in the air cargo supply chain are essential for minimizing transit times and ensuring timely delivery of shipments.
      </span>,
    },
    {
      question: "CAN YOU EXPLAIN THE DIFFERENT TYPES OF AIRCRAFT USED FOR AIR CARGO TRANSPORTATION AND THEIR RESPECTIVE CAPACITIES?",
      description: <span>
        Certainly! Here are some of the different types of aircraft commonly used for air cargo transportation and their respective capacities:
        <br/>1. Cargo Aircraft: These are dedicated freighter aircraft designed specifically for transporting cargo. They come in various sizes and configurations, including narrow-body, wide-body, and specialized freighters like the Boeing 747F or the Airbus A330F. Cargo aircraft have large cargo holds and are capable of carrying significant volumes of cargo.
        <br/>2. Passenger Aircraft: Passenger aircraft, such as Boeing 737s or Airbus A320s, are also utilized for transporting cargo, especially during times of low passenger demand or on routes where cargo capacity is needed. These aircraft typically have lower cargo capacities compared to dedicated cargo aircraft but can still carry cargo in their belly holds.
        <br/>3. Heavy Cargo Lifters: Heavy cargo lifters, like the Antonov An-124 or the Boeing C-17 Globemaster III, are used for transporting oversized or heavy cargo that cannot be accommodated by standard cargo aircraft. These aircraft have large cargo holds and specialized loading capabilities to handle bulky or heavy items.
        <br/>4. Military Transport Aircraft: Military transport aircraft, such as the Lockheed C-130 Hercules or the Boeing C-5 Galaxy, are occasionally used for air cargo transportation, especially for military- related shipments or humanitarian missions. These aircraft have versatile cargo configurations and can transport a wide range of cargo types.
        <br/>5. Air Freighters: Some airlines operate converted passenger aircraft or combi aircraft that have been modified to carry cargo in addition to passengers. These aircraft offer a combination of passenger and cargo capacity, allowing airlines to optimize their fleet utilization and meet varying demand for both passengers and cargo.
        <br/>Each type of aircraft has its own unique capabilities and capacities, allowing for flexible and efficient air cargo transportation to meet the diverse needs of shippers and logistics providers.
      </span>,
    },
    {
      question: "HOW ARE CUSTOMS PROCEDURES MANAGED FOR AIR CARGO SHIPMENTS,ESPECIALLY FOR INTERNATIONAL ROUTES?",
      description: <span>
        Customs procedures for air cargo shipments, particularly for international routes, involve several key steps to ensure compliance with import and export regulations. Here&apos;s an overview of how customs procedures are managed for air cargo shipments:
        <br/>1. Documentation Submission: Shippers are required to provide accurate and complete documentation for their air cargo shipments, including commercial invoices, packing lists, air waybills, and any required permits or certificates. This documentation is submitted to customs authorities electronically or through designated customs agents.
        <br/>2. Customs Declaration: Upon arrival at the destination country&apos;s airport, air cargo shipments undergo customs declaration, where customs officials review the submitted documentation to verify the contents of the shipment and assess any applicable duties, taxes, or tariffs.
        <br/>3. Cargo Inspection: Customs authorities may conduct physical inspections of air cargo shipments to ensure compliance with import/export regulations, as well as to detect any prohibited or restricted items. These inspections may involve the use of X-ray scanners, sniffer dogs, or manual inspections.
        <br/>4. Duty Assessment: Customs officials assess the value of the imported goods and determine the applicable duties, taxes, or tariffs based on the declared value, classification, and origin of the goods. Shippers are responsible for paying any applicable duties or taxes before the cargo can be released for delivery.
        <br/>5. Clearance and Release: Once customs clearance procedures are completed and any duties or taxes are paid, the air cargo shipment is released by customs authorities for final delivery to the consignee. Customs clearance may involve electronic release procedures or physical release of cargo after inspection.
        <br/>6. Regulatory Compliance: Customs procedures for air cargo shipments also include compliance with various regulatory requirements, such as security screening, export controls, and trade sanctions. Shippers must ensure that their shipments comply with all relevant regulations to avoid delays or penalties.
        <br/>Effective management of customs procedures for air cargo shipments is essential to facilitate smooth and efficient international trade, while also ensuring compliance with import and export regulations imposed by customs authorities.
      </span>,
    },
    {
      question: "WHAT ARE THE SPECIFIC REGULATIONS AND SAFETY PROTOCOLS INVOLVED IN TRANSPORTING CHEMICAL OR RAW MATERIAL CARGO?",
      description: <span>
        The transportation of chemical or raw material cargo is subject to specific regulations and safety protocols to prevent accidents and environmental hazards. These may include proper packaging, labeling, handling procedures, and adherence to international standards such as the International Maritime Dangerous Goods (IMDG) Code or the International Air Transport Association (IATA) Dangerous Goods Regulations (DGR). Here are some key aspects:
        <br/>1. **Classification and Labeling**: Chemicals and raw materials must be classified and labeled according to international standards, such as the Globally Harmonized System of Classification and Labelling of Chemicals (GHS). Proper labeling ensures that hazards associated with the cargo are clearly communicated to handlers and emergency responders.
        <br/>2. **Packaging Requirements**: Chemicals and raw materials must be packaged in containers that meet regulatory standards for strength, durability, and compatibility with the cargo. Packaging materials should be resistant to leakage, breakage, and contamination to prevent spills or exposure during transit.
        <br/>3. **Documentation**: Shippers are required to provide accurate and comprehensive documentation for chemical or raw material cargo, including safety data sheets (SDS), shipping manifests, and transport documentation. These documents contain vital information about the cargo&apos;s composition, hazards, handling instructions, and emergency response procedures.
        <br/>4. **Transportation Modes**: Depending on the nature of the cargo and regulatory requirements, chemical or raw material cargo may be transported by various modes, including road, rail, sea, or air. Each mode of transportation has specific regulations and safety measures governing the handling and carriage of hazardous materials.
        <br/>5. **Security Measures**: Chemical or raw material cargo may be subject to additional security measures to prevent theft, tampering, or unauthorized access. These measures may include security seals, surveillance systems, and secure storage facilities to safeguard the cargo throughout the transportation process.
        <br/>6. **Emergency Response Planning**: Shippers and transporters of chemical or raw material cargo must have comprehensive emergency response plans in place to address potential incidents or accidents during transit. This includes training personnel in proper handling procedures, spill containment, and evacuation protocols to minimize risks to human health and the environment.
        <br/>Compliance with specific regulations and safety protocols is essential to ensure the safe and secure transportation of chemical or raw material cargo while minimizing potential hazards to personnel, communities, and the environment along the supply chain.
      </span>,
    },
  ],
  [TabName.TRUCK]: [
    {
      question: "WHY PROPER MEASURE AND WEIGHT ARE FUNDAMENTAL FOR YOUR SHIPPING?",
      description: <span>
        Cost Control: Accurate measurements determine shipping prices, avoiding financial surprises which can have a  big impact on your business sales.
        <br/>Space Efficiency: Precise dimensions optimize storage and loading, reducing wasted space. We love partial load! 
        <br/>Regulatory Compliance: Meeting size and weight restrictions prevents penalties, big fines, possible seizure of your goods by enforcement officer and delays.
        <br/>Safety Assurance: Proper weight distribution ensures stable transportation, reducing accidents for the driver and for your goods.
        <br/>Smart Choices: Knowing accurate measurements helps select the right carrier and shipping method. You save money, We save time!
        <br/>Smooth Documentation: Precise data speeds up paperwork and customs processes.
      </span>,
    },
    {
      question: "WHY DO I HAVE TO DECLARE THE GOODS I WANT TO SHIP?",
      description: <span>
        Declaring your goods for shipping is crucial for these reasons:
        <br/>Compliance: Avoid penalties and delays by providing accurate information. Identifying the right vehicle of transport to move your goods is our priority!
        <br/>Safety and security: Prevent transportation of hazardous or prohibited items. Not all the states has the same regulations and we are here to help you to not get in trouble!
        <br/>Documentation accuracy: Since one of our &apos;Plus service&apos; includes RemoteCash&Carry, we want to help you have the broadest understanding of what you are buying and understanding which product in question is essential.
        <br/>Risk management: Finding the right insurance for your property is really important. Yes, it&apos;s a choice, but sometimes can provide you peace of mind and financial protection.
        <br/>Efficient logistics: Help logistics companies plan and allocate resources effectively.
        <br/> In summary, declaring your goods ensures compliance, safety, efficient logistics, and smooth processes.
      </span>,
    },
    {
      question: "WHY SOMETIMES I CAN'T GET A QUOTE FOR MY TRANSPORT?",
      description: <span>
        There can be several reasons why you may not be able to get a quote for your transport but in any of these case, contact us through Whatsapp linked: 
        <br/><br/>Insufficient Information: If you haven&apos;t provided enough details about your transport requirements, such as the origin and destination, dimensions, weight, type of goods, or any specific handling requirements, it may be challenging for the service provider to generate an accurate quote. Ensure you provide comprehensive information to receive an accurate estimate.
        <br/>Complex or Specialized Requirements: Certain transport requests involve unique or specialized circumstances that may require additional information or assessment. For example, transporting hazardous materials, oversized cargo, or fragile items may require specialized handling or permits, making it more challenging to provide an instant quote.
        <br/>Unavailable Service or Route: The specific service or route you are requesting may not be offered by the transport provider. It could be due to geographical limitations, lack of availability, or other operational constraints. In such cases, they may not be able to provide a quote for that particular request.
        <br/>Dynamic Pricing: Some transport services have dynamic pricing based on factors such as market demand, fuel costs, seasonality, or other variables. As a result, quotes for certain transports may fluctuate and may not be immediately available. In such cases, you may need to reach out to the service provider directly for an updated quote.
        <br/>Technical or System Limitations: There could be instances where technical issues or limitations within the quoting system prevent the immediate generation of a quote. It could be due to system maintenance, connectivity problems, or other technical issues. Trying again later or contacting the service provider directly may help resolve this. 
        <br/><br/>It&apos;s important to remember that each transport request is unique, and various factors can impact the ability to provide an instant quote. If you&apos;re unable to receive a quote online or through automated systems, reaching out to the transport provider directly or providing more detailed information about your requirements can often help in obtaining an accurate quote.
      </span>,
    },
    {
      question: "WHY IT TAKES SO LONG TO HAVE A QUOTATION OF TRANSPORTATION?",
      description: <span>
        Obtaining a transport quotation can take time due to factors such as the complexity of your request, the need for customized solutions, external influences, and the coordination required between multiple parties. Each transport request is unique and may require careful assessment and consideration before an accurate quotation can be provided. We provided a &apos;bell&apos; notification in case you want to refreshand be kept informed of any developments.
      </span>,
    },
    {
      question: "ARE ALL INTERNATIONAL AND NATIONAL SHIPPING ALREADY INSURED?",
      description: "Not all shipments are covered by insurance, so please bear in mind that you will not be covered for damage, loss or theft for shipments that contain prohibited or restricted items. The shipping insurance does not apply for high-value items, fragile, dangerous, illegal, perishable goods or goods which are not appropriately packed according to the logistic provider's guidelines, which you will find on their website or receive upon booking.",
    },
    {
      question: "HOW DO I TRACE MY GOODS AFTER I SHIP THEM?",
      description: "All shipments will be meticulously regulated in accordance with the logistic provider's robust platform system, ensuring smooth and efficient handling from start to finish.",
    },
  ],
};
