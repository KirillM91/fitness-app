import { useNavigate } from 'react-router-dom';
import backArrow from '../../assets/icons8-back-24.png';

// Just a back button with eazy positioning setup

type Props = {
  x: number;
  y: number;
};

function BackButton({ x, y }: Props) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="reusable-back-button"
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      <img src={backArrow} alt="" />
      <span>Back</span>
    </button>
  );
}

export default BackButton;
