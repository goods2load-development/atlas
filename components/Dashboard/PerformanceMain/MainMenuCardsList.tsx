import { IMainMenuCard } from "@/app/interface/dashboard";
import MainMenuCard from "./MainMenuCard";

interface MainMenuCardsListProps {
  cards: IMainMenuCard[];
  handleSelectCard: (name: string) => void;
}

const MainMenuCardsList: React.FC<MainMenuCardsListProps> = ({
  cards,
  handleSelectCard,
}) => {
  return (
    <ul className="flex items-center flex-wrap gap-8 lg:gap-14 xl:gap-0">
      {cards.map((card) => (
        <MainMenuCard
          handleSelectCard={handleSelectCard}
          key={card.title}
          card={card}
        />
      ))}
    </ul>
  );
};

export default MainMenuCardsList;
